import React, {Component, Fragment} from 'react';
import {Button, message, Modal, Table} from "antd";
import {groupsList, stopGroupon} from "../../../../api/activities/groupon";
import {orderInputTransformer, orderOutputTransformer, searchJson} from "../../../../utils/dataStorage";
import {groupon_list_fields, operation} from "./utils/groupon_list_fields";
import {groupon_list_custom_fields} from "./utils/groupon_list_custom_fields";
import IconFont from "../../../../utils/IconFont";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import CustomItem from "../../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../../components/Layout/Pagination";
import {delivery, getStatus, groupLimit, orderDeadline} from "./utils/desc";
import './css/list.sass';
import PreviewDetails from "./modal/PreviewDetails";
import ReviewGoods from "./modal/ReviewGoods";

class GrouponList extends Component {
    constructor(props) {
        super(props);
        const defaultItem = ['display_name','group_products', 'orderable_deadline_specified_type', 'delivery_specified_type', 'shop_shopping_groups_count', 'order_placed_count','state_desc','id'];
        this.state = {
            api: groupsList,
            data:[],
            filterVisible: false,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson: searchJson({date: ''})
            },
            activeTab: -1,
            detailVisible: false, //  拼团回显详情
            productsVisible: false, // 参与商品
            groupon: {},
            products: [],
            defaultItem: defaultItem,
        };
        this.columns = [
            {
                title: '拼团名称',
                dataIndex: 'display_name',
                render: (text, record) => (
                    <span onClick={()=>this.showGroupDetails(record)} style={{color: '#4f9863', cursor: 'pointer'}}>{text}</span>
                )
            },
            // {
            //     title: '持续时间',
            //     dataIndex: 'start_date',
            //     render: (text, record) => (<span>
            //         {text}至{record['end_date']}
            //     </span>)
            // },
            {
                title: '参与商品',
                dataIndex: 'sh12op_name',
                render: ((text, record) => <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
                    <span className="orderGoods">{record.group_products[0].name+'......'}</span>
                    <IconFont type="icon-eye-fill" onClick={()=>this.showProductsReview(record.group_products)} />
                </span>)
            },
            // {
            //     title: '成团限制',
            //     dataIndex: 's1hop_name',
            //     render: (text, record) => {
            //         return groupLimit(record)
            //     }
            // },
            {
                title: '截单时间',
                dataIndex: 'sh2op_name',
                render: (text, record) => {
                    return orderDeadline(record)
                }
            },
            {
                title: '配送日期',
                dataIndex: 'sho1p1_name',
                render: (text, record) => {
                    return delivery(record)
                }
            },
            {
                title: '开团次数',
                dataIndex: 'shop_shopping_groups_count'
            },
            {
                title: '下单数',
                dataIndex: 'shopping_group_orders_count'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (text, record) => {
                    return getStatus(record.state)
                }
            },
            // {
            //     title: '打折',
            //     dataIndex: 'discount',
            //     render: (text, record) => {
            //         return discount(record)
            //         if (text === 100) {
            //             return '无'
            //         } else {
            //             return `${text / 100}折`
            //         }
            //     }
            // },
            {
                title: '操作',
                render: (text, record) => (
                    <Fragment>
                        <span onClick={()=>this.editGroupon(record)} style={{color: '#4f9863', cursor: 'pointer', marginRight: '10px'}}>编辑</span>
                        {
                            record.state === 1 && <span style={{color: '#4f9863', cursor: 'pointer'}} onClick={()=>this.stopGroupon(record)}>提前结束</span>
                        }
                    </Fragment>
                )
            },

        ];
        this.child = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('click', this.closeCustom);
    }

    editGroupon = (record) => {
        this.props.history.push({pathname:`/activities/editGroupon`, state: {data: record}})
    };

    stopGroupon = (record) => {
        let refresh = this.refresh;
        let self = this;
        let confirmModal = Modal.confirm({
            title: (
                <div className= 'u_confirm_header'>
                    提示
                    <i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
                        confirmModal.destroy()
                    }}>&#xe82a;</i>
                </div>
            ),
            icon:null,
            width:'280px',
            closable:true,
            centered:true,
            maskClosable:true,
            content: (
                <div className="U_confirm">
                    确定结束该活动么？
                </div>
            ),
            cancelText: '取消',
            okText:'确定',
            okButtonProps: {
                size:'small'
            },
            cancelButtonProps:{
                size:'small'
            },
            onOk() {
                stopGroupon({},record.id).then(r=>{
                    message.success('已结束该活动');
                    refresh(self.state.activeTab)
                }).catch(_=>{})
            },
            onCancel() {

            },
        });
    };

    showGroupDetails = (record) => {
        this.setState({detailVisible: true, groupon: record})
    };
    closeGroupDetails = () => {
        this.setState({detailVisible: false})
    };

    showProductsReview = (products) => {
        this.setState({productsVisible: true, products})
    };
    closeProductsReview = () => {
        this.setState({productsVisible: false})
    };

    refresh = (key)=>{
        let logic_conditions = [];
        if (key < 0) {
            logic_conditions = []
        } else {
            logic_conditions = {
                conditions: [
                    {
                        key: 'shopping_group_state',
                        operation: '=',
                        value: key
                    }
                ],
                logic: 'and'
            }
        }
        this.setState({
            filterVisible:false,
            paginationParams:{
                search:'',
                searchJson:searchJson({state_constant:'', logic_conditions})
            }
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        })
    };

    createNewGroupon = () => {
        this.props.history.push({pathname:`/activities/newGroupon`})
    };

    // 头部搜索框
    search = (value) =>{
        this.setState({
            api:groupsList,
            paginationParams:{...this.state.paginationParams,
                searchJson:searchJson({search:value,status:true})}
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        });
    };

    //高级筛选
    higherFilter = () =>{
        this.setState({filterVisible:true})
    };
    closeHigherFilter = () =>{
        this.setState({filterVisible:false})
    };
    onSubmit = (data) =>{
        this.setState({api:groupsList,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
            this.child.current.pagination(this.child.current.state.current)
        });
    };

    //自定义显示项
    showCustom = (e) =>{
        e.nativeEvent.stopImmediatePropagation();
        this.setState({customVisible:true})
    };
    closeCustom = () =>{
        this.setState({customVisible:false})
    };
    handleCustom = (e) =>{
        let ary = [];
        e.forEach(e=>{
            groupon_list_custom_fields.forEach(u=>{
                u.children.forEach(c=>{
                    if(e == c.value){
                        let obj = {};
                        obj.title = c.label;
                        obj.dataIndex = e;
                        if (obj.dataIndex === 'group_products') {
                            obj.render = (text,record) => {
                                if(record.group_products.length){
                                    return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.group_products[0].name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.showProductsReview(record.group_products)} />
									</span>
                                } else {
                                    return <span>无</span>
                                }
                            }
                        }
                        ary.push(obj)
                    }
                })
            })
        });
        let index = e.indexOf('id');
        if (index < 0) {
            e.push('id');
        }
        console.log(ary, '_______ ggg ______');
        ary[0].render = (text,record) => <span
            style={{'color':'#4F9863','cursor':'pointer'}}
            onClick={()=>this.showGroupDetails(record)}>{text}</span>;
        this.columns = ary;
        this.setState({
            columns:ary,
            paginationParams:{...this.state.paginationParams, only:  e.join(',')}
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        })
    };

    // 分页器改变值
    paginationChange = (list) =>{
        this.setState({data:list})
    };

    // 切换tab
    onChangeTab = item =>{
        this.setState({activeTab:item.key});
        this.refresh(item.key)
    };

    render() {
        const tabs = [
            {name:'全部',key: -1},
            {name:'未开始',key:0},
            {name:'进行中',key:1},
            {name:'已结束',key:2}
        ];
        const detailsProps = {
            visible: this.state.detailVisible,
            data: this.state.groupon,
            onClose: this.closeGroupDetails
        };
        const productsProps = {
            visible: this.state.productsVisible,
            items: this.state.products,
            onClose: this.closeProductsReview
        };

        return (
            <div className='grouponList'>
                <AdvancedFilterComponent
                    visible={this.state.filterVisible}
                    onCancel={this.closeHigherFilter}
                    onSubmit={this.onSubmit}
                    refresh={this.refresh}
                    data={groupon_list_fields}
                    slug={'shopping_group'}
                    operation={operation}
                />
                <PreviewDetails {...detailsProps} />
                <ReviewGoods {...productsProps} />



                <div className="s_body_box">
                    <div className="headerLeft">
                        <SearchInput
                            getDatas={this.search}
                            text='请输入拼团名称'
                        />
                        <h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
                        <Button size='small' onClick={this.createNewGroupon}>创建拼团</Button>
                    </div>
                </div>
                <div className="tabs">
                    <ul className="left">
                        {
                            tabs.map((item,index)=>{
                                return <li
                                    key={index}
                                    className={this.state.activeTab == item.key?'active':''}
                                    onClick={()=>this.onChangeTab(item)}
                                >{item.name}</li>
                            })
                        }
                    </ul>
                    <div className="right">
                        <Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
                        <div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
                            <CustomItem
                                data={groupon_list_custom_fields}
                                targetKeys={this.state.defaultItem}
                                firstItem={'display_name'}
                                handleCustom={this.handleCustom}
                            />
                        </div>
                    </div>
                </div>
                <div className="chart u_chart">
                    <Table
                        columns={this.columns}
                        rowKey={(record, index) => {
                            return index
                        }}
                        pagination={false}
                        rowClassName={(record, index) => {
                            let className = '';
                            if (index % 2 ) className = 'dark-row';
                            return className;
                        }}
                        dataSource={this.state.data}
                    />
                </div>
                <div className="pagination">
                    <CustomPagination
                        api={this.state.api}
                        ref={this.child}
                        text="个拼团"
                        params={this.state.paginationParams}
                        id={this.state.id}
                        valChange={this.paginationChange}
                        current={this.state.current}
                    />
                </div>

            </div>
        );
    }
}

export default GrouponList;
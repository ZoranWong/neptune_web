import React, {Component} from 'react';
import {Button, message, Table,Modal} from "antd";
import {groupsOrdersList,groupsRefund } from "../../../../api/activities/groupon";
import {getToken, orderInputTransformer, orderOutputTransformer, searchJson} from "../../../../utils/dataStorage";
import {groupon_order_fields} from "./utils/groupon_order_fields";
import {operation} from "./utils/groupon_order_fields";
import IconFont from "../../../../utils/IconFont";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import CustomItem from "../../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../../components/Layout/Pagination";
import ReviewGoods from "../GrouponList/modal/ReviewGoods";
import {groupon_order_custom_fields} from "./utils/groupon_order_custom_fields";
import Config from "../../../../config/app";
import Export from "../../../Order/Components/Export";
import _ from "lodash";

class GrouponOrderManage extends Component {
    constructor(props) {
        super(props);
        const defaultItem = ['nickname','trade_no', 'initiator_name', 'paid_at', 'delivery_date', 'items','settlement_total_fee','state_desc','id'];
        this.state = {
            api: groupsOrdersList,
            data:[],
            filterVisible: false,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson: searchJson({date: ''})
            },
            activeTab: '',
            products: [],
            defaultItem: defaultItem,
            exportVisible: false,
            orders: [],
            loading: false,
            isModalVisible:false,
            refundId:''
        };
        this.columns = [
            {
                title: '用户昵称',
                dataIndex: 'nickname'
            },
            {
                title: '订单号',
                dataIndex: 'trade_no'
            },
            {
                title: '开团店铺',
                dataIndex: 'initiator_name'
            },
            {
                title: '支付时间',
                dataIndex: 'paid_at'
            },
            {
                title: '配送日期',
                dataIndex: 'delivery_date'
            },
            {
                title: '商品',
                dataIndex: 'sh12op_name',
                render: ((text, record) => <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
                    <span className="orderGoods">{record.items[0].name+'......'}</span>
                    <IconFont type="icon-eye-fill" onClick={()=>this.showProductsReview(record.items)} />
                </span>)
            },
            {
                title: '实付款',
                dataIndex: 'settlement_total_fee'
            },
            {
                title: '状态',
                // dataIndex: 'state_desc'
                render:(text,record) =>
                    <div>
                        {/* {record.state_desc} */}
                        {
                            record.is_refund == 1 ? <div>
                                <span>{record.state_desc}</span>
                                <span style={{'color':'#4F9863','cursor':"pointer","marginLeft":'5px'}} onClick={()=> this.refund(record)}>退款</span>
                                </div> :
                                <span>{record.state_desc}</span>
                        }
                    </div>
            }
        ];
        this.child = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('click', this.closeCustom);
    }
    // 退款
    refund =(record)=>{
        this.setState({isModalVisible:true,refundId:record.id})
    }
     handleOk = () => {
        
         groupsRefund({},this.state.refundId).then(r =>{
            message.success(r.message)
            this.setState({isModalVisible:false})
        }).catch(err =>{
        })
      };
    
    handleCancel = () => {
        this.setState({isModalVisible:false})
      };

    refresh = (key)=>{
        let logic_conditions = [];
        if (!key) {
            logic_conditions = []
        } else {
            logic_conditions = {
                conditions: [
                    {
                        key: 'shopping_group_order_order_state',
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
                logic_conditions:[],
                search:'',
                searchJson:searchJson({state_constant:'', logic_conditions})
            }
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        })
    };


    // 头部搜索框
    search = (value) =>{
        this.setState({
            api:groupsOrdersList,
            paginationParams:{...this.state.paginationParams,
                searchJson:searchJson({search:value,status:true})}
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        });
    };

    // 导出
    showExport = (conditions) =>{
        this.setState({conditions, exportVisible: true}, ()=>{
            this.closeHigherFilter()
        })
    };
    hideExport = () =>{
        this.setState({exportVisible: false})
    };



    // 确定导出
    export = (type, items,conditions) =>{
        console.log(type, '--- type---');
        console.log(conditions, '>>>>>>>>>>>>>>>>>>>>>>>>>>');
        let json = searchJson({
            strategy: type,
            customize_columns: items,
            logic_conditions: conditions
        });
        window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
        // dataExport({searchJson: searchJson(params)}).then(r=>{
        // 	console.log(r);
        // }).catch(_=>{})
    };


    //高级筛选
    higherFilter = () =>{
        this.setState({filterVisible:true})
    };
    closeHigherFilter = () =>{
        this.setState({filterVisible:false})
    };
    onSubmit = (data) =>{
        this.setState({api:groupsOrdersList,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
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
            groupon_order_custom_fields.forEach(u=>{
                u.children.forEach(c=>{
                    if(e == c.value){
                        let obj = {};
                        obj.title = c.label;
                        obj.dataIndex = e;
                        if (obj.dataIndex === 'items') {
                            obj.render = (text,record) => {
                                if(record.items.length){
                                    return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.items[0].name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.showProductsReview(record.items)} />
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

    showProductsReview = (products) => {
        this.setState({productsVisible: true, products})
    };
    closeProductsReview = () => {
        this.setState({productsVisible: false})
    };

    render() {
        const tabs = [
            {name:'全部',key: ''},
            {name:'待成团',key:'PAY_COMPLETED'},
            {name:'待收货',key:'WAIT_AGENT_VERIFY'},
            {name:'未成团',key:'CANCEL_AUTO'},
            {name:'待自提',key:'WAIT_CUSTOMER_VERIFY'},
            {name:'已完成',key:'COMPLETED'}
        ];

        const strategy = [
            {key: 'GROUP_SHOPPING_ORDER_CUSTOMIZE', value: '自定义显示项',},
            {key: 'GROUP_SHOPPING_PRODUCT_DIMENSION', value: '商品维度',},
            {key: 'GROUP_SHOPPING_WULIU', value: '物流订单模板',},
        ];

        const productsProps = {
            visible: this.state.productsVisible,
            items: this.state.products,
            onClose: this.closeProductsReview
        };

        const exportProps = {
            visible : this.state.exportVisible,
            onCancel : this.hideExport,
            export: this.export,
            strategy,
            values: groupon_order_custom_fields,
            conditions: this.state.conditions,
            slug: 'shopping_group_order_'
        };


        return (
            <div className='grouponList'>
                <Modal width='200px' visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <h3>您即将进行退款</h3>
                </Modal>


                <AdvancedFilterComponent
                    visible={this.state.filterVisible}
                    onCancel={this.closeHigherFilter}
                    onSubmit={this.onSubmit}
                    refresh={this.refresh}
                    data={groupon_order_fields}
                    operation={operation}
                    slug={'shopping_group_order'}
                    export={this.showExport}


                />
                <ReviewGoods {...productsProps} />

                <Export {...exportProps} />
                <div className="s_body_box">
                    <div className="headerLeft">
                        <SearchInput
                            getDatas={this.search}
                            text='请输入用户名或订单号'
                        />
                        <h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
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
                                data={groupon_order_custom_fields}
                                targetKeys={this.state.defaultItem}
                                firstItem={'nickname'}
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
                        text="笔拼团订单"
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

export default GrouponOrderManage;
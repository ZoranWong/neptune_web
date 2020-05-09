import React, {Component} from 'react';
import {Button, Table} from "antd";
import {groupsShoppingList } from "../../../../api/activities/groupon";
import {orderInputTransformer, orderOutputTransformer, searchJson} from "../../../../utils/dataStorage";
import {groupon_fields, operation} from "./utils/groupon_fields";
import {groupon_custom_fields} from "./utils/groupon_custom_fields";
import IconFont from "../../../../utils/IconFont";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import CustomItem from "../../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../../components/Layout/Pagination";
import ReviewGoods from "../GrouponList/modal/ReviewGoods";

class GrouponManage extends Component {
    constructor(props) {
        super(props);
        const defaultItem = ['display_name','shopping_group_name', 'create_time', 'orderable_deadline', 'delivery_date', 'order_placed_count','state_desc','id'];
        this.state = {
            api: groupsShoppingList,
            data:[],
            filterVisible: false,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson: searchJson({date: ''})
            },
            activeTab: -1,
            products: [],
            defaultItem: defaultItem,
        };
        this.columns = [
            {
                title: '拼团单主题',
                dataIndex: 'display_name'
            },
            {
                title: '拼团名称',
                dataIndex: 'shopping_group_name'
            },
            {
                title: '开团时间',
                dataIndex: 'create_time'
            },
            {
                title: '截单时间',
                dataIndex: 'orderable_deadline'
            },
            {
                title: '配送日期',
                dataIndex: 'delivery_date'
            },
            {
                title: '下单数',
                dataIndex: 'order_placed_count'
            },
            // {
            //     title: '商品',
            //     dataIndex: 'sh12op_name',
            //     render: ((text, record) => <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
            //         <span className="orderGoods">{record.group_products[0].name+'......'}</span>
            //         <IconFont type="icon-eye-fill" onClick={()=>this.showProductsReview(record.group_products)} />
            //     </span>)
            // },
            {
                title: '状态',
                dataIndex: 'state_desc'
            },
        ];
        this.child = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('click', this.closeCustom);
    }


    refresh = (key)=>{
        let logic_conditions = [];
        if (key < 0) {
            logic_conditions = []
        } else {
            logic_conditions = {
                conditions: [
                    {
                        key: 'shop_shopping_group_state',
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
                searchJson:searchJson({state_constant:'',logic_conditions})
            }
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        })
    };


    // 头部搜索框
    search = (value) =>{
        this.setState({
            api:groupsShoppingList,
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
        this.setState({api:groupsShoppingList,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
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
            groupon_custom_fields.forEach(u=>{
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
            {name:'全部',key: -1},
            {name:'待成团',key:0},
            {name:'已成团',key:1},
            {name:'未成团',key:2},
            {name:'已完成',key:3}
        ];
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
                    data={groupon_fields}
                    slug={'shop_shopping_group'}
                    operation={operation}
                />
                <ReviewGoods {...productsProps} />


                <div className="s_body_box">
                    <div className="headerLeft">
                        <SearchInput
                            getDatas={this.search}
                            text='请输入店铺四件套'
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
                                data={groupon_custom_fields}
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
                        text="个拼团单"
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

export default GrouponManage;
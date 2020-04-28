import React, {Component} from 'react';
import {Button, Table} from "antd";
import {groupsProductsManage } from "../../../../api/activities/groupon";
import {orderInputTransformer, orderOutputTransformer, searchJson} from "../../../../utils/dataStorage";
import {summary_order_values} from "../../../../utils/summary_order_fields";
import IconFont from "../../../../utils/IconFont";
import AdvancedFilterComponent from "../../../Order/Components/AdvancedFilterComponent";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import CustomItem from "../../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../../components/Layout/Pagination";
import ReviewGoods from "../GrouponList/modal/ReviewGoods";

class GrouponProductsManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: groupsProductsManage,
            data:[],
            filterVisible: false,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson: searchJson({is_on_sale: true})
            },
            activeTab: true,
            products: [],
            is_on_sale: true
        };
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'product_entity_name'
            },
            {
                title: '拼团数',
                dataIndex: 'shopping_group_count'
            },
            {
                title: '拼团单数',
                dataIndex: 'shop_shopping_groups_count'
            },
            {
                title: '待收货数量',
                dataIndex: 'wait_pick_count'
            },
            {
                title: '已售数量',
                dataIndex: 'sales_completed_count'
            },
            {
                title: '操作',
                dataIndex: 'settlement_total_fee'
            },
        ];
        this.child = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('click', this.closeCustom);
    }


    refresh = (activeTab = true)=>{
        this.setState({
            filterVisible:false,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson:searchJson({is_on_sale: activeTab})
            }
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        })
    };


    // 头部搜索框
    search = (value) =>{
        this.setState({
            api:groupsProductsManage,
            paginationParams:{...this.state.paginationParams,
                searchJson:searchJson({search:value,status:true, is_on_sale: this.state.is_on_sale})}
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
        this.setState({api:groupsProductsManage,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true, is_on_sale: this.state.is_on_sale})}},()=>{
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
            summary_order_values.forEach(u=>{
                u.children.forEach(c=>{
                    if(e == c.value){
                        let obj = {};
                        obj.title = c.label;
                        obj.dataIndex = orderOutputTransformer(e);
                        if (obj.dataIndex === 'items') {
                            obj.render = (text,record) => {
                                if(record.items.length){
                                    return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.items[0].product_name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items)} />
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
        ary[0].render = (text,record) => <span
            style={{'color':'#4F9863','cursor':'pointer'}}
            onClick={()=>this.jump(record)}>{text}</span>;
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
        this.setState({activeTab:item.key, is_on_sale: item.key});
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
            {name:'在售',key: true},
            {name:'不在售',key:false},
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
                    data={summary_order_values}
                />
                <ReviewGoods {...productsProps} />


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
                                data={summary_order_values}
                                targetKeys={orderInputTransformer(this.state.defaultItem)}
                                firstItem={'trade_no'}
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
                        text="件商品"
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

export default GrouponProductsManage;
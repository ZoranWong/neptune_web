import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table, Modal, message} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/order.sass'
import {getToken, orderInputTransformer, orderOutputTransformer, searchJson} from "../../../utils/dataStorage";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import ReviewGoods from "../Components/ReviewGoods";
import SelectPosition from "./Modal/SelectPosition"
import LogisticsSelectPosition from "./Modal/LogisticsSelectPosition"
import ShopSelectPosition from "./Modal/ShopSelectPosition"
import { breakfastCarOrder,checkOrder, orderCancel,userOrder} from "../../../api/order/orderManage";

import {consumer_order_values} from "../../../utils/consumer_order_fields";
import {consumer_order_values_export} from "../../../utils/consumer_order_fields_export";
import {consumer_order_values_custom} from "../../../utils/consumer_order_fields_custom_item";
import {getBeforeDate} from "../../../utils/dataStorage";
import Export from "../Components/Export";
import Config from '../../../config/app'
import _ from "lodash";
// import CheckOrder from "./Modal/CheckOrder";

class BreakfastCartOrder extends React.Component {
    constructor(props) {
        const columns = [
            {
                title: '订单号',
                dataIndex: 'trade_no',
                render: (text, record) => <span
                    style={{'color': '#4F9863', 'cursor': 'pointer'}} onClick={() => this.jump(record)}>{text}</span>,
            },
            {
                title: '商品',
                dataIndex: 'category_desc',
                render: (text, record) => {
                    if (record.items.length) {
                        return <span style={{'color': '#4F9863', 'cursor': 'pointer', 'display': 'flex'}}
                                     className="i_span">
							<span className="orderGoods">{record.items[0].name + '......'}</span>
							<IconFont type="icon-eye-fill" onClick={() => this.reviewGoods(record.items)}/>
						</span>
                    } else {
                        return <span>无</span>
                    }
                },
            },
            {
                title: '实付款',
                dataIndex: 'settlement_total_fee',
            },
            {
                title: '车主姓名',
                dataIndex: 'shop_keeper_name',
            },
            {
                title: '车主手机号',
                dataIndex: 'shop_keeper_mobile',
            },
            {
                title: '支付时间',
                dataIndex: 'paid_time',
            },
            {
                title: '订单状态',
                dataIndex: 'state_desc',
                render: (text, record) => {
                    if (!record['shop_name'] && record['state'] === 'WAIT_CUSTOMER_VERIFY') {
                        return '待收货'
                    } else {
                        return text
                    }
                }
            },
        ];

        const sColumns = [
            {
                title: '订单号',
                dataIndex: 'trade_no',
                render: (text, record) => <span
                    style={{'color': '#4F9863', 'cursor': 'pointer'}} onClick={() => this.jump(record)}>{text}</span>,
            },
            {
                title: '商品',
                render: (text, record) => {
                    if (record.items.length) {
                        return <span style={{'color': '#4F9863', 'cursor': 'pointer', 'display': 'flex'}}
                                     className="i_span">
							<span className="orderGoods">{record.items[0].name + '......'}</span>
							<IconFont type="icon-eye-fill" onClick={() => this.reviewGoods(record.items)}/>
						</span>
                    } else {
                        return <span>无</span>
                    }
                },
            },
            {
                title: '实付款',
                dataIndex: 'settlement_total_fee',
            },
            {
                title: '车主姓名',
                dataIndex: 'shop_keeper_name',
            },
            {
                title: '车主手机号',
                dataIndex: 'shop_keeper_mobile',
            },
            {
                title: '支付时间',
                dataIndex: 'paid_time',
            },
            {
                title: '订单状态',
                dataIndex: 'state_desc',
                render: (text, record) => {
                    if (!record['shop_name'] && record['state'] === 'WAIT_CUSTOMER_VERIFY') {
                        return '待收货'
                    } else {
                        return text
                    }
                }
            },
            {
                title: '操作',
                render: (text, record) => {
                    return <div>
                                {/* <span style={{color: '#4f9863', cursor: 'pointer'}} onClick={() => this.checkOrder(record)}>手动核销</span> */}
                                <p></p>
                                {/* <span style={{color: '#4f9863', cursor: 'pointer'}} onClick={() => this.cancelOrder(record)}>取消订单</span> */}
                            </div>;
                }
            }
        ];
        const defaultItem = ['user_nickname', 'trade_no', 'products', 'settlement_total_fee', 'delivery_type', 'created_at', 'state_desc'];
        super(props);
        this.child = React.createRef();
        this.state = {
            api: breakfastCarOrder,
            filterVisible: false,
            customVisible: false,
            reviewGoodsVisible: false,
            exportVisible: false,
            columns: columns,
            sColumns: sColumns,
            defaultItem: defaultItem,
            data: [],
            checkedAry: [],     // 列表页选中的用户id组
            paginationParams: {
                logic_conditions: [],
                search: '',
            },
            activeTab: 'ALL',
            items: [],  // 商品回显,
            conditions: {},
            current: 1,
            problemOrder: {},
            isToday: false,
            position: null,
            orderTypes: null,
            deliveryDate: null,
            deliveryTime: null,
            exportTable: false,
            positionVisible: false,
            shopVisible:false,
            logisticsVisible:false


        };
    }

    componentWillMount() {
        if (this.props.location.state && this.props.location.state.current) {
            this.setState({current: this.props.location.state.current})
        }
        document.addEventListener('click', this.closeCustom);
        this.conditions()
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.closeCustom);
    }

    refresh = (status = 'ALL') => {
        this.setState({
            filterVisible: false,
            checkedAry: [],
            paginationParams: {
                logic_conditions: [],
                searchJson: searchJson({
                    state_constant: status
                })
            }
        }, () => {
            this.child.current.pagination(this.child.current.state.current)
        })
    };

    jump = record => {
        this.props.history.push({
            pathname: "/order/orderDetail",
            state: {id: record.id, path: '/order', current: this.child.current.state.current}
        })
    };

    // 头部搜索框
    search = (value) => {
        this.setState({
            api: breakfastCarOrder,
            paginationParams: {
                ...this.state.paginationParams,
                searchJson: searchJson({
                    search: value,
                    state_constant: this.state.activeTab
                })
            }
        }, () => {
            this.child.current.pagination(this.child.current.state.current)
        });
    };
    //高级筛选
    higherFilter = () => {
        this.setState({filterVisible: true})
    };
    closeHigherFilter = () => {
        this.setState({filterVisible: false})
    };
    onSubmit = (data) => {
        this.setState({
            api: breakfastCarOrder,
            paginationParams: {...this.state.paginationParams, searchJson: searchJson({logic_conditions: data})}
        }, () => {
            this.child.current.pagination(this.child.current.state.current)
        });
    };

    //自定义显示项
    showCustom = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({customVisible: true})
    };
    closeCustom = () => {
        this.setState({customVisible: false})
    };
    handleCustom = (e) => {
        let ary = [];
        console.log(e);
        e.forEach(e => {
            consumer_order_values_custom.forEach(u => {
                u.children.forEach(c => {
                    if (e == c.value) {
                        let obj = {};
                        obj.title = c.label;
                        obj.dataIndex = orderOutputTransformer(e);
                        if (obj.dataIndex === 'items') {
                            obj.render = (text, record) => {
                                if (record.items.data.length) {
                                    return <span style={{'color': '#4F9863', 'cursor': 'pointer', 'display': 'flex'}}
                                                 className="i_span">
										<span className="orderGoods">{record.items.data[0].name + '......'}</span>
										<IconFont type="icon-eye-fill" onClick={() => this.reviewGoods(record.items)}/>
									</span>
                                } else {
                                    return <span>无</span>
                                }
                            }
                        }
                        ary.push(obj);
                    }
                })
            })
        });
        let index = e.indexOf('id');
        if (index < 0) {
            e.push('id');
        }
        ary[0].render = (text, record) => <span
            style={{'color': '#4F9863', 'cursor': 'pointer'}}
            onClick={() => this.jump(record)}>{text}</span>
        this.setState({
            columns: ary,
            paginationParams: {...this.state.paginationParams, only: e.join(',')}
        }, () => {
            this.child.current.pagination(this.child.current.state.current)
        })
    };

    // 分页器改变值
    paginationChange = (list) => {
        this.setState({data: list})
    };

    // 切换tab
    onChangeTab = item => {
        console.log(item, '........');
        // if (item.key === 'WAIT_CUSTOMER_VERIFY_HOME') {//待收货（配送单
        //     this.setState({
        //         api: userOrder,
        //         activeTab: item.key,
        //         paginationParams: {
        //             ...this.state.paginationParams,
        //             searchJson: searchJson({delivery_type: 'HOME_DELIVERY', state_constant: 'WAIT_CUSTOMER_VERIFY'})
        //         }
        //     }, () => {
        //         this.child.current.pagination(this.child.current.state.current);
        //     });
        //     return
        // }
        // if (item.key === 'WAIT_CUSTOMER_VERIFY') {//待自提
        //     this.setState({
        //         api: userOrder,
        //         activeTab: item.key,
        //         paginationParams: {
        //             ...this.state.paginationParams,
        //             searchJson: searchJson({delivery_type: 'SELF_PICK', state_constant: 'WAIT_CUSTOMER_VERIFY'})
        //         }
        //     }, () => {
        //         this.child.current.pagination(this.child.current.state.current);
        //     });
        //     return
        // }
        this.setState({activeTab: item.key});
        this.refresh(item.key)
    };

    

    // 选择核销破损商品
    // showCheckinNormal = (record) => {
    //     this.setState({checkVisible: true, problemOrder: record})
    // };
    // hideCheckNormal = () => {
    //     this.setState({checkVisible: false})
    // };
    // checkInNormalOrder = (id, items, boolean) => {
    //     checkOrder({
    //         is_exception: boolean,
    //         items
    //     }, id).then(r => {
    //         message.success(`手动核销订单成功！`);
    //         this.hideCheckNormal();
    //         this.refresh('WAIT_CUSTOMER_VERIFY')
    //     });
    // };


    // 商品回显
    reviewGoods = (record, text) => {
        this.setState({reviewGoodsVisible: true, items: record, text: text})
    };
    closeReviewGoods = () => {
        this.setState({reviewGoodsVisible: false})
    };

    // 设置默认模板消息
    setMessage = () => {
        this.props.history.push({pathname: "/order/setUserMessage", state: {mode: 'user'}})
    };

    // 导出
    showExport = (conditions) => {
        this.setState({conditions, exportVisible: true, isToday: false}, () => {
            this.closeHigherFilter()
        })
    };
    hideExport = () => {
        this.setState({exportVisible: false})
    };

    // 确定导出
    export = (type, items, conditions) => {
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

    // 今日订单高级筛选conditions
    conditions = (orderTypes = null) => {
        let position = this.state.position;
        let orderTypeCondition = {
            key: 'order_order_type',
            operation: 'in',
            value: orderTypes ? orderTypes : ['SELF_PICK', 'GROUP_SHOPPING']
        };
        let deliveryTypeConditions = {
            key: 'order_delivery_type',
            operation: '=',
            value: orderTypes ? 'HOME_DELIVERY' : 'SELF_PICK'
        };
        let orderStateCondition = {
            key: 'order_state',
            operation: 'in',
            value: ['WAIT_AGENT_VERIFY', 'WAIT_CUSTOMER_VERIFY']
        };
        let conditions = [
            orderTypeCondition,
            deliveryTypeConditions,
            orderStateCondition,
        ];
        if (position && position.key) {
            let positionCondition = {
                key: `order_${position.key}`,
                operation: 'like',
                value: position.value
            };
            conditions.push(positionCondition);
        }
        if (this.state.deliveryDate) {
            let deliveryDateCondition = {
                key: `order_delivery_date`,
                operation: '=',
                value: this.state.deliveryDate
            };
            conditions.push(deliveryDateCondition);
        }
        if (this.state.deliveryTime) {
            let deliveryTimeCondition = {
                key: `order_delivery_time_period`,
                operation: 'between',
                value: this.state.deliveryTime
            };
            conditions.push(deliveryTimeCondition);
        }
        return {
            conditions:conditions,
            logic: 'and'
        }
    };

    // 查看今日订单
    todayOrders = (orderTypes = null) => {
        this.setState({
            api: breakfastCarOrder,
            paginationParams: {
                ...this.state.paginationParams, searchJson: searchJson({logic_conditions: this.conditions(orderTypes)})
            }
        }, () => {
            this.child.current.pagination(this.child.current.state.current)
        });
    };


    submitCondition = (position, deliveryDate = null, deliveryTime = null) => {
        this.setState({deliveryTime, deliveryDate, position}, () => {
            if (this.state.exportTable) {
                this.exportTodayOrders()
            } else {
                this.todayOrders(this.state.orderTypes);
            }
        });
    };

    // 导出今日订单
    exportTodayOrders = () => {
        this.setState({exportVisible: true, isToday: true})
    };
    // 确认导出今日订单
    exportToday = (type, items) => {
        console.log(this.state.orderTypes,"ordertype");
        let json = searchJson({
            strategy: type,
            customize_columns: items,
            logic_conditions: this.conditions(this.state.orderTypes)
        });
        window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
    };



    // 商品维度订单导出
    conditionSelector = () =>{
        this.setState({positionVisible:true})
    }
    hidePosition = () => {
        this.setState({positionVisible: false})
    };
    dimensionOrder = (date,dataTime,hoursTime) =>{
        if(date.value){
            window.location.href = `${Config.apiUrl}/api/backend/breakfast/load/product/dimension?delivery_date=${dataTime}&time_start=${hoursTime[0]}&time_end=${hoursTime[1]}&value=${date.value}`;
        }else{
            window.location.href = `${Config.apiUrl}/api/backend/breakfast/load/product/dimension?delivery_date=${dataTime}&time_start=${hoursTime[0]}&time_end=${hoursTime[1]}&value=''`;
        }
        
    }
    // 店铺维度订单导出
    shopSelector = () =>{
        this.setState({shopVisible:true})
    }
    shopHidePosition = () => {
        this.setState({shopVisible: false})
    };
    shopOrder = (date,dataTime,hoursTime) =>{
        if(date.value){
            window.location.href = `${Config.apiUrl}/api/backend/breakfast/load/shop/dimension?delivery_date=${dataTime}&time_start=${hoursTime[0]}&time_end=${hoursTime[1]}&value=${date.value}`;
        }else{
            window.location.href = `${Config.apiUrl}/api/backend/breakfast/load/shop/dimension?delivery_date=${dataTime}&time_start=${hoursTime[0]}&time_end=${hoursTime[1]}&value=''`;
        }
    }
    // 物流维度订单
    logisticsSelector = () =>{
        console.log(111111111)
        this.setState({logisticsVisible:true})
    }
    logisticshidePosition = () => {
        this.setState({logisticsVisible: false})
    };
    logisticsOrder = (date,dataTime,hoursTime) =>{
        if(date.value){
            window.location.href = `${Config.apiUrl}/api/backend/breakfast/load/route/dimension?delivery_date=${dataTime}&time_start=${hoursTime[0]}&time_end=${hoursTime[1]}&value=${date.value}`;
        }else{
            window.location.href = `${Config.apiUrl}/api/backend/breakfast/load/route/dimension?delivery_date=${dataTime}&time_start=${hoursTime[0]}&time_end=${hoursTime[1]}&value=''`;
        }
    }

    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let ary = [];
                selectedRows.forEach(item => {
                    ary.push(item['id'])
                });
                this.setState({checkedAry: ary})
            }
        };
        const tabs = [
            {name: '全部', key: 'ALL'},
            {name: '待收货', key: 'WAIT_AGENT_VERIFY'},
            {name: '待付款', key: 'WAIT_PAY'},
            {name: '已完成', key: 'COMPLETED'},
            {name: '已退款', key: 'REFUNDED'},
            {name: '商品异常', key: 'GOODS_UNQUALIFIED_WAIT_PROCESS'},
            {name: '处理中', key: 'GOODS_UNQUALIFIED_WAIT_VERIFY'},
        ];
        const strategy = [
            {key: 'USER_ORDER_CUSTOMIZE', value: '自定义显示项',},
            {key: 'USER_ORDER_PRODUCT', value: '商品维度',},
            {key: 'USER_ORDER_SHOP', value: '店铺维度',},
            {key: 'USER_ORDER_4', value: '用户维度',},
            {key: 'USER_ORDER_5', value: '物流订单模板',},
        ];
        const exportProps = {
            visible: this.state.exportVisible,
            onCancel: this.hideExport,
            export: this.export,
            strategy,
            values: consumer_order_values_export,
            conditions: this.state.conditions,
            isToday: this.state.isToday,
            exportToday: this.exportToday,
            slug: 'order_'
        };
        // 商品维度
        const positionProps = {
            visible: this.state.positionVisible,
            onCancel: this.hidePosition,
            submit: this.dimensionOrder,
            type: 'deliveryOrders',
            deliveryDateShow: true,
            deliveryTimeShow: true
        };
        // 店铺维度
        const shopPositionProps = {
            visible: this.state.shopVisible,
            onCancel: this.shopHidePosition,
            submit: this.shopOrder,
            type: 'deliveryOrders',
            deliveryDateShow: true,
            deliveryTimeShow: true
        };
        // 物流维度
        const logisticsPositionProps = {
            visible: this.state.logisticsVisible,
            onCancel: this.logisticshidePosition,
            submit: this.logisticsOrder,
            type: 'deliveryOrders',
            deliveryDateShow: true,
            deliveryTimeShow: true
        };
        return (
            <div className="order">
                <SelectPosition {...positionProps} />
                <ShopSelectPosition {...shopPositionProps} />
                <LogisticsSelectPosition {...logisticsPositionProps} />
                <Export {...exportProps} />
                {/* <CheckOrder {...checkOrderProps} /> */}
                <AdvancedFilterComponent
                    visible={this.state.filterVisible}
                    onCancel={this.closeHigherFilter}
                    onSubmit={this.onSubmit}
                    refresh={this.refresh}
                    export={this.showExport}
                    data={consumer_order_values}
                />

                <ReviewGoods
                    visible={this.state.reviewGoodsVisible}
                    onCancel={this.closeReviewGoods}
                    items={this.state.items}
                />

                <div className="s_body">
                    <div className="headerLeft">
                        <SearchInput
                            getDatas={this.search}
                            text='请输入店铺名称/店铺编号/店铺主姓名/店铺主注册手机号'
                        />
                        <h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
                        {
                            window.hasPermission("order_management_bind_template") && <Button
                                size="small"
                                type='primary'
                                onClick={this.setMessage}
                            >设置默认模板消息</Button>
                        }
                        <Button
                            size="small"
                            onClick={this.conditionSelector}
                        >批量导出商品维度订单</Button>
                        <Button
                            size="small"
                            onClick={this.shopSelector}
                        >批量导出店铺维度订单</Button>
                        <Button
                            size="small"
                            onClick={this.logisticsSelector}
                        >批量导出物流订单</Button>
                    </div>
                </div>
                <div className="tabs">
                    <ul className="left">
                        {
                            tabs.map((item, index) => {
                                return <li
                                    key={index}
                                    className={this.state.activeTab == item.key ? 'active' : ''}
                                    onClick={() => this.onChangeTab(item)}
                                >{item.name}</li>
                            })
                        }
                    </ul>
                    {
                        this.state.data.length ? <div className="right">
                            <Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
                            <div style={{'display': this.state.customVisible ? 'block' : 'none'}} className="custom"
                                 onClick={this.showCustom}>
                                <CustomItem
                                    data={consumer_order_values_custom}
                                    handleCustom={this.handleCustom}
                                    targetKeys={orderInputTransformer(this.state.defaultItem)}
                                    firstItem={'trade_no'}
                                />
                            </div>
                        </div> : ''
                    }

                </div>
                <div className="chart u_chart">
                    <Table
                        rowSelection={rowSelection}
                        columns={this.state.activeTab === 'WAIT_CUSTOMER_VERIFY' || this.state.activeTab === 'WAIT_CUSTOMER_VERIFY_HOME' ? this.state.sColumns : this.state.columns}
                        rowKey={record => record.id}
                        pagination={false}
                        rowClassName={(record, index) => {
                            let className = '';
                            if (index % 2) className = 'dark-row';
                            return className;
                        }}
                        dataSource={this.state.data}
                    />
                </div>
                <div className="pagination">
                    <CustomPagination
                        api={this.state.api}
                        text="条订单"
                        ref={this.child}
                        params={this.state.paginationParams}
                        id={this.state.id}
                        current={this.state.current}
                        valChange={this.paginationChange}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(BreakfastCartOrder)

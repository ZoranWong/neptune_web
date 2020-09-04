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
import {userOrder, batchCancel, checkOrders, checkOrder, checkManyOrder} from "../../../api/order/orderManage";
import {consumer_order_values} from "../../../utils/consumer_order_fields";
import {consumer_order_values_export} from "../../../utils/consumer_order_fields_export";
import {consumer_order_values_custom} from "../../../utils/consumer_order_fields_custom_item";
import {getBeforeDate} from "../../../utils/dataStorage";
import ChangeOrderStatus from "./Modal/ChangeOrderStatus";
import Export from "../Components/Export";
import Config from '../../../config/app'
import _ from "lodash";
import CheckOrder from "./Modal/CheckOrder";
import SelectPosition from "./Modal/SelectPosition";

class Order extends React.Component {
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
                    if (record.items.data.length) {
                        return <span style={{'color': '#4F9863', 'cursor': 'pointer', 'display': 'flex'}}
                                     className="i_span">
							<span className="orderGoods">{record.items.data[0].name + '......'}</span>
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
                title: '用户昵称',
                dataIndex: 'user_nickname',
            },
            {
                title: '配送类型',
                dataIndex: 'delivery_type',
            },
            {
                title: '支付时间',
                dataIndex: 'paid_at',
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
                dataIndex: 'category_desc',
                render: (text, record) => {
                    if (record.items.data.length) {
                        return <span style={{'color': '#4F9863', 'cursor': 'pointer', 'display': 'flex'}}
                                     className="i_span">
							<span className="orderGoods">{record.items.data[0].name + '......'}</span>
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
                title: '用户昵称',
                dataIndex: 'user_nickname',
            },
            {
                title: '配送类型',
                dataIndex: 'delivery_type',
            },
            {
                title: '支付时间',
                dataIndex: 'paid_at',
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
                render: (text, record) => (<span style={{color: '#4f9863', cursor: 'pointer'}}
                                                 onClick={() => this.checkOrder(record)}>手动核销</span>)
            }
        ];
        const defaultItem = ['user_nickname', 'trade_no', 'products', 'settlement_total_fee', 'delivery_type', 'created_at', 'state_desc'];
        super(props);
        this.child = React.createRef();
        this.state = {
            api: userOrder,
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
            changeOrderStatusVisible: false,
            positionVisible: false,
            position: null,
            orderTypes: null,
            deliveryDate: null,
            deliveryTime: null,
            exportTable: false
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
            api: userOrder,
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
            api: userOrder,
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
        if (item.key === 'WAIT_CUSTOMER_VERIFY_HOME') {
            this.setState({
                api: userOrder,
                activeTab: item.key,
                paginationParams: {
                    ...this.state.paginationParams,
                    searchJson: searchJson({delivery_type: 'HOME_DELIVERY', state_constant: 'WAIT_CUSTOMER_VERIFY'})
                }
            }, () => {
                this.child.current.pagination(this.child.current.state.current);
            });
            return
        }
        if (item.key === 'WAIT_CUSTOMER_VERIFY') {
            this.setState({
                api: userOrder,
                activeTab: item.key,
                paginationParams: {
                    ...this.state.paginationParams,
                    searchJson: searchJson({delivery_type: 'SELF_PICK', state_constant: 'WAIT_CUSTOMER_VERIFY'})
                }
            }, () => {
                this.child.current.pagination(this.child.current.state.current);
            });
            return
        }
        this.setState({activeTab: item.key});
        this.refresh(item.key)
    };

    // 取消订单 / 确认订单
    confirmPopover = (fn, keyWord) => {
        let refresh = this.refresh;
        let self = this;
        let checkedAry = this.state.checkedAry;
        let confirmModal = Modal.confirm({
            title: (
                <div className='u_confirm_header'>
                    提示
                    <i className="iconfont" style={{'cursor': 'pointer'}} onClick={() => {
                        confirmModal.destroy()
                    }}>&#xe82a;</i>
                </div>
            ),
            icon: null,
            width: '280px',
            closable: true,
            centered: true,
            maskClosable: true,
            content: (
                <div className="U_confirm">
                    确定{keyWord}该订单么？
                </div>
            ),
            cancelText: '取消',
            okText: '确定',
            okButtonProps: {
                size: 'small'
            },
            cancelButtonProps: {
                size: 'small'
            },
            onOk() {
                fn({order_ids: checkedAry}).then(r => {
                    message.success(`${keyWord}订单成功！`);
                    self.setState({checkedAry: []});
                    refresh('WAIT_PLATFORM_VERIFY')
                });

            },
            onCancel() {

            },
        });
    };

    // 选择核销破损商品
    showCheckinNormal = (record) => {
        this.setState({checkVisible: true, problemOrder: record})
    };
    hideCheckNormal = () => {
        this.setState({checkVisible: false})
    };
    checkInNormalOrder = (id, items, boolean) => {
        checkOrder({
            is_exception: boolean,
            items
        }, id).then(r => {
            message.success(`手动核销订单成功！`);
            this.hideCheckNormal();
            this.refresh('WAIT_CUSTOMER_VERIFY')
        });
    };

    // check
    checkOrder = (record) => {
        let refresh = this.refresh;
        let showCheckinNormal = this.showCheckinNormal;
        let confirmModal = Modal.confirm({
            title: (
                <div className='u_confirm_header'>
                    提示
                    <i className="iconfont" style={{'cursor': 'pointer'}} onClick={() => {
                        confirmModal.destroy()
                    }}>&#xe82a;</i>
                </div>
            ),
            icon: null,
            width: '280px',
            closable: true,
            centered: true,
            maskClosable: true,
            content: (
                <div className="U_confirm">
                    确定手动核销该订单么？
                </div>
            ),
            cancelText: '商品异常',
            okText: '直接核销',
            okButtonProps: {
                size: 'small'
            },
            cancelButtonProps: {
                size: 'small'
            },
            onOk() {
                checkOrder({is_exception: false}, record.id).then(r => {
                    message.success(`手动核销订单成功！`);
                    refresh('WAIT_CUSTOMER_VERIFY')
                });

            },
            onCancel() {
                showCheckinNormal(record)
            },
        });
    }

    // 商品回显
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

    // 打印订单
    print = () => {
        let {checkedAry, data} = this.state;
        let orders = [];
        _.map((data), (order) => {
            if (_.indexOf(checkedAry, order.id) > -1) {
                orders.push(order)
            }
        });
        this.props.history.push({pathname: "/printSheet", state: {orders, title: '顾客订单'}})
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
            api: userOrder,
            paginationParams: {
                ...this.state.paginationParams, searchJson: searchJson({logic_conditions: this.conditions(orderTypes)})
            }
        }, () => {
            this.child.current.pagination(this.child.current.state.current)
        });
    };


    // 选择地点
    conditionSelector = (exportTable = false, orderTypes = null) => {
        return () => {
            this.setState({positionVisible: true, orderTypes: orderTypes, exportTable: exportTable})
        }
    };
    hidePosition = () => {
        this.setState({positionVisible: false})
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
        console.log(this.state.orderTypes);
        let json = searchJson({
            strategy: type,
            customize_columns: items,
            logic_conditions: this.conditions(this.state.orderTypes)
        });
        window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
    };

    // 核实订单
    changeOrderStatus = () => {
        this.setState({changeOrderStatusVisible: true})
    };
    //提交
    submitChangeOrderStatus = (formatOrder) => {
        console.log(formatOrder, '|||');
        checkOrders({orders: formatOrder}).then(r => {
            message.success(r.data.message);
            this.hideChangeOrderStatus();
            this.refresh()
        })
    };

    hideChangeOrderStatus = () => {
        this.setState({changeOrderStatusVisible: false})
    };

    // 批量核销订单
    checkManyOrders = () => {
        let self = this;
        let checkedAry = this.state.checkedAry;
        let tab = this.state.activeTab;
        let confirmModal = Modal.confirm({
            title: (
                <div className='u_confirm_header'>
                    提示
                    <i className="iconfont" style={{'cursor': 'pointer'}} onClick={() => {
                        confirmModal.destroy()
                    }}>&#xe82a;</i>
                </div>
            ),
            icon: null,
            width: '280px',
            closable: true,
            centered: true,
            maskClosable: true,
            content: (
                <div className="U_confirm">
                    确定批量核销该订单么？
                </div>
            ),
            cancelText: '取消',
            okText: '确定',
            okButtonProps: {
                size: 'small'
            },
            cancelButtonProps: {
                size: 'small'
            },
            onOk() {
                checkManyOrder({order_ids: checkedAry}).then(r => {
                    message.success(`批量核销订单成功！`);
                    self.setState({
                        api: userOrder,
                        activeTab: tab,
                        paginationParams: {
                            ...self.state.paginationParams,
                            searchJson: searchJson({delivery_type: 'SELF_PICK', state_constant: 'WAIT_CUSTOMER_VERIFY'})
                        }
                    }, () => {
                        self.child.current.pagination(1);
                    });
                });

            },
            onCancel() {
            },
        });
    };


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
            {name: '待收货(自提单)', key: 'WAIT_AGENT_VERIFY'},
            {name: '待自提', key: 'WAIT_CUSTOMER_VERIFY'},
            {name: '已完成', key: 'COMPLETED'},
            {name: '已退款', key: 'REFUNDED'},
            {name: '已取消', key: 'CANCELED'},
            {name: '订单异常', key: 'EXCEPTION'},
            {name: '申请售后', key: 'AFTER_SALE'},
            {name: '拒绝退款', key: 'REFUSE_REFUND'},
            {name: '待收货(配送单)', key: 'WAIT_CUSTOMER_VERIFY_HOME'},
            {name: '待成团', key: 'WAIT_FORM_GROUP'},
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


        const checkOrderProps = {
            visible: this.state.checkVisible,
            onCancel: this.hideCheckNormal,
            refresh: () => this.refresh('WAIT_CUSTOMER_VERIFY'),
            onSubmit: this.checkInNormalOrder,
            problemOrder: this.state.problemOrder
        };

        const changeOrderStatus = {
            visible: this.state.changeOrderStatusVisible,
            onCancel: this.hideChangeOrderStatus,
            onSubmit: this.submitChangeOrderStatus,
        };

        const positionProps = {
            visible: this.state.positionVisible,
            onCancel: this.hidePosition,
            submit: this.submitCondition,
            type: 'deliveryOrders',
            deliveryDateShow: true,
            deliveryTimeShow: true
        };

        return (
            <div className="order">
                <SelectPosition {...positionProps} />
                <Export {...exportProps} />
                <CheckOrder {...checkOrderProps} />
                <ChangeOrderStatus {...changeOrderStatus} />
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
                            text='请输入姓名或手机号'
                        />
                        <h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
                        {
                            window.hasPermission("order_management_bind_template") && <Button
                                size="small"
                                type='primary'
                                onClick={this.setMessage}
                            >设置默认模板消息</Button>
                        }
                        {
                            window.hasPermission("order_management_printing") && <Button
                                size="small"
                                onClick={this.print}
                                disabled={!this.state.checkedAry.length}
                            >打印订单</Button>
                        }
                        <Button
                            size="small"
                            onClick={this.conditionSelector(false)}
                        >批量查看自提单</Button>
                        <Button
                            size="small"
                            onClick={this.conditionSelector(true)}
                        >批量导出自提单</Button>
                        <Button
                            size="small"
                            onClick={this.conditionSelector(false, ['SELF_PICK'])}
                        >批量查看配送单</Button>
                        <Button
                            size="small"
                            onClick={this.conditionSelector(true, ['SELF_PICK'])}
                        >批量导出配送单</Button>
                        <Button
                            size="small"
                            onClick={this.changeOrderStatus}
                        >核实订单</Button>

                        {/*{*/}
                        {/*	window.hasPermission("order_management_platform_cancel") &&<Button*/}
                        {/*		size="small"*/}
                        {/*		disabled={this.state.checkedAry.length == 0}*/}
                        {/*		onClick={()=>this.confirmPopover(batchCancel,'取消')}*/}
                        {/*	>取消订单</Button>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*	window.hasPermission("order_management_platform_verify") &&<Button*/}
                        {/*		size="small"*/}
                        {/*		disabled={this.state.checkedAry.length == 0}*/}
                        {/*		onClick={()=>this.confirmPopover(batchConfirm,'确认')}*/}
                        {/*	>确认订单</Button>*/}
                        {/*}*/}

                    </div>
                </div>
                <div className="s_body" style={{marginTop: '20px'}}>
                    <div className="headerLeft">
                        <Button
                            size="small"
                            onClick={this.checkManyOrders}
                            disabled={!this.state.checkedAry.length || (this.state.activeTab !== 'WAIT_CUSTOMER_VERIFY' && this.state.activeTab !== 'WAIT_CUSTOMER_VERIFY_HOME')}
                        >批量核销订单</Button>
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

export default withRouter(Order)

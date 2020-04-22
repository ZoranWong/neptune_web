import React, {Component} from 'react';
import {Button, Table} from "antd";
import {groupsList} from "../../../../api/activities/groupon";
import {orderInputTransformer, orderOutputTransformer, searchJson} from "../../../../utils/dataStorage";
import {summaryOrders} from "../../../../api/order/orderManage";
import {summary_order_values} from "../../../../utils/summary_order_fields";
import IconFont from "../../../../utils/IconFont";
import AdvancedFilterComponent from "../../../Order/Components/AdvancedFilterComponent";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import CustomItem from "../../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../../components/Layout/Pagination";
import './css/list.sass'
class GrouponList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: groupsList,
            data:[],
            filterVisible: false,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson: searchJson({date: ''})
            },
            activeTab:''
        };
        this.columns = [
            {
                title: '拼团名称',
                dataIndex: 'shop_name'
            },
            {
                title: '持续时间',
                dataIndex: 'shop1223_name'
            },
            {
                title: '参与商品',
                dataIndex: 'sh12op_name'
            },
            {
                title: '成团限制',
                dataIndex: 's1hop_name'
            },
            {
                title: '截单时间',
                dataIndex: 'sh2op_name'
            },
            {
                title: '配送时间',
                dataIndex: 'sho1p_name'
            },
            {
                title: '打折',
                dataIndex: 'shop2_name'
            },
            {
                title: '红包',
                dataIndex: 'sho1p_name'
            },
            {
                title: '分享文案',
                dataIndex: 'sho2p_name'
            },
            {
                title: '操作',
                dataIndex: 'shop_1name'
            },

        ];
        this.child = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('click', this.closeCustom);
    }

    refresh = ()=>{
        this.setState({
            filterVisible:false,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson:searchJson({state_constant:''})
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
            api:summaryOrders,
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
        this.setState({api:summaryOrders,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
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
        console.log(list);
        this.setState({data:list})
    };

    // 切换tab
    onChangeTab = item =>{
        this.setState({activeTab:item.key});
        this.refresh(item.key)
    };

    render() {
        const tabs = [
            {name:'全部',key:'BACKEND_ALL'},
            {name:'待收货',key:'BACKEND_WAIT_AGENT_VERIFY'},
            {name:'正常完成收货',key:'BACKEND_SUCCESS_COMPLETED'},
            {name:'异常完成收货',key:'BACKEND_UNQUALIFIED_COMPLETED'}
        ];
        return (
            <div className='grouponList'>
                <AdvancedFilterComponent
                    visible={this.state.filterVisible}
                    onCancel={this.closeHigherFilter}
                    onSubmit={this.onSubmit}
                    refresh={this.refresh}
                    data={summary_order_values}
                />

                <div className="s_body_box">
                    <div className="headerLeft">
                        <SearchInput
                            getDatas={this.search}
                            text='请输入姓名或手机号'
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
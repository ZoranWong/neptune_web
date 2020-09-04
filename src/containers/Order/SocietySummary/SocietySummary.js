import React from "react";
import {Button,Input,Table,Modal} from "antd";
import '../../../assets/css/public.less';
import {searchOrderSummaryList} from "../../../api/order/society";
import {setVirtualSales} from "../../../api/goods/goods";
import {summary_order_values} from "../../../utils/summary_order_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import {summaryOrders} from "../../../api/order/orderManage";
import {getToken, searchJson} from "../../../utils/dataStorage";
import IconFont from "../../../utils/IconFont";
import Export from "../Components/Export";
import Config from "../../../config/app";
const { Search } = Input;
export default class SocietySummary extends React.Component{
    constructor(props){
        super(props);
        this.child = React.createRef();
        this.state = {
            api:summaryOrders,
            tableData:[],
            shopList:[],
            checkedAry:[],
            searchValue:"",
            filterVisible:false,
            exportVisible: false,
            visible:false,
            btnSign:"1",
            stateConstant:"",
            paginationParams:{logic_conditions:[], search:'', searchJson: searchJson({date: null})},
            conditions: {},
            pageHelper:{current:1, pageSize:10, total:0}
        };
    }
    searchFoodSummary = (sign,value) =>{
        this.setState({btnSign:sign})
        this.setState({stateConstant:value},()=>this.orderSummaryList())
    };
    onChangePage = (e) =>{
        this.state.pageHelper.current=e.current;
        this.orderSummaryList();
    };
    searchShopName = (value) =>{
        this.setState({searchValue:value},()=>this.orderSummaryList())
    }
    componentDidMount() {
        this.orderSummaryList();
    };
    orderSummaryList = () =>{
        let data={
            limit:this.state.pageHelper.pageSize,
            page:this.state.pageHelper.current
        }
        if(this.state.searchValue){
            data['searchJson[search]']=this.state.searchValue;
        }
        if(this.state.stateConstant){
            data['searchJson[state_constant]']=this.state.stateConstant;
        }
        searchOrderSummaryList(data).then(r=>{
            this.state.pageHelper.total=r.meta.pagination.total;
            this.setState({tableData:r.data});
        })
    };
    //高级筛选
    higherFilter = () =>{
        this.setState({filterVisible:true})
    };
    closeHigherFilter = () =>{
        this.setState({filterVisible:false})
    };
    refresh = (status='BACKEND_ALL')=>{
        this.setState({
            filterVisible:false,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson:searchJson({state_constant:status})
            }
        },()=>{
            this.state.pageHelper.current=1;
            this.orderSummaryList();
        })
    };
    // 导出
    showExport = (conditions) =>{
        this.setState({conditions, exportVisible: true}, ()=>{
            this.closeHigherFilter()
        })
    };
    onSubmit = (data) =>{
        this.setState({api:summaryOrders,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
            this.state.pageHelper.current=1;
            this.orderSummaryList();
        });
    };
    hideExport = () =>{
        this.setState({exportVisible: false})
    };

    // 确定导出
    sureExport = (type, items, conditions) =>{
        let json = searchJson({
            strategy: type,
            summary_order_id: this.state.checkedAry[0],
            customize_columns: items,
            logic_conditions: conditions
        });
        window.open(`${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`,'target','');
    };
    reviewGoods = (items) =>{
        for (let i = 0; i <items.length; i++) {
            let spec_value=items[i]['product_spec_value'];
            if(spec_value){
                let result=[];
                for (let key in spec_value){
                    result.push(key)
                    result.push(spec_value[key])
                }
                console.log("规格转换结果"+result.toString());
                items[i]['specValue']=result.toString();
            }
        }
        this.setState({shopList:items},()=>this.showModal())
    };
    showModal =()=>{
        this.setState({visible:true})
    }
    handleCancel = () =>{
        this.setState({visible:false})
    }
    render() {
        const strategy = [
            {key: 'SHOP_SELF_PICK_SUMMARY', value: '自提汇总单',},
            {key: 'SHOP_SELF_PICK_SUMMARY_2', value: '自提汇总单婉秋定制版',}
        ];
        const exportProps = {
            visible : this.state.exportVisible,
            onCancel : this.hideExport,
            export: this.sureExport,
            strategy,
            values: summary_order_values,
            conditions: this.state.conditions,
            slug: 'order_'
        };
        const columns = [
            {
                title: '收货门店',
                dataIndex: 'shop_name',
                ellipsis: true
            },
            {
                title: '商品',
                ellipsis: true,
                render: (text,record) => {
                    if(record.items.length){
                        return <span style={{'color':'#4F9863'}}>
							<span className="orderGoods">{record.items[0].product_name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items)} />
						</span>
                    } else {
                        return <span>无</span>
                    }
                }
            },
            {
                title: '缺少商品',
                ellipsis: true,
                render: (text,record) => {
                    if(record.deficient_items.length>0){
                        return <span style={{'color':'#4F9863'}}>
							<span className="orderGoods">{record.deficient_items[0].product_name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.deficient_items)} />
						</span>
                    } else {
                        return <span>无</span>
                    }
                },
            },
            {
                title: '破损商品',
                ellipsis: true,
                render: (text,record) => {
                    if(record.damaged_items.length>0){
                        return <span style={{'color':'#4F9863'}}>
							<span className="orderGoods">{record.damaged_items[0].product_name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items)} />
						</span>
                    } else {
                        return <span>无</span>
                    }
                },
            },
            {
                title: '配送日期',
                dataIndex: 'delivery_date',
                ellipsis: true
            },
            {
                title: '状态',
                dataIndex: 'state_desc',
                ellipsis: true
            }
        ]
        return(
            <div className="society-food-summary">
                <Export {...exportProps} />
                <div className="search-condition">
                    <Search placeholder="请输入门店名称或店主手机号" enterButton="搜索" onSearch={this.searchShopName}/>
                    <div className="higherFilter" onClick={this.higherFilter}>高级筛选</div>
                </div>
                <div className="search-condition search-btn">
                    <Button className={this.state.btnSign == '1'?"selected-btn":""} onClick={()=>this.searchFoodSummary("1","")}>全部</Button>
                    <Button className={this.state.btnSign == '2'?"selected-btn":""} onClick={()=>this.searchFoodSummary("2","WAIT_AGENT_VERIFY")}>待收货</Button>
                    <Button className={this.state.btnSign == '3'?"selected-btn":""} onClick={()=>this.searchFoodSummary("3","COMPLETED_SUCCESS")}>正常完成收货</Button>
                    <Button className={this.state.btnSign == '4'?"selected-btn":""} onClick={()=>this.searchFoodSummary("4","COMPLETED_UNQUALIFIED")}>异常完成收货</Button>
                    <Button className={this.state.btnSign == '5'?"selected-btn":""} onClick={()=>this.searchFoodSummary("5","REFUNDED")}>已退款</Button>
                    <Button className={this.state.btnSign == '6'?"selected-btn":""} onClick={()=>this.searchFoodSummary("6","REFUSE_REFUND")} style={{borderRight:"1px solid #D9D9D9"}}>未退款</Button>
                </div>
                <Table onChange={this.onChangePage} rowKey={record => record.id} className="table-layout-style" dataSource={this.state.tableData} columns={columns} pagination={this.state.pageHelper}/>
                <AdvancedFilterComponent visible={this.state.filterVisible} onCancel={this.closeHigherFilter} refresh={this.refresh} onSubmit={this.onSubmit} data={summary_order_values} export={this.showExport}/>
                <Modal title="商品" visible={this.state.visible} onCancel={this.handleCancel} footer={null}>
                    <ul className="reviews">
                        {
                            (this.state.shopList&&this.state.shopList.length)&&this.state.shopList.map((item,index)=>(
                                <li key={index}>
                                    <img src={item.thumbnail} alt="" className="left"/>
                                    <div className="right">
                                        <span>商品名:{item.product_name}</span>
                                        <span>规格:{item.specValue || '无'}</span>
                                        <span>数量:{item.quantity}</span>
                                        <span>零售价:{item.retail_price + '元'}</span>
                                        <span>备注:{item.remark || '无'}</span>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </Modal>
            </div>
        )
    }
}

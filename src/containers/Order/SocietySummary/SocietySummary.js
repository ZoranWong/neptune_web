import React from "react";
import {Button,Input,Table,Modal} from "antd";
import '../../../assets/css/public.less';
import {searchOrderSummaryList} from "../../../api/order/society";
import {setVirtualSales} from "../../../api/goods/goods";
import {summary_order_values} from "../../../utils/summary_order_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import {summaryOrders} from "../../../api/order/orderManage";
import {searchJson} from "../../../utils/dataStorage";
import IconFont from "../../../utils/IconFont";
const { Search } = Input;
export default class SocietySummary extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData:[],
            shopList:[],
            searchValue:"",
            filterVisible:false,
            visible:false,
            btnSign:"1",
            stateConstant:"BACKEND_ALL",
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
        let param={}
        if(this.state.searchValue){
            param["search"]=this.state.searchValue;
        }
        if(this.state.stateConstant){
            param["state_constant"]=this.state.stateConstant;
        }
        let data={
            limit:this.state.pageHelper.pageSize,
            page:this.state.pageHelper.current
        }
        if(param["search"] || param["state_constant"]){
            data["searchJson"]=searchJson({param});
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
    // 导出
    showExport = (conditions) =>{
        this.setState({conditions, exportVisible: true}, ()=>{
            this.closeHigherFilter()
        })
    };
    onSubmit = (data) =>{
        this.setState({api:summaryOrders,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
            this.child.current.pagination(this.child.current.state.current)
        });
    };
    reviewGoods = (items) =>{
        console.log("当前值:"+JSON.stringify(items));
        this.setState({shopList:items},()=>this.showModal())
    };
    showModal =()=>{
        this.setState({visible:true})
    }
    render() {
        const columns = [
            {
                title: '收货门店',
                dataIndex: 'shop_name',
                ellipsis: true
            },
            {
                title: '商品',
                dataIndex: 'shop_name',
                ellipsis: true
            },
            {
                title: '缺少商品',
                dataIndex: 'retail_price',
                ellipsis: true,
                render: (text,record) => {
                    if(record.deficient_items.length>0){
                        return <span style={{'color':'#4F9863'}}>
							<span className="orderGoods">{record.deficient_items.data[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.deficient_items)} />
						</span>
                    } else {
                        return <span>无</span>
                    }
                },
            },
            {
                title: '破损商品',
                dataIndex: 'retail_price',
                ellipsis: true,
                render: (text,record) => {
                    if(record.damaged_items.length>0){
                        return <span style={{'color':'#4F9863'}}>
							<span className="orderGoods">{record.damaged_items.data[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items)} />
						</span>
                    } else {
                        return <span>无</span>
                    }
                },
            },
            {
                title: '配送日期',
                dataIndex: 'summary_date',
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
                <div className="search-condition">
                    <Search placeholder="请输入门店名称或店主手机号" enterButton="搜索" onSearch={this.searchShopName}/>
                    <div className="higherFilter" onClick={this.higherFilter}>高级筛选</div>
                </div>
                <div className="search-condition search-btn">
                    <Button className={this.state.btnSign == '1'?"selected-btn":""} onClick={()=>this.searchFoodSummary("1","BACKEND_ALL")}>全部</Button>
                    <Button className={this.state.btnSign == '2'?"selected-btn":""} onClick={()=>this.searchFoodSummary("2","BACKEND_WAIT_AGENT_VERIFY")}>待收货</Button>
                    <Button className={this.state.btnSign == '3'?"selected-btn":""} onClick={()=>this.searchFoodSummary("3","BACKEND_SUCCESS_COMPLETED")}>正常完成收货</Button>
                    <Button className={this.state.btnSign == '4'?"selected-btn":""} onClick={()=>this.searchFoodSummary("4","BACKEND_UNQUALIFIED_COMPLETED")}>异常完成收货</Button>
                    <Button className={this.state.btnSign == '5'?"selected-btn":""} onClick={()=>this.searchFoodSummary("5","REFUNDED")}>已退款</Button>
                    <Button className={this.state.btnSign == '6'?"selected-btn":""} onClick={()=>this.searchFoodSummary("6")} style={{borderRight:"1px solid #D9D9D9"}}>未退款</Button>
                </div>
                <Table onChange={this.onChangePage} className="table-layout-style" dataSource={this.state.tableData} columns={columns} pagination={this.state.pageHelper}/>
                <AdvancedFilterComponent visible={this.state.filterVisible} onCancel={this.closeHigherFilter} onSubmit={this.onSubmit} data={summary_order_values} export={this.showExport}/>
                <Modal title="商品" visible={this.state.visible} onCancel={this.handleCancel} footer={null}>
                    <ul className="reviews">
                        {
                            (this.state.shopList&&this.state.shopList.length)&&this.state.shopList.map((item,index)=>(
                                <li key={index}>
                                    <img src={item.thumbnail} alt="" className="left"/>
                                    <div className="right">
                                        <span>商品名:{item.name}</span>
                                        <span>规格:{item.spec_value || '无'}</span>
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

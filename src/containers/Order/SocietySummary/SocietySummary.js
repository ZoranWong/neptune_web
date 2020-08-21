import React from "react";
import {Button,Input,Table,Modal} from "antd";
import '../../../assets/css/public.less';
import {setVirtualSales} from "../../../api/goods/goods";
import {summary_order_values} from "../../../utils/summary_order_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import {summaryOrders} from "../../../api/order/orderManage";
import {searchJson} from "../../../utils/dataStorage";
const { Search } = Input;
export default class SocietySummary extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData:[
                {name:"十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"}
            ],
            filterVisible:false,
            btnSign:"1",
            conditions: {}
        };
    }
    searchShopName = (value) =>{
        console.log(value)
    }
    //高级筛选
    higherFilter = () =>{
        this.setState({filterVisible:true})
    };
    closeHigherFilter = () =>{
        this.setState({filterVisible:false})
    };
    searchFoodSummary = (sign) =>{
        this.setState({btnSign:sign})
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
    render() {
        const columns = [
            {
                title: '收货门店',
                dataIndex: 'name',
                ellipsis: true
            },
            {
                title: '商品',
                dataIndex: 'name',
                ellipsis: true
            },
            {
                title: '缺少商品',
                dataIndex: 'retail_price',
                ellipsis: true
            },
            {
                title: '破损商品',
                dataIndex: 'retail_price',
                ellipsis: true
            },
            {
                title: '配送日期',
                dataIndex: 'stock',
                ellipsis: true
            },
            {
                title: '状态',
                dataIndex: 'status',
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
                    <Button className={this.state.btnSign == '1'?"selected-btn":""} onClick={()=>this.searchFoodSummary("1")}>全部</Button>
                    <Button className={this.state.btnSign == '2'?"selected-btn":""} onClick={()=>this.searchFoodSummary("2")}>待收货</Button>
                    <Button className={this.state.btnSign == '3'?"selected-btn":""} onClick={()=>this.searchFoodSummary("3")}>正常完成收货</Button>
                    <Button className={this.state.btnSign == '4'?"selected-btn":""} onClick={()=>this.searchFoodSummary("4")}>异常完成收货</Button>
                    <Button className={this.state.btnSign == '5'?"selected-btn":""} onClick={()=>this.searchFoodSummary("5")}>已退款</Button>
                    <Button className={this.state.btnSign == '6'?"selected-btn":""} onClick={()=>this.searchFoodSummary("6")} style={{borderRight:"1px solid #D9D9D9"}}>未退款</Button>
                </div>
                <Table className="table-layout-style" dataSource={this.state.tableData} columns={columns}/>
                <AdvancedFilterComponent visible={this.state.filterVisible} onCancel={this.closeHigherFilter} onSubmit={this.onSubmit} data={summary_order_values} export={this.showExport}/>
            </div>
        )
    }
}

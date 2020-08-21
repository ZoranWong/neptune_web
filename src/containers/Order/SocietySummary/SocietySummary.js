import React from "react";
import {Button,Input,Table,Modal} from "antd";
import '../../../assets/css/public.less';
import {setVirtualSales} from "../../../api/goods/goods";
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
            ]
        };
    }
    searchShopName = (value) =>{
        console.log(value)
    }
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
                </div>
                <Table className="table-layout-style" dataSource={this.state.tableData} columns={columns}/>
            </div>
        )
    }
}

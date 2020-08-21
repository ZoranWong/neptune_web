import React from "react";
import {Button,Input,Table,Modal} from "antd";
import '../../../assets/css/public.less';
import {setVirtualSales} from "../../../api/goods/goods";
const { Search } = Input;
export default class SocietyFood extends React.Component{
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
                title: '订单号',
                dataIndex: 'name',
                ellipsis: true
            },
            {
                title: '商品',
                dataIndex: 'name',
                ellipsis: true
            },
            {
                title: '实付款',
                dataIndex: 'retail_price',
                ellipsis: true
            },
            {
                title: '用户昵称',
                dataIndex: 'retail_price',
                ellipsis: true
            },
            {
                title: '订单性质',
                dataIndex: 'stock',
                ellipsis: true
            },
            {
                title: '配送类型',
                dataIndex: 'status',
                ellipsis: true
            },
            {
                title: '支付时间',
                dataIndex: 'status',
                ellipsis: true
            },
            {
                title: '订单状态',
                dataIndex: 'status',
                ellipsis: true
            }
        ]
        return(
            <div className="society-food">
                <div className="search-condition">
                    <Search placeholder="请输入门店名称或店主手机号" enterButton="搜索" onSearch={this.searchShopName}/>
                </div>
                <Table className="table-layout-style" dataSource={this.state.tableData} columns={columns}/>
            </div>
        )
    }
}

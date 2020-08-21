import React from "react";
import {Button,Input,Table,InputNumber} from "antd";
import '../../../assets/css/public.less';
import {setVirtualSales} from "../../../api/goods/goods";
const { Search } = Input;
export default class Hypermarket extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData:[{name:"十全大补丸十全大补丸十全大补丸十全大补丸"},{name:"乌鸡白凤丸",monthly_distribute_amount:222,virtual_sales:1111},{name:"红枣放归堂"},
                {name:"十全大补丸十全大补丸十全大补丸十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸十全大补丸十全大补丸十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸十全大补丸十全大补丸十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸十全大补丸十全大补丸十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"}],
            checkedAry:[]
        };
    }
    searchShopName = (value) =>{
        console.log(value)
    }
    setVirtualSalesValue = (text,record) =>{
        console.log("虚拟销量:"+text)
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({checkedAry:selectedRowKeys})
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            })
        };
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                ellipsis: true
            },
            {
                title: '规格',
                dataIndex: 'channel',
                ellipsis: true
            },
            {
                title: '零售价',
                dataIndex: 'keeper_name',
                ellipsis: true
            },
            {
                title: '实际销量',
                dataIndex: 'created_at',
                ellipsis: true,
                render:(text, record) => {
                    if(text){
                        return <span>{text}</span>
                    }else {
                        return <span>0</span>
                    }
                }
            },
            {
                title: '门店预定量',
                dataIndex: 'total_distribute_amount',
                ellipsis: true,
                render:(text, record) => {
                    if(text){
                        return <span>{text}</span>
                    }else {
                        return <span>0</span>
                    }
                }
            },
            {
                title: '消费者预定量',
                dataIndex: 'monthly_distribute_amount',
                ellipsis: true,
                render:(text, record) => {
                    if(text){
                        return <span>{text}</span>
                    }else {
                        return <span>0</span>
                    }
                }
            },
            {
                title: '虚拟销量',
                dataIndex: 'virtual_sales',
                render:(text, record) => {
                    if(text){
                        return <InputNumber min={0} className="table-input" defaultValue={text} onBlur={(e)=>this.setVirtualSalesValue(e.target.value,record)}/>
                    }else {
                        return <InputNumber min={0} className="table-input" defaultValue={0} onBlur={(e)=>this.setVirtualSalesValue(e.target.value,record)}/>
                    }
                }
            }
        ]
        return(
            <div className="food-shop-hypermarket">
               <div className="search-condition">
                   <Search placeholder="请输入商品名称" enterButton="搜索" onSearch={this.searchShopName}/>
                   <Button>上架</Button>
                   <Button>下架</Button>
               </div>
               <Table rowClassName={(record, index) => {
                   let className = '';
                   if (index % 2 ) className = 'dark-row';
                   return className;
               }} rowSelection={rowSelection} className="table-layout-style" dataSource={this.state.tableData} columns={columns} />
            </div>
        )
    }
}

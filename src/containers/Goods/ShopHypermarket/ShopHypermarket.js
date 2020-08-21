import React from "react";
import {Button,Input,Table,Modal} from "antd";
import '../../../assets/css/public.less';
import {setVirtualSales} from "../../../api/goods/goods";
const { Search } = Input;
export default class ShopHypermarket extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData:[
                {name:"十全大补丸",spec:"无",retail_price:"100",stock:"30",online_amount:55,outline_amount:66},
                {name:"乌鸡白凤丸",online_amount:222,outline_amount:1111},
                {name:"红枣放归堂"},
                {name:"十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"},
                {name:"十全大补丸"},{name:"乌鸡白凤丸"},{name:"红枣放归堂"}
            ],
            columnsStockModal:[
                {title: '库存', dataIndex: 'stock', ellipsis: true},
                {title: '变动途径', dataIndex: 'changeRoad', ellipsis: true},
                {title: '时间', dataIndex: 'time', ellipsis: true}
            ],
            columnsPriceModal:[
                {title: '售价', dataIndex: 'retailPrice', ellipsis: true},
                {title: '时间', dataIndex: 'time', ellipsis: true}
            ],
            tableStockData:[
                {stock:"十全大补丸",changeRoad:"小程序",time:"2018-01-12 15:25:59"},
                {stock:"乌鸡白凤丸",changeRoad:"小程序",time:"2018-01-12 15:25:59"},
                {stock:"红枣放归堂",changeRoad:"APP",time:"2018-01-12 15:25:59"}
            ],
            tablePriceData:[
                {retailPrice:"100",time:"2018-01-12 15:25:59"},
                {retailPrice:"200",time:"2018-01-12 15:25:59"},
                {retailPrice:"300",time:"2018-01-12 15:25:59"}
            ],
            columnsModal:[],
            tableModalData:[],
            visible: false,
            title:"售价详情"
        };
    }
    searchShopName = (value) =>{
        console.log(value)
    }
    showPriceDetail = (value) =>{
        this.setState({visible:true})
        this.state.title="售价详情";
        this.state.columnsModal=this.state.columnsPriceModal;
        this.state.tableModalData=this.state.tablePriceData;
        console.log(JSON.stringify(value))
    }
    showStockDetail = (value) =>{
        this.setState({visible:true})
        this.state.title="库存详情";
        this.state.columnsModal=this.state.columnsStockModal;
        this.state.tableModalData=this.state.tableStockData;
        console.log(JSON.stringify(value))
    }
    handleCancel = () =>{
        this.setState({visible:false})
        console.log(this.state.title+"已关闭")
    }
    render() {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                ellipsis: true
            },
            {
                title: '规格',
                dataIndex: 'spec',
                ellipsis: true
            },
            {
                title: '售价',
                dataIndex: 'retail_price',
                ellipsis: true,
                render:(text, record) => {
                    if(text){
                        return <i style={{fontSize:'12px'}} className="iconfont">
                                  <span style={{marginRight:'10px'}}>{text}</span>
                                  <span title="售价详情" onClick={()=>this.showPriceDetail(record)} style={{color:'#4F9863',cursor:'pointer'}}>&#xe7ab;</span>
                               </i>
                    }
                }
            },
            {
                title: '库存',
                dataIndex: 'stock',
                ellipsis: true,
                render:(text, record) => {
                    if(text){
                        return <i style={{fontSize:'12px'}} className="iconfont">
                                  <span style={{marginRight:'10px'}}>{text}</span>
                                  <span title="库存详情" onClick={()=>this.showStockDetail(record)} style={{color:'#4F9863',cursor:'pointer'}}>&#xe7ab;</span>
                               </i>
                    }
                }
            },
            {
                title: '线上销量',
                dataIndex: 'online_amount',
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
                title: '线下销量',
                dataIndex: 'outline_amount',
                ellipsis: true,
                render:(text, record) => {
                    if(text){
                        return <span>{text}</span>
                    }else {
                        return <span>0</span>
                    }
                }
            }
        ]
        return(
            <div className="food-shop-hypermarket">
                <div className="search-condition">
                    <Search placeholder="请输入门店名称或店主手机号" enterButton="搜索" onSearch={this.searchShopName}/>
                </div>
                <Table rowClassName={(record, index) => {
                    let className = '';
                    if (index % 2 ) className = 'dark-row';
                    return className;
                }} className="table-layout-style" dataSource={this.state.tableData} columns={columns}/>
                <Modal title={this.state.title} visible={this.state.visible} footer={null} onCancel={this.handleCancel}>
                    <Table className="table-layout-style" dataSource={this.state.tableModalData} columns={this.state.columnsModal}/>
                </Modal>
            </div>
        )
    }
}

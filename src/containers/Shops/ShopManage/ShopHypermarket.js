import React from "react";
import {Button,Input,Table,Modal} from "antd";
import '../../../assets/css/public.less';
import {searchJson} from "../../../utils/dataStorage";
import {searchShopSocietyList} from "../../../api/order/society";
import {shopDetails} from "../../../api/shops/shopManage";
const { Search } = Input;
export default class ShopHypermarket extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData:[],
            shop_id:"",
            pageHelper:{current:1, pageSize:10, total:0},
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
    onChangePage = (e) =>{
        this.state.pageHelper.current=e.current;
        this.getShopHypermarketList();
    };
    componentWillReceiveProps(nextProps, nextContext) {
        if(!(this.props.shopMarketId ==  nextProps.shopMarketId)){
            this.setState({shop_id:nextProps.shopMarketId},()=>this.getShopHypermarketList())
        }
    }
    getShopHypermarketList = () =>{
        let data={
            limit:this.state.pageHelper.pageSize,
            page:this.state.pageHelper.current,
            "searchJson[search]":this.props.shopMarketId
        }
        searchShopSocietyList(data).then(r=>{
            this.state.pageHelper.total=r.meta.pagination.total;
            this.setState({tableData:r.data});
        })
    };
    showPriceDetail = (record) =>{
        this.setState({visible:true})
        this.state.title="售价详情";
        this.state.columnsModal=this.state.columnsPriceModal;
        this.state.tableModalData=this.state.tablePriceData;
        console.log(JSON.stringify(record))
    }
    showStockDetail = (record) =>{
        this.setState({visible:true})
        this.state.title="库存详情";
        this.state.columnsModal=this.state.columnsStockModal;
        this.state.tableModalData=this.state.tableStockData;
        console.log(JSON.stringify(record))
    }
    handleCancel = () =>{
        this.setState({visible:false})
        console.log(this.state.title+"已关闭")
    }
    handleTableCancel=()=>{
        this.props.onClose()
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
                <Modal width={1000} title={this.state.title} visible={this.props.visible} footer={null} onCancel={this.handleTableCancel}>
                    <Table className="table-layout-style" rowKey={record => record.id} dataSource={this.state.tableData} columns={columns}/>
                </Modal>
                <Modal title={this.state.title} visible={this.state.visible} footer={null} onCancel={this.handleCancel}>
                    <Table className="table-layout-style" rowKey={record => record.id} dataSource={this.state.tableModalData} columns={this.state.columnsModal}/>
                </Modal>
            </div>
        )
    }
}

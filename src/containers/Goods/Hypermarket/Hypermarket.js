import React from "react";
import {Button, Input, Table, InputNumber, Modal, message} from "antd";
import '../../../assets/css/public.less';
import {offShelves, onShelves, setVirtualSales, setWarning} from "../../../api/goods/goods";
import {searchJson} from "../../../utils/dataStorage";
import {getSocietyGoodsList} from "../../../api/order/society";
import IconFont from "../../../utils/IconFont";
import RecordSpec from "../Components/RecordSpec";
import WarningStock from "../Components/WarningStock";
import ShelfGoods from "../Components/ShelfGoods";
const { Search } = Input;
export default class Hypermarket extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tableData:[],
            checkedAry:[],
            provideId:"",
            recordSpecVisible:false,
            warningStockVisible:false,
            shelfGoodsVisible:false,
            shopList:[],
            searchValue:"",
            pageHelper:{current:1, pageSize:10, total:0}
        };
    }
    searchShopName = (value) =>{
        this.setState({searchValue:value},() => this.goodsList())
    }
    setVirtualSalesValue = (value,record) =>{
        setVirtualSales({virtual_sales:value},record.provide_id).then(r=>{
            message.success(r.message)
        }).catch(_=>{})
    }
    onChangePage = (e) =>{
        this.state.pageHelper.current=e.current;
        this.goodsList();
    };
    componentDidMount() {
        this.goodsList();
    };
    goodsList = () =>{
        let data={
            limit:this.state.pageHelper.pageSize,
            page:this.state.pageHelper.current,
            channel:"SOCIETY_FOOD"
        }
        if(this.state.searchValue){
            data['searchJson[search]']=this.state.searchValue;
        }
        getSocietyGoodsList(data).then(r=>{
            this.state.pageHelper.total=r.meta.pagination.total;
            this.setState({tableData:r.data});
        })
    };
    reviewGoods = (provide_id) =>{
        this.setState({provideId:provide_id},()=>this.setState({recordSpecVisible:true}))
    };
    showModal =(record)=>{
        this.setState({warningStockVisible:true,stock_id:record.stock_id})
    };
    handleCancel = () =>{
        this.setState({recordSpecVisible:false})
    };
    onSubmitWarningStock = (value,id) =>{
        setWarning({warning_stock:value},id).then(r=>{
            message.success(r.message);
            this.hideWarningStock();
            this.refresh()
        }).catch(_=>{})
    };
    hideWarningStock = () =>{
        this.setState({warningStockVisible:false})
    };
    //下架
    unSale = () =>{
        let products_ids = this.state.checkedAry;
        let channel = "SOCIETY_FOOD";
        let that = this;
        let confirmModal = Modal.confirm({
            title: (
                <div className= 'u_confirm_header'>
                    提示
                    <i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
                        confirmModal.destroy()
                    }}>&#xe82a;</i>
                </div>
            ),
            icon:null,
            width:'280px',
            closable:true,
            centered:true,
            content: (
                <div className="U_confirm">
                    确定下架商品么？
                </div>
            ),
            cancelText: '取消',
            okText:'确定',
            okButtonProps: {
                size:'small'
            },
            cancelButtonProps:{
                size:'small'
            },
            onOk() {
                // 确定按钮执行操作
                offShelves({
                    channel:channel,
                    product_ids:products_ids
                }).then(r=>{
                    message.success(r.message);
                    that.goodsList();
                }).catch(_=>{})
            }
        });
    };
    // 上架商品
    showShelfGoods = () =>{
        this.setState({shelfGoodsVisible:true})
    };
    hideShelfGoods = () =>{
        this.setState({shelfGoodsVisible:false})
    };

    onSubmitShelfGoods = (value) =>{
        onShelves({
            channel:"SOCIETY_FOOD",
            product_params:value
        }).then(r=>{
            message.success(r.message);
            this.hideShelfGoods();
            this.refresh()
        }).catch(_=>{})
    };
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
                dataIndex: 'product_name',
                ellipsis: true
            },
            {
                title: '规格',
                dataIndex: 'stocks',
                ellipsis: true,
                render: (text,record) => {
                    if(record.open_specification){
                        return <span style={{'color':'#4F9863',"cursor":"pointer"}}>
							<span className="orderGoods" onClick={()=>this.reviewGoods(record.provide_id)}>{'查看规格'}</span>
						</span>
                    } else {
                        return <span>无</span>
                    }
                }
            },
            {
                title: '零售价',
                dataIndex: 'retail_price',
                ellipsis: true
            },
            {
                title: '实际销量',
                dataIndex: 'total_sales',
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
                dataIndex: 'shop_preorder_num',
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
                dataIndex: 'user_preorder_num',
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
                   <Button onClick={this.showShelfGoods}>上架</Button>
                   <Button disabled={this.state.checkedAry.length == 0} onClick={this.unSale} style={{color:this.state.checkedAry.length==0?'#BDBDBD':''}}>下架</Button>
               </div>
               <Table rowSelection={rowSelection} rowKey={record => record.product_id} onChange={this.onChangePage} className="table-layout-style" dataSource={this.state.tableData} columns={columns} pagination={this.state.pageHelper}/>
                <RecordSpec visible={this.state.recordSpecVisible} onCancel={this.handleCancel} onSubmit={this.showModal} provide_id={this.state.provideId}/>
                <WarningStock visible={this.state.warningStockVisible} onCancel={this.hideWarningStock} onSubmit={this.onSubmitWarningStock} id={this.state.stock_id}/>
                <ShelfGoods visible={this.state.shelfGoodsVisible} onCancel={this.hideShelfGoods} onSubmit={this.onSubmitShelfGoods}/>
            </div>
        )
    }
}

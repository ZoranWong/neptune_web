import React from "react";
import {Button, Input, Table, Modal, message} from "antd";
import '../../../assets/css/public.less';
import '../../../assets/css/goods.sass'
import {searchSocietyOrder} from "../../../api/order/society";
import {systemSetting} from "../../../api/common";
import {StockListDetail} from "../../../api/goods/goods";
import {searchJson} from "../../../utils/dataStorage";
import IconFont from "../../../utils/IconFont";
const { Search } = Input;
export default class SocietyFood extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            btnSign:"1",
            tableData:[],
            searchValue:"",
            stateConstant:"",
            visible:false,
            shopList:[],
            pageHelper:{current:1, pageSize:10, total:0}
        };
    }
    searchShopName = (value) =>{
        this.setState({searchValue:value},() => this.orderList())
    };
    onChangePage = (e) =>{
        this.state.pageHelper.current=e.current;
        this.orderList();
    };
    changeBtn = (sign,state_constant) =>{
        this.setState({btnSign:sign});
        this.setState({stateConstant:state_constant},() => this.orderList())
    };
    componentDidMount() {
        this.orderList();
    };
    orderList = () =>{
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
        searchSocietyOrder(data).then(r=>{
            this.state.pageHelper.total=r.meta.pagination.total;
            this.setState({tableData:r.data});
            console.log("当前总数"+r.meta.pagination.total+"======="+this.state.pageHelper.total)
        })
    };
    reviewGoods = (items) =>{
        for (let i = 0; i <items.length; i++) {
            let spec_value=items[i]['spec_value'];
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
    }
    showModal =()=>{
        this.setState({visible:true})
    }
    handleCancel = () =>{
        this.setState({visible:false})
    }
    render() {
        const columns = [
            {
                title: '订单号',
                dataIndex: 'trade_no',
                ellipsis: true
            },
            {
                title: '商品',
                dataIndex: 'shop_name',
                width:200,
                ellipsis: true,
                render: (text,record) => {
                    if(record.items.length>0){
                        return <span style={{'color':'#4F9863'}}>
							<span className="orderGoods">{record.items[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items)} />
						</span>
                    } else {
                        return <span>无</span>
                    }
                }
            },
            {
                title: '实付款',
                dataIndex: 'settlement_total_fee',
                ellipsis: true
            },
            {
                title: '用户昵称',
                dataIndex: 'user_nickname',
                ellipsis: true
            },
            {
                title: '订单性质',
                dataIndex: 'order_nature',
                ellipsis: true
            },
            {
                title: '配送类型',
                dataIndex: 'delivery_type_desc',
                ellipsis: true
            },
            {
                title: '支付时间',
                dataIndex: 'paid_time',
                ellipsis: true
            },
            {
                title: '订单状态',
                dataIndex: 'state_desc',
                ellipsis: true
            }
        ];
        return(
            <div className="society-food">
                <div className="search-condition">
                    <Search placeholder="请输入姓名和手机号" enterButton="搜索" onSearch={this.searchShopName}/>
                </div>
                <div className="search-condition search-btn">
                    <Button className={this.state.btnSign == '1'?"selected-btn":""} onClick={()=>this.changeBtn("1","")}>全部</Button>
                    <Button className={this.state.btnSign == '2'?"selected-btn":""} onClick={()=>this.changeBtn("2","WAIT_AGENT_VERIFY")}>待收货(商户)</Button>
                    <Button className={this.state.btnSign == '3'?"selected-btn":""} onClick={()=>this.changeBtn("3","WAIT_CUSTOMER_PICK")}>待自提</Button>
                    <Button className={this.state.btnSign == '4'?"selected-btn":""} onClick={()=>this.changeBtn("4","WAIT_SHOP_DELIVER")}>代配送</Button>
                    <Button className={this.state.btnSign == '5'?"selected-btn":""} onClick={()=>this.changeBtn("5","CANCELED")}>已取消</Button>
                    <Button className={this.state.btnSign == '6'?"selected-btn":""} onClick={()=>this.changeBtn("6","EXCEPTION")}>订单异常</Button>
                    <Button className={this.state.btnSign == '7'?"selected-btn":""} onClick={()=>this.changeBtn("7","COMPLETED")}>已完成</Button>
                    <Button className={this.state.btnSign == '8'?"selected-btn":""} onClick={()=>this.changeBtn("8","REFUNDED")}>已退款</Button>
                    <Button className={this.state.btnSign == '9'?"selected-btn":""} style={{borderRight:"1px solid #D9D9D9"}} onClick={()=>this.changeBtn("9","WAIT_PAY")}>待支付</Button>
                </div>
                <Table onChange={this.onChangePage} className="table-layout-style" dataSource={this.state.tableData} columns={columns} pagination={this.state.pageHelper}/>
                <Modal title="商品" visible={this.state.visible} onCancel={this.handleCancel} footer={null}>
                    <ul className="reviews">
                        {
                            (this.state.shopList&&this.state.shopList.length)&&this.state.shopList.map((item,index)=>(
                                <li key={index}>
                                    <img src={item.thumbnail} alt="" className="left"/>
                                    <div className="right">
                                        <span>商品名:{item.name}</span>
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

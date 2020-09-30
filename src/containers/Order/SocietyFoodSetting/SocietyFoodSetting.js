import React,{ useState } from "react";
import moment from 'moment';
import {message,Input,InputNumber,TimePicker,Radio,DatePicker} from "antd";
import './societyFoodSetting.less';
import {getSocietyOrderSet,saveSocietyOrderSet} from "../../../api/order/society";
import {setVirtualSales} from "../../../api/goods/goods";
import {searchJson} from "../../../utils/dataStorage";
const { Search } = Input;
export default class SocietyFoodSetting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            consumerStartMoney:"",
            shopStartMoney:"",
            radio1:"0",
            radio2:"0",
            timeHH1:"0",
            timeMM1:"0",
            timeHH2:"0",
            timeMM2:"0",
            timeHH3:"0",
            timeMM3:"0",
            timeHH4:"0",
            timeMM4:"0",
            timeHH5:"0",
            societySendTime:"",
            consumerDay:"",
            consumerSendDay:""
        };
    }
    changeConsumerRadio = e => {
        let value=e.target.value;
        this.setState({radio1: value});
        if(value=="0"){
            this.saveOrderSetting("SOCIETY_FOOD_USER_ORDER_PAID_THRESHOLD","null");
        }
    };
    changeShopRadio = e => {
        let value=e.target.value;
        this.setState({radio2: value});
        if(value=="0"){
            this.saveOrderSetting("SOCIETY_FOOD_MERCHANT_ORDER_PAID_THRESHOLD","null");
        }
    };
    componentDidMount() {
        this.orderSetting();
    };
    orderSetting = () =>{
        let param={'searchJson[type]':"SOCIETY_FOOD"}
        getSocietyOrderSet(param).then(r=>{
            if(!r){
               return false;
            }
            let list=r.data;
            for (let i = 0; i <list.length ; i++) {
                let key=list[i].key;
                let value=list[i].value;
                if(value){
                    if(key=="SOCIETY_FOOD_MERCHANT_ORDER_AUTO_COMPLETE_TIME_HOUR"){
                        this.setState({timeHH1:value})
                    }
                    if(key=="SOCIETY_FOOD_MERCHANT_ORDER_AUTO_COMPLETE_TIME_MINUTE"){
                        this.setState({timeMM1:value})
                    }
                    if(key=="SOCIETY_FOOD_USER_SELF_PICK_ORDER_AUTO_COMPLETE_TIME_DAY"){
                        this.setState({consumerDay:value})
                    }
                    if(key=="SOCIETY_FOOD_USER_SELF_PICK_ORDER_AUTO_COMPLETE_TIME_HOUR"){
                        this.setState({timeHH2:value})
                    }
                    if(key=="SOCIETY_FOOD_USER_SELF_PICK_ORDER_AUTO_COMPLETE_TIME_MINUTE"){
                        this.setState({timeMM2:value})
                    }
                    if(key=="SOCIETY_FOOD_USER_HOME_DELIVERY_ORDER_AUTO_COMPLETE_TIME_DAY"){
                        this.setState({consumerSendDay:value})
                    }
                    if(key=="SOCIETY_FOOD_USER_HOME_DELIVERY_ORDER_AUTO_COMPLETE_TIME_HOUR"){
                        this.setState({timeHH3:value})
                    }
                    if(key=="SOCIETY_FOOD_USER_HOME_DELIVERY_ORDER_AUTO_COMPLETE_TIME_MINUTE"){
                        this.setState({timeMM3:value})
                    }
                    if(key=="SOCIETY_FOOD_USER_ORDER_PAID_THRESHOLD"){
                        this.setState({consumerStartMoney:value});
                        this.setState({radio1:"1"});
                    }
                    if(key=="SOCIETY_FOOD_MERCHANT_ORDER_PAID_THRESHOLD"){
                        this.setState({shopStartMoney:value})
                        this.setState({radio2:"1"});
                    }
                    if(key=="SOCIETY_FOOD_MERCHANT_ORDER_PAID_TIME_THRESHOLD_HOUR"){
                        this.setState({timeHH4:value})
                    }
                    if(key=="SOCIETY_FOOD_MERCHANT_ORDER_PAID_TIME_THRESHOLD_MINUTE"){
                        this.setState({timeMM4:value})
                    }
                    if(key=="SOCIETY_FOOD_ORDER_AUTO_CANCEL_TIME_HOUR"){
                        this.setState({timeHH5:value})
                    }
                    if(key=="SOCIETY_FOOD_DELIVERY_TIME"){
                        this.setState({societySendTime:value})
                    }
                }
            }
        })
    };
    saveOrderSetting = (key,value) =>{
        let param={
            type:"SOCIETY_FOOD",
            key:key,
            value:value
        }
        saveSocietyOrderSet(param).then(r=>{
            message.success(r.message);
        })
    };
    onHHChange1 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeHH1:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_MERCHANT_ORDER_AUTO_COMPLETE_TIME_HOUR",timeString);
    };
    onMMChange1 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeMM1:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_MERCHANT_ORDER_AUTO_COMPLETE_TIME_MINUTE",timeString);
    };
    onHHChange2 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeHH2:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_USER_SELF_PICK_ORDER_AUTO_COMPLETE_TIME_HOUR",timeString);
    };
    onMMChange2 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeMM2:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_USER_SELF_PICK_ORDER_AUTO_COMPLETE_TIME_MINUTE",timeString);
    };
    onHHChange3 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeHH3:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_USER_HOME_DELIVERY_ORDER_AUTO_COMPLETE_TIME_HOUR",timeString);
    };
    onMMChange3 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeMM3:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_USER_HOME_DELIVERY_ORDER_AUTO_COMPLETE_TIME_MINUTE",timeString);
    };
    onHHChange4 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeHH4:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_MERCHANT_ORDER_PAID_TIME_THRESHOLD_HOUR",timeString);
    };
    onMMChange4 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeMM4:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_MERCHANT_ORDER_PAID_TIME_THRESHOLD_MINUTE",timeString);
    };
    onHHChange5 = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({timeHH5:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_ORDER_AUTO_CANCEL_TIME_HOUR",timeString);
    };
    onTimeChange = (time,timeString) =>{
        if(!timeString){
            return false
        }
        this.setState({societySendTime:timeString})
        this.saveOrderSetting("SOCIETY_FOOD_DELIVERY_TIME",timeString);
    };
    setConsumerDay =(e)=>{
        let value=e.target.value;
        this.setState({consumerDay:value});
        this.saveOrderSetting("SOCIETY_FOOD_USER_SELF_PICK_ORDER_AUTO_COMPLETE_TIME_DAY",value);
    };
    setConsumerSendDay =(e)=>{
        let value=e.target.value;
        this.setState({consumerSendDay:value});
        this.saveOrderSetting("SOCIETY_FOOD_USER_HOME_DELIVERY_ORDER_AUTO_COMPLETE_TIME_DAY",value);
    };
    setConsumerStartMoney =(e)=>{
        let value=e.target.value;
        this.setState({consumerStartMoney:value});
        this.saveOrderSetting("SOCIETY_FOOD_USER_ORDER_PAID_THRESHOLD",value);
    };
    setShopStartMoney =(e)=>{
        let value=e.target.value;
        this.setState({shopStartMoney:value});
        this.saveOrderSetting("SOCIETY_FOOD_MERCHANT_ORDER_PAID_THRESHOLD",value);
    };
    render() {
        const hourFormat = 'H';
        const MinFormat = 'm';
        const hourMinFormat = 'HH:mm';
        const dataFormat = 'YYYY-MM-DD HH:mm';
        return(
            <div className="society-food-setting">
                <div className="society-setting-div">
                    <label className="society-title">商户未收货后台自动确认收货时间:</label>
                    <TimePicker format={hourFormat} placeholder="选择时刻" value={moment(this.state.timeHH1,"HH")} onChange={(time,timeString)=>this.onHHChange1(time,timeString)}/>
                    <span>时</span>
                    <TimePicker format={MinFormat} placeholder="选择分钟" value={moment(this.state.timeMM1,"mm")}  onChange={(time,timeString)=>this.onMMChange1(time,timeString)}/>
                    <span>分</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">消费者自提未核销自动核销的时间:</label>
                    <span>第</span>
                    <InputNumber placeholder="请输入整数" value={this.state.consumerDay} onBlur={this.setConsumerDay}/>
                    <span>天的</span>
                    <TimePicker format={hourFormat} placeholder="选择时刻" value={moment(this.state.timeHH2,"HH")} onChange={(time,timeString)=>this.onHHChange2(time,timeString)}/>
                    <span>时</span>
                    <TimePicker format={MinFormat} placeholder="选择分钟" value={moment(this.state.timeMM2,"mm")}  onChange={(time,timeString)=>this.onMMChange2(time,timeString)}/>
                    <span>分</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">消费者配送未核销自动核销的时间:</label>
                    <span>第</span>
                    <InputNumber placeholder="请输入整数" value={this.state.consumerSendDay} onBlur={this.setConsumerSendDay}/>
                    <span>天的</span>
                    <TimePicker format={hourFormat} placeholder="选择时刻" value={moment(this.state.timeHH3,"HH")} onChange={(time,timeString)=>this.onHHChange3(time,timeString)}/>
                    <span>时</span>
                    <TimePicker format={MinFormat} placeholder="选择分钟" value={moment(this.state.timeMM3,"mm")} onChange={(time,timeString)=>this.onMMChange3(time,timeString)}/>
                    <span>分</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">消费者起订金额:</label>
                    <Radio.Group onChange={this.changeConsumerRadio} value={this.state.radio1}>
                        <Radio value={"0"}>不设置</Radio>
                        <Radio value={"1"}>设置金额</Radio>
                    </Radio.Group>
                    <InputNumber placeholder="请输入金额" onBlur={this.setConsumerStartMoney} style={{'display':this.state.radio1=='1'?'block':'none'}} value={this.state.consumerStartMoney}/>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">门店起订金额:</label>
                    <Radio.Group onChange={this.changeShopRadio} value={this.state.radio2}>
                        <Radio value={"0"}>不设置</Radio>
                        <Radio value={"1"}>设置金额</Radio>
                    </Radio.Group>
                    <InputNumber placeholder="请输入金额" onBlur={this.setShopStartMoney} style={{'display':this.state.radio2=='1'?'block':'none'}} value={this.state.shopStartMoney}/>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">截单时间:</label>
                    <TimePicker format={hourFormat} placeholder="选择时刻" value={moment(this.state.timeHH4,"HH")} onChange={(time,timeString)=>this.onHHChange4(time,timeString)}/>
                    <span>时</span>
                    <TimePicker format={MinFormat} placeholder="选择分钟" value={moment(this.state.timeMM4,"mm")} onChange={(time,timeString)=>this.onMMChange4(time,timeString)}/>
                    <span>分</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">未付款自动取消订单的时间:</label>
                    <span>订单创建成功后</span>
                    <TimePicker format={hourFormat} placeholder="选择时刻" value={moment(this.state.timeHH5,"HH")} onChange={(time,timeString)=>this.onHHChange5(time,timeString)}/>
                    <span>小时内</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">社会餐配送时间:</label>
                    <TimePicker format={hourMinFormat} allowClear={false} placeholder="选择配送时间" value={moment(this.state.societySendTime,"HH:mm")} onChange={(time,timeString)=>this.onTimeChange(time,timeString)}/>
                </div>
            </div>
        )
    }
}

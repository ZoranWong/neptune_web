import React from "react";
import {Button,Input,InputNumber,TimePicker,Radio,DatePicker} from "antd";
import './societyFoodSetting.less';
import {setVirtualSales} from "../../../api/goods/goods";
const { Search } = Input;
export default class SocietyFoodSetting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:"1"
        };
    }
    changeRadio = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const hourFormat = 'H';
        const MinFormat = 'm';
        const dataFormat = 'YYYY-MM-DD HH:mm';
        return(
            <div className="society-food-setting">
                <div className="society-setting-div">
                    <label className="society-title">商户未收货后台自动确认收货时间:</label>
                    <TimePicker format={hourFormat} placeholder="选择时刻"/>
                    <span>时</span>
                    <TimePicker format={MinFormat} placeholder="选择分钟"/>
                    <span>分</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">消费者自提未核销自动核销的时间:</label>
                    <span>第</span>
                    <InputNumber placeholder="请输入整数"/>
                    <span>天的</span>
                    <TimePicker format={hourFormat} placeholder="选择时刻"/>
                    <span>时</span>
                    <TimePicker format={MinFormat} placeholder="选择分钟"/>
                    <span>分</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">消费者配送未核销自动核销的时间:</label>
                    <span>第</span>
                    <InputNumber placeholder="请输入整数"/>
                    <span>天的</span>
                    <TimePicker format={hourFormat} placeholder="选择时刻"/>
                    <span>时</span>
                    <TimePicker format={MinFormat} placeholder="选择分钟"/>
                    <span>分</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">消费者起订金额:</label>
                    <Radio.Group onChange={this.changeRadio} value={this.state.value}>
                        <Radio value={"1"}>不设置</Radio>
                        <Radio value={"2"}>设置金额</Radio>
                    </Radio.Group>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">门店起订金额:</label>
                    <Radio.Group onChange={this.changeRadio} value={this.state.value}>
                        <Radio value={"1"}>不设置</Radio>
                        <Radio value={"2"}>设置金额</Radio>
                    </Radio.Group>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">截单时间:</label>
                    <TimePicker format={hourFormat} placeholder="选择时刻"/>
                    <span>时</span>
                    <TimePicker format={MinFormat} placeholder="选择分钟"/>
                    <span>分</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">未付款自动取消订单的时间:</label>
                    <span>订单创建成功后</span>
                    <TimePicker format={hourFormat} placeholder="选择时刻"/>
                    <span>小时内</span>
                </div>
                <div className="society-setting-div">
                    <label className="society-title">社会餐配送时间:</label>
                    <DatePicker format={dataFormat} placeholder="选择配送时间"/>
                </div>
            </div>
        )
    }
}

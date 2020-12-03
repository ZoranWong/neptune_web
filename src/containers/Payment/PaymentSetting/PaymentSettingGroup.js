import React, {Component} from 'react';
import {Button, Input, message, Modal,Radio} from "antd";
import { wxPayment } from '../../../api/shops/shopManage';

class PaymentSettingGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
            name: '',
            merchant_type:'PERSONAL',
            merchant_name:'',//商户名称
            app_id:'',//商户号
            subgroup_id:''//早餐车id
		};
		this.child = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps.record,99999)
		if (nextProps.record && nextProps.record.id) {
			this.setState({name: nextProps.record.name})
		}
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	handleSubmit = ()=>{
		
		if(!this.state.app_id) {
			message.error('请填写商户号');
			return;
		}
        let params = {
            merchant_name: this.props.record.name,
            merchant_type: this.state.merchant_type,
            app_id: this.state.app_id,
            subgroup_id: this.props.record.id
        }
        console.log(params)
        // wxPayment(params).then(r => {
        //     message.success(r.message);
        //     this.setState({
        //         visible: false,
        //     });
        //     this.props.refresh();
        // }).catch(err => {
        //     message.error(err.message);
        // })
	};
	
	render() {
		return (
			<div>
                <Modal
                    title="微信配置"
                    visible={this.props.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <div className='wxset'>
                        <span className="wx-left">早餐车名称：</span>
                        <span>{this.state.name}</span>
                    </div>
                    <div className='wxset'>
                        <span className="wx-left">选择商户号类型：</span>
                        <Radio.Group onChange={(e) => { this.setState({ merchant_type: e.target.value }) }} value={this.state.merchant_type}>
                            <Radio value="PERSONAL">个体商户</Radio>
                            <Radio value="COMPANY">企业</Radio>
                        </Radio.Group>
                    </div>
                    <div className='wxset'>
                        <span className="wx-left">商户号：</span>

                        <Input
                            value={this.state.app_id}
                            onChange={(e) => {
                                this.setState({ app_id: e.target.value })
                            }}
                        />

                    </div>
                </Modal>
			</div>
		);
	}
}

export default PaymentSettingGroup;

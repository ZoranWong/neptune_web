import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, message, Modal} from "antd";
import '../css/index.sass';
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {createNewCard} from "../../../../api/marketing/cards";

const { RangePicker } = DatePicker;
class NewCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			amount: '',
			total_quantity: '',
			start_time: '',
			end_time: '',
		};
	}

	
	handleCancel = () =>{
		this.props.onClose()
	};
	
	handleSubmit = () => {
		let {name,amount, total_quantity, start_time,end_time} = this.state;
		if (!name) {
			message.error('请填写充值卡名称');
			return
		}
		if (!amount) {
			message.error('请填写充值卡金额');
			return
		}
		if (!total_quantity) {
			message.error('请填写充值卡数量');
			return
		}
		if (!start_time || !end_time) {
			message.error('请选择充值卡有效期');
			return
		}
		createNewCard(this.state).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh()
		})
	};

	// 活动起始时间
	actDateChange = (date, dateString) => {
		this.setState({
			start_time: dateString[0],
			end_time: dateString[1]
		})
	};

	inputChange = (e,type) => {
		this.setState({[type]: e.target.value})
	};
	inputNumChange = (e,type) => {
		this.setState({[type]: parseInt(e.target.value)})
	};
	

	

	
	render() {
		return (
			<div>
				<Modal
					title='新建充值卡'
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={
						<div>
							<Button
								size="small"
								onClick={this.handleCancel}
								type="default">取消</Button>
							<Button
								size="small"
								onClick={this.handleSubmit}
								type="primary">保存</Button>
						</div>
					}
				>
					<ul className="mainUl">
						<li className="normalLi imgLi">
							<span className="left c_left">充值卡名称</span>
							<Input className="liInput" type="text" value={this.state.name} onChange={(e)=>this.inputChange(e, 'name')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">充值卡金额</span>
							<Input className="liInput" type='number' value={this.state.amount} onChange={(e)=>this.inputNumChange(e, 'amount')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">数量</span>
							<Input className="liInput" type="number" value={this.state.total_quantity} onChange={(e)=>this.inputNumChange(e, 'total_quantity')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">有效期</span>
							<LocaleProvider locale={zh_CN}>
								<RangePicker format="YYYY-MM-DD HH:mm" style={{width: '300px'}} showTime onChange={this.actDateChange} />
							</LocaleProvider>
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default NewCard;

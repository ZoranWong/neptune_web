import React, {Component} from 'react';
import {Input, message, Modal} from "antd";
import {setOverdraft} from "../../../api/shops/shopManage";

class SetOverdraft extends Component {
	state = {
		overdraft: ''
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.overdraft) return ;
		this.setState({overdraft: nextProps.overdraft})
	}
	
	handleCancel = () => {
		this.props.onCancel();
	};
	
	handleSubmit = () => {
		let id = this.props.id;
		if (!this.state.overdraft || this.state.balanceValue < 0) {
			message.error('透支额度不合法');
			return
		}
		setOverdraft({
			shop_id: id,
			overdraft: this.state.overdraft
		}).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
			this.setState({overdraft: 0})
		}).catch(_=>{})
	};
	
	render() {
		return (
			<div>
				<Modal
					title='透支额度调整'
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="确定"
					cancelText="取消"
				>
					<div className="operateBalance">
						<span>设置透支额度</span>
						<Input
							value={this.state.overdraft}
							type='number'
							onChange={(e)=>{
								if (e.target.value < 0) {
									message.error('透支额度不可小于0');
									return;
								}
								this.setState({overdraft:e.target.value})
							}}
						/>
					</div>
				</Modal>
			</div>
		);
	}
}

export default SetOverdraft;

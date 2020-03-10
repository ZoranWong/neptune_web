import React, {Component} from 'react';
import '../../../../../components/OperateBalance/index.sass'
import {Input, message, Modal, Radio} from "antd";

class AdjustBV extends Component {
	state = {
		value: 'add',
		bvValue: 0,
		remark: ''
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps, '...');
		if (!nextProps.item.operation) {
			this.setState({
				value: 'add',
				bvValue: 0,
				remark: ''
			})
		} else {
			let type = nextProps.item.operation === '增加' ? 'add' : 'sub';
			this.setState({
				value: type,
				bvValue: nextProps.item.operationValue,
				remark: nextProps.item.remark
			})
		}
	}
	
	handleCancel = () => {
		this.props.onCancel();
	};
	
	handleSubmit = () => {
		this.props.onSubmit(this.state.value, this.state.bvValue, this.state.remark, this.props.item);
		this.props.onCancel();
	};
	
	onChange = (e) => {
		this.setState({value: e.target.value})
	};
	
	render() {
		return (
			<div>
				<Modal
					title='BV调整'
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="确定"
					cancelText="取消"
				>
					<div className="operateBalance">
						<Radio.Group onChange={this.onChange} value={this.state.value}>
							<Radio value='add'>增加</Radio>
							<Radio value='sub'>减少</Radio>
						</Radio.Group>
						<Input
							value={this.state.bvValue}
							type='number'
							onChange={(e)=>{
								if (e.target.value < 0) {
									message.error('BV变动不可小于0');
									return;
								}
								this.setState({bvValue:e.target.value})
							}}
						/>
					</div>
					<div className="bvremark">
						<span>备注</span>
						<Input
							value={this.state.remark}
							onChange={(e)=>{
								this.setState({remark:e.target.value})
							}} />
					</div>
				</Modal>
			</div>
		);
	}
}

export default AdjustBV;

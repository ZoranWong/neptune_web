import React, {Component} from 'react';
import '../../../../../components/OperateBalance/index.sass'
import {Input, message, Modal, Radio} from "antd";

class AdjustSalesBV extends Component {
	state = {
		value: 'add',
		bvValue: 0,
		remark: ''
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
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
		let bv = Number(this.state.bvValue);
		console.log(this.props.item, '====');
		let type = this.props.type === 'REWARD' ? 'add' : 'sub';
		if (!bv) {
			message.error('请输入调整值');
			return
		}
		if (type === 'sub') {
			if (bv - this.props.item['amount'] > 0) {
				message.error('当前不可惩罚这么多');
				return
			}
		}
		this.props.onSubmit(type, this.state.bvValue, this.state.remark, this.props.item);
		this.props.onCancel();
	};
	
	onChange = (e) => {
		this.setState({value: e.target.value})
	};
	
	clearNoNum = e => {
		let value = e.target.value;
		value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
		value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
		value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
		if (value.indexOf(".") < 0 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
			value = parseFloat(value);
		}
		if (value < 0) {
			message.error('BV变动不可小于0');
			return;
		}
		this.setState({bvValue:value})
	};
	
	render() {
		return (
			<div>
				<Modal
					title='奖惩金额调整'
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="确定"
					cancelText="取消"
				>
					<div className="bvremark">
						<span>奖惩金额调整</span>
						<Input
							value={this.state.bvValue}
							type='number'
							onChange={this.clearNoNum}
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

export default AdjustSalesBV;

import React, {Component} from 'react';
import {Modal, Input} from "antd";
import '../css/changeOrderStatus.sass';
import _ from 'lodash'
class ChangeOrderStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputAmount: [1],
			value1: ''
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
	}
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	handleSubmit = () => {
		let orders = [];
		for (let k in this.state) {
			console.log(k, '...');
			if (k.indexOf('value') !== -1) {
				orders.push(this.state[k])
			}
		}
		let formatOrder = [];
		_.map(orders, order => {
			if (order.indexOf(' ') !== -1) {
				formatOrder = formatOrder.concat(order.split(' '))
			} else if (order.indexOf(',') !== -1) {
				formatOrder = formatOrder.concat(order.split(','))
			} else if (order.indexOf('，') !== -1) {
				formatOrder = formatOrder.concat(order.split('，'))
			}　else {
				formatOrder.push(order)
			}
		});
		this.props.onSubmit(formatOrder)
	};
	
	createInput = e => {
		let ary = this.state.inputAmount;
		ary.push(ary.length + 1);
		let value = `value${ary.length}`;
		this.setState({inputAmount: ary, [value]: ''})
	};
	
	delete = (index) => {
		let ary = this.state.inputAmount;
		ary.splice(index,1);
		this.setState({inputAmount: ary})
	};
	
	inputChange = (e, value) =>{
		let val = 'value' + value;
		this.setState({[val]: e.target.value})
	};
	
	render() {
		let {inputAmount} = this.state;
		return (
			<div>
				<div className="changeOrderStatus">
					<Modal
						title="核实订单"
						width={520}
						type='number'
						visible={this.props.visible}
						onCancel={this.handleCancel}
						onOk={this.handleSubmit}
						okText="确定"
						cancelText="取消"
					>
						{
							inputAmount.map((item,index) => (
								<div>
									<Input
										className='changeorder'
										placeholder='请输入订单编号'
										onPressEnter={this.createInput}
										value={this.state['value' + item]}
										onChange={(e)=>this.inputChange(e, item)}
									/>
									{
										index > 0 && <span style={{color: '#4F9863', cursor: 'pointer', marginLeft: '20px'}} onClick={()=>this.delete(index)}>删除</span>
									}
								</div>
								
							))
						}
						
					</Modal>
				</div>
			</div>
		);
	}
}

export default ChangeOrderStatus;

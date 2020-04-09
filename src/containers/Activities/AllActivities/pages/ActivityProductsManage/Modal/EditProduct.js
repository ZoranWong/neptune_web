import React, {Component} from 'react';
import {Modal, Input, message} from "antd";
import '../css/editProduct.sass';
import {editActProducts} from "../../../../../../api/activities/activities";

class EditProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			days: 0,
			num: 0
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.record.id) return;
		this.setState({
			days: nextProps.record['user_limit_day'],
			num: nextProps.record['user_limit_num']
		})
	}

	handleCancel = () => {
		this.props.onClose()
	};
	
	handleSubmit = () => {
		this.props.onSubmit();
		editActProducts({
			user_limit_day: this.state.days,
			user_limit_num: this.state.num
		}, this.props.id, this.props.record.id).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh()
		}).catch(_=>{})
	};

	onChange = (e,type) => {
		this.setState({[type]: e.target.value})
	};
	
	render() {
		return (
			<div>
				<Modal
					title="编辑商品"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					onOk={this.handleSubmit}
					okText='确定'
					cancelText='取消'
				>
					<div className="productEdit">
						<Input type='number' value={this.state.days} onChange={(e)=>this.onChange(e,'days')} />天限购 <Input onChange={(e)=>this.onChange(e,'num')} value={this.state.num}  type='number' />件
					</div>
				</Modal>
			</div>
		);
	}
}

export default EditProduct;

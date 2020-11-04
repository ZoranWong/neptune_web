import React, {Component} from 'react';
import {Input, message, Modal, Select} from "antd";
import {editVip, createVip} from "../../../../api/user";
import '../css/createNew.sass'
class CreateNewClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			num: '',
			discount: ''
		};
		
	}
	
	init = () => {
		this.setState({
			name: '',
			num: '',
			discount: ''
		})
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.isEdit) {
			this.setState({
				name: nextProps.record['grade_name'],
				num: nextProps.record['score_num'],
				discount: nextProps.record.discount
			})
		} else {
			this.init()
		}
		
	}
	
	handleCancel = () => {
		this.props.onCancel();
	};
	
	check = () => {
		let {name, num, discount} = this.state;
		if (!name) {
			message.error('请填写会员等级名称');
			return;
		}
		if (!num) {
			message.error('请填写所需积分');
			return;
		}
		if (!discount) {
			message.error('请选择折扣');
			return;
		}
		this.submit(name, num, discount)
	};
	
	submit = (name, num, discount) => {
		let api = this.props.isEdit ? editVip : createVip;
		let id = this.props.isEdit? this.props.record.id : '';
		this.props.onSubmit(api, id, name, num, discount)
	};
	
	render() {
		let ary = [...Array.from({ length: 101 }).keys()];
		return (
			<div>
				<Modal
					title={this.props.isEdit ? "编辑会员等级" : "新建会员等级"}
					maskClosable={false}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.check}
					okText={'确定'}
					cancelText={'取消'}
				>
					<ul className="mainUl">
						<li>
							<span className="left">等级名称</span>
							<Input
								className="liInput"
								value={this.state.name}
								onChange={(e)=>{
									this.setState({name: e.target.value})
								}}
							/>
						</li>
						<li>
							<span className="left">所需积分</span>
							<Input
								type={'number'}
								className="liInput"
								value={this.state.num}
								onChange={(e)=>{
									this.setState({num: e.target.value})
								}}
								onBlur={(e)=>{
									if (!Number.isInteger(e.target.value)) {
										this.setState({num: parseInt(e.target.value)});
									}
								}}
							/>
						</li>
						<li>
							<span className="left">享受折扣</span>
							<Select
								placeholder="请选择操作人"
								value={this.state.discount}
								onChange={(e)=>{
									this.setState({discount: e})
								}}
								defaultActiveFirstOption={false}
							>
								
								{
									ary.map((item)=>(
										<Select.Option  value={item}>{item}</Select.Option>
									))
								}
							</Select>
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default CreateNewClass;

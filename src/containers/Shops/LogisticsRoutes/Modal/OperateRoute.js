import React, {Component} from 'react';
import {Button, Input, message, Modal} from "antd";
import {createRoute,editRoute} from "../../../../api/shops/routes";

class OperateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			type: 'create'
		};
		this.child = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.record && nextProps.record.id) {
			this.setState({type : 'edit',name: nextProps.record.name})
		} else {
			this.setState({type: 'create',name:''})
		}
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	handleSubmit = ()=>{
		let api = this.state.type === 'create' ? createRoute : editRoute;
		let id = this.state.type === 'create' ? '' : this.props.record.id;
		if(!this.state.name) {
			message.error('请填写路线名称');
			return;
		}
		api({name: this.state.name},id).then(r=>{
			message.success(r.message);
			this.setState({name: ''},()=>{
				this.handleCancel();
				this.props.refresh();
			})
		}).catch(_=>{})
	};
	
	render() {
		return (
			<div>
				<Modal
					title={this.state.type === 'create' ? '新建': '编辑'}
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
						<li>
							<span className="left">路线名称</span>
							<Input
								className="liInput"
								value={this.state.name}
								onChange={(e)=>{
									this.setState({name:e.target.value})
								}}
							/>
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default OperateRoute;

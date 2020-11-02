import React, {Component} from 'react';
import {Button, Input, message, Modal} from "antd";
// import {createRoute,editRoute} from "../../../../api/shops/routes";

class SupervisionGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			type: 'create',
			remarks:''
		};
		this.child = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps.record,99999)
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
		// let api = this.state.type === 'create' ? createRoute : editRoute;
		// let id = this.state.type === 'create' ? '' : this.props.record.id;
		if(!this.state.name) {
			message.error('请填写分组名称');
			return;
		}
		if(!this.state.remarks) {
			message.error('请填写备注');
			return;
		}
		// api({name: this.state.name},id).then(r=>{
		// 	message.success(r.message);
		// 	this.setState({name: ''},()=>{
		// 		this.handleCancel();
		// 		this.props.refresh();
		// 	})
		// }).catch(_=>{})
	};
	
	render() {
		return (
			<div>
				<Modal
					title={this.state.type === 'create' ? '新建督导组': '编辑督导主组'}
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
                          <span className="left">分组名称</span>
                          <Input
                            className="liInput"
                            value={this.state.name}
                            onChange={(e)=>{
                              this.setState({name:e.target.value})
                            }}
                          />
                        </li>
                        <li>
                          <span className="left">备注</span>
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

export default SupervisionGroup;

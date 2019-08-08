import React from 'react';
import {Input, Modal} from "antd";
import {groupDetails} from '../../../api/goods/groups'

export default class GroupDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			nameValue:'',
			remarkValue:''
		};
	}
	componentWillMount() {

	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.groupId) return;
		groupDetails({},nextProps.groupId).then(r=>{
			this.setState({groupData:r.data})
		}).catch(_=>{})
	}
	
	handleCancel = () =>{
		this.setState({groupData:{}},()=>{
			this.props.onCancel()
		});
	
	};
	
	render(){
		return (
			<div>
				<Modal
					title="查看商品组"
					maskClosable={false}
					className="disabled-filter"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					centered={true}
					footer={
						null
					}
				>
					{
						this.state.groupData && this.state.groupData.name?(
							<ul className="mainUl">
								<li>
									<span className="left">群组名称</span>
									<Input
										className="liInput"
										disabled={true}
										value={this.state.groupData.name}
									/>
								</li>
								<li>
									<span className="left">备注</span>
									<Input
										className="liInput"
										disabled={true}
										value={this.state.groupData.remark}
									/>
								</li>
							</ul>
						):""
					}
					
				</Modal>
			</div>
		)
	}
}
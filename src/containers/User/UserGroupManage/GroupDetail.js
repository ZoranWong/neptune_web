import React from 'react';
import {Input, Modal} from "antd";
import {groupDetails} from '../../../api/user'
import AdvancedFilterDisabled from "../../../components/AdvancedFilterDisabled/AdvancedFilterDisabled";


export default class GroupDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			groupData:{},
			nameValue:'',
			remarkValue:''
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.groupId) return;
		groupDetails({},nextProps.groupId).then(r=>{
			this.setState({groupData:r})
		}).catch(_=>{})
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	render(){
		return (
			<div>
				<Modal
					title="群组详情"
					width={this.state.groupData.type == '智能群组'?1088:520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
				>
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
						<li style={{'display':this.state.groupData.type == '智能群组'?'block':'none'}}>
							<span className="left">筛选条件</span>
							{
								this.state.groupData && this.state.groupData.conditions?(
									<div className="advanced" style={{'marginLeft':this.state.groupData.conditions[0].children.length >1?'60px':'140px'}}>
										<AdvancedFilterDisabled
											groupData={this.state.groupData}
										/>
									</div>
								):''
							}
							
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}
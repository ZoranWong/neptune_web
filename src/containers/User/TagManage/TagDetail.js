import React from 'react';
import {Input, Modal,Button,Select} from "antd";
import {tagDetails} from '../../../api/user'
import AdvancedFilterDisabled from "../../../components/AdvancedFilterDisabled/AdvancedFilterDisabled";
import './css/createNewTag.sass'
const {Option} = Select;
export default class TagDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			groupData:{},
			nameValue:'',
			remarkValue:''
		};
	}
	componentWillMount() {

	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.groupId) return;
		tagDetails({},nextProps.groupId).then(r=>{
			console.log(r);
			if(r.data){
				this.setState({groupData:r.data})
			} else {
				this.setState({groupData:r})
			}
			
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
					title="群组详情"
					className="disabled-filter"
					width={1088}
					maskClosable={false}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					centered={true}
					footer={
						null
					}
				>
					<ul className="mainUl">
						<li>
							<span className="left">选择分组</span>
							<Select
								style={{ width: 200 }}
								value={this.state.groupData.group_name}
								className="tag_group"
								disabled={true}
							>
							</Select>
						</li>
						<li>
							<span className="left">备注</span>
							<Input
								className="liInput"
								disabled={true}
								value={this.state.groupData.name}
							/>
						</li>
						<li style={{'display':'block'}}>
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
import React from 'react';
import SingleGroupDisabled from './SingleGroupDisabled'
import {Switch} from "antd";
import {getRandom} from "../../utils/dataStorage";
import './index.sass'
export default class AdvancedFilterDisabled extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			groupData:{}
		};
		this.child = React.createRef();
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.groupData) return;
		this.setState({groupData:nextProps.groupData});
	}
	render(){
		return (
			<div>
				{
					this.state.groupData && this.state.groupData.conditions?
						(
							<div>
								<div className={this.state.groupData.conditions[0].children.length >1 ?'groups':''}>
									{
										this.state.groupData.conditions[0].children.map((item,index)=>{
											return <SingleGroupDisabled
												key={index}
												item={item}
											/>
										})
									}
									<div className="switch">
										{
											this.state.groupData && this.state.groupData.conditions?
												(this.state.groupData.conditions[0].children.length >1?<Switch
													checkedChildren="且"
													unCheckedChildren="或"
													checked={this.state.groupData.conditions[0].logic == 'and'}
													disabled={true}
												/>:''):''
										}
									</div>
								
								</div>
								<div className={this.state.groupData.conditions[0].children.length > 1? 'addNewGroup addNewGroupTwo':'addNewGroup'} >
									<i className="iconfont">&#xe822;</i>
									<span>新加一个条件</span>
								</div>
							
							
							</div>
							
							
						):''
					
				}
				
				
			</div>
		)
	}
}
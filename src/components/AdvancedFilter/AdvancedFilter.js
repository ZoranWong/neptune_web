import React from 'react';
import SingleGroup from './SingleGroup'
import {Modal} from "antd";
import './index.sass'
import SingleLine from "./SingleLine";
export default class AdvancedFilter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			groupAry:['1']
		}
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	cloneGroupLine = () =>{
		this.setState({groupAry:[...this.state.groupAry,'3']})
	};
	
	
	render(){
		return (
			<div>
				<Modal
					title="高级筛选"
					width={1000}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					okButtonProps={this.handleCancel}
					cancelButtonProps={this.handleCancel}
					cancelText="清空筛选条件"
					okText="确认"
				>
					
					{
						this.state.groupAry.map(item=>{
							return <SingleGroup key={item} groupAry={this.state.groupAry}/>
						})
					}
					<div className="addNewGroup">
						<i className="iconfont">&#xe822;</i>
						<span onClick={this.cloneGroupLine}>新加一个条件</span>
					</div>
				</Modal>
			</div>
		)
	}
}
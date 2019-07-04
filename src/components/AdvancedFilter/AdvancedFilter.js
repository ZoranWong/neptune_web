import React from 'react';
import SingleGroup from './SingleGroup'
import {Modal} from "antd";
import './index.sass'
export default class AdvancedFilter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			groupAry:[1]
		};
		this.child = React.createRef();
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	cloneGroupLine = () =>{
		let id = this.state.groupAry[this.state.groupAry.length-1];
		id++;
		this.setState({groupAry:[...this.state.groupAry,id]});
	};
	
	watch = (id) =>{
		let newAry = this.state.groupAry.filter(item=>{
			return item !== id
		});
		this.setState({groupAry:newAry});
		
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
							return <SingleGroup
								key={item}
								groupAry={this.state.groupAry}
								operating={item}
								ref={this.child}
								watch={this.watch}
							/>
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
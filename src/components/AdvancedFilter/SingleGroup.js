import React from 'react';
import SingleLine from './SingleLine'
import './index.sass'
import {Switch} from "antd";
export default class SingleGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			singleAry:[1]
		}
	};
	
	
	cloneSingLine = () =>{
		let id = this.state.singleAry[this.state.singleAry.length-1];
		id++;
		this.setState({singleAry:[...this.state.singleAry,id]});
	};
	
	deleteSingle = (id) =>{
		let newAry = this.state.singleAry.filter(item=>{
			return item !== id
		});
		if(!newAry.length){
			this.props.watch(this.props.operating)
		}
		this.setState({singleAry:newAry});
	};
	
	
	
	render(){
		return (
			<div className="groupBox">
				{
					this.state.singleAry.map(item=>{
						return <SingleLine
							key={item}
							singleAry={this.state.singleAry}
							groupAry={this.props.groupAry}
							deleteSingle={()=>this.deleteSingle(item)}
						/>
					})
				}
				{
					this.state.singleAry.length >1?<Switch checkedChildren="且" unCheckedChildren="或" defaultChecked />:''
				}
				
				<div className="addNew">
					<i className="iconfont">&#xe822;</i>
					<span onClick={()=>this.cloneSingLine()}>新加一个条件</span>
				</div>
				
			</div>
		)
	}
}
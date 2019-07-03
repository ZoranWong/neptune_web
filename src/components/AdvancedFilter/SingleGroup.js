import React from 'react';
import SingleLine from './SingleLine'
import './index.sass'
export default class SingleGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			singleAry:[1]
		}
	};
	
	cloneSingLine = () =>{
		let id = this.state.singleAry[this.state.singleAry.length-1];
		this.setState({singleAry:[...this.state.singleAry,id++]})
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
						/>
					})
				}
				<div className="addNew">
					<i className="iconfont">&#xe822;</i>
					<span onClick={()=>this.cloneSingLine()}>新加一个条件</span>
				</div>
				
			</div>
		)
	}
}
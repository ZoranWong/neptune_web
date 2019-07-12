import React from 'react';
import SingleLineDisabled from './SingleLineDisabled'
import './index.sass'
import {Switch} from "antd";
import {getRandom} from "../../utils/dataStorage";
export default class SingleGroupDisabled extends React.Component{
	constructor(props){
		super(props);
		this.item = props.item;
		console.log(this.item);
		this.state = {
			singleAry:[{key:'',value:'',operation:'', cid: getRandom()}],
		}
	};
	
	
	render(){
		return (
			<div className="groupBox">
				<div className={this.state.singleAry.length > 1? 'lines' :''}>
					{
						this.state.singleAry.map((item, key)=>{
							return <SingleLineDisabled
								key={key}
								item = {item}
							/>
						})
					}
					<div className="switch">
						{
							this.state.singleAry.length >1?<Switch disabled={true} checkedChildren="且" unCheckedChildren="或" defaultChecked />:''
						}
					</div>
				</div>
				
				<div className="addNew">
					<i className="iconfont">&#xe822;</i>
					<span onClick={()=>this.cloneSingLine()}>新加一个条件</span>
				</div>
				
			</div>
		)
	}
}
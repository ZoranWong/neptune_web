import React from 'react';
import SingleLine from './SingleLine'
import './index.sass'
import {Switch} from "antd";
import {getRandom} from "../../utils/dataStorage";
export default class SingleGroup extends React.Component{
	constructor(props){
		super(props);
		this.item = props.item;
		this.gid = this.item.gid;
		this.state = {
			singleAry:[{key:'',value:'',operation:'', cid: getRandom()}],
			logic:'and'
		}
	};
	
	
	cloneSingLine = () =>{
		let data = {key:'',value:'',operation:'', cid: getRandom()};
		this.setState({singleAry:[...this.state.singleAry,data]});
	};
	
	deleteSingle = (id) =>{
		let newAry = this.state.singleAry.filter(item=>{
			return item.cid !== id
		});
		if(!newAry.length){
			this.props.watch(this.gid)
		}
		this.setState({singleAry:newAry});
	};
	
	saveData = (data) =>{
		let item = this.state.singleAry.find(item=>{
			return item.cid == data.cid
		});
		if(item){
			let ary = this.state.singleAry;
			ary.forEach((i,index)=>{
				if(i.cid == item.cid){
					ary[index] = data
				}
			});
			this.setState({singleAry:ary})
		} else {
			this.setState({singleAry:[...this.state.singleAry,data]});
		}
		this.props.onSaveData()
	};
	switchChange = (checked) =>{
		if(checked){
			this.setState({logic:'and'})
		} else {
			this.setState({logic:'or'})
		}
	};
	
	
	render(){
		let lineNeedRemove = this.state.singleAry.length > 1 || this.props.groupNeedRemove;
		return (
			<div className="groupBox">
				<div className={this.state.singleAry.length > 1? 'lines' :''}>
					{
						this.state.singleAry.map((item, key)=>{
							return <SingleLine
								key={key + '-' + item.cid}
								item = {item}
								lineNeedRemove={lineNeedRemove}
								deleteSingle={()=>this.deleteSingle(item.cid)}
								onData={this.saveData}
							/>
						})
					}
					<div className="switch">
						{
							this.state.singleAry.length >1?<Switch
								checkedChildren="且"
								unCheckedChildren="或"
								onChange={this.switchChange}
								defaultChecked />:''
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
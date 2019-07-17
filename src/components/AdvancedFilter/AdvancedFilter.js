import React from 'react';
import SingleGroup from './SingleGroup'
import {Switch} from "antd";
import {getRandom} from "../../utils/dataStorage";
import './index.sass'
export default class AdvancedFilter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			groupAry:[{gid:getRandom(),conditions:[], logic: 'and'}],
			logic:'and'
		};
		this.child = React.createRef();
	};

	clearFilter = () =>{
		this.setState({groupAry:[{gid:getRandom(),conditions:[], logic: 'and'}]})
		this.child.current.clearFilter()
	};
	
	cloneGroupLine = () =>{
		if(this.props.renderChild){
			this.props.renderChild(true)
		}
		let data = {gid:getRandom(),conditions:[], logic: 'and'};
		this.setState({groupAry:[...this.state.groupAry,data]})
		
	};
	
	watch = (id) =>{
		if(this.props.renderChild){
			this.state.groupAry.length >2 ?this.props.renderChild(true):this.props.renderChild(false)
		}
		let newAry = this.state.groupAry.filter(item=>{
			return item.gid !== id
		});
		this.setState({groupAry:newAry});
		
	};
	
	
	
	
	switchChange = (checked)=>{
		if(checked){
			this.setState({logic:'and'})
		} else {
			this.setState({logic:'or'})
		}
	};
	
	saveData = () =>{
		let item = this.state.groupAry.find(item=>{
			return item.gid == this.child.current.item.gid
		});
		
		if(item){
			let data = this.child.current.state.singleAry;
			let ary = this.state.groupAry;
			ary.forEach(i=>{
				if(i.gid == item.gid){
					i.conditions = data;
					i.logic = this.child.current.state.logic;
				}
			});
			this.setState({groupAry:ary})
		} else {
			this.setState({groupAry:[...this.state.groupAry,this.child.current.state.singleAry]})
		}
		let data = {
			conditions:this.state.groupAry,
			logic:this.state.logic
		};
		this.setState({data:data})
	};
	
	render(){
		let groupNeedRemove = this.state.groupAry.length > 1;
		return (
			<div>
				<div className={groupNeedRemove?'groups':''}>
					{
						this.state.groupAry.map(item=>{
							return <SingleGroup
								key={item.gid}
								ref={this.child}
								item={item}
								watch={this.watch}
								onSaveData={this.saveData}
								groupNeedRemove={groupNeedRemove}
							/>
						})
					}
					<div className="switch">
						{
							this.state.groupAry.length >1?<Switch
								checkedChildren="且"
								unCheckedChildren="或"
								onChange={this.switchChange}
								defaultChecked />:''
						}
					</div>
				</div>
				<div className={groupNeedRemove?'addNewGroup addNewGroupTwo':'addNewGroup'} onClick={this.cloneGroupLine}>
					<i className="iconfont">&#xe822;</i>
					<span >新加一个条件</span>
				</div>
			</div>
		)
	}
}
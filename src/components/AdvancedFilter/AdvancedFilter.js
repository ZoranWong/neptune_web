import React from 'react';
import SingleGroup from './SingleGroup'
import {Modal, Switch} from "antd";
import {getRandom} from "../../utils/dataStorage";
import './index.sass'
export default class AdvancedFilter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			groupAry:[{gid:getRandom(),conditions:[], logic: 'and'}],
		};
		this.child = React.createRef();
	};
	
	handleCancel = () =>{
		this.props.onCancel()
		this.setState({groupAry:[{gid:getRandom(),conditions:[], logic: 'and'}]})
	};
	
	cloneGroupLine = () =>{
		let data = {gid:getRandom(),conditions:[], logic: 'and'};
		this.setState({groupAry:[...this.state.groupAry,data]})
	};
	
	watch = (id) =>{
		let newAry = this.state.groupAry.filter(item=>{
			return item.gid !== id
		});
		this.setState({groupAry:newAry});
	};
	
	
	onSubmit = () =>{
	
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
					i.conditions = data
				}
			});
			this.setState({groupAry:ary})
		} else {
			this.setState({groupAry:[...this.state.groupAry,this.child.current.state.singleAry]})
		}
		
		setTimeout(()=>{
			console.log(this.state.groupAry);
		},1000)

		let data = {
			conditions:this.state.groupAry,
			logic:'and'
		};

	};
	
	render(){
		let groupNeedRemove = this.state.groupAry.length > 1;
		return (
			<div>
				<Modal
					title="高级筛选"
					width={1000}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.onSubmit}
					cancelButtonProps={this.handleCancel}
					cancelText="清空筛选条件"
					okText="确认"
				>
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
								this.state.groupAry.length >1?<Switch checkedChildren="且" unCheckedChildren="或" defaultChecked />:''
							}
						</div>
					</div>
					<div className={groupNeedRemove?'addNewGroup addNewGroupTwo':'addNewGroup'}>
						<i className="iconfont">&#xe822;</i>
						<span onClick={this.cloneGroupLine}>新加一个条件</span>
					</div>
				</Modal>
			</div>
		)
	}
}
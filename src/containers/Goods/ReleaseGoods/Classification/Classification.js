import React, {Component} from 'react';
import {Cascader, Tag} from "antd";
import {SonClassification} from "../../../../api/goods/classification";

class Classification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allClassification:[],
			selectedItems:[],
		};
	}
	
	
	
	
	componentDidMount() {
		SonClassification({}).then(r=>{
			this.setState({allClassification:r})
		});
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.def) return;
		let selectedItems = [];
		this.state.allClassification.forEach(item=>{
			nextProps.def.forEach(i=>{
				if(item.id === i){
					selectedItems.push(item)
				}
			})
		});
		this.setState({selectedItems})
	}
	
	
	cascaderChange = id =>{
		let {allClassification,selectedItems} = this.state;
		let all = [];
		allClassification.forEach(item=>{
			all.push(item);
			if(item.children.length){
				item.children.forEach(i=>{
					i.parentId = item.id;
					all.push(i)
				})
			}
		});
		all.forEach(item=>{
			id.forEach(i=>{
				if(i === item.id){
					selectedItems.length ?
					selectedItems.forEach(repeat=>{
						if(repeat.id === i){
							selectedItems = selectedItems.filter(r=> r.id !== i)
						} else {
							item.parentId && selectedItems.push(allClassification.filter(parent=>parent.id === item.parentId)[0]);
							selectedItems.push(item);
						}
					})
						:
					item.parentId && selectedItems.push(allClassification.filter(parent=>parent.id === item.parentId)[0]);
					selectedItems.push(item);
				}
			})
		});
		
		let data = {};
		selectedItems = selectedItems.reduce(function(arr, current) {
			
			if(!data[current.id]){
				data[current.id] = true ;
				arr.push(current);
			}
			
			return arr
			
		}, []);
		this.setState({selectedItems});
	};
	
	closeTag = (tag) =>{
		let {selectedItems} = this.state;
		console.log(selectedItems);
		selectedItems = selectedItems.filter(item=> item.id !== tag.id);
		let hasSonTag = false;
		if(tag.parentId){
			selectedItems.forEach(item=>{
				if(item.parentId === tag.parentId){
					hasSonTag = true
				}
			});
			if(!hasSonTag){
				selectedItems = selectedItems.filter(item=> item.id !== tag.parentId);
			}
		}
		this.setState({selectedItems})
	};
	
	
	render() {
		let {selectedItems} = this.state;
		return (
			<div>
				<Cascader
					value={this.state.value}
					fieldNames={{label:'name',value:'id'}}
					expandTrigger="hover"
					options={this.state.allClassification}
					onChange={this.cascaderChange}
					placeholder="请选择商品分类"
				/>
				{
					selectedItems.map(item=>(
						<Tag closable={!item.children || !item.children.length} key={item.id} onClose={()=>this.closeTag(item)} >
							{item.name}
						</Tag>))
				}
				
			</div>
		);
	}
}

export default Classification;

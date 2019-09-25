import React, {Component} from 'react';
import {Cascader, Tag} from "antd";
import {SonClassification} from "../../../../api/goods/classification";

class Classification extends Component {
	
	state = {
		allClassification:[],
		selectedItems:[],
	};
	
	componentDidMount() {
		SonClassification({}).then(r=>{
			this.setState({allClassification:r})
		});
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
							console.log('id');
							selectedItems = selectedItems.filter(r=> r.id !== i)
						} else {
							console.log('else');
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
		selectedItems = selectedItems.filter(item=> item.id !== tag.id);
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
						<Tag closable key={item.id} onClose={()=>this.closeTag(item)} >
							{item.name}
						</Tag>))
				}
				
			</div>
		);
	}
}

export default Classification;

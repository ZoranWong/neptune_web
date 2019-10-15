import React from "react";
import {Tag} from 'antd'
import IconFont from "../../../../utils/IconFont";
import NewSon from "./AddSpecValue";

export default class SpecItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newSonVisible:false,
			SelectedSpecification:[],
			specItemData: {},
			parent:{}
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.SelectedSpecification) return;
		
	}
	
	componentDidMount() {
		let data = {};
		this.props.SelectedSpecification.forEach(item=>{
			data[item.id] = item.values
		});
		this.setState({SelectedSpecification:this.props.SelectedSpecification,specItemData:data},()=>{
			this.props.renderTable();
		});
	}
	
	// 新增规格值
	createNewSon = (specId, values) =>{
		let copySpecItemData = this.state.specItemData;
		
		copySpecItemData[specId] = [];
		
		values.forEach(item=>{
			copySpecItemData[specId].push(item);
		});
		this.setState({specItemData:copySpecItemData});
		this.props.renderTable();
		this.hideNewSon()
	};
	showNewSon = (item) =>{
		console.log(item);
		this.setState({newSonVisible:true,parent:item})
	};
	hideNewSon = () =>{
		this.setState({newSonVisible:false})
	};
	
	// 删除规格 closeName
	closeName = (id) =>{
		let names = this.state.SelectedSpecification;
		names = names.filter(item=>item.id != id);
		this.setState({SelectedSpecification:names});
		this.props.onSubmit(names)
	};
	
	closeValue = (pId,id) =>{
		let itemData = this.state.specItemData;
		for (let key in itemData){
			if(key == pId){
				itemData[key] = itemData[key].filter(item=>item.id != id)
			}
		}
		this.setState({specItemData:itemData});
		this.props.renderTable();
	};
	
	render() {
		let spec = [];
		spec = this.props.SelectedSpecification?this.props.SelectedSpecification:this.state.SelectedSpecification;
		return (
			<div>
				<NewSon
					visible={this.state.newSonVisible}
					onCancel={this.hideNewSon}
					onSubmit={this.createNewSon}
					parent={this.state.parent}
				/>
				<div className="s_tagBox">
					{spec.length?spec.map(item=>{
						return (
							<div className="s_tags" key={item.id}>
								<div className="top">
									<Tag closable onClose={()=>this.closeName(item.id)}>
										{item.name}
									</Tag>
									<div className="addNewSon" onClick={()=>this.showNewSon(item)} >
										<IconFont type="icon-plus-circle-fill" />新增规格值
									</div>
								</div>
								<div className="bottom" style={{'marginTop':this.state.specItemData[item.id]?'20px':'0'}}>
									{
										this.state.specItemData[item.id]&&(
											this.state.specItemData[item.id].map(r=>{
												return <Tag closable key={r.id} onClose={()=>this.closeValue(item.id,r.id)} >
													{r.value}
												</Tag>
											})
										)
									}
								</div>
							</div>
						)
					}):''}
				</div>
			</div>
			
		)
	}
	
}

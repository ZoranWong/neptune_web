import React from "react";
import {Tag} from 'antd'
import IconFont from "../../../../utils/IconFont";
import NewSon from "./AddSpecValue";

export default class SpecItem extends React.Component{
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			newSonVisible:false,
			SelectedSpecification:[],
			specItemData: {},
			parent:{}
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.SelectedSpecification) return;
		this.setState({SelectedSpecification:nextProps.SelectedSpecification})
	}
	
	// 新增规格值
	createNewSon = (specId, values) =>{
		let copySpecItemData = this.state.specItemData;
		if(!copySpecItemData[specId]){
			copySpecItemData[specId] = []
		}
		copySpecItemData[specId].push(values[0]);
		console.log(copySpecItemData);
		this.setState({specItemData:copySpecItemData});
		this.props.renderTable();
		this.hideNewSon()
	};
	showNewSon = (item) =>{
		this.setState({newSonVisible:true,parent:item})
	};
	hideNewSon = () =>{
		this.setState({newSonVisible:false})
	};
	
	
	render() {
		return (
			<div>
				<NewSon
					visible={this.state.newSonVisible}
					onCancel={this.hideNewSon}
					onSubmit={this.createNewSon}
					parent={this.state.parent}
				/>
				<div className="s_tagBox">
					{this.state.SelectedSpecification.length?this.state.SelectedSpecification.map(item=>{
						return (
							<div className="s_tags" key={item.id}>
								<div className="top">
									<Tag closable >
										{item.name}
									</Tag>
									<div className="addNewSon" onClick={()=>this.showNewSon(item)} >
										<IconFont type="icon-plus-circle-fill" />新增规格值
									</div>
								</div>
								<div className="bottom" style={{'marginTop':this.state.specItemData[item.id]?'20px':'0'}}>
									{
										this.state.specItemData[item.id]?(
											this.state.specItemData[item.id].map(r=>{
												return <Tag closable key={r.id} >
													{r.value}
												</Tag>
											})
										):''
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
import React from "react";
import './specification.sass'
import {Button, Input, InputNumber, Switch, Table, Tag} from "antd";
import AddSpecName from "./AddSpecName";
import IconFont from "../../../../utils/IconFont";
import SpecItem from "./SpecItem";
import Upload from '../../../../components/Upload/Upload'
import {arrayMultiplication} from "../../../../utils/dataStorage";
import _ from 'lodash'

export default class Specification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newSpecificationVisible:false,
			tableChildren:[],
			SelectedSpecification:props.spec,
			sonData:[],
			data:[],// 表格渲染规格值
		};
		this.child = React.createRef();
		this.specItemChild = React.createRef();
		this.uploadChild = React.createRef();
	}
	
	componentDidMount() {
		this.setState({data:this.props.entities})
		console.log(this.props.entities, 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');
	}
	
	// componentWillReceiveProps(nextProps, nextContext) {
	// 	if(!nextProps.entities || !nextProps.entities.length) return;
	// 	this.setState({data:nextProps.entities})
	// }
	
	// 新增规格
	showNewSpecification = () =>{
		this.setState({newSpecificationVisible:true})
	};
	hideNewSpecification = () =>{
		this.setState({newSpecificationVisible:false})
	};
	createNewSpecification = (ary) =>{
		let specs = this.state.SelectedSpecification;
		if(specs.length){
			specs.forEach(item=>{
				if(item.id != ary.id){
					this.setState({SelectedSpecification:[...this.state.SelectedSpecification,ary]});
				}
			})
		} else {
			this.setState({SelectedSpecification:[...this.state.SelectedSpecification,ary]});
		}
		this.hideNewSpecification();
		this.renderTable()
	};
	
	handleDeleteSpecification = (data) =>{
		this.setState({SelectedSpecification:data})
	};
	
	// 数据变更时渲染表格
	renderTable = () =>{
		console.log('------------ start render -------------');
		console.log(this.props.entities, '------------props-----------------');
		let data = [];
		let newTableData = [];
		console.log(this.specItemChild.current, '=================>');
		if (!this.props.entities.length ) {
			// 新建
			if(this.specItemChild.current){
				let specValue = this.specItemChild.current.state.specItemData;
				let specValueArray = [];
				for ( let key in specValue){
					specValue[key].forEach(item=>{
						item["parentKey"] = key
					});
					specValueArray.push(specValue[key])
				}
				console.log(this.state.data, '+++++++++++++++=');
				console.log(specValueArray, 'x[[[[[[[[[[[[[[[[[[[[[[[');
				data = arrayMultiplication.apply(this,specValueArray);
				console.log(data,'9090090');
				data.forEach(item=>{
					if(item.value){
						console.log(item, '________________item___________________');
						let d = {};
						let key = `value${item["parentKey"]}`;
						let id = `id${item["id"]}`;
						d[key] = item['value'];
						d[id] = item['id'];
						d['parentKey']=item["parentKey"];
						d['id'] = item['id'];
						newTableData.push(d);
					} else {
						console.log(item, '_______________ go _item___________________');
						let d = {};
						item.forEach(i=>{
							let key = `value${i["parentKey"]}`;
							let id = `id${i["id"]}`;
							d[key] = i['value'];
							d[id] = i['id'];
							d['id'] = i['id']
						});
						console.log(d);
						newTableData.push(d)
					}
					
				});
				console.log(newTableData,'lllllllllllll');
			}
			this.setState({data: newTableData})
		} else {
			// 编辑
			let entities = this.props.entities;
			if (this.specItemChild.current) {
				_.map(entities, entity => {
					for (let key in entity.spec) {
						_.map(this.specItemChild.current.state.specItemData[key], spec => {
							if (spec.id === entity.spec[key]) {
								console.log('2222222222222');
								entity[`value${key}`] = spec.name
							}
						})
					}
					console.log(entity, '...........................');
				})
			}
			this.setState({data: entities})
		}
		
		// if(this.props.entities.length){
		// 	let data = this.state.data;
		// 	console.log(data,'ggggggggggggggggg');
		// 	let newData = [];
		// 	data.forEach((item,index)=>{
		// 		newTableData.forEach((r,i)=>{
		// 			if(index === i){
		// 				newData.push(Object.assign(item,r));
		// 			} else {
		//
		// 			}
		// 		})
		// 	});
		// 	this.setState({data: newData})
		// } else {
		//
		// }
		
		
	};
	
	// 新增规格值时同步至所属父规格下
	updateSelectedSpecification = (specValue) => {
		console.log(this.state.SelectedSpecification, 'old SelectedSpecification');
		let specs = this.state.SelectedSpecification;
		_.map(specs, (spec) => {
			if (!spec['spec_value']) {
				spec['spec_value'] = [];
			}
			if (specValue[0].parentKey == spec.id) {
				spec['spec_value'].push(specValue[0])
			}
		});
		console.log(specs);
		this.setState({SelectedSpecification: specs})
	};
	
	
	deleteTableLine = (record) =>{
		let ary = this.state.data;
		ary.map((item,index)=>{
			if(JSON.stringify(record) == JSON.stringify(item)){
				ary.splice(index,1)
			}
		});
		this.setState({data:ary})
	};
	
	// 编辑时改变列表
	tableChange = (e, type, record) => {
		console.log(e);
		console.log(record);
		let entities = this.state.data;
		console.log(entities);
		
		_.map(entities, (entity) => {
			if (entity.id === record.id) {
				entity[type] = e.target.value
			}
		})
		this.setState({data: entities})
	};
	
	
	render() {
		const {SelectedSpecification} = this.state;
		console.log(SelectedSpecification, '.....S');
		let tableChild = [];
		SelectedSpecification.forEach(item=>{
			tableChild.push({'title':item.name,dataIndex:`value${item.id}`,align:'center',})
		});
		console.log(SelectedSpecification, 'this is the new specs');
		console.log(this.state.data, ')))))))))))))))))))))');
		let columns = [
			{
				title: '商品规格',
				dataIndex: '111',
				align:'center',
				children:tableChild
			},
			{
				title: '规格图片',
				className: 'column-money',
				align:'center',
				render:(text,record) =>{
					console.log(record, '^^^^^^^^^^^^^^^^6');
					if(record.name){
						return <Upload ref={this.uploadChild} defaultImg={record.image} text=""/>
					} else {
						return <Upload ref={this.uploadChild} defaultImg={record.image} text=""/>
					}
				}
			},
			{
				title: '商品编码',
				dataIndex: 'barcode',
				align:'center',
				render:(text,record)=>{
					console.log(record, '^^^^^^^^^^^^7777777777');
					if(record.name){
						return <Input placeholder='请输入商品编码'  value={record.barcode} onChange={(e)=>this.tableChange(e, 'barcode',record)}/>
					} else {
						return <Input placeholder='请输入商品编码' onChange={(e)=>{
							record.barcode = e.target.value;
						}} />
					}
				}
			},
			{
				title: '零售价',
				dataIndex: 'retail_price',
				align:'center',
				render:(text,record)=>{
					if(record.name){
						return <Input   type="number" addonAfter="元" disabled={true} value={record.retail_price} onChange={(e)=>this.tableChange(e, 'retail_price',record)}/>
					} else {
						return <Input  type="number" disabled={!!(this.props.entities && this.props.entities.length)} addonAfter="元"  onChange={(e)=>{
							record.retail_price = e.target.value;
						}} />
					}
				}
			},
			{
				title: '成本价',
				dataIndex: 'cost_price',
				align:'center',
				render:(text,record)=>{
					
					if(record.name){
						return <Input  type="number" value={record.cost_price} addonAfter="元" onChange={(e)=>this.tableChange(e, 'cost_price',record)}/>
					} else {
						return <Input  type="number" addonAfter="元" onChange={(e)=>{
							record.cost_price = e.target.value;
						}}/>
					}
				}
			},
			{
				title: '市场价'	,
				dataIndex: 'market_price',
				align:'center',
				render:(text,record)=>{
				
					if(record.name){
						return <Input type="number" value={record.market_price}  addonAfter="元" onChange={(e)=>this.tableChange(e, 'market_price',record)} />
					} else {
						return <Input type="number"  addonAfter="元" onChange={(e)=>{
							record.market_price = e.target.value;
						}} />
					}
				}
			},
			// {
			// 	title: '是否显示市场价'	,
			// 	dataIndex: 'show_market_price',
			// 	align:'center',
			// 	render:(text,record)=>{
			//
			// 		if(record.name){
			// 			return <Switch
			// 				checked={record['show_market_price']}  onChange={(e)=>{
			// 				let entities = this.state.data;
			//
			// 				_.map(entities, (entity) => {
			// 					if (entity.id === record.id) {
			// 						entity['show_market_price'] = e
			// 					}
			// 				});
			// 				this.setState({data: entities})
			// 			}}/>
			// 		} else {
			// 			return <Switch
			// 				  onChange={(e)=>{
			// 					console.log(record, '=====>');
			// 					record['show_market_price'] = e
			// 			}}/>
			// 		}
			// 	}
			// },
			{
				title: '操作',
				render: (text,record)=>(
					<IconFont type="icon-delete-fill" onClick={()=>this.deleteTableLine(record)}/>
				),
				align:'center',
			}
		];
		
		if (this.props.entities && this.props.entities.length){
			columns.pop()
		}
		
		
		
		return (
			<div className="specification">
				<AddSpecName
					visible={this.state.newSpecificationVisible}
					onCancel={this.hideNewSpecification}
					onSubmit={this.createNewSpecification}
					ref={this.child}
					renderTable={this.state.renderTable}
				/>
				
				<SpecItem
					SelectedSpecification={this.state.SelectedSpecification}
					ref={this.specItemChild}
					renderTable={this.renderTable}
					onSubmit={this.handleDeleteSpecification}
					isEdit={this.props.isEdit}
					onUpdate={this.updateSelectedSpecification}
				/>
				<div className="specification_header">
					<Button type="primary" size="small" onClick={this.showNewSpecification} disabled={(this.props.entities && this.props.entities.length)?true: false}>新增规格</Button>
				</div>
				<div className="specification_body">
					<Table
						columns={columns}
						dataSource={this.state.data}
						bordered
						pagination={false}
						rowKey={record => record.id}
					/>
				</div>
				
			</div>
		)
	}
	
}

import React from "react";
import './specification.sass'
import {Button, Input, Table, Tag} from "antd";
import AddSpecName from "./AddSpecName";
import IconFont from "../../../../utils/IconFont";
import SpecItem from "./SpecItem";
import {arrayMultiplication} from "../../../../utils/dataStorage";

export default class Specification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newSpecificationVisible:false,
			tableChildren:[],
			SelectedSpecification:[],
			sonData:[],
			data:[],// 表格渲染规格值
		};
		this.child = React.createRef();
		this.specItemChild = React.createRef();
	}
	
	
	// 新增规格
	showNewSpecification = () =>{
		this.setState({newSpecificationVisible:true})
	};
	hideNewSpecification = () =>{
		this.setState({newSpecificationVisible:false})
	};
	createNewSpecification = (ary) =>{
		console.log(ary,'00000');
		this.setState({SelectedSpecification:[...this.state.SelectedSpecification,ary]});
		this.hideNewSpecification();
		this.renderTable()
	};
	
	// 数据变更时渲染表格
	renderTable = () =>{
		let data = [];
		let newTableData = [];
		if(this.specItemChild.current){
			let specValue = this.specItemChild.current.state.specItemData;
			let specValueArray = [];
			for ( let key in specValue){
				specValue[key].forEach(item=>{
					item["parentKey"] = key
				});
				specValueArray.push(specValue[key])
			}
			data = arrayMultiplication.apply(this,specValueArray);
			data.forEach(item=>{
				if(item.value){
					let d = {};
					let key = `value${item["parentKey"]}`;
					d[key] = item['value'];
					newTableData.push(d);
				} else {
					let d = {};
					item.forEach(i=>{
						let key = `value${i["parentKey"]}`;
						d[key] = i['value'];
					});
					newTableData.push(d)
				}
				
			})
		}
		this.setState({data: newTableData})
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
	
	
	render() {
		const {SelectedSpecification} = this.state;
		let tableChild = [];
		SelectedSpecification.forEach(item=>{
			tableChild.push({'title':item.name,dataIndex:`value${item.id}`,align:'center',})
		});
		const columns = [
			{
				title: '商品规格',
				dataIndex: '111',
				align:'center',
				children:tableChild
			},
			{
				title: '规格图片',
				className: 'column-money',
				dataIndex: 'thumbnail',
				align:'center'
			},
			{
				title: '商品条码',
				dataIndex: 'barcode',
				align:'center',
				render:(text,record)=>{
					return <Input placeholder='请输入条形码' onChange={(e)=>{
						record.barcodr = e.target.value;
					}} />
				}
			},
			{
				title: '零售价',
				dataIndex: 'retailPrice',
				align:'center',
				render:(text,record)=>{
					return <Input addonAfter="元" onChange={(e)=>{
						record.retailPrice = e.target.value;
					}} />
				}
			},
			{
				title: '成本价',
				dataIndex: 'costPrice',
				align:'center',
				render:(text,record)=>{
					return <Input addonAfter="元" onChange={(e)=>{
						record.costPrice = e.target.value;
					}}/>
				}
			},
			{
				title: '市场价'	,
				dataIndex: 'marketPrice',
				align:'center',
				render:(text,record)=>{
					return <Input addonAfter="元" onChange={(e)=>{
						record.marketPrice = e.target.value;
					}} />
				}
			},
			{
				title: '操作',
				render: (text,record)=>(
					<IconFont type="icon-delete-fill" onClick={()=>this.deleteTableLine(record)}/>
				),
				align:'center'
			},
			
			
		];
		
		
		
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
				/>
				<div className="specification_header">
					<Button type="primary" size="small" onClick={this.showNewSpecification}>新增规格</Button>
				</div>
				<div className="specification_body">
					<Table
						columns={columns}
						dataSource={this.state.data}
						bordered
						pagination={false}
						rowKey={record => record.key}
					/>
				</div>
			</div>
		)
	}
	
}
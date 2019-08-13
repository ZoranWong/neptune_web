import React from "react";
import './specification.sass'
import {Button,Table} from "antd";
import NewSpecification from "./NewSpecification";
import IconFont from "../../../../utils/IconFont";
export default class Specification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newSpecificationVisible:false,
			tableChildren:[]
		}
	}
	
	
	// 新增规格
	showNewSpecification = () =>{
		this.setState({newSpecificationVisible:true})
	};
	hideNewSpecification = () =>{
		this.setState({newSpecificationVisible:false})
	};
	createNewSpecification = (ary) =>{
		this.setState({tableChildren:ary});
		this.hideNewSpecification()
	};
	
	
	
	
	render() {
		const {tableChildren} = this.state;
		console.log(tableChildren);
		let tableChild = [];
		let nameChild = [];
		tableChildren.forEach(item=>tableChild.push({'title':item.name,dataIndex:item.id,align:'center',}));
		console.log(tableChild);
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
				align:'center'
			},
			{
				title: '零售价',
				dataIndex: 'retailPrice',
				align:'center'
			},
			{
				title: '成本价',
				dataIndex: 'costPrice',
				align:'center'
			},
			{
				title: '市场价'	,
				dataIndex: 'marketPrice',
				align:'center'
			},
			{
				title: '操作',
				render: (text,record)=>(
					<IconFont type="icon-delete-fill" />
				),
				align:'center'
			},
			
			
		];
		const data = [
			{
				key: '1',
				name: 'John Brown',
				money: '￥300,000.00',
				address: 'New York No. 1 Lake Park',
			}
		];
		return (
			<div className="specification">
				<NewSpecification
					visible={this.state.newSpecificationVisible}
					onCancel={this.hideNewSpecification}
					onSubmit={this.createNewSpecification}
				/>
				<div className="specification_header">
					<Button type="primary" size="small" onClick={this.showNewSpecification}>新增规格</Button>
				</div>
				<div className="specification_body">
					<Table
						columns={columns}
						dataSource={data}
						bordered
						pagination={false}
						rowKey={record => record.title}
					/>
				</div>
			</div>
		)
	}
	
}
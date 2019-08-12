import React from "react";
import './specification.sass'
import {Button,Table} from "antd";
import NewSpecification from "./NewSpecification";
export default class Specification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newSpecificationVisible:false
		}
	}
	
	
	// 新增规格
	showNewSpecification = () =>{
		this.setState({newSpecificationVisible:true})
	};
	hideNewSpecification = () =>{
		this.setState({newSpecificationVisible:false})
	};
	createNewSpecification = (val) =>{
		this.hideNewSpecification()
	};
	
	
	
	
	render() {
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				align:'center'
			},
			{
				title: 'Cash Assets',
				className: 'column-money',
				dataIndex: 'money',
				align:'center'
			},
			{
				title: 'Address',
				dataIndex: 'address',
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
					/>
				</div>
			</div>
		)
	}
	
}
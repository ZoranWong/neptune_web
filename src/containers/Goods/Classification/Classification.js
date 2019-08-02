import React from 'react';
import {withRouter} from 'react-router-dom'
import './css/classification.sass'
import {Button, Table} from "antd";
import CustomPagination from "../../../components/Layout/Pagination";
class Classification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[
				{
					key: 1,
					name: 'John Brown',
					description:'1111',
				},
				{
					key: 2,
					name: 'Jim Green',
					description:'222',
				},
				{
					key: 3,
					name: 'Joe Black',
					description:'333',
				},
			]
		}
	}
	
	
	addNew = () =>{
	
	};
	
	
	render(){
		const {data} = this.state;
		function NestedTable() {
			const expandedRowRender = () => {
				const columns = [
					{ title: 'cName', dataIndex: 'cName', key: 'cName' },
					{
						title: 'Status',
						key: 'state',
						render: () => (
							<div className="operation">
								<span>编辑</span>
								<span>删除</span>
							</div>
						),
					},
				];
				const data = [];
				for (let i = 0; i < 3; ++i) {
					data.push({
						key: i,
						cName:'牛肉包'
					});
				}
				return <Table columns={columns} dataSource={data} pagination={false} showHeader={false}/>;
			};
			
			const columns = [
				{
					title: '分类',
					dataIndex: 'name',
					key: 'name' ,
					render: (text,record) => <span>{text}</span>
				},
				{
					title: '操作',
					dataIndex: '',
					key: 'x',
					render: () => <div className="operation">
						<span>添加子分类</span>
						<span>删除</span>
					</div>
				},
			];
			
			return (
				<Table
					className="components-table-demo-nested"
					columns={columns}
					expandedRowRender={expandedRowRender}
					dataSource={data}
				/>
			);
		}
		
		
		return (
			<div>
				<div className="chart classification">
					<Button className="addNew" onClick={this.addNew}>
						<i className="iconfont">&#xe7e0;</i>
						新增分类</Button>
					{NestedTable()}
					
				</div>
				<div className="pagination">
					<CustomPagination
						api={this.state.api}
						ref={this.child}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		)
	}
}

export default withRouter(Classification)
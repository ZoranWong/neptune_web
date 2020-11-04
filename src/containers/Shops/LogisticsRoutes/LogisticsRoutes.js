import React, {Component} from 'react';
import {Button, message, Table} from "antd";
import CustomPagination from "../../../components/Layout/Pagination";
import OperateRoute from "./Modal/OperateRoute";
import {deliveryRoutesList,deleteRoute} from "../../../api/shops/routes";

class LogisticsRoutes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api:deliveryRoutesList,
			data:[],
			createVisible:false,
			routeId: ''
		};
		this.child = React.createRef();
	}
	paginationChange = (list)=>{
		this.setState({data:list})
	};
	
	
	
	refresh = ()=>{
		this.child.current.pagination(this.child.current.state.current)
	};
	
	addNew = () =>{
		this.setState({createVisible:true,record: {}})
	};
	closeNew = () =>{
		this.setState({createVisible:false})
	};
	
	editRoute = (record) => {
		this.setState({createVisible:true, record: record})
	};
	
	deleteRoute = (record) => {
		deleteRoute({},record.id).then(r => {
			message.success(r.message);
			this.refresh()
		}).catch(_ => {})
	};
	render() {
		const columns = [
			{
				title: '名称',
				dataIndex: 'name',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginRight: '20px'}}
							onClick={()=>this.editRoute(record)}
						>编辑
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.deleteRoute(record)}
						>删除
						</span>
					</div>
			},
		];
		return (
			<div>
				<OperateRoute
					visible={this.state.createVisible}
					onCancel={this.closeNew}
					refresh={this.refresh}
					record={this.state.record}
				/>
				<div className="chart">
					<Button className="addNew" onClick={this.addNew}>
						<i className="iconfont">&#xe7e0;</i>
						新增路线</Button>
					<Table
						dataSource={this.state.data}
						rowKey={record => record.id}
						pagination={false}
						columns={columns}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
					>
					
					</Table>
				</div>
				<div className="pagination">
					<CustomPagination
						api={this.state.api}
						ref={this.child}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default LogisticsRoutes;

import React from "react";
import './css/index.sass'
import {Button, Table} from "antd";
import IconFont from "../../../utils/IconFont";
import CustomPagination from "../../../components/Layout/Pagination";
import {specificationList} from "../../../api/goods/specification";
import CreateSpecification from "./CreateSpecification";
export default class Specification extends React.Component{
	constructor(props) {
		
		super(props);
		this.state = {
			api:specificationList,
			data:[],
			createSpecification:false,
		};
		this.child = React.createRef();
	}
	
	refresh = () =>{
		this.child.current.pagination(1)
	};
	
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	
	// 新增规格
	showCreateSpecification = () =>{
		this.setState({createSpecification:true})
	};
	hideCreateSpecification = () =>{
		this.setState({createSpecification:false})
	};
	
	render() {
		const columns = [
			{
				title: '规格名称',
				dataIndex: 'name'
			},
			{
				title: '规格值',
				dataIndex:'spec_value',
			}
			,
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
						>
							新增规格值
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
						>
							编辑
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
						>
							删除
						</span>
					</div>
				,
			},
		];
		return (
			<div className="specification">
				
				<CreateSpecification
					visible={this.state.createSpecification}
					onCancel={this.hideCreateSpecification}
					refresh={this.refresh}
				/>
				
				
				<div className="header">
					<Button size="small" onClick={this.showCreateSpecification}>
						<IconFont type="icon-plus-circle" />
						新增规格</Button>
				</div>
				<div className="chart u_chart">
					<Table
						columns={columns}
						rowKey={record => record.id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
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
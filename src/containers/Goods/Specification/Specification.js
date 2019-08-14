import React from "react";
import './css/index.sass'
import {Button, Table,Modal} from "antd";
import IconFont from "../../../utils/IconFont";
import CustomPagination from "../../../components/Layout/Pagination";
import {specificationList,deleteSpecification} from "../../../api/goods/specification";
import CreateSpecification from "./CreateSpecification";
import CreateSpecificationValue from './CreateSpecificationValue'
export default class Specification extends React.Component{
	constructor(props) {
		
		super(props);
		this.state = {
			api:specificationList,
			data:[],
			createSpecification:false,
			createSpecificationValue:false,
			specificationId:'',  // 新增规格值id
		};
		this.child = React.createRef();
	}
	
	refresh = () =>{
		this.child.current.pagination(1)
	};
	
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 删除规格 deleteSpec
	deleteSpec = (id) =>{
		let refresh = this.refresh;
		let ids = [id];
		let confirmModal = Modal.confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			content: (
				<div className="U_confirm">
					确定删除该规格么？
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small',
			},
			onOk() {
				deleteSpecification({ids}).then(r=>{
					refresh()
				}).catch(_=>{})
			}
		});
	};
	
	
	// 新增规格
	showCreateSpecification = () =>{
		this.setState({createSpecification:true})
	};
	hideCreateSpecification = () =>{
		this.setState({createSpecification:false})
	};
	
	// 新增规格值
	showCreateSpecificationValue = (id) =>{
		this.setState({createSpecificationValue:true,specificationId:id})
	};
	hideCreateSpecificationValue = () =>{
		this.setState({createSpecificationValue:false})
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
							onClick={()=>this.showCreateSpecificationValue(record.id)}
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
							onClick={()=>this.deleteSpec(record.id)}
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
				<CreateSpecificationValue
					visible={this.state.createSpecificationValue}
					onCancel={this.hideCreateSpecificationValue}
					refresh={this.refresh}
					id={this.state.specificationId}
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
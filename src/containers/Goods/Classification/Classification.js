import React from 'react';
import {withRouter} from 'react-router-dom'
import './css/classification.sass'
import {Button, Table, Popconfirm} from "antd";
import {createNewFatherClassification,SonClassification,deleteClassification, editClassification} from "../../../api/goods/classification";
import AddNewClassification from "./AddNewClassification";
import AddNewSonClassification from "./AddNewSonClassification";
class Classification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			addNewVisible:false,
			addNewSonVisible:false,
			classificationName:'',
			sonClassificationName:'',
			parentId:'',
			classificationId:''
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.refresh()
	}
	
	refresh = () =>{
		// FatherClassification({}).then(r=>{
		// 	this.setState({data:r.data})
		// }).catch(_=>{});
		SonClassification({}).then(r=>{
			// r.forEach(item=>{
			// 	item.fName = item.name;
			// 	if(item.children.length) {
			// 		item.children.forEach(i=>{
			// 			i.sName = i.name
			// 		})
			// 	}
			// });
			this.setState({data:r})
		})
	};
	
	addNew = () =>{
		this.setState({classificationId: ''}, ()=>{
			this.showAddNewClassification()
		})
	};
	
	addNewSon = (id) =>{
		this.showAddNewSonClassification(id);
	};
	
	// 添加分类
	showAddNewClassification = () =>{
		this.setState({addNewVisible:true})
	};
	hideAddNewClassification = () =>{
		this.setState({addNewVisible:false,classificationName:''})
	};
	submitAddNewClassification = (value) =>{
		let api = this.child.current.state.classificationId ? editClassification : createNewFatherClassification;
		api({name:value},this.child.current.state.classificationId).then(r=>{
			this.hideAddNewClassification();
			this.refresh()
		})
	};
	
	// 添加子分类
	showAddNewSonClassification = (id) =>{
		this.setState({addNewSonVisible:true,parentId:id})
	};
	hideAddNewSonClassification = () =>{
		this.setState({addNewSonVisible:false,sonClassificationName:''})
	};
	submitAddNewSonClassification = (value) =>{
		createNewFatherClassification({name:value,parent_id:this.state.parentId}).then(r=>{
			this.hideAddNewSonClassification();
			this.refresh()
		})
	};
	
	// 查看分类详情
	showDetail = (record) =>{
		this.setState({classificationName:record.name, classificationId: record.id},()=>{
			this.showAddNewClassification();
		})
	};
	// 编辑子分类
	editSonClassification = (record) =>{
		this.setState({sonClassificationName:record.name},()=>{
			this.showAddNewSonClassification()
		})
	};
	
	// 删除分类
	delete = (id) =>{
	
	};
	
	render(){
		const {data} = this.state;
		const _this = this;
		function NestedTable() {
			const expandedRowRender = (record) => {
				const columnsSon = [
					{
						title: 'cName',
						dataIndex: 'name',
						key: 'id',
						render: (text,record) => record.name
					},
					{
						title: 'Status',
						key: 'state',
						render: (r) => (
							<div className="operation">
								<span onClick={()=>_this.editSonClassification(r)}>编辑</span>
								<Popconfirm
									title="确定要删除该分类么"
									okText="确定"
									icon={null}
									cancelText="取消"
									onConfirm={()=>{
										deleteClassification({},r.id).then(r=>{
											_this.refresh()
										})
									}}
								>
									<span>删除</span>
								</Popconfirm>
							</div>
						),
					},
				];
				//  Here to get ChildClassification , params :record.id
				return <Table
					className="innerTable"
					columns={columnsSon}
					rowKey={record => record.id}
					dataSource={record.children}
					pagination={false}
					showHeader={false}/>;
			};
			
			const columns = [
				{
					title: '分类',
					dataIndex: 'name',
					key: 'name' ,
					render: (text,record) => <span className="goodsNames">
						<span>{text}</span>
						<i
							style={{color:'#4F9863',fontSize:'14px',cursor:'pointer'}}
							className="iconfont"
							onClick={()=>_this.showDetail(record)}
						>&#xe7a0;</i>
					</span>
				},
				{
					title: '操作',
					dataIndex: '',
					key: 'x',
					render: (text,record) => <div className="operation">
						<span onClick={()=>_this.addNewSon(record.id)}>添加子分类</span>
						<Popconfirm
							title="确定要删除该分类么"
							okText="确定"
							icon={null}
							cancelText="取消"
							onConfirm={()=>{
								deleteClassification({},record.id).then(r=>{
									_this.refresh()
								})
							}}
						>
							<span>删除</span>
						</Popconfirm>
					</div>
				},
			];
			return (
				<Table
					className="components-table-demo-nested"
					columns={columns}
					rowKey={record => record.id}
					expandedRowRender={expandedRowRender}
					dataSource={data}
					pagination={false}
				/>
			);
		}
		
		
		return (
			<div>
				<AddNewClassification
					visible={this.state.addNewVisible}
					onCancel={this.hideAddNewClassification}
					onSubmit={this.submitAddNewClassification}
					name={this.state.classificationName}
					classificationId={this.state.classificationId}
					ref={this.child}
				/>
				<AddNewSonClassification
					visible={this.state.addNewSonVisible}
					onCancel={this.hideAddNewSonClassification}
					onSubmit={this.submitAddNewSonClassification}
					name={this.state.sonClassificationName}
				/>
				
				
				
				
				<div className="chart classification">
					<Button className="addNew" onClick={this.addNew}>
						<i className="iconfont">&#xe7e0;</i>
						新增分类</Button>
					{NestedTable()}
					
				</div>
			</div>
		)
	}
}

export default withRouter(Classification)

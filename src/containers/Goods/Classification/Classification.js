import React from 'react';
import {withRouter} from 'react-router-dom'
import './css/classification.sass'
import {Button, Table} from "antd";
import CustomPagination from "../../../components/Layout/Pagination";
import {FatherClassification} from "../../../api/goods/classification";
import AddNewClassification from "./AddNewClassification";
import AddNewSonClassification from "./AddNewSonClassification";
import {createNewFatherClassification} from '../../../api/goods/classification'
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
			],
			addNewVisible:false,
			addNewSonVisible:false,
			classificationName:'',
			sonClassificationName:''
		}
	}
	
	componentDidMount() {
		this.refresh()
	}
	
	refresh = () =>{
		FatherClassification({}).then(r=>{
			console.log(r);
		}).catch(_=>{})
	};
	
	addNew = () =>{
		this.showAddNewClassification()
	};
	
	addNewSon = () =>{
		this.showAddNewSonClassification();
	};
	
	// 添加分类
	showAddNewClassification = () =>{
		this.setState({addNewVisible:true})
	};
	hideAddNewClassification = () =>{
		this.setState({addNewVisible:false,classificationName:''})
	};
	submitAddNewClassification = (value) =>{
		// createNewFatherClassification({}).then(r=>{
		// 	console.log(r);
		// })
	};
	
	// 添加子分类
	showAddNewSonClassification = () =>{
		this.setState({addNewSonVisible:true})
	};
	hideAddNewSonClassification = () =>{
		this.setState({addNewSonVisible:false,sonClassificationName:''})
	};
	submitAddNewSonClassification = (value) =>{
		console.log(value);
	};
	
	// 查看分类详情
	showDetail = (record) =>{
		this.setState({classificationName:record.name},()=>{
			this.showAddNewClassification();
		})
	};
	// 编辑子分类
	editSonClassification = (record) =>{
		this.setState({sonClassificationName:record.cName},()=>{
			this.showAddNewSonClassification()
		})
	};
	
	render(){
		const {data} = this.state;
		const _this = this;
		function NestedTable() {
			const expandedRowRender = (record) => {
				const columns = [
					{ title: 'cName', dataIndex: 'cName', key: 'cName' },
					{
						title: 'Status',
						key: 'state',
						render: (r) => (
							<div className="operation">
								<span onClick={()=>_this.editSonClassification(r)}>编辑</span>
								<span>删除</span>
							</div>
						),
					},
				];
				//  Here to get ChildClassification , params :record.id
				const data = [];
				for (let i = 0; i < 3; ++i) {
					data.push({
						key: i,
						cName:'牛肉包'
					});
				}
				return <Table
							className="innerTable"
							columns={columns}
							dataSource={data}
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
					render: () => <div className="operation">
						<span onClick={_this.addNewSon}>添加子分类</span>
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
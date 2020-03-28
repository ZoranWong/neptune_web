import React, {Component} from 'react';
import {Table, Button, Modal, message} from "antd";
import AddNewClassification from "../Modal/AddNewClassification";
import AddProductsToCate from "../Modal/AddProductsToCate";
import {newCate, actCateList, deleteCate} from "../../../../api/activities";

class CakeClassification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: '分类名称',
					dataIndex: 'name'
				},
				{
					title: '操作',
					render: (text,record) => (
						<div>
							{/*<span onClick={()=>this.add(record)} style={{color: '#4f9863', cursor: 'pointer', marginRight: '10px'}}>添加商品</span>*/}
							<span onClick={()=>this.delete(record)} style={{color: '#4f9863', cursor: 'pointer', marginRight: '10px'}}>删除</span>
						</div>
					)
				},
			],
			data: [],
			createCateVisible: false,
			addCateVisible: false,
			cateId: ''
		}
		
	}
	
	componentDidMount() {
		console.log(this.props);
		this.setState({actId: this.props.location.state.actId}, ()=>{
			this.refresh()
		})
	}
	
	refresh = () => {
		actCateList({},this.state.actId).then(r=>{
			this.setState({data: r.data})
		}).catch(_=>{})
	};
	
	delete = (record) => {
		let refresh = this.refresh;
		let actId = this.state.actId;
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
			maskClosable:true,
			content: (
				<div className="U_confirm">
					确定删除该分类么？
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small'
			},
			onOk() {
				let categories_ids = [];
				categories_ids.push(record.id);
				deleteCate({},actId,categories_ids).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			},
			onCancel() {
			
			},
		});
	};
	
	createNewCate = () => {
		this.setState({createCateVisible: true})
	};
	hideNewCate = () => {
		this.setState({createCateVisible: false})
	};
	submitNewCate = (name) => {
		newCate({name: name, sort: 1}, this.state.actId).then(r=>{
			this.hideNewCate();
			this.refresh()
		}).catch(_=>{})
	};
	
	add = (record) => {
		this.setState({addCateVisible: true, cateId: record.id})
	};
	hideCates = () => {
		this.setState({addCateVisible: false})
	};
	submitCates = (data) => {
	
	};
	
	render() {
		const newProps = {
			visible: this.state.createCateVisible,
			onClose: this.hideNewCate,
			onSubmit: this.submitNewCate
		};
		const cates = {
			visible: this.state.addCateVisible,
			onClose: this.hideCates,
			onSubmit: this.submitCates,
			cateId: this.state.cateId,
			actId: this.state.actId
		};
		return (
			<div>
				<AddNewClassification {...newProps} />
				<AddProductsToCate {...cates} />
				
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<Button size='small' onClick={this.createNewCate}>新增分类</Button>
					<Button size='small' onClick={()=>{
						this.props.history.go(-1)
					}}>返回商品管理</Button>
				</div>
				<div className="chart u_chart">
					<Table
						columns={this.state.columns}
						rowKey={record => record.product_id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
				</div>
			</div>
		);
	}
}

export default CakeClassification;

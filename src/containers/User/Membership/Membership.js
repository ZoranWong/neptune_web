import React from 'react';
import {Button, message, Modal, Table} from "antd";
import CreateNewClass from "./Modal/CreateNewClass";
import {vipList, deleteVip} from "../../../api/user";
import CustomPagination from "../../../components/Layout/Pagination";

class Membership extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			api: vipList,
			data: [],
			addNewClassVisible: false,
			record: ''
		};
		this.child = React.createRef();
		this.modal = React.createRef();
	}
	
	showModal = (boolean) => {
		this.setState({addNewClassVisible: true, isEdit: boolean})
	};
	hideModal = () => {
		this.setState({addNewClassVisible: false})
	};
	
	refresh = () => {
		this.child.current.pagination(this.child.current.state.current)
	};
	
	// 修改/编辑会员等级
	submit = (api,id, name, num, discount) => {
		api({
			grade_name: name,
			score_num: num,
			discount
		},id).then(r=>{
			message.success(r.message);
			this.hideModal();
			this.modal.current.init();
			this.refresh();
		}).catch(_=>{})
	};
	
	edit = (record) => {
		this.setState({record},()=>{
			this.showModal(true)
		})
	};
	
	delete = (id) => {
		let refresh = this.refresh;
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
					确定删除该会员等级么？
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
				// 确定按钮执行操作
				deleteVip({}, id).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			}
		});
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	render(){
		const columns = [
			{
				title: '会员等级',
				dataIndex: 'grade_name',
			},
			{
				title: '所需积分',
				dataIndex: 'score_num',
			},
			{
				title: '享受折扣',
				dataIndex: 'discount',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer','marginRight': '20px'}}
							onClick={()=>this.edit(record)}
						>编辑
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.delete(record.id)}
						>删除
						</span>
					</div>
			},
		];
		const classProps = {
			visible: this.state.addNewClassVisible,
			onCancel: this.hideModal,
			onSubmit: this.submit,
			record: this.state.record,
			isEdit: this.state.isEdit
		};
		return (
			<div className='membership'>
				<CreateNewClass {...classProps} ref={this.modal} />
				
				
				<div className="header">
					<Button size="small" className="btn btnAdd" onClick={()=>this.showModal(false)} >
						<i className="iconfont" style={{color:'#4F9863',fontSize:'12px',marginRight:'6px'}}>&#xe7e0;</i>
						新增会员等级
					</Button>
					<span>注：成为会员的前提是储值</span>
				</div>
				<div className="chart">
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
						text={'条数据'}
					/>
				</div>
			</div>
		)
	}
}
export default Membership

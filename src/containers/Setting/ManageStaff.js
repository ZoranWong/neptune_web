// 管理账号

import React from 'react'
import {Modal, Input, Table, Button, Popconfirm} from 'antd';
import './css/common.sass'
import './css/staffList.sass'
import StaffAuthoritySetting from './StaffAuthoritySetting'
import EditRole from './EditRole'
import {adminDelete, admins} from "../../api/setting";
import {trim} from "../../utils/dataStorage";
const Search = Input.Search;
const { Column } = Table;
class ManageStaff  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tableData:[],
			listAuthVisible:false,   // 员工权限配置
			roleEditVisible:false,    // 修改角色
		};
	}
	
	refresh = () =>{
		admins({limit:50,page:1,role_id:this.state.id}).then(r=>{
			this.setState({tableData:r.data})
		});
		this.props.refresh()
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.onRoles){
			this.setState({roles:nextProps.onRoles})
		}
		if(nextProps.m_role){
			this.setState({id:nextProps.m_role.id});
			admins({limit:50,page:1,role_id:nextProps.m_role.id}).then(r=>{
				this.setState({tableData:r.data})
			})
		}
	}
	
	handleCancel = () => {
		this.props.onClose()
		
	};
	
	/*
	* 员工权限控制
	* */
	showAuth = (record) =>{
		this.handleCancel();
		this.setState({userAuthInfo:record})
		this.setState({listAuthVisible:true})
	};
	closeAuth = () =>{
		this.setState({listAuthVisible:false})
		this.props.onShow()
	};
	
	/*
	* 修改角色
	*  */
	showEditRole = (record) =>{
		this.handleCancel();
		this.setState({userInfo:record});
		this.setState({roleEditVisible:true})
	};
	closeEditRole = () =>{
		this.setState({roleEditVisible:false})
		this.props.onShow()
	};
	
	render() {
		return (
			<div>
				<StaffAuthoritySetting
					visible={this.state.listAuthVisible}
					onClose={this.closeAuth}
					userAuthInfo={this.state.userAuthInfo}
					refresh={this.refresh}
				/>
				<EditRole
					visible={this.state.roleEditVisible}
					onClose={this.closeEditRole}
					onRoles={this.state.roles}
					userInfo={this.state.userInfo}
					refresh={this.refresh}
				/>
				<Modal
					title="管理账号"
					width={1000}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
				>
					<div className="list">
						<Search
							className="searchInput"
							placeholder="请输入员工姓名或手机号码"
							onSearch={value => {
								value = trim(value);
								admins({limit:10,page:1,role_id:this.state.id,search:`name:${value};mobile:${value}`}).then(r=>{
									this.setState({tableData:r.data})
								});
							}}
							onFocus={()=>{
								let rightBtn = document.getElementsByClassName('ant-input-search-button')[0]
								rightBtn.setAttribute("style","background-color:#4f9863!important;color:#FFF!important;border-color: #58A86E!important;box-shadow: 0  0 3px rgba(88,168,110,0.5)!important")
							}}
							onBlur={()=>{
								let rightBtn = document.getElementsByClassName('ant-input-search-button')[0]
								rightBtn.setAttribute("style","background-color:#fff!important;color:#666!important;border-color: #D9D9D9!important;box-shadow: none!important")
							}}
							enterButton
						/>
						
						<div className="listChart">
							<Table dataSource={this.state.tableData} rowKey={record => record.id}>
								<Column
									style={{width:'170px'}}
									title="姓名"
									dataIndex="name"
									key="name"
								/>
								<Column
									style={{width:'150px'}}
									title="手机号码"
									dataIndex="mobile"
									key="mobile" />
								<Column
									style={{width:'190px'}}
									title="新增时间"
									dataIndex="created_at"
									key="created_at" />
								<Column
									title="操作"
									key="action"
									className=" primary"
									render={(text, record) => (
										<span className="operationBox">
											<Popconfirm
												title="确定要删除该账号么"
												okText="确定"
												icon={null}
												cancelText="取消"
												onConfirm={()=>{
													let ids = [];
													ids.push(record.id);
													adminDelete({ids:ids}).then(r=>{
														this.refresh()
														this.props.refresh()
													})
												}}
											>
												<span className="operation">删除账号</span>
											</Popconfirm>
											<span className="operation" onClick={()=>this.showAuth(record)}>权限配置</span>
											<span className="operation" onClick={()=>this.showEditRole(record)}>修改角色</span>
										</span>
									)}
								/>
							</Table>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}
export default ManageStaff
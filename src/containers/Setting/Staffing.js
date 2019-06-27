/////人员配置页

import React from 'react';
import {Button,Table} from 'antd'
import {withRouter} from 'react-router-dom'
import './css/staffing.sass'
import {addRoles, admins, editRoles, roles} from "../../api/setting";
import AddNewStaff from './AddNewStaff'
import StaffList from "./StaffList";
import ManageStaff from './ManageStaff'
import EditName from '../../components/EditName/EditName'
import StaffFrozen from './StaffFrozen'
import AuthoritySetting from './AuthoritySetting'

import '../../mock/list'

const { Column } = Table;
class Staffing extends React.Component{
	constructor(){
		super();
		this.state = {
			// 列表数据
			tableData:[],
			//弹窗可视与否
			visible:false,
			listVisible:false,   // 人员列表页弹窗
			editRoleVisible:false,    // 编辑/新建角色弹窗
			frozenVisible:false,  //已冻结账号
			authoritySettingVisible:false,    //权限配置
			addStaffVisible:false,    // 新增账号
			manageStaffVisible:false,  // 账号管理
			// 传递到子组件的参数
		}
	}
	componentWillMount() {
		this.refresh()
	}
	componentDidMount() {
	
	}
	
	refresh = () => {
		roles({}).then(r=>{
			this.setState({tableData:r.data});
			let roles = [];
			r.data.forEach(item=>{
				roles.push({[item.id]:item.name})
			});
			this.setState({roles:roles});
		});
	};
	
	/*
	* 员工列表
	* */
	showList = () =>{
		this.setState({listVisible:true})
	};
	closeList = () =>{
		this.setState({listVisible:false})
	};
	
	//*
	// 编辑/新建角色
	// */
	showModal = async (record) => {
		await this.setState({
			editInfo:record,
			editRoleVisible: true,
		});
	};
	onCancel = () =>{
		this.setState({editRoleVisible:false})
	};
	onSubmit = (record,value) =>{
		if(record.id){
			editRoles({name:value},record.id).then(r=>{
				this.setState({editRoleVisible:false});
				this.refresh()
			})
		} else {
			addRoles({name:value}).then(r=>{
				this.setState({editRoleVisible:false});
				this.refresh()
			})
		}
		
		
	};
	
	/*
	* 查看已冻结账号
	* */
	showFrozen = () => {this.setState({frozenVisible:true})};
	closeFrozen = () => {this.setState({frozenVisible:false})};
	
	/*
	* 权限配置
	* */
	showAuthoritySetting = (record) => {
		this.setState({
			a_role:record,
			authoritySettingVisible:true
		})
	};
	closeAuthoritySetting = () => {this.setState({authoritySettingVisible:false})};
	
	/*
	* 新增账号
	* */
	showAddStaff = () =>{this.setState({addStaffVisible:true})};
	closeAddStaff = () =>{
		this.setState({addStaffVisible:false})
		this.refresh()
	};
	
	/*
	* 账号管理
	* */
	showManageStaff = (role) =>{this.setState({
		manageStaffVisible:true,
		m_role:role
	})};
	closeManageStaff = () =>{this.setState({manageStaffVisible:false})};
	
	render(){
		return (
			<div>
				<StaffList
					visible={this.state.listVisible}
					onClose={this.closeList}
					onRoles={this.state.roles}
                    refresh={this.refresh}
				/>
				<StaffFrozen
					visible={this.state.frozenVisible}
					onClose={this.closeFrozen}
				/>
				<ManageStaff
					visible={this.state.manageStaffVisible}
					onClose={this.closeManageStaff}
                    onRoles={this.state.roles}
					m_role={this.state.m_role}
                    refresh={this.refresh}
				/>
				<EditName
					visible={this.state.editRoleVisible}
					editInfo={this.state.editInfo}
					onSubmit={this.onSubmit}
					onCancel={this.onCancel}
				/>
				<AddNewStaff
					visible={this.state.addStaffVisible}
					onCancel={this.closeAddStaff}
					onRoles={this.state.roles}
				/>
				<AuthoritySetting
					visible={this.state.authoritySettingVisible}
					onClose={this.closeAuthoritySetting}
					role={this.state.a_role}
                    refresh={this.refresh}
				/>
				
				<div className="header">
					<Button size="small" className="btn btnList" onClick={this.showList}>员工列表</Button>
					<Button size="small" className="btn btnAdd" onClick={this.showModal} >
						<i className="iconfont" style={{color:'#4F9863',fontSize:'12px',marginRight:'6px'}}>&#xe7e0;</i>
						新建角色
					</Button>
					<span className="frozenAccounts" onClick={this.showFrozen}>查看已删除账号</span>
				</div>
				<div className="chart">
					<Table
						dataSource={this.state.tableData}
						rowKey={record => record.id}
					>
						<Column
							className="column"
							title="角色"
							dataIndex="name"
							key="name"
							render={(text, record) => (
								<span>
									<span>{text}</span>
									<i
										style={{color:'#4F9863',fontSize:'14px',marginLeft:'10px',cursor:'pointer'}}
										className="iconfont"
										onClick={()=>this.showModal(record)}
									>&#xe7a0;</i>
								</span>
							)}
						/>
						<Column
							className="column primary"
							title="已配置账号数"
							dataIndex="administrators_count"
							key="administrators_count" />
						<Column
							title="操作"
							key="action"
							className="column"
							render={(text, record) => (
								<span>
									<span className="operation" onClick={()=>this.showManageStaff(record)}>管理账号</span>
									<span className="operation" onClick={()=>this.showAddStaff()}>新增账号</span>
									<span className="operation"
										onClick={()=>this.showAuthoritySetting(record)}
									>
										权限设置</span>
								</span>
							)}
						/>
					</Table>
				</div>
				
				
			</div>
		)
	}
}
export default withRouter(Staffing)
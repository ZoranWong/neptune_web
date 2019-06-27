// 员工列表

import React from 'react'
import {Modal, Input, Table, Button,Popconfirm} from 'antd';
import './css/common.sass'
import './css/staffList.sass'
import {trim} from "../../utils/dataStorage";
import StaffAuthoritySetting from './StaffAuthoritySetting'
import '../../mock/list'
import {adminDelete, admins} from "../../api/setting";
import EditRole from './EditRole'

const Search = Input.Search;
const { Column } = Table;

class StaffList  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tableData:[],
			listAuthVisible:false,   // 员工权限配置
			roleEditVisible:false,    // 修改角色
		};
	}
	
	refresh = () =>{
		admins({limit:50,page:1}).then(r=>{
			let v_list = [];
			r.data.forEach(item=>{
				v_list.push({['visible'+item.id]:false})
			});
			this.setState({tableData:r.data,visible:v_list})
		})
		this.props.refresh()
	};
	
	componentWillMount() {
		this.refresh()
		
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.onRoles){
			this.setState({roles:nextProps.onRoles})
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
		this.setState({listAuthInfo:record});
		this.setState({listAuthVisible:true})
	};
	closeAuth = () =>{
		this.setState({listAuthVisible:false})
	};
	
	/*
	* 修改角色
	*  */
	showEditRole = (record) =>{
		this.handleCancel();
		this.setState({roleInfo:record});
		this.setState({roleEditVisible:true})
	};
	closeEditRole = () =>{
		this.setState({roleEditVisible:false})
	};
	
	render() {
		return (
			<div>
				<StaffAuthoritySetting
					visible={this.state.listAuthVisible}
					onClose={this.closeAuth}
					listAuthInfo={this.state.listAuthInfo}
				/>
				<EditRole
					visible={this.state.roleEditVisible}
					onClose={this.closeEditRole}
					onRoles={this.state.roles}
					userInfo={this.state.roleInfo}
					refresh={this.refresh}
				/>
				<Modal
					title="员工列表"
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
								admins({limit:10,page:1,search:`name:${value};mobile:${value}`}).then(r=>{
									this.setState({tableData:r.data})
								});
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
									style={{width:'150px'}}
									className="max-roles"
									title="角色"
									render={(text,record)=>{
										let roles = [];
										if(record.roles){
											record.roles.forEach(item=>{
												roles.push(item.name)
											})
										}
										return (
											<span>
												{roles.toString()}
											</span>
										)
									}}
									key="roles" />
								<Column
									title="操作"
									key="action"
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
export default StaffList;
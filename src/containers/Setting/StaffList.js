// 员工列表

import React from 'react'
import {Modal, Input, Table, Button,Popover} from 'antd';
import './css/common.sass'
import './css/staffList.sass'

import StaffAuthoritySetting from './StaffAuthoritySetting'
import '../../mock/list'
import {admins} from "../../api/setting";
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
	
	componentWillMount() {
		admins({limit:10,page:1}).then(r=>{
			this.setState({tableData:r.data})
		})
		
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
		const popoverContent = (
			<div className="popover">
				<span className="popoverTitle">确定要删除该账号么</span>
				<div className="btnBox">
					<Button type="default" size="small">取消</Button>
					<Button type="primary" size="small" onClick={()=>{}}>确定</Button>
				</div>
			
			</div>
		);
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
							onSearch={value => console.log(value)}
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
									title="角色"
									dataIndex="roleName"
									key="roleName" />
								<Column
									title="操作"
									key="action"
									className="primary"
									render={(text, record) => (
										<span className="operationBox">
											<Popover
												content={popoverContent}
												trigger="click"
												visible={record.visible}
											>
												<span className="operation" onClick={()=>{
													console.log(record);
													record.visible = true
												}}>删除账号</span>
											</Popover>
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
export default StaffList
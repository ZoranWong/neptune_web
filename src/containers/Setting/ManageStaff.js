// 管理账号

import React from 'react'
import {Modal, Input, Table, Button,Popover} from 'antd';
import './css/common.sass'
import './css/staffList.sass'
import axios from 'axios'
import StaffAuthoritySetting from './StaffAuthoritySetting'
import EditRole from './EditRole'
import FetchApi from "../../utils/fetch-api";
const Search = Input.Search;
const { Column } = Table;
const popoverContent = (
	<div className="popover">
		<span className="popoverTitle">确定要删除该账号么</span>
		<div className="btnBox">
			<Button type="default" size="small">取消</Button>
			<Button type="primary" size="small">确定</Button>
		</div>
	
	</div>
);
class ManageStaff  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tableData:[],
			listAuthVisible:false,   // 员工权限配置
			roleEditVisible:false,    // 修改角色
		};
	}
	
	componentWillMount() {
		FetchApi.newFetch('list.mock','get',{}).then(r=>{
			this.setState({tableData:r.data.data.list})
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
		this.setState({userAuthInfo:record})
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
		this.setState({userInfo:record});
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
					userAuthInfo={this.state.userAuthInfo}
				/>
				<EditRole
					visible={this.state.roleEditVisible}
					onClose={this.closeEditRole}
					onRoles={this.state.roles}
					userInfo={this.state.userInfo}
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
									dataIndex="phone"
									key="phone" />
								<Column
									style={{width:'190px'}}
									title="新增时间"
									dataIndex="time"
									key="time" />
								<Column
									title="操作"
									key="action"
									className=" primary"
									render={(text, record) => (
										<span className="operationBox">
											<Popover
												content={popoverContent}
												trigger="click"
											>
												<span className="operation">删除账号</span>
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
export default ManageStaff
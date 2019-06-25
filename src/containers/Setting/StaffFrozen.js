// 员工列表

import React from 'react'
import {Modal, Input, Table, Button,Popover} from 'antd';
import './css/common.sass'
import './css/staffList.sass'
import axios from 'axios'
const Search = Input.Search;
const { Column } = Table;

class StaffFrozen  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tableData:[],
			confirmLoading: false
		};
	}
	
	componentWillMount() {
	
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	render() {
		return (
			<div>
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
							<Table dataSource={this.state.tableData}>
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
									dataIndex="addTime"
									key="addTime" />
								<Column
									style={{width:'190px'}}
									title="删除时间"
									dataIndex="deleteTime"
									key="deleteTime" />
								<Column
									style={{width:'150px'}}
									title="角色"
									dataIndex="role"
									key="role" />
							</Table>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}
export default StaffFrozen
// 人员配置

import React from 'react'
import {Modal, Input, Table, Button,Popover} from 'antd';
import './css/common.sass'
import './css/staffList.sass'
import { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
const Search = Input.Search;
const { Column } = Table;
const popoverContent = (
	<div className="popover">
		<span className="popoverTitle">确定要删除该账号么</span>
		<div className="btnBox">
			<Button className="btn1">取消</Button>
			<Button className="btn2">确定</Button>
		</div>
	
	</div>
);
class StaffList  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tableData:[],
			confirmLoading: false
		};
	}
	
	componentWillMount() {
		//mock
		const endPoint = '/api/v1/todos';
		const todoSchema = {
			name:Math.random().toFixed(3),
			role: Faker.internet.email(),
			time: () => Faker.lorem.sentence().split(',')[1],
			phone: () => Faker.date.past()
		};
		const requestHandler = (request, generator) => {
			const todoList = generator.next(10, todoSchema);
			return [200, { 'Content-Type': 'application/json' }, JSON.stringify(todoList)];
		};
		Server.mockGet(endPoint, requestHandler)
		Server.on(); // to start mocking /api/v1/todos API
		axios.get('/api/v1/todos').then(({ data }) => {
			// data is an array of 10 todo objects
			
			this.setState({tableData:data.concat(data)})
		});
		
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	render() {
		const {  confirmLoading } = this.state;
		return (
			<div>
				
				<Modal
					title="员工列表"
					width={1000}
					centered={true}
					visible={this.props.visible}
					confirmLoading={confirmLoading}
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
									dataIndex="time"
									key="time" />
								<Column
									style={{width:'150px'}}
									title="角色"
									dataIndex="role"
									key="role" />
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
											<span className="operation">权限配置</span>
											<span className="operation">修改角色</span>
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
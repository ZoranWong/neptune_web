import React from 'react';
import {Button,Icon,Table} from 'antd'
import {withRouter} from 'react-router-dom'
import './staffing.sass'
import { Server, Faker, uid } from 'react-mock'
import axios from 'axios'


const { Column } = Table;



class Staffing extends React.Component{
	constructor(){
		super();
		this.state = {
			tableData:[]
		}
	}
	componentWillMount() {
		//mock
		const endPoint = '/api/v1/todos';
		const todoSchema = {
			accounts:Math.random(),
			role: Faker.internet.email(),
			key: () => Faker.lorem.sentence(),
			id: () => Faker.date.past()
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
	
	
	render(){
		return (
			<div>
				<div className="header">
					<Button className="btn btnList">员工列表</Button>
					<Button className="btn btnAdd">
						<Icon type="plus-circle" />
						新建角色
					</Button>
					<span className="frozenAccounts">查看已冻结账号</span>
				</div>
				<div className="chart">
					<Table dataSource={this.state.tableData}>
						<Column
							className="column"
							title="角色"
							dataIndex="role"
							key="role" />
						<Column
							className="column primary"
							title="已配置账号数"
							dataIndex="accounts"
							key="accounts" />
						<Column
							title="操作"
							key="action"
							className="column"
							render={(text, record) => (
								<span>
									<span className="operation">管理账号</span>
									<span className="operation">新增账号</span>
									<span className="operation">
										<Icon type="lock" />
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
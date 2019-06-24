/////人员配置页

import React from 'react';
import {Button,Icon,Table} from 'antd'
import {withRouter} from 'react-router-dom'
import './css/staffing.sass'
// import { Server, Faker, uid } from 'react-mock'
import axios from 'axios'
// import FetchApi from '../../utils/fetch-api'
import StaffList from "./StaffList";
import EditName from '../../components/EditName/EditName'

const { Column } = Table;



class Staffing extends React.Component{
	constructor(){
		super();
		this.state = {
			tableData:[],
			visible:false,
			listVisible:false,   // 人员列表页弹窗
			editRoleVisible:false,    // 编辑/新建角色弹窗
			editText:'',              //编辑/新建弹窗名字
		}
	}
	componentWillMount() {
		//mock
		const endPoint = '/api/v1/todos';
		const todoSchema = {
			accounts:Math.random(),
			// role: Faker.internet.email(),
			// key: () => Faker.lorem.sentence(),
			// id: () => Faker.date.past()
		};
		const requestHandler = (request, generator) => {
			const todoList = generator.next(10, todoSchema);
			return [200, { 'Content-Type': 'application/json' }, JSON.stringify(todoList)];
		};
		// Server.mockGet(endPoint, requestHandler)
		// Server.on(); // to start mocking /api/v1/todos API
		axios.get('/api/v1/todos').then(({ data }) => {
			// data is an array of 10 todo objects

			this.setState({tableData:data.concat(data)})
		});

	}

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

	showModal = async (name) => {
		await this.setState({
			editText:name,
			editRoleVisible: true,
		});
	};
	onCancel = () =>{
		this.setState({editRoleVisible:false})
	};
	onSubmit = () =>{
		this.setState({editRoleVisible:false})
	};


	render(){
		return (
			<div>
				<StaffList
					visible={this.state.listVisible}
					onClose={this.closeList}
				/>
				<EditName
					visible={this.state.editRoleVisible}
					editName={this.state.editText}
					onSubmit={this.onSubmit}
					onCancel={this.onCancel}
				/>

				<div className="header">
					<Button className="btn btnList" onClick={this.showList}>员工列表</Button>
					<Button className="btn btnAdd" onClick={this.showModal} >
						<i className="iconfont" style={{color:'#4F9863',fontSize:'12px',marginRight:'6px'}}>&#xe7e0;</i>
						新建角色
					</Button>
					<span className="frozenAccounts">查看已删除账号</span>
				</div>
				<div className="chart">
					<Table dataSource={this.state.tableData}>
						<Column
							className="column"
							title="角色"
							dataIndex="role"
							key="role"
							render={(text, record) => (
								<span>
									<span>{text}</span>
									<i
										style={{color:'#4F9863',fontSize:'14px',marginLeft:'10px',cursor:'pointer'}}
										className="iconfont"
										onClick={()=>this.showModal(text)}
									>&#xe7a0;</i>
								</span>
							)}
						/>
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

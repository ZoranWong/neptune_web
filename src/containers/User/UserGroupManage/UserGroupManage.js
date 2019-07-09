import React from 'react';
import {Table, Tabs} from 'antd';
import {getDynamic,addNewGroup,getStatic} from "../../../api/user";
import './css/userGroupManage.sass'
const { TabPane } = Tabs;
const { Column } = Table;
class UserGroupManage extends React.Component{
	
	state = {
		dynamicList:[],
		staticList:[]
	};
	
	componentWillMount() {
		getDynamic({}).then(r=>{
			console.log(r);
		}).catch(_=>{});
		
		
		getStatic({}).then(res=>{
			this.setState({staticList:res.data})
		}).catch(_=>{})
	}
	
	addNewStatic = () =>{
		addNewGroup({name:'111',remark:'2222'},'static').then(r=>{
			console.log(r);
		}).catch(_=>{})
	};
	
	
	
	render(){
		return (
			<div>
				<Tabs defaultActiveKey="dynamic" type="card">
					<TabPane tab="智能群组" key="dynamic">
						<div className="chart">
							<span className="addNew">
								<i className="iconfont">&#xe7e0;</i>
								新建群组</span>
							<Table
								// dataSource={this.state.tableData}
								rowKey={record => record.id}
							>
								<Column
									className="column"
									title="群组名称"
									dataIndex="name"
									key="name"
									render={(text, record) => (
										<span className="editIcon">
									<span>{text}</span>
									<i
										style={{color:'#4F9863',fontSize:'14px',marginLeft:'10px',cursor:'pointer'}}
										className="iconfont"
									>&#xe7ab;</i>
								</span>
									)}
								/>
								<Column
									className="column primary"
									title="建立时间"
									dataIndex="built_at"
									key="built_at" />
								<Column
									className="column primary"
									title="总人数"
									dataIndex="amount"
									key="amount" />
								<Column
									title="操作"
									key="action"
									className="column groupOperation"
									render={(text, record) => (
										<span>
									<span className="operation" >详情</span>
									<span className="operation" >删除</span>
								</span>
									)}
								/>
							</Table>
						</div>
					</TabPane>
					<TabPane tab="静态群组" key="static">
						<div className="chart">
							<span className="addNew" onClick={this.addNewStatic}>
								<i className="iconfont">&#xe7e0;</i>
								新建群组</span>
							<Table
								dataSource={this.state.staticList}
								rowKey={record => record.id}
							>
								<Column
									className="column"
									title="群组名称"
									dataIndex="name"
									key="name"
									render={(text, record) => (
										<span className="editIcon">
									<span>{text}</span>
									<i
										style={{color:'#4F9863',fontSize:'14px',marginLeft:'10px',cursor:'pointer'}}
										className="iconfont"
									>&#xe7ab;</i>
								</span>
									)}
								/>
								<Column
									className="column primary"
									title="建立时间"
									dataIndex="created_at"
									key="created_at" />
								<Column
									className="column primary"
									title="总人数"
									dataIndex="amount"
									key="amount" />
								<Column
									title="操作"
									key="action"
									className="column groupOperation"
									render={(text, record) => (
										<span>
									<span className="operation" >详情</span>
									<span className="operation" >删除</span>
								</span>
									)}
								/>
							</Table>
						</div>
					</TabPane>
				</Tabs>
			</div>
		)
	}
}
export default UserGroupManage
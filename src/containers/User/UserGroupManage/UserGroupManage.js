import React from 'react';
import {Table, Tabs, Button, Popconfirm} from 'antd';
import {getDynamic,getStatic,deleteGroup} from "../../../api/user";
import './css/userGroupManage.sass'
import CreateNewGroup from './CreateNewGroup'
import {adminDelete} from "../../../api/setting";
const { TabPane } = Tabs;
const { Column } = Table;
class UserGroupManage extends React.Component{
	
	state = {
		dynamicList:[],
		staticList:[],
		createVisible:false,
		type:'dynamic'
	};
	
	componentWillMount() {
		this.refresh()
	}
	
	refresh = ()=>{
		getDynamic({}).then(r=>{
			this.setState({dynamicList:r.data})
		}).catch(_=>{});
		
		
		getStatic({}).then(res=>{
			this.setState({staticList:res.data})
		}).catch(_=>{})
	};
	
	addNewStatic = () =>{
		this.setState({type:'static',createVisible:true})
	};
	
	addNewDynamic = () =>{
		this.setState({type:'dynamic',createVisible:true})
	};
	
	onCancel = () =>{
		this.setState({createVisible:false})
	};
	
	render(){
		return (
			<div>
				<CreateNewGroup
					visible={this.state.createVisible}
					type={this.state.type}
					onCancel={this.onCancel}
					refresh={this.refresh}
				/>
				<Tabs defaultActiveKey="dynamic" type="card">
					<TabPane tab="智能群组" key="dynamic">
						<div className="chart">
							<Button className="addNew" onClick={this.addNewDynamic}>
								<i className="iconfont">&#xe7e0;</i>
								新建群组</Button>
							<Table
								dataSource={this.state.dynamicList}
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
									<Popconfirm
										title="确定要删除该账号么"
										okText="确定"
										icon={null}
										cancelText="取消"
										onConfirm={()=>{
											deleteGroup({},record.id).then(r=>{
												this.refresh()
											})
										}}
									>
										<span className="operation" >删除</span>
									</Popconfirm>
								</span>
									)}
								/>
							</Table>
						</div>
					</TabPane>
					<TabPane tab="静态群组" key="static">
						<div className="chart">
							<Button className="addNew" onClick={this.addNewStatic}>
								<i className="iconfont">&#xe7e0;</i>
								新建群组</Button>
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
									<Popconfirm
										title="确定要删除该账号么"
										okText="确定"
										icon={null}
										cancelText="取消"
										onConfirm={()=>{
											let ids = [];
											ids.push(record.id);
											deleteGroup({},record.id).then(r=>{
												this.refresh();
											})
										}}
									>
										<span className="operation" >删除</span>
									</Popconfirm>
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
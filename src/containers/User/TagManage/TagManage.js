import React from 'react';
import {Button, Popconfirm, Table, Tabs} from "antd";
import SearchInput from "../../../components/SearchInput/SearchInput";
import './css/tagManage.sass'
import CreateNewGroup from './CreateNewGroup'
import CreateNewTag from './CreateNewTag'
import {deleteGroup, tagGroupList,tagList,deleteTag} from '../../../api/user'
class TagManage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			createNewVisible:false,
			createTagVisible:false,
			tagGroups:[],
			allTagsInGroup:[],
		}
	}
	
	componentWillMount() {
		this.refresh()
	}
	
	refresh = () =>{
		tagGroupList({}).then(r=>{
			this.setState({tagGroups:r.data});
			tagList({},r.data[0].id).then(r=>{
				this.setState({allTagsInGroup:r.data})
			}).catch(_=>{})
		}).catch(_=>{})
	};
	
	// 创建群组
	showCreateNew = () =>{
		this.setState({createNewVisible:true})
	};
	hideCreateNew = () =>{
		this.setState({createNewVisible:false})
	};
	
	// 创建标签
	showCreateTag = () =>{
		this.setState({createTagVisible:true})
	};
	hideCreateTag = () =>{
		this.setState({createTagVisible:false})
	};
	
	
	searchDatas = () => {
	
	};
	// 编辑标签
	onEdit = (targetKey, action) => {
		this[action](targetKey);
	};
	// 切换标签组
	tagGroupChange = (key)=>{
		tagList({},key).then(r=>{
			this.setState({allTagsInGroup:r.data})
		}).catch(_=>{})
	};
	// 删除标签组
	remove = (key)=>{
		console.log(key);
	};
	
	render(){
		const { TabPane } = Tabs;
		const { Column } = Table;
		return (
			<div>
				<CreateNewGroup
					visible={this.state.createNewVisible}
					onClose={this.hideCreateNew}
					refresh={this.refresh}
				/>
				<CreateNewTag
					visible={this.state.createTagVisible}
					onClose={this.hideCreateTag}
					tagGroups={this.state.tagGroups}
					refresh={this.refresh}
				/>
				
				<div className="header">
					<SearchInput
						getDatas={this.searchDatas}
						text="请输入标签名称"
					/>
					<div className="createNew">
						<Button size="small" className="btn btnAdd fBtn" onClick={this.showCreateNew}>
							<i className="iconfont" style={{color:'#4F9863',fontSize:'12px',marginRight:'6px'}}>&#xe7e0;</i>
							新建分组</Button>
						<Button size="small" className="btn btnAdd" onClick={this.showCreateTag}>
							<i className="iconfont" style={{color:'#4F9863',fontSize:'12px',marginRight:'6px'}}>&#xe7e0;</i>
							新建标签
						</Button>
					</div>
				</div>
				
				<div className="tagGroups">
					{
						this.state.tagGroups&&this.state.tagGroups.length?(
							<Tabs
								defaultActiveKey={this.state.tagGroups[0].id+''}
								onChange={this.tagGroupChange}
								animated={false}
								type="editable-card"
								hideAdd={true}
								onEdit={this.onEdit}
							>
								{
									this.state.tagGroups.map(item=>{
										return (
											<TabPane tab={item.name} key={item.id}>
												<div className="chart">
													<Table
														dataSource={this.state.allTagsInGroup}
														rowKey={record => record.id}
													>
														<Column
															className="column"
															title="标签名称"
															dataIndex="name"
															key="name"
														/>
														<Column
															className="column primary"
															title="人数"
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
																		title="确定要删除该标签么"
																		okText="确定"
																		icon={null}
																		cancelText="取消"
																		onConfirm={()=>{
																			deleteTag({},record.id).then(r=>{
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
										)
									})
								}
							</Tabs>
						):''
					}
				</div>
			</div>
		)
	}
}
export default TagManage
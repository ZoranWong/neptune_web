import React from 'react';
import {Button, Popconfirm, Table, Tabs,Popover} from "antd";
import SearchInput from "../../../components/SearchInput/SearchInput";
import './css/tagManage.sass'
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import CreateNewGroup from './CreateNewGroup'
import CreateNewTag from './CreateNewTag'
import {deleteTagGroup, tagGroupList,tagList,deleteTag,sortTags} from '../../../api/user'

///// 整行拖拽的方法 别问 问就不知道为什么
let dragingIndex = -1;
class BodyRow extends React.Component {
	render() {
		const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
		const style = { ...restProps.style, cursor: 'move' };
		
		let { className } = restProps;
		if (isOver) {
			if (restProps.index > dragingIndex) {
				className += ' drop-over-downward';
			}
			if (restProps.index < dragingIndex) {
				className += ' drop-over-upward';
			}
		}
		
		return connectDragSource(
			connectDropTarget(<tr {...restProps} className={className} style={style} />),
		);
	}
}
const rowSource = {
	beginDrag(props) {
		dragingIndex = props.index;
		return {
			index: props.index,
		};
	},
};
const rowTarget = {
	drop(props, monitor) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		
		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}
		
		// Time to actually perform the action
		props.moveRow(dragIndex, hoverIndex);
		
		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},
};
const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
}))(
	DragSource('row', rowSource, connect => ({
		connectDragSource: connect.dragSource(),
	}))(BodyRow),
);
////


const singleContent = (
	<div style={{fontSize:'12px'}}>
		进行标签规则计算时，一个客户只允许被打上该分组的一个标签
	</div>
);
const doubleContent = (
	<div style={{fontSize:'12px'}}>
		进行标签规则计算时，一个客户允许被打上该分组的多个标签
	</div>
);
class TagManage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			createNewVisible:false,
			createTagVisible:false,
			tagGroups:[],
			allTagsInGroup:[],
			singleOrDouble:'',
			activeGroupId:'',   //当前激活的标签组id
		};
		this.components = {
			body: {
				row: DragableBodyRow,
			},
		};
	}
	
	componentWillMount() {
		this.refresh()
	}
	
	// 拖动行
	moveRow = (dragIndex, hoverIndex) => {
		const  data  = this.state.allTagsInGroup;
		const dragRow = data[dragIndex];
		this.setState(
			update(this.state, {
				allTagsInGroup: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
				},
			}),
		);
		setTimeout(()=>{
			this.sortTag()
		},1000)
	};
	
	// 调整标签优先级顺序
	sortTag = () =>{
		let priorities = {};
		console.log(this.state.allTagsInGroup);
		this.state.allTagsInGroup.forEach((item,index)=>{
			priorities[item.id+''] = index
		});
		console.log(priorities);
		let id = this.state.activeGroupId || this.state.tagGroups[0].id;
		sortTags({priorities},id).then(r=>{
			console.log(r);
		}).catch(_=>{})
	};
	
	refresh = () =>{
		tagGroupList({}).then(r=>{
			this.setState({tagGroups:r.data});
			this.complainPopover(r.data[0].id);
			let id = this.state.activeGroupId || r.data[0].id;
			tagList({},id).then(r=>{
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
		this.complainPopover(key);
		this.setState({activeGroupId:key})
		tagList({},key).then(r=>{
			this.setState({allTagsInGroup:r.data})
		}).catch(_=>{});
	};
	// 删除标签组
	remove = (key)=>{
		deleteTagGroup({},key).then(r=>{
			this.refresh()
		})
	};
	
	// 切换单多选解释文案
	complainPopover = (id) =>{
		let currentGroup = this.state.tagGroups.filter(item=>{
			return item.id == id
		});
		if(currentGroup[0].type === '互斥组'){
			this.setState({singleOrDouble:'single'})
		} else {
			this.setState({singleOrDouble:'double'})
		}
	};
	/*
	* 废弃方法！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
	* */
	clickTab = (id,e)=>{
		// let {target} = e;
		// console.log(target.parentNode.classList);
		// target.parentNode.style.setProperty("background","red","important");
	};
	
	goUserList = (record) =>{
		this.props.history.push({pathname:'/user',query:{tagId:record.id}});
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
				
				<div className="header_tag">
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
							<div className="popopver">
								<Popover content={this.state.singleOrDouble == 'single'?singleContent:doubleContent} placement="bottom" trigger="hover">
									{this.state.singleOrDouble == 'single'?'单选':'多选'}
									<i className="iconfont">&#xe7dd;</i>
								</Popover>
							</div>
						):''
					}
					
					{
						this.state.tagGroups&&this.state.tagGroups.length?(
							<Tabs
								defaultActiveKey={this.state.tagGroups[0].id+''}
								onChange={this.tagGroupChange}
								animated={false}
								type="editable-card"
								hideAdd={true}
								onEdit={this.onEdit}
								onTabClick={this.clickTab}
							>
								
								{
									this.state.tagGroups.map(item=>{
										return (
											<TabPane tab={item.name} key={item.id} >
												<div className="chart chart_tag">
													<DndProvider backend={HTML5Backend}>
														<Table
															dataSource={this.state.allTagsInGroup}
															rowKey={record => record.id}
															rowClassName={(record, index) => {
																let className = '';
																if (index % 2 ) className = 'dark-row';
																return className;
															}}
															components={this.components}
															onRow={(record, index) => ({
																index,
																moveRow: this.moveRow,
															})}
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
																dataIndex="model_count"
																key="model_count" />
															<Column
																title="操作"
																key="action"
																className="column groupOperation"
																render={(text, record) => (
																	<span>
	
																		<span className="operation" onClick={()=>this.goUserList(record)}>详情</span>
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
													</DndProvider>
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
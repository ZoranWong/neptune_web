import React from 'react';
import {Button, Popconfirm, Table, Tabs, Popover, Modal} from "antd";
import './css/tagManage.sass'
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import CreateNewGroup from './CreateNewGroup'
import CreateNewTag from './CreateNewTag'
import {deleteTagGroup, tagGroupList,tagList,deleteTag,sortTags} from '../../../api/user'
import TagDetail from "./TagDetail";

///// 整行拖拽的方法 别问 问就不知道为什么
let dragingIndex = -1;
const {confirm} = Modal;
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
const complainContent = (
	<div style={{fontSize:'12px'}}>
		通过拖拽标签，设置标签规则的执行顺序，当某个用户满足了前面的标签规则，将不再运算后面的标签规则。
	</div>
);
class TagManage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			activeGroup:[],
			createNewVisible:false,
			createTagVisible:false,
			tagGroups:[],
			allTagsInGroup:[],
			singleOrDouble:'',
			activeGroupId:'',   //当前激活的标签组id
			detailId:'',
			detailVisible:false,
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
	moveNoRow = (dragIndex, hoverIndex) => {
		const  data  = this.state.allTagsInGroup;
		const dragRow = data[dragIndex];
		setTimeout(()=>{
			this.sortTag()
		},1000)
	};
	
	// 调整标签优先级顺序
	sortTag = () =>{
		let priorities = {};
		this.state.allTagsInGroup.forEach((item,index)=>{
			priorities[item.id+''] = index
		});
		let id = this.state.activeGroupId || this.state.tagGroups[0].id;
		sortTags({priorities},id).then(r=>{
			console.log(r);
		}).catch(_=>{})
	};
	
	refresh = () =>{
		tagGroupList({}).then(r=>{
			this.setState({tagGroups:r.data,activeGroup:r.data[0]});
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
	
	
	// 编辑标签
	onEdit = (targetKey, action) => {
		this[action](targetKey);
	};
	// 切换标签组
	tagGroupChange = (key)=>{
		this.complainPopover(key);
		let ary = this.state.tagGroups.filter(item=>{
			return item.id == key
		});
		this.setState({activeGroupId:key,activeGroup:ary[0]});
		tagList({},key).then(r=>{
			this.setState({allTagsInGroup:r.data})
		}).catch(_=>{});
	};
	// 删除标签组
	remove = (key)=>{
		tagList({},key).then(r=>{
			if(r.data.length){
				this.showErrorConfirm()
			} else {
				this.showConfirm(key)
			}
		}).catch(_=>{});
		//this.showConfirm(key)
	};
	
	showErrorConfirm= () =>{
		let refresh = this.refresh;
		let confirmModal = confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			content: (
				<div className="U_confirm">
					该标签分组下还有标签，无法删除！
				</div>
			),
			cancelText: '取消',
			okText:'知道了',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small',
				style:{'display':'none'}
			},
			onOk() {
				refresh()
			}
		});
	};
	
	showAjaxError = (msg) =>{
		let refresh = this.refresh;
		let confirmModal = confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			content: (
				<div className="U_confirm">
					{msg}
				</div>
			),
			cancelText: '取消',
			okText:'知道了',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small',
				style:{'display':'none'}
			},
			onOk() {
				refresh()
			}
		});
	};
	
	showConfirm =(key) => {
		let refresh = this.refresh;
		let showError = this.showAjaxError;
		console.log(confirm);
		let confirmModal = confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			maskClosable:true,
			content: (
				<div className="U_confirm">
					确定删除该标签分组么？
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small'
			},
			onOk() {
				deleteTagGroup({},key).then(r=>{
					if(r.status_code == 200){
						showError(r.message)
					} else {
						refresh()
					}
				})
			},
			onCancel() {
			
			},
		});
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
	
	// 查看标签详情
	showDetail = (record) => {
		this.setState({detailVisible:true,detailId:record.id})
	};
	hideDetail = () =>{
		this.setState({detailVisible:false,detailId:''})
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
			<div className="tag_manage">
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
				<TagDetail
					visible={this.state.detailVisible}
					onCancel={this.hideDetail}
					groupId={this.state.detailId}
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
																moveRow: (this.state.activeGroup.type == '互斥组' && this.state.activeGroup.auto_tag == true)?this.moveRow:this.moveNoRow,
															})}
														>
															<Column
																className="column"
																title="标签名称"
																dataIndex="name"
																key="name"
																render={(text,record)=>(
																	<div>
																		<span>{text}</span>
																		<span style={{'display': this.state.activeGroup.auto_tag == true?'inline-block':'none'}}>
																			<i
																				style={{color:'#4F9863',fontSize:'14px',marginLeft:'10px',cursor:'pointer'}}
																				className="iconfont"
																				onClick={()=>this.showDetail(record)}
																			>&#xe7ab;</i>
																		</span>
																	</div>
																	
																)}
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
																		<Popover content={complainContent} placement="bottom" trigger="hover">
																			<span style={{'display':(this.state.activeGroup.type == '互斥组' && this.state.activeGroup.auto_tag == true)?'inline-block':'none'}}>
																				<i className="iconfont" style={{'fontSize':'14px'}}>&#xe836;</i>
																			</span>
																		</Popover>
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
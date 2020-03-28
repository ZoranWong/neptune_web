import React, {Component} from 'react';
import './js/index'
import IconFont from "../../../utils/IconFont";
import {Button, message, Switch, Table} from "antd";
import CreateNewActivity from "./modal/CreateNewActivity";
import ActivityModules from "./modal/ActivityModules";
import EditIndexVisible from "./modal/EditIndexVisible";
import {createNewActivity, startActivity,endActivity, activities, activityEntrySetting} from "../../../api/activities/activities";
import _ from 'lodash'

class AllActivities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newActVisible: false,  //  创建活动弹窗
			activityModulesVisible: false, // 活动首页模板
			editIndexVisible: false,  // 编辑首页
			data: [],
			actId: '',
			entryTemplate: []
		}
	}
	
	componentDidMount() {
		this.refresh();
	}
	
	refresh = () => {
		activities({}).then(r=>{
			_.map(r.data, item=>{
				if (item.status === 1) {
					item.isOpen = true
				} else {
					item.isOpen = false
				}
			});
			this.setState({data: r.data})
		}).catch(_=>{})
	};
	
	// 创建活动
	showNewAct = () => {
		this.setState({newActVisible: true})
	};
	hideNewAct = () => {
		this.setState({newActVisible: false})
	};
	createNewAct = (data) => {
		for (let k in data) {
			if (data[k] === '' || data[k] === null) {
				data[k] = 0
			}
		}
		console.log(data, '...');
		createNewActivity(data).then(r=>{
			message.success(r.message);
			this.hideNewAct();
			this.refresh();
		})
	};
	
	// 编辑活动页
	jump = (route, params = {}) => {
		this.props.history.push({pathname: route,state: params});
	};
	
	// 活动模板(首页)
	showActivityModules = () => {
		this.setState({activityModulesVisible: true})
	};
	hideActivityModules = () => {
		this.setState({activityModulesVisible: false})
	};
	
	// 编辑首页
	showEditIndex = (record) => {
		this.setState({editIndexVisible: true, actId: record.id, entryTemplate: record['entry_template']})
	};
	hideEditIndex = () => {
		this.setState({editIndexVisible: false})
	};
	submitEditIndex = (data,id) => {
		console.log(data);
		activityEntrySetting({template: data}, id).then(r=>{
			message.success(r.message);
			this.hideEditIndex();
			this.refresh()
		}).catch(_=>{})
	};
	
	// 操作活动开关
	switchChange = (e,record) => {
		let api = e ? startActivity : endActivity;
		api({},record.id).then(r=>{
			message.success(r.message);
			this.refresh()
		}).catch(_=>{})
	};
	
	
	render() {
		const columns = [
			{
				title: '活动名称',
				dataIndex: 'name',
				align: 'center',
			},
			{
				title: '起止时间',
				dataIndex: 'start_date',
				align: 'center',
				render: (text, record) => (
					<span>{text ? `${text}～${record['end_date'] || ''}` : '无'}</span>
				)
			},
			{
				title: '活动准备',
				dataIndex: 'is_ready_for_start',
				align: 'center',
				render: (text, record) => (
					<span>{text ? '已就绪': '未就绪'}</span>
				)
			},
			{
				title: '状态',
				dataIndex: 'isOpen',
				align: 'center',
				render: (text,record) => (
					<Switch checked={record['isOpen']} onChange={(e)=>this.switchChange(e,record)} />
				)
			},
			{
				title: '操作',
				align: 'center',
				render: (text, record) => (
					<div>
						<Button size="small" onClick={()=>this.jump('/activities/activityProductsManage', {actId: record.id})} >
							商品管理
						</Button>
						<Button size="small" onClick={()=>this.jump('/activities/editActivityPage',{actId: record.id, template: record.template})}>
							编辑活动页
						</Button>
						<Button size="small" onClick={()=>this.showEditIndex(record)} >
							编辑首页
						</Button>
						<Button size="small">
							删除
						</Button>
					</div>
				)
			}
		];
		
		const newActivityProps = {
			visible: this.state.newActVisible,
			onClose: this.hideNewAct,
			onSubmit: this.createNewAct
		};
		const activityModulesProps = {
			visible: this.state.activityModulesVisible,
			onClose: this.hideActivityModules,
			onSubmit: this.createNewAct
		};
		const editIndexProps = {
			visible: this.state.editIndexVisible,
			onClose: this.hideEditIndex,
			onSubmit: this.submitEditIndex,
			actId: this.state.actId,
			entryTemplate: this.state.entryTemplate
		};
		
		return (
			<div className='allActivities'>
				<CreateNewActivity {...newActivityProps} />
				<ActivityModules {...activityModulesProps} />
				<EditIndexVisible {...editIndexProps} />
				
				<Button size="small" onClick={this.showNewAct} >
					<IconFont type="icon-plus-circle"  />
					新增活动
				</Button>
				<Button size="small" style={{marginLeft: '15px'}} onClick={this.showActivityModules} >
					活动模板示例(首页)
				</Button>
				
				<div className="chart u_chart">
					<Table
						columns={columns}
						rowKey={record => record.id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
				</div>
			</div>
		);
	}
}

export default AllActivities;

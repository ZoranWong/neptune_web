import React, {Component} from 'react';
import './js/index'
import IconFont from "../../../utils/IconFont";
import {Button, message, Modal, Switch, Table} from "antd";
import CreateNewActivity from "./modal/CreateNewActivity";
import ActivityModules from "./modal/ActivityModules";
import EditIndexVisible from "./modal/EditIndexVisible";
import {createNewActivity, startActivity,endActivity, activities, activityEntrySetting, deleteActivity} from "../../../api/activities/activities";
import _ from 'lodash'
import PreviewDetails from "./modal/PreviewDetails";
import EndDateSelect from "./modal/EndDateSelect";
class AllActivities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newActVisible: false,  //  创建活动弹窗
			activityModulesVisible: false, // 活动首页模板
			editIndexVisible: false,  // 编辑首页
			data: [],
			actId: '',
			entryTemplate: [],
			detailsVisible: false,
			details: {},
			dateSelectVisible: false
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
			if ((data[k] === '' || data[k] === null) && k !== 'start_date' && k!== 'end_date') {
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

	status = (status) => {
		let text = '';
		switch (status) {
			case 0:
				text = '待开始';
				break;
			case 2:
				text = '已结束';
				break;
			default:
				text = '进行中'
		}
		return text
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
		if (record.status === 2) {
			this.setState({dateSelectVisible: true, record})
		} else {
			api({},record.id).then(r=>{
				message.success(r.message);
				this.refresh()
			}).catch(_=>{})
		}
	};

	// 活动详情
	showDetails = (record) =>{
		this.setState({detailsVisible: true, details: record})
	};
	hideDetails = () =>{
		this.setState({detailsVisible: false})
	};

	onDateClose = () => {
		this.setState({dateSelectVisible: false})
	};
	onDateSubmit = (date) => {
		startActivity({end_date: date}, this.state.record.id).then(r=>{
			message.success(r.message);
			this.refresh()
		}).catch(_=>{})
	};

	// 删除活动
	deleteActivity = (record) => {
		let refresh = this.refresh;
		let confirmModal = Modal.confirm({
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
					确定删除该活动吗？
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
				// 确定按钮执行操作
				deleteActivity({}, record.id).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			}
		});
	};

	
	
	render() {
		const columns = [
			{
				title: '活动名称',
				dataIndex: 'name',
				align: 'center',
				render: (text,record) => <span
					onClick={()=>this.showDetails(record)}
					style={{'color':'#4F9863','cursor':'pointer'}}>
					{text}
				</span>,
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
				title: '活动状态',
				dataIndex: 'status',
				align: 'center',
				render: (text,record) => {
					return this.status(text)
				}
			},
			{
				title: '活动开启/关闭',
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
						<Button size="small" onClick={()=>this.jump('/activities/activityProductsManage', {actId: record.id, name: record.name})} >
							商品管理
						</Button>
						<Button size="small" onClick={()=>this.jump('/activities/editActivityPage',{actId: record.id, template: record.template})}>
							编辑活动页
						</Button>
						<Button size="small" onClick={()=>this.showEditIndex(record)} >
							编辑首页
						</Button>
						<Button size="small" onClick={()=>this.deleteActivity(record)}>
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
		const detailProps = {
			visible: this.state.detailsVisible,
			details: this.state.details,
			onClose: this.hideDetails
		};
		const dateProps = {
			visible: this.state.dateSelectVisible,
			onClose: this.onDateClose,
			onSubmit: this.onDateSubmit
		};

		return (
			<div className='allActivities'>
				<CreateNewActivity {...newActivityProps} />
				<ActivityModules {...activityModulesProps} />
				<EditIndexVisible {...editIndexProps} />
				<PreviewDetails {...detailProps} />
				<EndDateSelect {...dateProps} />
				
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

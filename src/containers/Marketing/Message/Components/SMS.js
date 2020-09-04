import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Switch, Table, message, Popover} from "antd";
import IconFont from "../../../../utils/IconFont";
import '../css/sms.sass'
import CustomPagination from "../../../../components/Layout/Pagination";
import NewModule from "../Modal/NewModule";
import {SMSList,enableSMS,disableSMS} from "../../../../api/marketing/message";
import {searchJson} from "../../../../utils/dataStorage";

class Sms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role:'USER',
			data:[],
			api:SMSList,
			paginationParams:{
				searchJson:searchJson({obj_type:'USER'})
			},
			visible:false,
			mode: ''
		};
		this.child = React.createRef();
	}
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	refresh = () =>{
		this.setState({paginationParams:{
				searchJson:searchJson({obj_type:this.state.role})
			}},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	changeRole = role =>{
		this.setState({role,paginationParams:{...this.state.paginationParams,obj_type: role}},()=>{
			this.refresh()
		})
		
	};
	
	goRecord = () =>{
		this.props.history.push({pathname:"/marketing/sendOutRecord"})
	};
	
	// 新建模板
	showNew = (mode) =>{
		this.setState({visible:true, mode: mode})
	};
	hideVisible = () =>{
		this.setState({visible:false})
	};
	
	// 开启/关闭开关 // 开关
	switchChange = (item,e) => {
		let api = e? enableSMS:disableSMS;
		api({},item.id).then(r=>{
			message.success(r.message);
			this.refresh()
		}).catch(_=>{})
	};
	
	render() {
		const {role} = this.state;
		const columns = [
			{
				title: '模板名称',
				dataIndex: 'name',
			},
			{
				title: '模板类型',
				dataIndex: 'biz_type',
			},
			{
				title: '短信内容',
				dataIndex: 'content',
				render: (text, record) => (
					<span className="m_message_box">
						<span  className="m_content">{text}</span>
						<div className="popopver">
							<Popover content={text} placement="bottom" trigger="hover">
								<IconFont type="icon-eye-fill"/>
							</Popover>
						</div>
					</span>
				)
			},
			{
				title: '发送方式',
				render:(text,record) =>{
					return record.is_auto_send? '自动':'手动'
				}
			},
			{
				title: '发送规则',
				dataIndex: 'spec',
			},
			{
				title: '状态',
				dataIndex: 'state',
			},
			{
				title: '失败原因',
				render:(text,record) =>{
					return record.rejected_reason? record.rejected_reason:'无'
				}
			},
			{
				title: '操作',
				render: (text,record) =>{
					return <Switch checked={record.is_open} onChange={(e)=>this.switchChange(record,e)} />
				}
				
			},
		];
		const newModuleProps = {
			visible:this.state.visible,
			onCancel:this.hideVisible,
			refresh:this.refresh,
			mode: this.state.mode
		};
		
		return (
			<div className="m_sms">
				
				<NewModule {...newModuleProps} />
				
				<div className="header">
					<div className="left">
						<p>
							<span className={role === 'USER'?'active':''} onClick={()=>this.changeRole('USER')}>用户短信魔板</span>
							<span className={role === 'MERCHANT'?'active':''} onClick={()=>this.changeRole('MERCHANT')}>商家短信模板</span>
						</p>
						<h5>短信剩余条数10000条</h5>
					</div>
					<div className="right">
						<Button size="small" onClick={()=>this.showNew('export')} style={{marginRight: '10px'}}>
							<IconFont type="icon-plus-circle-fill" />
							批量发送消息
						</Button>

						<Button size="small" onClick={()=>this.showNew('export')} style={{marginRight: '10px'}}>
							<IconFont type="icon-plus-circle-fill" />
							导入已有模板
						</Button>
						<Button size="small" onClick={()=>this.showNew('create')}>
							<IconFont type="icon-plus-circle-fill" />
							新建模板
						</Button>
						<Button size="small" type="primary" onClick={this.goRecord}>发送记录</Button>
					</div>
				</div>
				<div className="chart u_chart noMargin">
					<Table
						columns={columns}
						rowKey={record => record.product_id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
				</div>
				<div className="pagination">
					<CustomPagination
						api={this.state.api}
						ref={this.child}
						params={this.state.paginationParams}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(Sms);

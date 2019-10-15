import React, {Component} from 'react';
import {Button, Input, message, Modal, Table} from "antd";
import './css/index.sass'
import OperationRatio from "./Modals/OperationRatio";
import {getSettings, getLevels,deleteLevels} from "../../../api/distribution/setting";

class CashbackSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			visible: false,
			record: {}
		}
	}
	
	componentDidMount() {
		this.refresh()
	}
	
	refresh = () =>{
		getSettings({}).then(r=>{
			r.data.forEach(item=>{
				this.setState({[item['key']]: item['value']})
			})
		});
		getLevels({limit: 100, page: 1}).then(r=>{
			this.setState({tableData: r.data})
		}).catch(_=>{})
	};
	
	delete =(record) => {
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
			maskClosable:true,
			content: (
				<div className="U_confirm">
					确定删除该区间么？
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
				deleteLevels({},record.id).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			},
			onCancel() {
			
			},
		});
	};
	
	createNew = () =>{
		this.setState({visible: true})
	};
	close = () =>{
		this.setState({visible: false})
	};
	
	valueChange = (type,value) => {
		this.setState({[type]: value})
	};
	
	edit = (record) => {
		this.setState({record,visible: true})
	};
	
	render() {
		const columns = [
			{
				title: '区间名称',
				dataIndex: 'title',
			},
			{
				title: 'PV区间',
				render: (text,record) =>{
					return `${record['min_pv']} - ${record['max_pv']}`
				}
			},
			{
				title: '分佣比例(%)',
				dataIndex: 'ratio',
			},
			{
				title: '操作',
				render: (text, record) =>
					<div>
						<span
							style={{'color': '#4F9863', 'cursor': 'pointer'}}
							onClick={() => this.edit(record)}
						>编辑
						</span>
						<span
							style={{'color': '#4F9863', 'cursor': 'pointer', marginLeft: '30px'}}
							onClick={() => this.delete(record)}
						>删除
						</span>
					</div>
			}
		];
		let {state} = this;
		let operationRatioParams = {
			visible: this.state.visible,
			onClose : this.close,
			refresh : this.refresh,
			record : this.state.record
		};
		return (
			<div className='cash_back_setting'>
				<OperationRatio {...operationRatioParams} />
				<ul className="setting_items">
					<li>
						<h4>生产力指数设置:</h4>
						<div className="setting_item">
							<span>
								<h5>生产力指数:</h5>
								<Input
									value={state['PI']}
									onChange={(e)=>this.valueChange('PI',e.target.value)}
								/>
							</span>
							<span>
								<h5>净营业额换算比率(%)：</h5>
								<Input
									value={state['NET_SALES_CONVERSION_RATIO']}
									onChange={(e)=>this.valueChange('NET_SALES_CONVERSION_RATIO',e.target.value)}
								/>
							</span>
						</div>
					</li>
					<li>
						<h4>自提返现设置:</h4>
						<div className="setting_item">
							<span>
								<h5>自提补贴比例(%):</h5>
								<Input
									value={state['SELF_PICK_SUBSIDY_RATIO']}
									onChange={(e)=>this.valueChange('SELF_PICK_SUBSIDY_RATIO',e.target.value)}
								/>
							</span>
							<span>
								<h5>自提佣金比例(%)：</h5>
								<Input
									value={state['SELF_PICK_COMMISSION_RATIO']}
									onChange={(e)=>this.valueChange('SELF_PICK_COMMISSION_RATIO',e.target.value)}
								/>
							</span>
						</div>
					</li>
					<li>
						<h4>销售返现设置:</h4>
						<div className="setting_item">
							<span>
								<h5>销售补贴比例(%):</h5>
								<Input
									value={state['SALES_SUBSIDY_RATIO']}
									onChange={(e)=>this.valueChange('SALES_SUBSIDY_RATIO',e.target.value)}
								/>
							</span>
							<span>
								<h5>销售佣金比例(%)：</h5>
								<Button size='small' type='primary' onClick={this.createNew}>增加佣金比例</Button>
							</span>
						</div>
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
								dataSource={this.state.tableData}
							/>
						</div>
					</li>
				</ul>
			</div>
		);
	}
}

export default CashbackSetting;

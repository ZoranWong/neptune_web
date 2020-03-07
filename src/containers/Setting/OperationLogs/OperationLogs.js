import React, {Component} from 'react';
import '../css/operationLogs.sass';
import {getOperateLog,admins} from "../../../api/setting";
import {Button, LocaleProvider, Table, DatePicker, Select} from "antd";
import CustomPagination from "../../../components/Layout/Pagination";
import {searchJson} from "../../../utils/dataStorage";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import _ from 'lodash'
class OperationLogs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			api: getOperateLog,
			paginationParams:{
				search:'',
			},
			searchJson: {
				admin_id: '',
				operate_date: ''
			},
			admins: []
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		admins({}).then(r=>{
			this.setState({admins: r.data});
		}).catch(_=>{})
	}
	
	// 头部搜索框
	search = () =>{
		let obj = {};
		if (this.state.searchJson['admin_id']) {
			obj['admin_id'] = this.state.searchJson['admin_id']
		}
		if (this.state.searchJson['operate_date']) {
			obj['operate_date'] = this.state.searchJson['operate_date']
		}
		console.log(obj);
		this.setState({
			api:getOperateLog,
			paginationParams:{...this.state.paginationParams,
				searchJson: searchJson(obj)}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	setData = (value) => {
		this.setState({searchJson:{...this.state.searchJson,admin_id: value}})
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,operate_date:dateString}})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	
	render() {
		const columns = [
			{
				title: '操作人',
				dataIndex: 'operator_name',
			},
			{
				title: '页面',
				dataIndex: 'page_name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}
				>
					{text}
				</span>
			},
			{
				title: '行为',
				dataIndex: 'action',
				render: (text, record) => <span>
					{text ||  '无'}
				</span>
			},
			{
				title: '操作日期',
				dataIndex: 'operate_at',
			},
			{
				title: 'IP',
				dataIndex: 'ip'
			}
		];
		
		return (
			<div className='operationLogs'>
				<ul className="filter">
					<li>
						操作人：
						<Select
							placeholder="请选择操作人"
							value={this.state.searchJson['admin_id']}
							onChange={(e)=>this.setData(e)}
							defaultActiveFirstOption={false}
						>
							
							{
								this.state.admins.map((item)=>(
									<Select.Option  value={item.id}>{item.name}</Select.Option>
								))
							}
						</Select>
					</li>
					<li>
						操作日期：
						<LocaleProvider locale={zh_CN}>
							<DatePicker
								onChange={this.onDateChange}
							/>
						</LocaleProvider>
					</li>
					<li className="button">
						<Button size="small" type="primary" onClick={this.search}>搜索</Button>
					</li>
				</ul>
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
				<div className="pagination">
					<CustomPagination
						api={this.state.api}
						ref={this.child}
						params={this.state.paginationParams}
						text={'条记录'}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default OperationLogs;

import React, {Component} from 'react';
import SearchInput from "../../../../components/SearchInput/SearchInput";
import {searchJson} from "../../../../utils/dataStorage";
import { Table,Button} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import '../css/basicStatistics.sass'
import AdjustBV from "./components/AdjustBV";
import _ from 'lodash'
import {shopStatistics} from "../../../../api/distribution/statistics";

class HandleStatistics extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '店铺名称/店铺编号',
				dataIndex: 'shop_name',
				render: (text,record) => (
					<span>{text}/{record['shop_code']}</span>
				)
			},
			{
				title: '个人BV',
				dataIndex: 'personal_bv',
			},
			{
				title: '操作',
				render: (text,record) => {
					if (record.operation) {
						return <span style={{color: '#fc3c2f', cursor: 'pointer'}} onClick={()=>this.showAdjust(record)}>{record.operation}{record.operationValue}</span>
					} else {
						return <span style={{color: '#4f9863', cursor: 'pointer'}} onClick={()=>this.showAdjust(record)}>操作</span>
					}
				}
			},
			{
				title: '备注',
				dataIndex: 'remark',
				render: (text,record) => (
					<span>{text || '无'}</span>
				)
			},
		];
		this.state = {
			api: shopStatistics,
			id: '',
			data:[],
			paginationParams:{
				searchJson: {}
			},
			columns:columns,
			adjustVisible: false,
			adjustItem: {},
			adjusted: []
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		let id = this.props.location.state.id;
		this.setState({id});
	}
	
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				searchJson: {}
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:shopStatistics,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		let {adjusted} = this.state;
		_.map(adjusted, item=>{
			let index = _.findIndex(list, listItem => {
				return listItem.id === item.id
			});
			if (index > -1) {
				list[index]['operation'] = item['operation'];
				list[index]['operationValue'] = item['operationValue'];
				list[index]['remark'] = item['remark'];
			}
		});
		this.setState({data:list})
	};
	
	// 调整
	showAdjust = (record) => {
		this.setState({adjustVisible: true, adjustItem: record})
	};
	
	// 关闭调整
	hideAdjust = () => {
		this.setState({adjustVisible: false})
	};
	
	// 提交调整
	onSubmit = (type, value ,remark, record) => {
		let operation = type === 'add' ? '增加' : '减少';
		let data = this.state.data;
		record.operation = operation;
		record.operationValue = value;
		record.remark = remark;
		let index = _.findIndex(data, item => {
			return item.id === record.id
		});
		index > -1 && (data[index] = record);
		this.setState({data, adjusted: [...this.state.adjusted, record]},()=>{
			console.log(this.state.adjusted, '.......................................');
			
		});
	};
	
	render() {
		const BVProps = {
			visible: this.state.adjustVisible,
			item: this.state.adjustItem,
			onCancel: this.hideAdjust,
			onSubmit: this.onSubmit
		};
		
		
		return (
			<div className='basic_statistics'>
				<AdjustBV {...BVProps}/>
				
				
				
				
				
				
				
				
				
				<div className="basic_statistics_header">
					<ul className="header_left">
						<li>
							店铺名/店铺编号:
							<SearchInput
								getDatas={this.search}
								text='请输入店铺名称/店铺编号/店铺主姓名/手机号码'
							/>
						</li>
					</ul>
					<Button>确定处理</Button>
				</div>
				<div className="chart u_chart">
					<Table
						columns={this.state.columns}
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
						text='条数据'
						api={this.state.api}
						id={this.state.id}
						ref={this.child}
						params={this.state.paginationParams}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default HandleStatistics;

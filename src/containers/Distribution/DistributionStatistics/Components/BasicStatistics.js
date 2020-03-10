import React, {Component} from 'react';
import {Button, DatePicker, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import locale from 'antd/es/date-picker/locale/zh_CN';
import '../css/basicStatistics.sass'
import CustomPagination from "../../../../components/Layout/Pagination";
import {searchJson} from "../../../../utils/dataStorage";
const {MonthPicker} = DatePicker;
class BasicStatistics extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '汇总月份',
				dataIndex: 'month',
			},
			{
				title: '总销售额',
				dataIndex: 'total_sales',
			},
			{
				title: '总返佣额',
				dataIndex: 'value',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						 <span
							 style={{'color':'#4F9863','cursor':'pointer'}}
							 onClick={()=>this.export(record)}
						 >导出
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft: '20px'}}
							onClick={()=>this.details(record)}
						>详情
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft: '20px'}}
							onClick={()=>this.handleStatistics(record)}
						>处理
						</span>
					</div>
			},
		];
		this.state = {
			filterVisible:false,
			customVisible:false,
			api:'',
			data:[
				{
					x: '1'
				}
			],
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			columns:columns,
		};
		this.child = React.createRef();
	}
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 导出
	export = () => {
	
	};
	
	// 详情
	details = () => {
	
	};
	
	// 处理
	handleStatistics = () => {
		this.props.history.push({pathname:"/distribution/distributionStatistics/handleStatistics"})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	onDateChange = (date,dateString) =>{
		console.log(date);
		console.log(dateString);
		
	};
	
	render() {
		return (
			<div className="basic_statistics">
				<div className="basic_statistics_header">
					<ul className="header_left">
						<li>
							时间:
							<MonthPicker picker="month" placeholder='请选择月份'  locale={locale} onChange={this.onDateChange} />
						</li>
						<li>
							<Button type='primary' size="small">筛选</Button>
						</li>
					</ul>
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
						ref={this.child}
						params={this.state.paginationParams}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default BasicStatistics;

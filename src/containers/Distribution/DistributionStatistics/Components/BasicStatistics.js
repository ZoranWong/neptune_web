import React, {Component} from 'react';
import SearchInput from "../../../../components/SearchInput/SearchInput";
import {Button, LocaleProvider, DatePicker, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import '../css/basicStatistics.sass'
import CustomPagination from "../../../../components/Layout/Pagination";
import {searchJson} from "../../../../utils/dataStorage";

const {RangePicker} = DatePicker;
class BasicStatistics extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '店铺名称/店铺编号/店铺主姓名/手机号码',
				dataIndex: 'name',
			},
			{
				title: '介绍人',
				dataIndex: 'release_mode',
			},
			{
				title: '下层数量/层数',
				dataIndex: 'value',
			},
			{
				title: '下层总BV',
				dataIndex: 'floor',
			},
			{
				title: '个人总BV',
				dataIndex: 'goods',
			},
			{
				title: '团体PV',
				dataIndex: 'date',
			},
			{
				title: '下线数',
				dataIndex: 'issue_count',
			}
		];
		this.state = {
			filterVisible:false,
			customVisible:false,
			api:'',
			data:[],
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
	
	//高级筛选
	higherFilter = () =>{
		this.setState({filterVisible:true})
	};
	closeHigherFilter = () =>{
		this.setState({filterVisible:false})
	};
	onSubmit = (data) =>{
		this.setState({
			api:'这里需要填写新的api',
			paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	onDateChange = () =>{
	
	};
	
	render() {
		return (
			<div className="basic_statistics">
				<div className="basic_statistics_header">
					<ul className="header_left">
						<li>
							时间:
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						</li>
						<li>
							店铺:
							<SearchInput
								getDatas={this.search}
								text='请输入店铺名称/店铺编号/店铺主姓名/手机号码'
							/>
						</li>
						<li>
							<Button type='primary' size="small">筛选</Button>
						</li>
						<li>
							<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						</li>
					</ul>
					<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
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

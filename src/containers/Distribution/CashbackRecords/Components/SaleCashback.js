import React, {Component} from 'react';
import SearchInput from "../../../../components/SearchInput/SearchInput";
import {Button, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {searchJson} from "../../../../utils/dataStorage";
import {salesCashback} from '../../../../api/distribution/records'
import AdvancedFilterComponent from "./AdvancedFilterComponent";
import {sales_fields,operation} from "../../../../utils/sales_fields";

class SaleCashback extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '返佣时间',
				dataIndex: 'cashback_time',
			},
			{
				title: '店铺',
				dataIndex: 'shop_name',
			},
			{
				title: '团队PV',
				dataIndex: 'team_pv',
			},
			{
				title: '个人BV',
				dataIndex: 'personal_bv',
			},
			{
				title: '返现比例',
				dataIndex: 'cashback_ratio',
			},
			{
				title: '返现金额',
				dataIndex: 'cashback_amount',
				render: (text,record) => `${text}元`
			}
		];
		this.state = {
			filterVisible:false,
			customVisible:false,
			api:salesCashback,
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
			this.child.current.pagination(1)
		});
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:salesCashback,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
		},()=>{
			this.child.current.pagination(1)
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
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					value={sales_fields}
					operation={operation}
				/>
				<div className="basic_statistics_header">
					<ul className="header_left">
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

export default SaleCashback;

import React, {Component,Fragment} from 'react';
import {Button, Input, LocaleProvider, Select, Table,DatePicker} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {withRouter} from 'react-router-dom'
import CustomPagination from "../../../../components/Layout/Pagination";
import '../css/consumerRefund.sass'
const {RangePicker} = DatePicker;

class ConsumerRefund extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[]
		}
	}
	
	goRefundApplication = () =>{
		this.props.history.push({pathname:"/finance/refundApplication",state:{type:'consumer'}})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	render() {
		
		const columns = [
			{
				title: '昵称/手机号',
				dataIndex: 'name',
			},
			{
				title: '订单编号',
				dataIndex: 'a',
			},
			{
				title: '退款类型',
				dataIndex: 'b',
			},
			{
				title: '申请时间',
				dataIndex: 'c',
			},
			{
				title:'退款状态',
				dataIndex:'cName'
			},
			{
				title:'实付款/退款金额',
				dataIndex:'mobile'
			},
			{
				title:'备注',
				dataIndex:'mobile'
			},
		];
		
		return (
			<Fragment>
				<div className="cr_header">
					<Button size="small" type="primary" onClick={this.goRefundApplication}>退款申请</Button>
				</div>
				<div className="cr_chartContent">
					<ul className="filter">
						<li className="needMargin">
							
							手机号码：
							<Input />
						</li>
						<li className="needMargin">
							订单编号：
							<Input />
						</li>
						<li className="needMargin">
							申请时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						
						</li>
						<li >
							退款类型：
							<Input/>
						</li>
						<li>
							退款状态：
							<Input />
						</li>
						<li className="button">
							<Button size="small" type="primary">搜索</Button>
							<Button
								size="small"
								
							>导出筛选结果
							</Button>
						
							<span className="clear">清空筛选条件</span>
						</li>
					</ul>
					<div className="chart u_chart">
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
							id={this.state.id}
							valChange={this.paginationChange}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(ConsumerRefund);
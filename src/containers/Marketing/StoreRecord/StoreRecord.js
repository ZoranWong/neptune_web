import React, {Component} from 'react';
import {Button, Input, LocaleProvider, Select, DatePicker, Table, Switch} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import './css/index.sass'
import CustomPagination from "../../../components/Layout/Pagination";
const {RangePicker} = DatePicker;
class StoreRecord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[
				{
					name:'1',
					a:'11',
					b:'22',
					c:'33',
					cName:'111111',
					mobile:'213'
				}
			]
		}
	}
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		console.log(date, dateString);
	};
	
	
	render() {
		const columns = [
			{
				title: '储值卡名称',
				dataIndex: 'name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}>
					{text}
				</span>,
			},
			{
				title: '储值金额',
				dataIndex: 'a',
			},
			{
				title: '赠送金额',
				dataIndex: 'b',
			},
			{
				title: '购买时间',
				dataIndex: 'c',
			},
			{
				title:'昵称',
				dataIndex:'cName'
			},
			{
				title:'手机号码',
				dataIndex:'mobile'
			},
		];
		
		
		
		
		return (
			<div className="storeRecord">
				<div className="header">
					储值记录
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<ul className="datas">
					<li>
						储值总额
						<span>1000</span>
					</li>
					<li>
						购买次数
						<span>1000</span>
					</li>
					<li>
						赠送总额
						<span>300</span>
					</li>
					<li>
						购买人数
						<span>400</span>
					</li>
				</ul>
				<div className="chartContent">
					<ul className="filter">
						<li className="needMargin">
							储值名称：
							<Select
								onChange={(e)=>{
									this.setState({type:e})
								}}
								defaultActiveFirstOption={false}
							>
								<Select.Option  value="PRODUCE">生产入库</Select.Option>
								<Select.Option  value="PURCHASE">购买入库</Select.Option>
								<Select.Option  value="RETURN">退货入库</Select.Option>
								<Select.Option  value="CHECK">盘点入库</Select.Option>
							</Select>
						</li>
						<li className="needMargin">
							购买时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						
						</li>
						<li>
							指定搜索：
							<Input />
						</li>
						<li className="button">
							<Button
								size="small"
								type="primary"
							>筛选
							</Button>
							<Button size="small">导出表格</Button>
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
				
			</div>
		);
	}
}

export default StoreRecord;
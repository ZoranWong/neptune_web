import React, {Component} from 'react';
import {Button, Input, LocaleProvider, Select, DatePicker, Table, Switch} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import './css/index.sass'
import CustomPagination from "../../../../components/Layout/Pagination";
const {RangePicker} = DatePicker;
class SendOutRecord extends Component {
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
				title: '发送时间',
				dataIndex: 'name',
			},
			{
				title: '短信内容',
				dataIndex: 'a',
			},
			{
				title: '发送类型',
				dataIndex: 'b',
			},
			{
				title: '发送方式',
				dataIndex: 'c',
			},
			{
				title:'接收手机',
				dataIndex:'cName'
			},
			{
				title:'模板名称',
				dataIndex:'mobile'
			},
			{
				title:'发送结果',
				dataIndex:'mobile'
			},
		];
		
		
		
		
		return (
			<div className="sendOutRecord">
				<div className="header">
					发送记录
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<ul className="datas">
					<li>
						发送总数
						<span>1000</span>
					</li>
					<li>
						发送成功
						<span>1000</span>
					</li>
					<li>
						发送失败
						<span>300</span>
					</li>
				</ul>
				<div className="chartContent">
					<ul className="filter">
						<li className="needMargin">
							模板名称：
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
							发送时间：
							<LocaleProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</LocaleProvider>
						
						</li>
						<li className="needMargin">
							发送类型：
							<Input />
						</li>
						<li className="needMargin">
							接收手机：
							<Input />
						</li>
						<li>
							发送方式：
							<Input />
						</li>
						<li>
							发送结果：
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

export default SendOutRecord;
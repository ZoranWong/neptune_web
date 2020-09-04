import React, {Component,Fragment} from 'react';
import {Button, DatePicker, Input, ConfigProvider, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {exchangeRecords} from "../../../../api/marketing/integral";
import {searchJson} from "../../../../utils/dataStorage";
import zh_CN from "antd/lib/locale-provider/zh_CN";
const {RangePicker} = DatePicker
class RedemptionRecord extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '兑换时间',
				dataIndex: 'exchanged_at',
			},
			{
				title: '优惠券名称',
				dataIndex: 'product_name',
			},
			{
				title: '用户昵称',
				dataIndex: 'nickname',
			},
			{
				title: '用户手机号',
				dataIndex: 'mobile',
			},
			{
				title: '支付积分',
				dataIndex: 'pv',
			},
		];
		this.child = React.createRef();
		this.state = {
			api: exchangeRecords,
			data:[],
			columns:columns,
			paginationParams: {
				searchJson: searchJson({type:'COUPON'})
			},
			searchJson: {
				exchanged_at:'',
				'user.nickname':'',
				'user.mobile': '',
				product_name:''
			}
		};
		this.child = React.createRef();
	}
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,exchanged_at:dateString}})
	};
	
	
	refresh = ()=>{
		this.child.current.pagination(this.child.current.state.current)
	};
	
	// 筛选
	search = () =>{
		let obj = {};
		let searchJsons = this.state.searchJson;
		for (let key in searchJsons){
			if(searchJsons[key]){
				obj[key] = searchJsons[key]
			}
		}
		obj.type = 'COUPON';
		
		this.setState({
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson(obj)}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	//改变搜索值
	changeSearchValue = (e,type) =>{
		this.setState({searchJson:{...this.state.searchJson,[type]:e.target.value}})
	};
	
	// 清空筛选条件
	clear = () =>{
		let searchJson = {
			exchanged_at:'',
			'user.nickname':'',
			'user.mobile': '',
			product_name:''
		};
		this.setState({searchJson},()=>{
			this.search()
		})
	};
	
	render() {
		return (
			<Fragment>
				<div className="i_banner">
					<div className="i_inputs needMargin">
						<span>用户昵称:</span>
						<Input
							size="small"
							placeholder="请输入用户昵称"
							value={this.state.searchJson['user.nickname']}
							onChange={(e)=>{this.changeSearchValue(e,'user.nickname')}}
						/>
					</div>
					<div className="i_inputs needMargin">
						<span>用户手机：</span>
						<Input
							size="small"
							placeholder="请输入用户手机"
							value={this.state.searchJson['user.mobile']}
							onChange={(e)=>{this.changeSearchValue(e,'user.mobile')}}
						/>
					</div>
					<div className="i_inputs">
						<span>兑换时间:</span>
						<ConfigProvider locale={zh_CN}>
							<RangePicker
								onChange={this.onDateChange}
							/>
						</ConfigProvider>
					</div>
					<div className="i_inputs">
						<span>优惠券名称:</span>
						<Input
							size="small"
							placeholder="请输入优惠券名称"
							value={this.state.searchJson['product_name']}
							onChange={(e)=>{this.changeSearchValue(e,'product_name')}}
						/>
					</div>
					<Button size="small" type='primary' className="i_btn" onClick={this.search}>搜索</Button>
					<Button size="small">导出</Button>
					<span className="i_filter" onClick={this.clear}>清空筛选条件</span>
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
						api={this.state.api}
						ref={this.child}
						params={this.state.paginationParams}
						valChange={this.paginationChange}
					/>
				</div>
			</Fragment>
		);
	}
}

export default RedemptionRecord;

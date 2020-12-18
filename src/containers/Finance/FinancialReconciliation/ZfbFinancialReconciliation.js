import React, {Component} from 'react';
import {Button, DatePicker, Input, ConfigProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import CustomPagination from "../../../components/Layout/Pagination";
import {userBalanceRecord ,downFinanceAccount,financeDetail } from "../../../api/finance/balance";
import {searchJson} from "../../../utils/dataStorage";
import './css/shop.sass'
import Config from '../../../config/app'
import { coupons } from '../../../api/marketing/coupon';
const {RangePicker} = DatePicker;

class ZfbFinancialReconciliation extends Component {
	constructor(props) {
		super(props);
		this.state = {
            data:[],
            activeTab:'',
			api:financeDetail,
			start:null,
			end:null,
			search:null,
			type:2,
			time_start:null,
			time_end:null,
			paginationParams:{
				type:2
			},
		};
		this.child = React.createRef();
	};
	
	
	// 筛选
	search = () =>{
		let params={
			type:2,
			search:this.state.search,
			limit: 10,
			page: 1,
			time_start:this.state.time_start,
			time_end:this.state.time_end
		}
		this.state.api(params).then(r=>{
			// console.log(r.data,'筛选')
			this.setState({data:r.data},()=>{
					// this.child.current.pagination(this.child.current.state.current)
				})
		}).catch(_=>{})
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		console.log(dateString,'dateStringdateString')
		// this.setState({searchJson:{...this.state.searchJson,time_start:dateString[0]+" 00:00:00",time_end:dateString[1]+" 23:59:59"}})
		this.setState({time_start:dateString[0]+" 00:00:00",time_end:dateString[1]+" 23:59:59",start:dateString[0]+" 00:00:00",end:dateString[1]+" 23:59:59"})

	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	
    // 切换头部选项卡
    changeTab = activeTab =>{
        this.setState({activeTab});
        switch (activeTab) {
            case '近7天':
                this.selectWeek();
                break;
            case '近30天':
                this.selectMonth();
                break;
            default:
                this.selectToday()
        }
	};
	
        
    //今日
    selectToday = () =>{
		let today =moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
		let todays =moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
		console.log(today,'todaytodaytodaytoday')
		this.setState({start:today,end:todays})
        this.searchDate([today,todays])
    };
    
    // 近7天
    selectWeek = () =>{
		let today =moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        let last7 = moment().startOf('day').subtract('days', 6).format('YYYY-MM-DD HH:mm:ss');
		console.log(today,last7,'todaytodaytodaytoday')
		this.setState({start:last7,end:today})
        this.searchDate([last7,today]);
    };
    
    // 近30天
    selectMonth = () =>{
		let today =moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        let last30 = moment().startOf('day').subtract('days', 30).format('YYYY-MM-DD HH:mm:ss');
		console.log(today,last30,'todaytodaytodaytoday')
		this.setState({start:last30,end:today})
		
        this.searchDate([last30,today]);
    };
    // 切换日期筛选数据
	searchDate = (date) => {
		console.log(date,111)

		let params={
			type:2,
			search:this.state.search,
			limit: 10,
			page: 1,
			time_start:date[0],
			time_end:date[1]
		}
		this.state.api(params).then(r=>{
			this.setState({data:r.data})
		}).catch(_=>{})

	};
	downBill = (record) =>{
			console.log(this.state.start,this.state.end,'window.location.href')	
			window.location.href = `${Config.apiUrl}/api/backend/breakfast/load/finance/account?subgroup_id=${record.subgroup_id}&type=2&time_start=${this.state.start}&time_end=${this.state.end}`;
	}
	// 根据返回渲染类型
	
	render() {
		const columns = [
			{
				title: '早餐车分组名称',
				dataIndex: 'subgroup_name',
			},
			{
				title: '商户号',
				dataIndex: 'merchant_name',
			},
			{
				title: '总交易单数',
				dataIndex: 'count',
			},
			{
				title: '应收订单总金额',
				dataIndex: 'total_fee',
			},
			{
				title:'实收金额',
				dataIndex:'settlement_total_fee'
			},
			{
				title:'退款总金额',
				dataIndex:'refund_fee'
			},
			{
				title:'订单总金额',
				dataIndex:'order_total_fee'
			},
			{
				title:'操作',
				render:(text,record) =>
					<span 
						style={{ 'color': '#4F9863', 'cursor': 'pointer' }}
						onClick={() => this.downBill(record)}
					>下载对账单</span>
				
			},
        ];
        const headerTabs = ['今日','近7天','近30天'];
		
		return (
			<div className="overviewShopBalance">
				<div className="ob_chartContent">
					<ul className="filter">
						<li className="needMargin">
						分组名称：
							<Input
								placeholder='请输入早餐车分组名称'
								// value={this.state.searchJson.search}
								value={this.state.search}
								// onChange={(e)=>{this.changeSearchValue(e,'search')}}
								onChange={(e) => {
									this.setState({ search: e.target.value })
								}}
							/>
						</li>
                        {
						headerTabs.map(item=>(
							<li
                                key={item}
                                className="selectDay"
								onClick={()=>this.changeTab(item)}
							>{item}</li>
						))
					}
						<li className="needMargin">
							交易日期：
							<ConfigProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</ConfigProvider>
						</li>
							<Button size="small" type="primary" onClick={this.search}>搜索</Button>
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
							valChange={this.paginationChange}
							text={'条记录'}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ZfbFinancialReconciliation;


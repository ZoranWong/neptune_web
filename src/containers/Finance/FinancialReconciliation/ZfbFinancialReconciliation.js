import React, {Component} from 'react';
import {Button, DatePicker, Input, ConfigProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import CustomPagination from "../../../components/Layout/Pagination";
import {userBalanceRecord ,downFinanceAccount,financeDetail } from "../../../api/finance/balance";
import {searchJson} from "../../../utils/dataStorage";
import './css/shop.sass'
import Config from '../../../config/app'
const {RangePicker} = DatePicker;

class ZfbFinancialReconciliation extends Component {
	constructor(props) {
		super(props);
		this.state = {
            data:[],
            activeTab:'',
			api:financeDetail,
			searchJson:{
				type:2,
				search:null,//早餐车名称
				// created_at:'',
				time_start:'',
				time_end:'',
			},
			paginationParams:{
				type:2
			},
		};
		this.child = React.createRef();
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
		this.setState({
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson(obj)}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,created_at:dateString}})
	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	//改变搜索值
	changeSearchValue = (e,type) =>{
		this.setState({searchJson:{...this.state.searchJson,[type]:e.target.value}})
	};
	
	// 清空筛选条件
	clear = () =>{
		let searchJson = {
			type:2,
			search:null,
			time_start:'',
			time_end:'',
			// 'user.real_name':'',
			// 'user.mobile':'',
			// created_at:'',
			
		};
		this.setState({searchJson},()=>{
			this.search()
		})
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
        this.searchDate([today,todays])
    };
    
    // 近7天
    selectWeek = () =>{
		let today =moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        let last7 = moment().startOf('day').subtract('days', 6).format('YYYY-MM-DD HH:mm:ss');
        console.log(today,last7,'todaytodaytodaytoday')
        this.searchDate([last7,today]);
    };
    
    // 近30天
    selectMonth = () =>{
		let today =moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
        let last30 = moment().startOf('day').subtract('days', 30).format('YYYY-MM-DD HH:mm:ss');
        console.log(today,last30,'todaytodaytodaytoday')
        this.searchDate([last30,today]);
    };
    // 切换日期筛选数据
	searchDate = (date) => {
		console.log(date,111)
		let params={
			search:null,
			time_start:date[0],
			time_end:date[1],
		}

		let obj = {};
		let searchJsons = params;
		// for (let key in searchJsons){
		// 	if(searchJsons[key]){
		// 		obj[key] = searchJsons[key]
		// 	}
		// }
		this.setState({
			paginationParams:{...this.state.paginationParams,
				searchJson}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
		console.log(params,'------------params')
	};
	downBill = (record) =>{
		window.location.href = `${Config.apiUrl}/api/backend/breakfast/load/finance/account?subgroup_id=${record.subgroup_id}&type=2`;		
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
								value={this.state.searchJson['user.nickname']}
								onChange={(e)=>{this.changeSearchValue(e,'user.nickname')}}
							/>
						</li>
                        {
						headerTabs.map(item=>(
							<li
                                key={item}
                                className="selectDay"
								onClick={()=>this.changeTab(item)}
								// className={this.state.activeTab === item?'active':''}
							>{item}</li>
						))
					}
						{/* <li className="needMargin">
							门店id：
							<Input
								placeholder="请输入门店id"
								value={this.state.searchJson['user.mobile']}
								onChange={(e)=>{this.changeSearchValue(e,'user.mobile')}}
							/>
						</li> */}
						<li className="needMargin">
							交易日期：
							<ConfigProvider locale={zh_CN}>
								<RangePicker
									onChange={this.onDateChange}
								/>
							</ConfigProvider>
						</li>
						<li className="button">
							<Button size="small" type="primary" onClick={this.search}>搜索</Button>
							<span className="clear" onClick={this.clear}>清空筛选条件</span>
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


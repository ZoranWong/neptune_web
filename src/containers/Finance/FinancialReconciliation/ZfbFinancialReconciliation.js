import React, {Component} from 'react';
import {Button, DatePicker, Input, ConfigProvider, Select, Table} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import CustomPagination from "../../../components/Layout/Pagination";
import {userBalanceRecord} from "../../../api/finance/balance";
import {searchJson} from "../../../utils/dataStorage";
import './css/shop.sass'
const {RangePicker} = DatePicker;

class ZfbFinancialReconciliation extends Component {
	constructor(props) {
		super(props);
		this.state = {
            data:[],
            activeTab:'',
			api:userBalanceRecord,
			searchJson:{
				// type:'',
				'user.nickname':'',//商户号
				// 'user.real_name':'',
				// 'user.mobile':'',//门店id
				created_at:'',
			},
			paginationParams:{
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
			type:'',
			'user.nickname':'',
			// 'user.real_name':'',
			// 'user.mobile':'',
			created_at:'',
		};
		this.setState({searchJson},()=>{
			this.search()
		})
	};
    // 切换头部选项卡
    changeTab = activeTab =>{
        this.setState({activeTab});
        console.log(activeTab,'activeTabactiveTabactiveTabactiveTab')
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
        let today = moment().format('YYYY-MM-DD' );
        console.log(today,'todaytodaytodaytoday')
        this.searchDate([today,today])
    };
    
    // 近7天
    selectWeek = () =>{
        let today = moment().format('YYYY-MM-DD' );
        let last7 = moment().subtract('days', 6).format('YYYY-MM-DD');
        console.log(today,last7,'todaytodaytodaytoday')
        this.searchDate([last7,today]);
    };
    
    // 近30天
    selectMonth = () =>{
        let today = moment().format('YYYY-MM-DD' );
        let last30 = moment().subtract('days', 30).format('YYYY-MM-DD');
        console.log(today,last30,'todaytodaytodaytoday')
        this.searchDate([last30,today]);
    };
    // 切换日期筛选数据
	searchDate = (date) => {
		console.log(date,111)
		this.setState({searchJson:{...this.state.searchJson,created_at:date}})
		console.log(this.state.searchJson.created_at,222)
		// this.search()
		// overviewStatistics({
		// 	searchJson: searchJson({
		// 		start_date: date[0],
		// 		end_date: date[1]
		// 	})
		// }).then(r=>{
		// 	this.handleData(r.data)
		// })
	};
	downBill = (record) =>{
		console.log(record)
	}
	// 根据返回渲染类型
	
	render() {
		const columns = [
			{
				title: '早餐车分组名称',
				dataIndex: 'nickname',
			},
			{
				title: '商户号',
				dataIndex: 'income',
			},
			{
				title: '总交易单数',
				dataIndex: 'expense',
			},
			{
				title: '应收订单总金额',
				dataIndex: 'created_at',
			},
			{
				title:'实收金额',
				dataIndex:'remark'
			},
			{
				title:'退款总金额',
				dataIndex:'ee'
			},
			{
				title:'订单总金额',
				dataIndex:'remddark'
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


import React, {Component,Fragment} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Table} from "antd";
import '../css/index.sass'
import IconFont from "../../../../utils/IconFont";
import CustomPagination from "../../../../components/Layout/Pagination";
import CreateNew from '../Modal/CreateNew'
import {integralProducts} from "../../../../api/marketing/integral";
import {searchJson} from "../../../../utils/dataStorage";
import zh_CN from "antd/lib/locale-provider/zh_CN";
const {RangePicker} = DatePicker;
class RedemptionManage extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '优惠价名称',
				dataIndex: 'name',
			},
			{
				title: '上架时间',
				dataIndex: 'created_at',
			},
			{
				title: '所需积分',
				dataIndex: 'pv',
			},
			{
				title: '可兑换/已兑换',
				render: (text,record) => `${record.available_count}/${record.received_count}`
			},
			{
				title: '状态',
				dataIndex: 'state_desc',
			},
			{
				title: '操作',
				dataIndex: 'status',
				render: (text, record) => (
					<div className="1">1111</div>
				)
			},
		];
		this.child = React.createRef();
		this.state = {
			data:[],
			api:integralProducts,
			activeTab:'全部',
			columns:columns,
			visible:false,
			paginationParams:{
				searchJson: searchJson({type:'COUPON'})
			},
			searchJson: {
				exchange_date:'',
				product_name: ''
			}
		};
	}
	
	
	// 切换tab
	onChangeTab = activeTab =>{
		this.setState({activeTab})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	refresh = ()=>{
		this.child.current.pagination(1)
	};
	
	showCreate = () =>{
		this.setState({visible:true});
	};
	hideCreate = () =>{
		this.setState({visible:false})
	};
	
	// 选择搜索日期
	onDateChange = (date,dateString) =>{
		this.setState({searchJson:{...this.state.searchJson,exchange_date:dateString}})
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
		let searchJson =  {
			exchange_date:'',
			product_name: ''
		};
		this.setState({searchJson},()=>{
			this.search()
		})
	};
	
	
	render() {
		const tabs =['全部','已上架','已下架','过期下架'];
		let props = {
			visible:this.state.visible,
			onCancel:this.hideCreate
		};
		return (
			<Fragment>
				<CreateNew {...props}/>
				
				<div className="i_banner">
					<div className="i_inputs">
						<span>优惠券名称:</span>
						<Input
							size="small"
							placeholder="请输入优惠券名称"
							value={this.state.searchJson['product_name']}
							onChange={(e)=>{this.changeSearchValue(e,'product_name')}}
						/>
					</div>
					<div className="i_inputs">
						<span>兑换时间:</span>
						<LocaleProvider locale={zh_CN}>
							<RangePicker
								onChange={this.onDateChange}
							/>
						</LocaleProvider>
					</div>
					<Button size="small" type="primary" onClick={this.search}>搜索</Button>
					<span className="i_filter" onClick={this.clear}>清空筛选条件</span>
				</div>
				<ul className="i_tabs">
					{
						tabs.map((item,index)=>{
							return <li
								key={index}
								className={this.state.activeTab == item?'active':''}
								onClick={()=>this.onChangeTab(item)}
							>{item}</li>
						})
					}
					<Button size="small" onClick={this.showCreate}>
						<IconFont type="icon-plus-circle-fill" />
						新建积分商品
					</Button>
				</ul>
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

export default RedemptionManage;

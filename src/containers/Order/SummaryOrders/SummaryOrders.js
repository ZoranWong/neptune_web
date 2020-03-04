import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, message, Table} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/refund.sass'
import {searchJson, getToken, orderOutputTransformer, orderInputTransformer} from "../../../utils/dataStorage";
import {refund_order_values} from "../../../utils/refund_order_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import ReviewGoods from "../Components/ReviewGoods";
import {summaryOrders} from "../../../api/order/orderManage";
import Export from "../Components/Export";
import Config from '../../../config/app'
import _ from "lodash";
import {timeFormer} from '../../../utils/dataStorage'
import SelectPosition from "./Modal/SelectPosition";
class SummaryOrders extends React.Component{
	constructor(props){
		
		const defaultItem = ['user_nickname','trade_no', 'products', 'settlement_total_fee', 'refund_type', 'refund_apply_at','refund_state'];
		super(props);
		this.child = React.createRef();
		this.state = {
			api:summaryOrders,
			filterVisible:false,
			customVisible:false,
			exportVisible: false,
			refundVisible:false, // 退款
			refuseVisible:false, // 拒绝退款
			data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson: searchJson({date: null})
			},
			activeTab:'BACKEND_ALL',
			reviewGoodsVisible:false,
			record:{},
			items:[],
			refundItem:{},
			refuseItem:{},
			defaultItem: defaultItem,
			conditions: {},
			current: 1,
			todayOrders: [],
			loadingOne: false,
			loadingTwo: false,
			positionVisible: false
		};
		this.refundColumns = [
			{
				title: '收货店铺',
				dataIndex: 'shop_name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}>{text}</span>,
			},
			{
				title: '商品',
				render: (text,record) => {
					if(record.items.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.items[0].product_name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items)} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '缺少商品',
				render: (text,record) => {
					if(record.deficient_items.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.deficient_items[0].product_name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.deficient_items)} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '破损商品',
				render: (text,record) => {
					if(record.damaged_items.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.damaged_items[0].product_name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items)} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '汇总时间',
				dataIndex: 'summary_date',
			},
			{
				title: '状态',
				dataIndex:'state_desc',
			},
		];
	}
	
	componentWillMount() {
		if (this.props.location.state && this.props.location.state.current) {
			this.setState({current: this.props.location.state.current})
		}
		document.addEventListener('click', this.closeCustom);
	}
	
	refresh = (status='BACKEND_ALL')=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson:searchJson({state_constant:status})
			}
		},()=>{
			this.child.current.pagination(1)
		})
	};
	
	// 商品回显
	reviewGoods = (record,text) =>{
		this.setState({reviewGoodsVisible:true,items:record,text: text})
	};
	closeReviewGoods = () =>{
		this.setState({reviewGoodsVisible:false})
	};
	
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:summaryOrders,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value,status:true})}
		},()=>{
			this.child.current.pagination(1)
		});
	};
	
	//高级筛选
	higherFilter = () =>{
		this.setState({filterVisible:true})
	};
	closeHigherFilter = () =>{
		this.setState({filterVisible:false})
	};
	onSubmit = (data) =>{
		this.setState({api:summaryOrders,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
			this.child.current.pagination(1)
		});
	};
	
	//自定义显示项
	showCustom = (e) =>{
		e.nativeEvent.stopImmediatePropagation();
		this.setState({customVisible:true})
	};
	closeCustom = () =>{
		this.setState({customVisible:false})
	};
	handleCustom = (e) =>{
		let ary = [];
		e.forEach(e=>{
			refund_order_values.forEach(u=>{
				u.children.forEach(c=>{
					if(e == c.value){
						let obj = {};
						obj.title = c.label;
						obj.dataIndex = orderOutputTransformer(e);
						if (obj.dataIndex === 'damaged_items') {
							obj.render = (text,record) => {
								if(record.damaged_items.length){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.damaged_items[0].product_name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items, '破损商品')} />
									</span>
								} else {
									return <span>无</span>
								}
							}
						};
						if (obj.dataIndex === 'items') {
							obj.render = (text,record) => {
								if(record.items.length){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.items[0].product_name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items)} />
									</span>
								} else {
									return <span>无</span>
								}
							}
						}
						if (obj.dataIndex === 'deficient_items') {
							obj.render =(text,record) => {
								if(record.deficient_items.length){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.deficient_items[0].product_name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.deficient_items, '缺少商品')} />
									</span>
								} else {
									return <span>无</span>
								}
							}
						}
						ary.push(obj)
					}
				})
			})
		});
		let index = e.indexOf('id');
		if (index < 0) {
			e.push('id');
		}
		ary[0].render = (text,record) => <span
			style={{'color':'#4F9863','cursor':'pointer'}}
			onClick={()=>this.jump(record)}>{text}</span>;
		this.refundColumns = ary;
		this.setState({
			columns:ary,
			paginationParams:{...this.state.paginationParams, only:  e.join(',')}
		},()=>{
			this.child.current.pagination(1)
		})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		console.log(list);
		this.setState({data:list})
	};
	
	// 切换tab
	onChangeTab = item =>{
		this.setState({activeTab:item.key});
		this.refresh(item.key)
	};
	
	// 导出
	showExport = (conditions) =>{
		this.setState({conditions, exportVisible: true}, ()=>{
			this.closeHigherFilter()
		})
	};
	hideExport = () =>{
		this.setState({exportVisible: false})
	};
	
	// 确定导出
	export = (type, items, conditions) =>{
		let json = searchJson({
			strategy: type,
			summary_order_id: this.state.checkedAry[0],
			customize_columns: items,
			logic_conditions: conditions
		});
		window.open(`${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`,'target','');
	};
	
	// 打印订单
	print = () => {
		let {checkedAry, data} = this.state;
		let orders = [];
		_.map((data), (order)=> {
			if (_.indexOf(checkedAry, order.id) > -1) {
				orders.push(order)
			}
		});
		this.props.history.push({pathname:"/printSummaryOrders", state: {orders, title: '消费者汇总单'}})
	};
	
	// 打印某一店铺订单
	printShopOrder = () => {
		if (this.state.checkedAry.length > 1) {
			message.error('当前打印只可选择一项进行打印');
			return
		}
		let {checkedAry, data} = this.state;
		let orders = [];
		let title = '';
		_.map((data), (order)=> {
			if (_.indexOf(checkedAry, order.id) > -1) {
				title = `${order['shop_name']}的订单`;
				orders = order.relatedOrders.data
			}
		});
		console.log(orders, '...');
		this.props.history.push({pathname:"/printSheet", state: {orders, title: title}})
	};
	
	// 导出今日订单
	exportOrders = () => {
		if (this.state.checkedAry.length > 1) {
			message.error('当前导出只可选择一项进行导出');
			return
		}
		this.setState({exportVisible: true, isToday: true})
	};
	
	// 点击获取今日所有汇总单
	getTodayOrder = async (page = 1, today, type) =>{
		let res = await summaryOrders({page: page, limit: 10, searchJson: searchJson({date: today})});
		let list = res.data;
		let meta = res.meta;
		this.setState({todayOrders: this.state.todayOrders.concat(list)}, ()=>{
			if (meta['pagination']['current_page'] < meta['pagination']['total_pages']) {
				this.getTodayOrder(meta['pagination']['current_page'] + 1, today, type)
			} else {
				this.setState({
					loadingOne: false,
					loadingTwo: false
				});
				let todayOrders = this.state.todayOrders;
				if (type === 'summary') {
					let orders = [];
					if (todayOrders.length) {
						_.map(todayOrders, (todayOrder)=>{
							_.map(todayOrder['relatedOrders'].data, (item) =>{
								orders.push(item)
							})
						});
						this.props.history.push({pathname:"/printSheet", state: {orders: orders, title: ''}})
					}
				} else if (type === 'order') {
					console.log(type, 'ooooooooooo', todayOrders);
					this.props.history.push({pathname:"/printSummaryOrders", state: {orders: todayOrders, title: ''}})
				}
			}
		})
		
	};
	
	// 打印今日汇总单
	printAllSummaryOrders = async () => {
		let now = new　Date();
		this.setState({loadingOne: true});
		// this.showPosition()
		await this.getTodayOrder(1, timeFormer(now), 'order');
	};
	
	// 打印今日订单
	printAllOrders = async () => {
		let now = new Date();
		// this.showPosition()
		this.setState({loadingTwo: true});
		await this.getTodayOrder(1, timeFormer(now),'summary');
	};
	
	// 选择地点
	showPosition = () => {
		this.setState({positionVisible: true})
	};
	hidePosition = () => {
		this.setState({positionVisible: false})
	};
	submitPosition = (position) => {
		console.log(position, '==================================>');
	};
	
	render(){
		
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				let ary = [];
				_.map(selectedRows, row=>{
					ary.push(row.id)
				});
				this.setState({checkedAry:ary})
			}
		};
		const tabs = [
			{name:'全部',key:'BACKEND_ALL'},
			{name:'待收货',key:'BACKEND_WAIT_AGENT_VERIFY'},
			{name:'正常完成收货',key:'BACKEND_SUCCESS_COMPLETED'},
			{name:'异常完成收货',key:'BACKEND_UNQUALIFIED_COMPLETED'}
		];
		const strategy = [
			{key: 'SHOP_SELF_PICK_SUMMARY', value: '自提汇总单',},
			{key: 'SHOP_SELF_PICK_SUMMARY_2', value: '自提汇总单婉秋定制版',}
		];
		const exportProps = {
			visible : this.state.exportVisible,
			onCancel : this.hideExport,
			export: this.export,
			strategy,
			values: refund_order_values,
			conditions: this.state.conditions
		};
		const positionProps = {
			visible : this.state.positionVisible,
			onCancel: this.hidePosition,
			submit: this.submitPosition
		};
		return (
			<div className="refund">
				<Export {...exportProps} />
				<SelectPosition {...positionProps} />
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					data={refund_order_values}
					export={this.showExport}
				/>
				
				<ReviewGoods
					visible={this.state.reviewGoodsVisible}
					onCancel={this.closeReviewGoods}
					items={this.state.items}
					text={this.state.text}
				/>
				
				<div className="s_body">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入姓名或手机号'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						{
							window.hasPermission("order_management_printing") && <Button
								size="small"
								onClick={this.print}
								disabled={!this.state.checkedAry.length}
							>打印汇总单</Button>
						}
						{
							window.hasPermission("order_management_printing") && <Button
								size="small"
								onClick={this.printShopOrder}
								disabled={!this.state.checkedAry.length}
							>打印订单</Button>
						}
						{
							window.hasPermission("order_management_printing") && <Button
								size="small"
								onClick={this.exportOrders}
								disabled={!this.state.checkedAry.length}
							>导出</Button>
						}
						{
							window.hasPermission("order_management_printing") && <Button
								size="small"
								onClick={this.printAllSummaryOrders}
								loading={this.state.loadingOne}
							>打印今日汇总单</Button>
						}
						{
							window.hasPermission("order_management_printing") && <Button
								size="small"
								onClick={this.printAllOrders}
								loading={this.state.loadingTwo}
							>打印今日订单</Button>
						}
					</div>
					
				</div>
				
				<div className="tabs">
					<ul className="left">
						{
							tabs.map((item,index)=>{
								return <li
									key={index}
									className={this.state.activeTab == item.key?'active':''}
									onClick={()=>this.onChangeTab(item)}
								>{item.name}</li>
							})
						}
					</ul>
					<div className="right">
						<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
						<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
							<CustomItem
								data={refund_order_values}
								targetKeys={orderInputTransformer(this.state.defaultItem)}
								firstItem={'trade_no'}
								handleCustom={this.handleCustom}
							/>
						</div>
					</div>
				</div>
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
						columns={this.refundColumns}
						rowKey={(record, index) => {
							return index
						}}
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
						text="条记录"
						params={this.state.paginationParams}
						id={this.state.id}
						valChange={this.paginationChange}
						current={this.state.current}
					/>
				</div>
				
				
			</div>
		)
	}
}
export default withRouter(SummaryOrders)

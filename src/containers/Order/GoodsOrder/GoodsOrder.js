import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, message, Modal, Table} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/goodsOrder.sass'
import {
	getBeforeDate,
	getToken,
	orderInputTransformer,
	orderOutputTransformer,
	searchJson
} from "../../../utils/dataStorage";
import {merchant_order_values} from "../../../utils/merchant_order_fields";
import {merchant_order_custom_fields} from "../../../utils/merchant_order_custom_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import RefundMoney from "./Modal/RefundMoney";
import {shopOrder, shopOrderChecked, summaryOrders} from "../../../api/order/orderManage";
import {groups} from "../../../api/shops/groups";
import ReviewGoods from "../Components/ReviewGoods";
import Export from "../Components/Export";
import Config from '../../../config/app'
import _ from "lodash";
import {getSystemSetting} from "../../../api/common";
class GoodsOrder extends React.Component{
	constructor(props){
		const defaultItem = ['shop_name','trade_no','products', 'deficientProducts', 'damagedProducts', 'created_at','state_desc','settlement_total_fee'];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:shopOrder,
			filterVisible:false,
			customVisible:false,
			exportVisible: false,
			data:[],
			checkedAry:[],     // 列表页选中的用户id组
			refundVisible:false, // 退款
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			activeTab:'ALL',
			refundItem:{},
			defaultItem: defaultItem,
			todayOrders: [],
			loadingOne: false
		};
		this.merchantColumns = [
			{
				title: '商户名',
				dataIndex: 'shop_name',
				ellipsis: true
			},
			{
				title: '商品',
				ellipsis: true,
				render: (text,record) => {
					if(record.items && record.items.length>0){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.items[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items, '商品')} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '缺少商品',
				ellipsis: true,
				render: (text,record) => {
					if(record.deficient_items && record.deficient_items.length>0){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.deficient_items[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.deficient_items, '缺少商品')} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '破损商品',
				ellipsis: true,
				render: (text,record) => {
					if(record.damaged_items && record.damaged_items.length>0){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.damaged_items[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items, '破损商品')} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			
			{
				title: '下单时间',
				ellipsis: true,
				dataIndex: 'created_time',
			},
			{
				title: '实付款',
				ellipsis: true,
				dataIndex: 'settlement_total_fee',
			},
			{
				title: this.state.activeTab == 'GOODS_UNQUALIFIED_WAIT_PROCESS'?'操作':'状态',
				dataIndex:'state_desc',
				render:(text,record) =>{
					if(this.state.activeTab == 'GOODS_UNQUALIFIED_WAIT_PROCESS'){
						return (
							<div>
								{
									window.hasPermission("order_agent_confirm_refund") && <span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.showRefund(record)}>退款</span>
								}
							</div>
						)
					} else {
						return <span>{text}</span>
					}
				},
			},
		];
	}
	
	componentWillMount() {
		document.addEventListener('click', this.closeCustom);
	}
	
	
	refresh = (key='ALL')=>{
		let arr = this.state.checkedAry;
		arr[key] = [];
		let param={
			logic_conditions:[],
			search:''
		}
		if(key && key!='ALL'){
			param["searchJson"]=searchJson({state_constant:key});
		}
		this.setState({
			filterVisible:false,
			checkedAry: arr,
			paginationParams:param
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:shopOrder,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({
					search:value,
					state_constant:this.state.activeTab
				})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
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
		this.setState({api:shopOrder,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
			this.child.current.pagination(this.child.current.state.current)
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
			merchant_order_custom_fields.forEach(u=>{
				u.children.forEach(c=>{
					if(e == c.value){
						let obj = {};
						obj.title = c.label;
						obj.ellipsis=true;
						obj.dataIndex = orderOutputTransformer(e);
						if (obj.dataIndex === 'damaged_items') {
							obj.render = (text,record) => {
								if(record.damaged_items && record.damaged_items.length>0){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.damaged_items[0].name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items, '破损商品')} />
									</span>
								} else {
									return <span>无</span>
								}
							}
						};
						if (obj.dataIndex === 'items') {
							obj.render = (text,record) => {
								if(record.items && record.items.length>0){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.items[0].name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items)} />
									</span>
								} else {
									return <span>无</span>
								}
							}
						}
						if (obj.dataIndex === 'deficient_items') {
							obj.render =(text,record) => {
								if(record.deficient_items && record.deficient_items.length>0){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.deficient_items[0].name+'......'}</span>
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
			>{text}</span>;
		this.merchantColumns = ary;
		this.setState({
			columns:ary,
			paginationParams:{...this.state.paginationParams, only:  e.join(',')}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		console.log(list);
		this.setState({data:list})
	};
	
	// 商品回显
	reviewGoods = (record,text) =>{
		this.setState({reviewGoodsVisible:true,items:record,text: text})
	};
	closeReviewGoods = () =>{
		this.setState({reviewGoodsVisible:false})
	};
	
	// 切换tab
	onChangeTab = activeTab =>{
		this.setState({activeTab:activeTab.key});
		this.refresh(activeTab.key)
	};
	
	//   退款
	showRefund = (record) =>{
		this.setState({refundVisible:true,refundItem:record})
	};
	hideRefund = () =>{
		this.setState({refundVisible:false})
	};
	
	// 设置默认模板消息
	setMessage = () => {
		this.props.history.push({pathname:"/order/setUserMessage",state:{mode:'goods'}})
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
			customize_columns: items,
			logic_conditions: conditions
		});
		console.log(json);
		window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
		// dataExport({searchJson: searchJson(params)}).then(r=>{
		// 	console.log(r);
		// }).catch(_=>{})
	};
	onOrderChecked = async () => {
		this.confirmPopover(shopOrderChecked)
		// console.log(result, '--------------- shop order checked ----------');
	};
	
	// 打印订单
	print = async () => {
		this.setState({loadingOne: true});
		let res = await getSystemSetting({searchJson: searchJson({type: 'MERCHANT_ORDER'})});
		console.log(res, '===>>>');
		let hour = null;
		let minute = null;
		_.map(res.data, item => {
			if (item.key === 'MERCHANT_ORDER_PAID_TIME_THRESHOLD_HOUR') {
				hour = item.value
			};
			if (item.key === 'MERCHANT_ORDER_PAID_TIME_THRESHOLD_MINUTE') {
				minute = item.value
			};
		});
		let deadline = `${hour}:${minute}`;
		let yesterday = getBeforeDate(-1);
		let today = getBeforeDate(0);
		let logic_conditions = {
			conditions: [
				{
					conditions: [
						{
							key: 'order_paid_at',
							operation: 'between',
							value: [`${yesterday} ${deadline}`,`${today} ${deadline}`]
						},
					],
					logic: 'and'
				}
			],
			logic: 'and'
		};
		this.getOrders(logic_conditions, 1)
		// this.props.history.push({pathname:"/printSummaryOrders", state: {orders, title: '商户订货订单'}})
	};

	getOrders = async (consitions, page) => {
		let res = await shopOrder({page: page, limit: 10, searchJson: searchJson({logic_conditions: consitions})});
		let list = res.data;
		let meta = res.meta;
		this.setState({todayOrders: this.state.todayOrders.concat(list)}, ()=>{
			if (meta['pagination']['current_page'] < meta['pagination']['total_pages']) {
				this.getOrders(consitions, meta['pagination']['current_page'] + 1)
			} else {
				this.setState({
					loadingOne: false,
				});
				let todayOrders = this.state.todayOrders;
				if (todayOrders.length) {
					this.props.history.push({pathname:"/printSummaryOrders", state: {orders: todayOrders, title: '今日订单'}})
				} else {
					message.error('今日暂无订单')
				}
			}
		})
	};

	printOrders = () => {
		let {checkedAry, data} = this.state;
		let orders = [];
		_.map((data), (order)=> {
			if (  checkedAry[this.state.activeTab] && _.indexOf(checkedAry[this.state.activeTab], order.id) > -1) {
				orders.push(order)
			}
		});
		this.props.history.push({pathname:"/printSummaryOrders", state: {orders, title: '商户订货订单'}})
	};
	confirmPopover =(fn) => {
		let refresh = this.refresh;
		let activeTab = this.state.activeTab;
		let params = this.state.checkedAry[activeTab];
		let confirmModal = Modal.confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			maskClosable:true,
			content: (
				<div className="U_confirm">
					确定手动核销这些订单吗？
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small'
			},
			onOk() {
				fn(params).then(r=>{
					message.success(r.message);
					refresh(activeTab)
				});

			},
			onCancel() {

			},
		});
	};
	render(){
		const rowSelection = {
			onChange: (selectedRowKeys) => {
				let checkedArray = this.state.checkedAry;
				let activeTab = this.state.activeTab;
				checkedArray[activeTab] = selectedRowKeys;
				this.setState({checkedAry:checkedArray})
			}
		};
		const tabs = [
			{name:'全部',key:'ALL'},
			{name:'待收货',key:'WAIT_AGENT_VERIFY'},
			{name:'已完成',key:'COMPLETED'},
			{name:'商品异常',key:'GOODS_UNQUALIFIED_WAIT_PROCESS'},
			{name:'处理中',key:'GOODS_UNQUALIFIED_WAIT_VERIFY'},
			{name:'已退款',key:'GOODS_UNQUALIFIED_REFUNDED'},
			{name:'待支付',key:'GOODS_WAIT_PAY'},
			{name:'已取消',key:'GOODS_CANCELED'},
		];
		
		const strategy = [
			{key: 'MERCHANT_ORDER_PRODUCT_ORDER_CUSTOMIZE', value: '自定义显示项',},
			{key: 'MERCHANT_ORDER_PRODUCT_ORDER_PRODUCT', value: '商品维度',},
			{key: 'MERCHANT_ORDER_PRODUCT_ORDER_SHOP', value: '店铺维度',},
			{key: 'MERCHANT_ORDER_PRODUCT_ORDER_DELIVERY_TEMPLATE', value: '物流订单模板',},
			{key: 'MERCHANT_ORDER_DIVIDE_PRODUCT_ORDER_SHOP', value: '物流分货模板',},
		];
		
		const exportProps = {
			visible : this.state.exportVisible,
			onCancel : this.hideExport,
			export: this.export,
			strategy,
			values: merchant_order_custom_fields,
			conditions: this.state.conditions,
			slug: 'order_'
		};
		console.log(typeof this.state.checkedAry[this.state.activeTab] !== 'undefined' );
		return (
			<div className="goodsOrder">
				<Export {...exportProps} />
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					data={merchant_order_values}
					export={this.showExport}
				/>
				
				<RefundMoney
					visible={this.state.refundVisible}
					onCancel={this.hideRefund}
					item={this.state.refundItem}
					refresh={()=>{
						this.refresh('GOODS_UNQUALIFIED_WAIT_PROCESS')
					}}
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
								loading={this.state.loadingOne}
							>打印今日订单</Button>
						}
						{
							window.hasPermission("order_management_printing") && <Button
								size="small"
								onClick={this.printOrders}
								disabled={typeof this.state.checkedAry[this.state.activeTab] === 'undefined' || !this.state.checkedAry[this.state.activeTab].length}
							>打印订单</Button>
						}
						{
							window.hasPermission("order_agent_bind_template") && <Button
								size="small"
								type='primary'
								onClick={this.setMessage}
							>设置默认模板消息</Button>
						}
						<Button size="small" type="primary" onClick={this.onOrderChecked} disabled={typeof this.state.checkedAry[this.state.activeTab] === 'undefined' || !this.state.checkedAry[this.state.activeTab].length}>核销订货单</Button>
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
								data={merchant_order_custom_fields}
								targetKeys={orderInputTransformer(this.state.defaultItem)}
								firstItem={'shop_name'}
								handleCustom={this.handleCustom} />
						</div>
					</div>
				</div>
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
						columns={this.merchantColumns}
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
						text="条订单"
						params={this.state.paginationParams}
						id={this.state.id}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		)
	}
}
export default withRouter(GoodsOrder)

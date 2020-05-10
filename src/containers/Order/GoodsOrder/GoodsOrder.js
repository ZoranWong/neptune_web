import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/goodsOrder.sass'
import {getToken, orderInputTransformer, orderOutputTransformer, searchJson} from "../../../utils/dataStorage";
import {merchant_order_values} from "../../../utils/merchant_order_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import RefundMoney from "./Modal/RefundMoney";
import {shopOrder} from "../../../api/order/orderManage";
import {groups} from "../../../api/shops/groups";
import ReviewGoods from "../Components/ReviewGoods";
import Export from "../Components/Export";
import Config from '../../../config/app'
import _ from "lodash";
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
		};
		this.merchantColumns = [
			{
				title: '商户名',
				dataIndex: 'name',
			},
			{
				title: '商品',
				render: (text,record) => {
					if(record.items.data.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.items.data[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items, '商品')} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '缺少商品',
				render: (text,record) => {
					if(record.deficient_items.data.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.deficient_items.data[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.deficient_items, '缺少商品')} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '破损商品',
				render: (text,record) => {
					if(record.damaged_items.data.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.damaged_items.data[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items, '破损商品')} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			
			{
				title: '下单时间',
				dataIndex: 'paid_at',
			},
			{
				title: '实付款',
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
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson:searchJson({
					state_constant:key
				})
			}
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
			merchant_order_values.forEach(u=>{
				u.children.forEach(c=>{
					if(e == c.value){
						let obj = {};
						obj.title = c.label;
						obj.dataIndex = orderOutputTransformer(e);
						if (obj.dataIndex === 'damaged_items') {
							obj.render = (text,record) => {
								if(record.damaged_items.data.length){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.damaged_items.data[0].name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items, '破损商品')} />
									</span>
								} else {
									return <span>无</span>
								}
							}
						};
						if (obj.dataIndex === 'items') {
							obj.render = (text,record) => {
								if(record.items.data.length){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.items.data[0].name+'......'}</span>
										<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items)} />
									</span>
								} else {
									return <span>无</span>
								}
							}
						}
						if (obj.dataIndex === 'deficient_items') {
							obj.render =(text,record) => {
								if(record.deficient_items.data.length){
									return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
										<span className="orderGoods">{record.deficient_items.data[0].name+'......'}</span>
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
	
	// 打印订单
	print = () => {
		let {checkedAry, data} = this.state;
		let orders = [];
		_.map((data), (order)=> {
			if (_.indexOf(checkedAry, order.id) > -1) {
				orders.push(order)
			}
		});
		this.props.history.push({pathname:"/printSummaryOrders", state: {orders, title: '商户订货订单'}})
	};
	
	render(){
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(selectedRowKeys);
				this.setState({checkedAry:selectedRowKeys})
			}
		};
		const tabs = [
			{name:'全部',key:'ALL'},
			{name:'待收货',key:'WAIT_AGENT_VERIFY'},
			{name:'已完成',key:'COMPLETED'},
			{name:'商品异常',key:'GOODS_UNQUALIFIED_WAIT_PROCESS'},
			{name:'处理中',key:'GOODS_UNQUALIFIED_WAIT_VERIFY'},
			{name:'已退款',key:'GOODS_UNQUALIFIED_REFUNDED'},
		];
		
		const strategy = [
			{key: 'MERCHANT_ORDER_PRODUCT_ORDER_CUSTOMIZE', value: '自定义显示项',},
			{key: 'MERCHANT_ORDER_PRODUCT_ORDER_PRODUCT', value: '商品维度',},
			{key: 'MERCHANT_ORDER_PRODUCT_ORDER_SHOP', value: '店铺维度',},
		];
		
		const exportProps = {
			visible : this.state.exportVisible,
			onCancel : this.hideExport,
			export: this.export,
			strategy,
			values: merchant_order_values,
			conditions: this.state.conditions,
			slug: 'order_'
		};
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
								disabled={!this.state.checkedAry.length}
							>打印订单</Button>
						}
						{
							window.hasPermission("order_agent_bind_template") && <Button
								size="small"
								type='primary'
								onClick={this.setMessage}
							>设置默认模板消息</Button>
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
								data={merchant_order_values}
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

import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/refund.sass'
import {searchJson, getToken, orderOutputTransformer, orderInputTransformer} from "../../../utils/dataStorage";
import {refund_order_values} from "../../../utils/refund_order_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import ReviewGoods from "../Components/ReviewGoods";
import RefundMoney from "./Modal/RefundMoney";
import RefuseRefund from "./Modal/RefuseRefund";
import {refundList} from "../../../api/order/orderManage";
import Export from "../Components/Export";


class Refund extends React.Component{
	constructor(props){
		
		const defaultItem = ['user_nickname','trade_no', 'products', 'settlement_total_fee', 'refund_type', 'refund_apply_at','refund_state'];
		super(props);
		this.child = React.createRef();
		this.state = {
			api:refundList,
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
			},
			activeTab:'-1',
			reviewGoodsVisible:false,
			record:{},
			items:[],
			refundItem:{},
			refuseItem:{},
			defaultItem: defaultItem,
			conditions: {}
		};
		this.refundColumns = [
			{
				title: '订单号',
				dataIndex: 'trade_no',
				render: (text,record) => <span
					onClick={()=>this.jump(record)}
					style={{'color':'#4F9863','cursor':'pointer'}}>{text}</span>,
			},
			{
				title: '商品',
				render: (text,record) => {
					if(record.items.data.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.items.data[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.items)} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '实付款',
				dataIndex: 'settlement_total_fee',
			},
			{
				title: '用户昵称',
				dataIndex: 'nickname',
			},
			{
				title: '退款类型',
				dataIndex: 'refund_type',
			},
			{
				title: '申请时间',
				dataIndex: 'applied_at',
			},
			{
				title: this.state.activeTab == '0'?'操作':'退款状态',
				dataIndex:'refund_state_desc',
				render:(text,record) =>{
					if(this.state.activeTab == '0'){
						return (
							<div>
								<span style={{'color':'#4F9863','cursor':'pointer','marginRight':'20px'}} onClick={()=>this.showRefund(record)}>退款</span>
								<span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.showRefuse(record)}>拒绝退款</span>
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
	
	
	
	
	refresh = (status='-1')=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson:searchJson({refund_state:status})
			}
		},()=>{
			this.child.current.pagination(1)
		})
	};
	
	// 商品回显
	reviewGoods = record =>{
		this.setState({reviewGoodsVisible:true,items:record})
	};
	closeReviewGoods = () =>{
		this.setState({reviewGoodsVisible:false})
	};
	
	jump = record => {
		this.props.history.push({pathname:"/order/orderDetail",state:{id:record.id}})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:refundList,
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
		this.setState({api:refundList,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
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
		console.log(e, '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`');
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
	
	//   退款
	showRefund = record =>{
		this.setState({refundVisible:true,refundItem:record})
	};
	hideRefund = () =>{
		this.setState({refundVisible:false})
	};
	
	// 拒绝退款
	showRefuse = record =>{
		this.setState({refuseVisible:true,refuseItem:record})
	};
	hideRefuse = () =>{
		this.setState({refuseVisible:false})
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
		window.location.href = `http://neptune.klsfood.cn/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
		// dataExport({searchJson: searchJson(params)}).then(r=>{
		// 	console.log(r);
		// }).catch(_=>{})
	};
	
	render(){
		let refundColumns = [
			{
				title: '订单号',
				dataIndex: 'trade_no',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}>{text}</span>,
			},
			{
				title: '缺少商品',
				render: (text,record) => {
					if(record.damaged_items.data.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.damaged_items.data[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.damaged_items)} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '破损商品',
				render: (text,record) => {
					if(record.deficient_items.data.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.deficient_items.data[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.deficient_items)} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '实付款',
				dataIndex: 'settlement_total_fee',
			},
			{
				title: '用户昵称',
				dataIndex: 'nickname',
			},
			{
				title: '退款类型',
				dataIndex: 'refund_type',
			},
			{
				title: '申请时间',
				dataIndex: 'applied_at',
			},
			{
				title: this.state.activeTab == '0'?'操作':'退款状态',
				dataIndex:'refund_state_desc',
				render:(text,record) =>{
					if(this.state.activeTab == '0'){
						return (
							<div>
								<span style={{'color':'#4F9863','cursor':'pointer','marginRight':'20px'}} onClick={()=>this.showRefund(record)}>退款</span>
								<span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.showRefuse(record)}>拒绝退款</span>
							</div>
						)
					} else {
						return <span>{text}</span>
					}
				},
			},
		];
		
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			}
		};
		const tabs = [
			{name:'全部',key:'-1'},
			{name:'待处理',key:'0'},
			{name:'处理中',key:'1'},
			{name:'已退款',key:'2'},
			{name:'拒绝退款',key:'3'},
		];
		
		const strategy = [
			{key: 'USER_ORDER_CUSTOMIZE', value: '自定义显示项',},
			{key: 'USER_ORDER_PRODUCT', value: '商品维度',},
			{key: 'USER_ORDER_SHOP', value: '店铺维度',},
		];
		const exportProps = {
			visible : this.state.exportVisible,
			onCancel : this.hideExport,
			export: this.export,
			strategy,
			values: refund_order_values,
			conditions: this.state.conditions
		};
		return (
			<div className="refund">
				<Export {...exportProps} />
				
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
				/>
				
				<RefundMoney
					visible={this.state.refundVisible}
					onCancel={this.hideRefund}
					item={this.state.refundItem}
					refresh={()=>this.refresh('0')}
				/>
				<RefuseRefund
					visible={this.state.refuseVisible}
					onCancel={this.hideRefuse}
					item={this.state.refuseItem}
					refresh={()=>this.refresh('0')}
				/>
				
				
				<div className="s_body">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入姓名或手机号'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
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
						text="条记录"
						params={this.state.paginationParams}
						id={this.state.id}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		)
	}
}
export default withRouter(Refund)

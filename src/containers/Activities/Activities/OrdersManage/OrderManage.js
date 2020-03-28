import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table, Modal, message} from 'antd'
import IconFont from "../../../../utils/IconFont";
import '../../../Order/OrderManage/css/order.sass'
import {getToken, orderInputTransformer, orderOutputTransformer, searchJson} from "../../../../utils/dataStorage";
import AdvancedFilterComponent from "./Modal/AdvancedFilterComponent";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import CustomItem from "../../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../../components/Layout/Pagination";
import ReviewGoods from "../../../Order/Components/ReviewGoods";
import {actOrders, delivery, manufacture} from "../../../../api/activities";
import {consumer_order_values} from "../../../../utils/consumer_order_fields";
import {consumer_order_values_export} from "../../../../utils/consumer_order_fields_export";
import _ from 'lodash';
import Config from '../../../../config/app';
import {cancelOrder} from "../../../../api/activities";
import {checkManyOrder} from "../../../../api/order/orderManage";
import {consumer_order_values_custom} from "../../../../utils/consumer_order_fields_custom_item";

class OrderManage extends React.Component{
	constructor(props){
		const defaultItem = ['trade_no', 'products', 'settlement_total_fee', 'user_nickname', 'expect_receive_date','paid_at','state_desc'];
		const columns = [
			{
				title: '订单号',
				dataIndex: 'trade_no',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.jump(record)}>{text}</span>,
			},
			{
				title: '商品',
				dataIndex: 'category_desc',
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
				dataIndex: 'user_nickname',
			},
			{
				title: '预期收货时间',
				dataIndex: 'expect_receive_date',
				render: (text,record) => (
					<span>{text} {record['expect_receive_time_start']}-{record['expect_receive_time_end']}</span>
				)
			},
			{
				title: '支付时间',
				dataIndex: 'paid_at',
			},
			{
				title: '订单状态',
				dataIndex:'state_desc'
			}
		];
		super(props);
		this.child = React.createRef();
		this.state = {
			api:actOrders,
			filterVisible:false,
			customVisible:false,
			reviewGoodsVisible:false,
			data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				searchJson: searchJson({state_constant: 'ALL'}),
				search:'',
			},
			defaultItem:defaultItem,
			columns: columns,
			activeTab:'ALL',
			items:[],  // 商品回显,
			conditions: {},
			current: 1,
			actId: ''
		};
	}
	
	componentWillMount() {
		this.setState({actId: this.props.location.state.id})
		if (this.props.location.state && this.props.location.state.current) {
			this.setState({current: this.props.location.state.current})
		}
		document.addEventListener('click', this.closeCustom);
	}
	
	refresh = (status='ALL')=>{
		this.setState({
			filterVisible:false,
			checkedAry: [],
			paginationParams:{
				logic_conditions:[],
				searchJson:searchJson({
					state_constant: status
				})
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	jump = record => {
		this.props.history.push({pathname:"/order/orderDetail",state:{id:record.id,path:'/order', current: this.child.current.state.current}})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:actOrders,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({
					search:value,
					state_constant: this.state.activeTab
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
		this.setState({api:actOrders,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,state_constant:  this.state.activeTab || 'ALL'})}},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	// 切换tab
	onChangeTab = item =>{
		this.setState({activeTab:item.key});
		this.refresh(item.key)
	};
	
	
	// 商品回显
	reviewGoods = record =>{
		this.setState({reviewGoodsVisible:true,items:record})
	};
	closeReviewGoods = () =>{
		this.setState({reviewGoodsVisible:false})
	};
	
	// 设置默认模板消息
	setMessage = () => {
		this.props.history.push({pathname:"/order/setUserMessage",state:{mode:'user'}})
	};
	
	backAct = () => {
		this.props.history.push({pathname:"/activities"})
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
		console.log(e);
		e.forEach(e=>{
			consumer_order_values_custom.forEach(u=>{
				u.children.forEach(c=>{
					if(e == c.value){
						let obj = {};
						obj.title = c.label;
						obj.dataIndex = orderOutputTransformer(e);
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
						if (obj.dataIndex === 'expect_receive_date') {
							obj.render =  (text,record) => (
								<span>{text} {record['expect_receive_time_start']}-{record['expect_receive_time_end']}</span>
							)
						}
						ary.push(obj);
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
		let {activeTab} = this.state;
		ary.push({
			title: '操作',
			colSpan: activeTab === 'PAY_COMPLETED' || activeTab === 'WAIT_MANUFACTURE' ? 1 : 0,
			render: (text,record) => {
				if (activeTab === 'PAY_COMPLETED') {
					return <div>
						<span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.start(record, 'do')}>开始制作</span>
						<span style={{'color':'#4F9863','cursor':'pointer',marginLeft: '20px'}} onClick={()=>this.cancel(record)}>取消</span>
					</div>
				} else if (activeTab === 'WAIT_MANUFACTURE') {
					return <span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.start(record, 'go')}>开始配送</span>
				}
			}
		});
		this.setState({
			columns:ary,
			paginationParams:{...this.state.paginationParams, only:  e.join(',')}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 开始制作
	start = (record, type) => {
		let refresh = this.refresh;
		let text = type === 'do' ? '制作' : '配送';
		let api = type === 'do' ? manufacture : delivery;
		let {actId, activeTab} = this.state;
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
			content: (
				<div className="U_confirm">
					确定开始{text}吗？
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
				// 确定按钮执行操作
				api({},actId, record.id).then(r=>{
					message.success(r.message);
					refresh(activeTab)
				}).catch(_=>{})
			}
		});
	};
	
	// 取消订单
	cancel = (record) => {
		let refresh = this.refresh;
		let { activeTab} = this.state;
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
			content: (
				<div className="U_confirm">
					是否确定取消订单并退款?
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
				// 确定按钮执行操作
				cancelOrder({}, record.id).then(r=>{
					message.success(r.message);
					refresh(activeTab)
				}).catch(_=>{})
			}
		});
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
		this.props.history.push({pathname:"/printSheet", state: {orders, title: '青松功夫配送单',isNeedItems: true}})
	};
	
	export = () =>{
		let json = searchJson({
			strategy: 'ACTIVITY_ORDER_CAKE',
			customize_columns: [],
			logic_conditions: [],
			order_ids: this.state.checkedAry
		});
		window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
		// dataExport({searchJson: searchJson(params)}).then(r=>{
		// 	console.log(r);
		// }).catch(_=>{})
	};
	
	exportNew = (strategy) => {
		let json = searchJson({
			strategy: strategy,
			customize_columns: [],
			logic_conditions: [],
			order_ids: this.state.checkedAry
		});
		window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
		// dataExport({searchJson: searchJson(params)}).then(r=>{
		// 	console.log(r);
		// }).catch(_=>{})
	};
	
	// 手动核销
	check = (record) => {
		let refresh = this.refresh;
		let checkedAry = this.state.checkedAry;
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
					确定手动核销该订单么？
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
				checkManyOrder({order_ids: checkedAry}).then(r=>{
					message.success(`手动核销订单成功！`);
					refresh('WAIT_CUSTOMER_VERIFY')
				});
				
			},
			onCancel() {
			
			},
		});
	}
	
	
	
	render(){
		
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				let ary = [];
				selectedRows.forEach(item=>{
					ary.push(item['id'])
				});
				this.setState({checkedAry:ary})
			}
		};
		const tabs = [
			{name:'全部',key:'ALL'},
			{name:'等待用户支付',key:'WAIT_PAY'},
			{name:'已支付',key:'PAY_COMPLETED'},
			{name:'制作中',key:'WAIT_MANUFACTURE'},
			{name:'配送中',key:'WAIT_CUSTOMER_VERIFY'},
			{name:'已完成',key:'COMPLETED'},
			{name:'平台取消',key:'CANCEL_PLATFORM'},
			{name:'支付超时取消',key:'CANCEL_PAY_TIMEOUT'},
			{name:'用户取消',key:'CANCEL_MANUAL'},
			{name:'发起售后',key:'LAUNCH_AFTER_SALE'},
			{name:'售后处理中',key:'ON_AFTER_SALE'},
			{name:'已退款',key:'REFUNDED'},
			{name:'已拒绝退款',key:'REFUSE_REFUND'},
			{name:'已关闭',key:'CLOSED'}
		];
		const strategy = [
			{key: 'ACTIVITY_ORDER_CAKE', value: '生日蛋糕',}
		];
		
		let style = {
			'position': 'absolute',
			'right': '0px',
			'zIndex': '999'
		};
		
		let {activeTab,columns} = this.state;
		if (_.findIndex(columns, column => {
			return column.title === '操作'
		}) < 0) {
			columns.push({
				title: '操作',
				colSpan: activeTab === 'PAY_COMPLETED' || activeTab === 'WAIT_MANUFACTURE' ? 1 : 0,
				render: (text,record) => {
					if (activeTab === 'PAY_COMPLETED') {
						return <div>
							<span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.start(record, 'do')}>开始制作</span>
							<span style={{'color':'#4F9863','cursor':'pointer',marginLeft: '20px'}} onClick={()=>this.cancel(record)}>取消</span>
						</div>
					} else if (activeTab === 'WAIT_MANUFACTURE') {
						return <span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.start(record, 'go')}>开始配送</span>
					}
				}
			});
		} else {
			columns.pop();
			columns.push({
				title: '操作',
				colSpan: activeTab === 'PAY_COMPLETED' || activeTab === 'WAIT_MANUFACTURE' ? 1 : 0,
				render: (text,record) => {
					if (activeTab === 'PAY_COMPLETED') {
						return <div>
							<span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.start(record, 'do')}>开始制作</span>
							<span style={{'color':'#4F9863','cursor':'pointer',marginLeft: '20px'}} onClick={()=>this.cancel(record)}>取消</span>
						</div>
					} else if (activeTab === 'WAIT_MANUFACTURE') {
						return <span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.start(record, 'go')}>开始配送</span>
					}
				}
			})
		}
		
		return (
			<div className="order">
				
				
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					data={consumer_order_values}
				/>
				
				<ReviewGoods
					visible={this.state.reviewGoodsVisible}
					onCancel={this.closeReviewGoods}
					items={this.state.items}
					text={'商品'}
				/>
		
				
			
				<div className="s_body">
					
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入姓名或手机号'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						<Button
							size="small"
							type='primary'
							onClick={this.setMessage}
						>设置默认模板消息</Button>
						<Button
							size="small"
							onClick={this.print}
							disabled={!this.state.checkedAry.length}
						>打印订单</Button>
						<Button
							size="small"
							type="default"
							className="e_btn"
							onClick={this.export}
							disabled={!this.state.checkedAry.length}
						>导出</Button>
						<Button
							size="small"
							type="default"
							className="e_btn"
							disabled={!this.state.checkedAry.length}
							onClick={()=>this.exportNew('ACTIVITY_ORDER_CAKE_2')}
						>导出新格式</Button>
						<Button
							size="small"
							type="default"
							className="e_btn"
							disabled={!this.state.checkedAry.length}
							onClick={()=>this.exportNew('ACTIVITY_ORDER_CAKE_3')}
						>导出新新格式</Button>
						<Button
							size="small"
							onClick={this.check}
							disabled={!this.state.checkedAry.length || this.state.activeTab !== 'WAIT_CUSTOMER_VERIFY' }
						>批量核销订单</Button>
						
					</div>
					<Button size='small' style={style} onClick={this.backAct}>返回蛋糕管理</Button>
				</div>
				
				<div className="tabs">
					<ul className="left">
						{
							tabs.map((item,index)=>{
								return <li
									key={index}
									className={this.state.activeTab == item.key?'active':''}
									onClick={()=>this.onChangeTab(item)}
									style={{'padding': '0 10px'}}
								>{item.name}</li>
							})
						}
					</ul>
					{
						this.state.data.length ? <div className="right">
							<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
							<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
								<CustomItem
									data={consumer_order_values_export}
									handleCustom={this.handleCustom}
									targetKeys={orderInputTransformer(this.state.defaultItem)}
									firstItem={'trade_no'}
								/>
							</div>
						</div> : ''
					}
				
				</div>
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
						columns={this.state.columns}
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
						text="条订单"
						ref={this.child}
						params={this.state.paginationParams}
						id={this.state.actId}
						current={this.state.current}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		)
	}
}
export default withRouter(OrderManage)

import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table, Modal, message} from 'antd'
import IconFont from "../../../utils/IconFont";
import '../../Order/OrderManage/css/order.sass'
import {getToken, orderInputTransformer, orderOutputTransformer, searchJson} from "../../../utils/dataStorage";
import AdvancedFilterComponent from "./Modal/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import ReviewGoods from "../../Order/Components/ReviewGoods";
import {actOrders, delivery, manufacture} from "../../../api/activities";
import {consumer_order_values} from "../../../utils/consumer_order_fields";


class OrderManage extends React.Component{
	constructor(props){
		
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
				searchJson: searchJson({state_constant: 'WAIT_PAY'}),
				search:'',
			},
			activeTab:'WAIT_PAY',
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
	}
	
	refresh = (status='WAIT_PAY')=>{
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
		this.setState({api:actOrders,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
			this.child.current.pagination(1)
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
	
	
	render(){
		
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				let ary = [];
				selectedRows.forEach(item=>{
					ary.push(item['id'])
				});
				if(this.state.activeTab !== 'WAIT_PLATFORM_VERIFY') return;
				this.setState({checkedAry:ary})
			}
		};
		const tabs = [
			{name:'等待用户支付',key:'WAIT_PAY'},
			{name:'已支付',key:'PAY_COMPLETED'},
			{name:'制作中',key:'WAIT_MANUFACTURE'},
			{name:'配送中',key:'WAIT_CUSTOMER_VERIFY'},
			{name:'已完成',key:'COMPLETED'},
			{name:'支付超时取消',key:'CANCEL_PAY_TIMEOUT'},
			{name:'用户取消',key:'CANCEL_MANUAL'},
			{name:'发起售后',key:'LAUNCH_AFTER_SALE'},
			{name:'已退款',key:'REFUNDED'},
			{name:'已拒绝退款',key:'REFUSE_REFUND'},
			{name:'已关闭',key:'CLOSED'}
		];
		const strategy = [
			{key: 'USER_ORDER_CUSTOMIZE', value: '自定义显示项',},
			{key: 'USER_ORDER_PRODUCT', value: '商品维度',},
			{key: 'USER_ORDER_SHOP', value: '店铺维度',},
		];
		
		let style = {
			'position': 'absolute',
			'right': '280px',
			'zIndex': '99999'
		};
		
		let {activeTab} = this.state;
		
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
				title: '订单类型',
				dataIndex: 'order_type',
			},
			{
				title: '下单时间',
				dataIndex: 'paid_at',
			},
			{
				title: '订单状态',
				dataIndex:'state_desc'
			},
			{
				title: '操作',
				colSpan: activeTab === 'PAY_COMPLETED' || activeTab === 'WAIT_MANUFACTURE' ? 1 : 0,
				render: (text,record) => {
					if (activeTab === 'PAY_COMPLETED') {
						return <span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.start(record, 'do')}>开始制作</span>
					} else if (activeTab === 'WAIT_MANUFACTURE') {
						return <span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.start(record, 'go')}>开始配送</span>
					}
				}
			}
		];
		
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
		
				<Button size='small' style={style} onClick={this.backAct}>返回活动管理</Button>
			
				<div className="s_body">
					
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入姓名或手机号'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						{
							window.hasPermission("order_management_bind_template") && <Button
								size="small"
								type='primary'
								onClick={this.setMessage}
							>设置默认模板消息</Button>
						}
						{
							window.hasPermission("order_management_printing") && <Button
								size="small"
							>打印订单</Button>
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
					{
						this.state.data.length && <div className="right">
							<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
							<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
								<CustomItem
									data={consumer_order_values}
									handleCustom={this.handleCustom}
									targetKeys={orderInputTransformer(this.state.defaultItem)}
									firstItem={'trade_no'}
								/>
							</div>
						</div>
					}
				
				</div>
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
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

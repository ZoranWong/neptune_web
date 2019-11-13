import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table, Modal, message} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/order.sass'
import {getToken, searchJson} from "../../../utils/dataStorage";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import ReviewGoods from "../Components/ReviewGoods";
import {userOrder,batchCancel,batchConfirm} from "../../../api/order/orderManage";
import {consumer_order_values} from "../../../utils/consumer_order_fields";
import Export from "../Components/Export";



class Order extends React.Component{
	constructor(props){
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
				dataIndex: 'nickname',
			},
			{
				title: '订单类型',
				dataIndex: 'order_type',
			},
			{
				title: '下单时间',
				dataIndex: 'created_at',
			},
			{
				title: '订单状态',
				dataIndex:'state_desc'
			},
		];
		const defaultItem = ['user_nickname','trade_no', 'product_name', 'settlement_total_fee', 'order_type', 'created_at','state_desc'];
		super(props);
		this.child = React.createRef();
		this.state = {
			api:userOrder,
			filterVisible:false,
			customVisible:false,
			reviewGoodsVisible:false,
			exportVisible: false,
			defaultItem: defaultItem,
			data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			activeTab:'ALL',
			columns:columns,
			items:[],  // 商品回显,
			conditions: {}
			
		};
	}
	
	componentWillMount() {
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
			this.child.current.pagination(1)
		})
	};
	
	jump = record => {
		// this.props.history.push({pathname:"/order/orderDetails",state:{id:record.product_id}})
	};
	
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:userOrder,
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
		this.setState({api:userOrder,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
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
			consumer_order_values.forEach(u=>{
				u.children.forEach(c=>{
					if(e == c.value){
						let obj = {};
						obj.title = c.label;
						obj.dataIndex = e;
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
			onClick={()=>this.jump(record)}>{text}</span>
		this.setState({
			columns:ary,
			paginationParams:{...this.state.paginationParams, only:  e.join(',')}
		},()=>{
			this.child.current.pagination(1)
		})
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
	
	// 取消订单 / 确认订单
	confirmPopover =(fn,keyWord) => {
		let refresh = this.refresh;
		let self = this;
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
					确定{keyWord}该订单么？
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
				fn({order_ids:checkedAry}).then(r=>{
					message.success(`${keyWord}订单成功！`);
					self.setState({checkedAry: []});
					refresh('WAIT_PLATFORM_VERIFY')
				});
				
			},
			onCancel() {
			
			},
		});
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
	export = (type, items,conditions) =>{
		console.log(type, '--- type---');
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
		
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				let ary = [];
				selectedRows.forEach(item=>{
					ary.push(item['order_id'])
				});
				if(this.state.activeTab !== 'WAIT_PLATFORM_VERIFY') return;
				this.setState({checkedAry:ary})
			}
		};
		const tabs = [
			{name:'全部',key:'ALL'},
			{name:'待确认',key:'WAIT_PLATFORM_VERIFY'},
			{name:'待收货',key:'WAIT_AGENT_VERIFY'},
			{name:'待自提',key:'WAIT_CUSTOMER_VERIFY'},
			{name:'已完成',key:'COMPLETED'},
			{name:'已退款',key:'REFUNDED'},
			{name:'用户取消',key:'CANCEL_MANUAL'},
			{name:'平台取消',key:'CANCEL_PLATFORM'},
			{name:'订单异常',key:'EXCEPTION'},
			{name:'申请售后',key:'AFTER_SALE'},
			{name:'拒绝退款',key:'REFUSE_REFUND'},
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
			values: consumer_order_values,
			conditions: this.state.conditions
		};
		
		
		return (
			<div className="order">
				<Export {...exportProps} />
				
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					export={this.showExport}
					data={consumer_order_values}
				/>
				
				<ReviewGoods
					visible={this.state.reviewGoodsVisible}
					onCancel={this.closeReviewGoods}
					items={this.state.items}
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
						>打印订单</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={()=>this.confirmPopover(batchCancel,'取消')}
						>取消订单</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={()=>this.confirmPopover(batchConfirm,'确认')}
						>确认订单</Button>
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
								data={consumer_order_values}
								handleCustom={this.handleCustom}
								targetKeys={this.state.defaultItem}
								firstItem={'nickname'}
							/>
						</div>
					</div>
				</div>
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
						columns={this.state.columns}
						rowKey={record => record.order_id}
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
						id={this.state.id}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		)
	}
}
export default withRouter(Order)

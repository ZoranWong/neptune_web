import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table,Modal} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/order.sass'
import {searchJson} from "../../../utils/dataStorage";
import {user_values} from "../../../utils/user_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import ReviewGoods from "../Components/ReviewGoods";
import {userOrder} from "../../../api/order/orderManage";

class Order extends React.Component{
	constructor(props){
		const columns = [
			{
				title: '订单号',
				dataIndex: 'trade_no',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}>{text}</span>,
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
				dataIndex:'status'
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:userOrder,
			filterVisible:false,
			customVisible:false,
			reviewGoodsVisible:false,
			data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			activeTab:'全部',
			columns:columns,
			items:[]  // 商品回显
		};
	}
	
	componentWillMount() {
		document.addEventListener('click', this.closeCustom);
	}
	
	
	refresh = (status='all')=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson:searchJson({order_state:status})
			}
		},()=>{
			this.child.current.pagination(1)
		})
	};
	
	
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:userOrder,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
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
			user_values.forEach(u=>{
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
		ary[0].render = (text,record) => <span
			style={{'color':'#4F9863','cursor':'pointer'}}
			onClick={()=>this.jump(record)}>{text}</span>
		this.setState({columns:ary})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		console.log(list);
		this.setState({data:list})
	};
	
	// 切换tab
	onChangeTab = item =>{
		this.setState({activeTab:item.name});
		this.refresh(item.key)
	};
	
	// 取消订单 / 确认订单
	confirmPopover =(fn,keyWord) => {
		let refresh = this.refresh;
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
				// fn({}).then(r=>{
				// 	console.log(r);
				// })
				console.log(fn);
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
	
	render(){
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				if(this.state.activeTab !== '待确认') return;
				this.setState({checkedAry:selectedRowKeys})
			}
		};
		const tabs = [
			{name:'全部',key:'all'},
			{name:'待确认',key:'pay_wait'},
			{name:'待收货',key:'wait_agent_verify'},
			{name:'待自提',key:'wait_customer_verify'},
			{name:'已完成',key:'completed'},
			{name:'已退款',key:'refunded'},
			{name:'用户取消',key:'cancel_manual'},
			{name:'平台取消',key:'cancel_platform'},
			{name:'订单异常',key:'exception'},
			{name:'申请售后',key:'launch_after_sale'},
			{name:'拒绝退款',key:'refuse_refund'},
		];
		return (
			<div className="order">
				
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
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
							disabled={this.state.checkedAry.length == 0}
						>打印订单</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={()=>this.confirmPopover('cancel','取消')}
						>取消订单</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={()=>this.confirmPopover('confirm','确认')}
						>确认订单</Button>
					</div>
				</div>
				
				<div className="tabs">
					<ul className="left">
						{
							tabs.map((item,index)=>{
								return <li
									key={index}
									className={this.state.activeTab == item.name?'active':''}
									onClick={()=>this.onChangeTab(item)}
								>{item.name}</li>
							})
						}
					</ul>
					<div className="right">
						<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
						<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
							<CustomItem data={user_values}  handleCustom={this.handleCustom} />
						</div>
					</div>
				</div>
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
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
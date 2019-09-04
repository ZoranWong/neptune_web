import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/goodsOrder.sass'
import {searchJson} from "../../../utils/dataStorage";
import {user_values} from "../../../utils/user_fields";
import AdvancedFilterComponent from "../Components/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import RefundMoney from "./Modal/RefundMoney";
import {shopOrder} from "../../../api/order/orderManage";
import ReviewGoods from "../Components/ReviewGoods";

class GoodsOrder extends React.Component{
	constructor(props){
		
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:shopOrder,
			filterVisible:false,
			customVisible:false,
			data:[],
			checkedAry:[],     // 列表页选中的用户id组
			refundVisible:false, // 退款
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			activeTab:'全部',
			refundItem:{}
		};
	}
	
	componentWillMount() {
		document.addEventListener('click', this.closeCustom);
	}
	
	
	refresh = (key='all')=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson:searchJson({order_state:key})
			}
		},()=>{
			this.child.current.pagination(1)
		})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:shopOrder,
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
		this.setState({api:shopOrder,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
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
	
	// 商品回显
	reviewGoods = record =>{
		this.setState({reviewGoodsVisible:true,items:record})
	};
	closeReviewGoods = () =>{
		this.setState({reviewGoodsVisible:false})
	};
	
	// 切换tab
	onChangeTab = activeTab =>{
		this.setState({activeTab:activeTab.name});
		this.refresh(activeTab.key)
	};
	
	//   退款
	showRefund = (record) =>{
		this.setState({refundVisible:true,refundItem:record})
	};
	hideRefund = () =>{
		this.setState({refundVisible:false})
	};
	
	render(){
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			}
		};
		const tabs = [
			{name:'全部',key:'all'},
			{name:'待收货',key:'wait_agent_verify'},
			{name:'已完成',key:'completed'},
			{name:'商品异常',key:'goods_unqualified'},
		];
		const columns = [
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
				title: '商户名',
				dataIndex: 'name',
			},
			{
				title: '下单时间',
				dataIndex: 'created_at',
			},
			{
				title: '送货批次',
				dataIndex: 'delivery_batch',
			},
			{
				title: this.state.activeTab == '商品异常'?'操作':'状态',
				dataIndex:'refund_state_desc',
				render:(text,record) =>{
					if(this.state.activeTab == '商品异常'){
						return (
							<div>
								<span style={{'color':'#4F9863','cursor':'pointer'}} onClick={()=>this.showRefund(record)}>退款</span>
							</div>
						)
					} else {
						return <span>{text}</span>
					}
				},
			},
		];
		return (
			<div className="goodsOrder">
				
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
				/>
				
				<RefundMoney
					visible={this.state.refundVisible}
					onCancel={this.hideRefund}
					item={this.state.refundItem}
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
						columns={columns}
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
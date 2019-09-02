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
class GoodsOrder extends React.Component{
	constructor(props){
		const columns = [
			{
				title: '订单号',
				dataIndex: 'name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}>{text}</span>,
			},
			{
				title: '缺少商品',
				dataIndex: 'category_desc',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}>{text} <IconFont type="icon-eye-fill" /></span>,
			},
			{
				title: '破损商品',
				dataIndex: 'total_sales',
			},
			{
				title: '商户名',
				dataIndex: 'spec',
			},
			{
				title: '下单时间',
				dataIndex: 'unit',
			},
			{
				title: '送货批次',
				dataIndex: 'retail_price',
			},
			{
				title: '状态',
				dataIndex:'status'
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:'',
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
			columns:columns,
		};
	}
	
	componentWillMount() {
		document.addEventListener('click', this.closeCustom);
	}
	
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
			}
		},()=>{
			this.child.current.pagination(1)
		})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:'',
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
		this.setState({api:'',paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
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
	onChangeTab = activeTab =>{
		this.setState({activeTab})
	};
	
	//   退款
	hideRefund = () =>{
		this.setState({refundVisible:false})
	};
	
	render(){
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			}
		};
		const tabs =['全部','待收货','已完成','商品不齐'];
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
									className={this.state.activeTab == item?'active':''}
									onClick={()=>this.onChangeTab(item)}
								>{item}</li>
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
export default withRouter(GoodsOrder)
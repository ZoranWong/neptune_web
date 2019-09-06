import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import IconFont from "../../../../utils/IconFont";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import {Button, Table,Modal} from "antd";
import '../css/consumer.sass'
import {user_values} from "../../../../utils/user_fields";
import CustomPagination from "../../../../components/Layout/Pagination";
import {searchJson} from "../../../../utils/dataStorage";
import AdvancedFilterComponent from "../../../Order/Components/AdvancedFilterComponent";
import CustomItem from "../../../../components/CustomItems/CustomItems";
import PickUpDetails from "../Modal/PickUpDetails";

class Merchant extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '优惠券名称',
				dataIndex: 'name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}>
					{text}
				</span>,
			},
			{
				title: '价值',
				dataIndex: 'category_desc',
			},
			{
				title: '使用条件',
				dataIndex: 'spec',
			},
			{
				title: '发放门店',
				dataIndex: 'shops',
			},
			{
				title: '适用商品',
				dataIndex: 'goods',
			},
			{
				title: '有效期',
				dataIndex: 'date',
			},
			{
				title: '发放总量/剩余库存',
				dataIndex: 'unit',
			},
			{
				title: '领取人数/张数',
				dataIndex: 'number',
			},
			{
				title: '已使用',
				dataIndex: 'used',
			},
			{
				title: '状态',
				dataIndex: 'status',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'10px'}}
							onClick={()=>this.showPickUpDetail(record)}
						>领取详情
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'10px'}}
							onClick={()=>this.confirmPopover('','下架')}
						>下架
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'10px'}}
							onClick={()=>this.deletePopover(record)}
						>删除
						</span>
					</div>
			},
		];
		this.state = {
			filterVisible:false,
			customVisible:false,
			data:[{name:'1'}],
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			columns:columns,
			pickUpDetailsVisible:false,   // 领取详情
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
	
	// 新建优惠券
	newCoupon = () =>{
		this.props.history.push({pathname:"/marketing/newCouponShop"})
	};
	
	// 领取详情
	showPickUpDetail = (record) =>{
		this.setState({pickUpDetailsVisible:true})
	};
	hidePickUpDetail = () =>{
		this.setState({pickUpDetailsVisible:false});
	};
	
	// 上架/下架
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
					确定{keyWord}该优惠券么？
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
				// fn({order_ids:checkedAry}).then(r=>{
				// 	message.success(`${keyWord}订单成功！`);
				// 	refresh('wait_platform_verify')
				// });
				
			},
			onCancel() {
			
			},
		});
	};
	
	// 删除
	deletePopover =(record) => {
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
					确定删除该优惠券么？
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
				// fn({order_ids:checkedAry}).then(r=>{
				// 	message.success(`${keyWord}订单成功！`);
				// 	refresh('wait_platform_verify')
				// });
			},
			onCancel() {
			
			},
		});
	};
	
	render() {
		const pickUpDetails = {
			visible:this.state.pickUpDetailsVisible,
			onCancel:this.hidePickUpDetail,
		};
		return (
			<div className="couponTab">
				
				<PickUpDetails {...pickUpDetails} />
				
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
				/>
				<div className="consumerHeader">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入姓名或手机号'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						
					</div>
					<div className="right">
						<Button
							size="small"
							className="addCoupon"
							onClick={this.newCoupon}
						>
							<IconFont type="icon-plus-circle-fill" />
							新建优惠券
						</Button>
						<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
						<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
							<CustomItem data={user_values}  handleCustom={this.handleCustom} />
						</div>
					</div>
				</div>
				
				<div className="chart u_chart">
					<Table
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
		);
	}
}

export default withRouter(Merchant);
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import IconFont from "../../../../utils/IconFont";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import {Button, Table, Modal, message} from "antd";
import '../css/consumer.sass'
import {user_values} from "../../../../utils/user_fields";
import CustomPagination from "../../../../components/Layout/Pagination";
import {searchJson} from "../../../../utils/dataStorage";
import AdvancedFilterComponent from "../../../Order/Components/AdvancedFilterComponent";
import CustomItem from "../../../../components/CustomItems/CustomItems";
import PickUpDetails from "../Modal/PickUpDetails";
import {coupons, deleteCoupons, onShelvesCoupons} from "../../../../api/marketing/coupon";

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
				dataIndex: 'state_desc',
				render:(text,record)=>{
					switch (record.state) {
						case 0:
							text = '未发送';
							break;
						case 2:
							text = '已发送';
							break;
						default:
							text = ''
					}
					return text;
				}
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
						{
							this.renderStatus(record)
						}
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'10px'}}
							onClick={()=>this.confirmPopover(deleteCoupons,'删除',record.coupon_id)}
						>删除
						</span>
					</div>
			},
		];
		this.state = {
			filterVisible:false,
			customVisible:false,
			api:coupons,
			data:[],
			paginationParams:{
				logic_conditions:[],
				search:'',
				obj_type:'MERCHANT'
			},
			columns:columns,
			pickUpDetailsVisible:false,   // 领取详情
		};
		this.child = React.createRef();
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
				obj_type:'MERCHANT'
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 根据状态值来获取对应的按钮
	renderStatus = (record) =>{
		let confirmPopover = this.confirmPopover;
		let state;
		switch (record.state) {
			case 0 :
				state = <span
					style={{'color':'#4F9863','cursor':'pointer',marginLeft:'10px'}}
					onClick={()=>confirmPopover(onShelvesCoupons,'发送',record.coupon_id)}
				>
				发送
			</span>;
				break;
			// case 1:
			// 	state = <span
			// 		style={{'color':'#4F9863','cursor':'pointer',marginLeft:'10px'}}
			// 		onClick={()=>confirmPopover('','删除')}
			// 	>
			// 	删除
			// </span>;
			// 	break;
			default:
				state = ''
		}
		
		return state;
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:coupons,
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
		this.setState({api:coupons,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
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
	confirmPopover =(fn,keyWord,id) => {
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
				fn({},id).then(r=>{
					message.success(`${keyWord}成功！`);
					refresh()
				});
				
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
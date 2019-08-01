import React from 'react';
import {Button, Table} from 'antd'
import './css/shopManage.sass'
import {withRouter} from 'react-router-dom'
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import {shop_values} from "../../../utils/shop_fields";
import {searchJson} from "../../../utils/dataStorage";
import {shops,applicationsCount} from "../../../api/shops/shopManage";
import CustomPagination from "../../../components/Layout/Pagination";
import AdvancedFilterComponent from "./AdvancedFilterComponent";
import AddGroup from "./AddGroup";
import ShopApplication from './ShopApplication'
import SelectChannel from './ShopAdd/SelectChannel'
import ChangeStatus from './ChangeStatus'
import BreakfastCar from "./ShopAdd/BreakfastCar";
import Distributor from "./ShopAdd/Distributor";
import ShopKeeper from "./ShopAdd/ShopKeeper";
import {shopListInGroup} from "../../../api/shops/groups";

class ShopManage extends React.Component{
	constructor(props){
		const columns = [
			{
				title: '店铺名称',
				dataIndex: 'name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}
					onClick={()=>this.jump(record)}>{text}</span>,
			},
			{
				title: '商户主',
				dataIndex: 'keeper_name',
			},
			{
				title: '店铺编号',
				dataIndex: 'code',
			},
			{
				title: '销售总额',
				dataIndex: 'total_sale',
			},
			{
				title: '店铺渠道',
				dataIndex: 'channel',
			},
			{
				title: '店铺状态',
				dataIndex: 'status',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.editShop(record)}
							>编辑
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
						>门店码
						</span>
					</div>
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:shops,
			id:'',
			filterVisible:false,
			customVisible:false,
			applicationVisible:false,
			groupVisible:false,
			statusVisible:false,
			distributor:false,
			breakfast:false,
			shopKeeper:false,
			user_data:[],
			applications_count:0,
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:''
			},
			recordId:'',
			columns:columns
		};
	}
	
	componentWillMount() {
		document.addEventListener('click', this.closeCustom);
		if(this.props.location.query&&this.props.location.query.groupId){
			this.setState({id:this.props.location.query.groupId,api:shopListInGroup})
		}
		// applicationsCount({}).then(r=>{
		// 	console.log(r);
		// })
	}
	
	
	editShop = (record) =>{
		this.setState({recordId:record.id});
		switch (record.channel) {
			case "早餐车":
				this.showBreakfast();
				return;
			case "分销员":
				this.showDistributor();
				return;
			default :
				this.showShopKeeper()
		}
	};
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:''
			}
		},()=>{
			this.child.current.pagination(1)
		})
	};
	
	jump = (record) =>{
		this.props.history.push({pathname:"/shops/shopDetails",state:{id:record.id}})
	};
	
	// 店铺申请
	showApplication = () =>{
		this.setState({applicationVisible:true})
	};
	closeApplication = ()=>{
		this.setState({applicationVisible:false})
	};
	
	//新增店铺
	showAdd = () =>{
		this.setState({addVisible:true})
	};
	closeAdd = ()=>{
		this.setState({addVisible:false})
	};
	
	// 加群组
	closeAddGroup= () =>{
		this.setState({groupVisible:false})
	};
	onSubmitGroup = () =>{
		this.setState({groupVisible:false})
	};
	showAddGroup = (data) =>{
		this.setState({groupVisible:true,conditions_data:data})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:shops,
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
		this.setState({api:shops,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
			this.child.current.pagination(1)
		});
	};
	
	// 早餐车
	showBreakfast = () =>{
		this.setState({breakfast:true})
	};
	hideBreakfast = () =>{
		this.setState({breakfast:false})
	};
	
	// 分销员
	showDistributor = () =>{
		this.setState({distributor:true})
	};
	hideDistributor = () =>{
		this.setState({distributor:false})
	};
	
	// 商户
	showShopKeeper = () =>{
		this.setState({shopKeeper:true})
	};
	hideShopKeeper = () =>{
		this.setState({shopKeeper:false})
	};
	
	
	//自定义显示项
	showCustom = (e) =>{
		e.nativeEvent.stopImmediatePropagation();
		this.setState({customVisible:true})
	};
	closeCustom = () =>{
		this.setState({customVisible:false})
	};
	
	// 修改店铺状态
	showChangeStatus = () =>{
		this.setState({statusVisible:true});
	};
	closeChangeStatus = () =>{
		this.setState({statusVisible:false})
	};
	
	
	handleCustom = (e) =>{
		let ary = [];
		e.forEach(e=>{
			shop_values.forEach(u=>{
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
		
		ary.push({
			title: '操作',
			render: (text,record) =>
				<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.editShop(record)}
						>编辑
						</span>
					<span
						style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
					>门店码
						</span>
				</div>
		});
		this.setState({columns:ary})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({user_data:list})
	};
	
	
	
	render(){
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			})
		};
		
		return (
			<div>
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					showAddGroup={this.showAddGroup}
					closeAddGroup={this.closeAddGroup}
				/>
				
				<AddGroup
					visible={this.state.groupVisible}
					onClose={this.closeAddGroup}
					onSubmit={this.onSubmitGroup}
					checkedAry={this.state.checkedAry}
					conditionsData={this.state.conditions_data}
				/>
				
				<BreakfastCar
					visible={this.state.breakfast}
					onClose={this.hideBreakfast}
					onShow={this.showBreakfast}
					recordId={this.state.recordId}
				/>
				<Distributor
					visible={this.state.distributor}
					onClose={this.hideDistributor}
					onShow={this.showDistributor}
					recordId={this.state.recordId}
				/>
				<ShopKeeper
					visible={this.state.shopKeeper}
					onClose={this.hideShopKeeper}
					onShow={this.showShopKeeper}
					recordId={this.state.recordId}
				/>
				
				
				<ShopApplication
					visible={this.state.applicationVisible}
					onClose={this.closeApplication}
					onShow={this.showApplication}
				/>
				<SelectChannel
					visible={this.state.addVisible}
					onClose={this.closeAdd}
				/>
				
				<ChangeStatus
					visible={this.state.statusVisible}
					onClose={this.closeChangeStatus}
					checkedAry={this.state.checkedAry}
					refresh={this.refresh}
				/>
				
				
				<div className="s_header">
					<Button size="small" type="primary" onClick={this.showApplication}>店铺申请({this.state.applications_count})</Button>
					<Button size="small" onClick={this.showAdd}>新增店铺</Button>
				</div>
				
				
				<div className="s_body">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入关键词'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						<Button size="small" disabled={this.state.checkedAry.length == 0} onClick={this.showChangeStatus}>修改店铺状态</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.showAddGroup}
						>加入群组</Button>
						<Button size="small" disabled={this.state.checkedAry.length == 0}>导出</Button>
					</div>
					<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
				</div>
				
				<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
					<CustomItem
						data={shop_values}
						targetKeys={['name','keeper_name',"introducer_code",'total_code_scan_amount','channel','status']}
						handleCustom={this.handleCustom} />
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
						dataSource={this.state.user_data}
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
export default withRouter(ShopManage)
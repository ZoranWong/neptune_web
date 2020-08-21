import React from 'react';
import {Button, message, Table} from 'antd'
import './css/shopManage.sass'
import {withRouter} from 'react-router-dom'
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import {shop_values} from "../../../utils/shop_fields";
import {shop_export_values} from "./shop_export_fields";
import {getToken, searchJson} from "../../../utils/dataStorage";
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
import ShopCode from "./ShopCode";
import {shopListInGroup} from "../../../api/shops/groups";
import Export from "../../Order/Components/Export";
import Config from '../../../config/app'
import SelectDate from "./SelectDate";
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
				dataIndex: 'total_code_scan_amount'
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
						{
							window.hasPermission("shop_management_edit") && <span
								style={{'color':'#4F9863','cursor':'pointer'}}
								onClick={()=>this.editShop(record)}
							>编辑
						</span>
						}
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
							onClick={()=>this.showCode(record)}
						>门店码
						</span>
					</div>
			},
		];
		const defaultItem = ['name','keeper_name',"code",'total_code_scan_amount','channel','status','id','promotion_qr_code', 'payment_qr_code'];
		super(props);
		this.child = React.createRef();
		this.state = {
			api:shops,
			id:'',
			filterVisible:false,
			customVisible:false,
			applicationVisible:false,
			codeVisible: false,
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
				search:'',
				only: defaultItem.join(',')
			},
			recordId:'',
			columns:columns,
			defaultItem:defaultItem,
			selectedRows:[],
			channel_desc:'',
			shopCodeId: '',
			current: 1,
			exportVisible: false,
			selectDate: false,
			strategy: ''
		};
	}
	
	componentWillMount() {
		if (this.props.location.state && this.props.location.state.current) {
			this.setState({current: this.props.location.state.current})
		}
		document.addEventListener('click', this.closeCustom);
		if(this.props.location.query&&this.props.location.query.groupId){
			this.setState({id:this.props.location.query.groupId,api:shopListInGroup})
		}
		applicationsCount({}).then(r=>{
			this.setState({applications_count:r.data.applications_count});
		})
	}
	
	
	editShop = (record) =>{
		this.setState({recordId:record.id,channel_desc: record.channel});
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
				search:'',
				only: this.state.defaultItem.join(',')
			},
			checkedAry: []
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	jump = (record) =>{
		if (window.hasPermission("shop_management_display")) {
			this.props.history.push({pathname:"/shops/shopDetails",state:{id:record.id,path:'/shops', current: this.child.current.state.current}})
		} else {
			message.error('暂无权限，请联系管理员')
		}
		
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
		this.setState({api:shops,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 早餐车
	showBreakfast = () =>{
		this.setState({breakfast:true})
	};
	hideBreakfast = () =>{
		this.setState({breakfast:false},()=>{
			this.refresh()
		})
	};
	
	// 分销员
	showDistributor = () =>{
		this.setState({distributor:true})
	};
	hideDistributor = () =>{
		this.setState({distributor:false},()=>{
			this.refresh()
		})
	};
	
	// 商户
	showShopKeeper = () =>{
		this.setState({shopKeeper:true})
	};
	hideShopKeeper = () =>{
		this.setState({shopKeeper:false},()=>{
			this.refresh()
		})
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
	
	handleCode = (e,ex,i) =>{
		switch (ex) {
			case "province_code":
				e.splice(i,1,'province');
				break;
			case "city_code":
				e.splice(i,1,'city');
				break;
			case "area_code":
				e.splice(i,1,'area');
				break;
		}
	};
	
	handleCodeIndex = (ex) => {
		let desc = '';
		switch (ex) {
			case "province_code":
				desc = 'province';
				break;
			case "city_code":
				desc = 'city';
				break;
			case "area_code":
				desc = 'area';
				break;
			default:
				desc = ex
		}
		return desc
	};
	
	handleCustom = (e) =>{
		let ary = [];
		e.forEach((ex,i)=>{
			this.handleCode(e,ex,i);
			shop_values.forEach(u=>{
				u.children.forEach(c=>{
					if(ex == c.value){
						let obj = {};
						obj.title = c.label;
						obj.dataIndex = this.handleCodeIndex(ex);
						ary.push(obj)
					}
				})
			})
		});
		let indexId = e.indexOf('id');
		let indexCodeOne = e.indexOf('promotion_qr_code');
		let indexCodeTwo = e.indexOf('payment_qr_code');
		if (indexId < 0) e.push('id');
		if (indexCodeOne < 0) e.push('promotion_qr_code');
		if (indexCodeTwo < 0) e.push('payment_qr_code');
		
		ary[0].render = (text,record) => <span
			style={{'color':'#4F9863','cursor':'pointer'}}
			onClick={()=>this.jump(record)}>{text}</span>;
		
		ary.push({
			title: '操作',
			render: (text,record) =>
				<div>
					{
						window.hasPermission("shop_management_edit") && <span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.editShop(record)}
						>编辑
						</span>
					}
					<span
						style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
						onClick={()=>this.showCode(record)}
					>门店码
					</span>
				</div>
		});
		this.setState({
			columns:ary,
			paginationParams:{...this.state.paginationParams, only:  e.join(',')}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({user_data:list})
	};
	
	showCode = (record) => {
		this.setState({codeVisible: true, shopCodeId: record})
	};
	hideCode = () =>{
		this.setState({codeVisible: false})
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
		let json = searchJson({
			strategy: type,
			customize_columns: items,
			logic_conditions: conditions
		});
		window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
	};
	
	// 店铺pv  bv 导出
	shopExport = (type, isShowDate) => {
		if (isShowDate) {
			this.setState({selectDate: true, strategy: type})
		} else {
			let json = searchJson({
				strategy: type,
				customize_columns: [],
				logic_conditions: [],
				shop_id: this.state.checkedAry[0]
			});
			window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
		}
	};
	hideSelectDate = () => {
		this.setState({selectDate:false})
	};
	submitSelectDate = (date) => {
		let json = '';
		if (this.state.strategy === 'MERCHANT_CURRENT_MONTH_BV') {
			json = searchJson({
				strategy: this.state.strategy,
				customize_columns: [],
				logic_conditions: [],
				start_date: date[0],
				end_date: date[1]
			});
		} else if (this.state.strategy === 'MERCHANT_PARTNERS_CURRENT_MONTH_BV') {
			json = searchJson({
				strategy: this.state.strategy,
				customize_columns: [],
				logic_conditions: [],
				shop_id: this.state.checkedAry[0],
				start_date: date[0],
				end_date: date[1]
			});
		}
		window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
	};
	
	
	render(){
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys, selectedRows:selectedRows})
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			})
		};
		
		const codeProps = {
			visible: this.state.codeVisible,
			onCancel: this.hideCode,
			item: this.state.shopCodeId
		};
		
		const strategy = [
			{key: 'SHOP_CUSTOMIZE', value: '自定义显示项',},
		];
		const exportProps = {
			visible : this.state.exportVisible,
			onCancel : this.hideExport,
			export: this.export,
			strategy,
			values: shop_export_values,
			conditions: this.state.conditions,
			slug: 'shop_'
		};
		const dateProps = {
			visible: this.state.selectDate,
			onClose: this.hideSelectDate,
			onSubmit: this.submitSelectDate
		};
		
		return (
			<div>
				<SelectDate {...dateProps} />
				<Export {...exportProps} />
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					showAddGroup={this.showAddGroup}
					export={this.showExport}
					closeAddGroup={this.closeAddGroup}
				/>
				
				<ShopCode {...codeProps} />
				
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
					channelDesc={this.state.channel_desc}
				/>
				<Distributor
					visible={this.state.distributor}
					onClose={this.hideDistributor}
					onShow={this.showDistributor}
					recordId={this.state.recordId}
					channelDesc={this.state.channel_desc}
				/>
				<ShopKeeper
					visible={this.state.shopKeeper}
					onClose={this.hideShopKeeper}
					onShow={this.showShopKeeper}
					recordId={this.state.recordId}
					channelDesc={this.state.channel_desc}
					refresh={this.refresh}
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
					selectedRows={this.state.selectedRows}
				/>
				
				
				<div className="s_header">
					{
						window.hasPermission("shop_management_application") && <Button size="small" type="primary" onClick={this.showApplication}>店铺申请({this.state.applications_count})</Button>
					}
					{
						window.hasPermission("shop_management_add_shop") && <Button size="small" onClick={this.showAdd}>新增店铺</Button>
					}
				</div>
				
				<div className="s_header" style={{marginTop: '16px'}}>
					<Button
						size="small"
						onClick={()=>this.shopExport('MERCHANT_CURRENT_MONTH_PV', false)}
					>导出所有店铺当月pv</Button>
					<Button
						size="small"
						onClick={()=>this.shopExport('MERCHANT_CURRENT_MONTH_BV', true)}
					>导出所有店铺当月bv</Button>
					<Button
						size="small"
						disabled={this.state.checkedAry.length == 0 || this.state.checkedAry.length > 1}
						onClick={()=>this.shopExport('MERCHANT_PARTNERS_CURRENT_MONTH_PV',false)}
					>导出指定店铺所有下线当月pv</Button>
					<Button
						size="small"
						disabled={this.state.checkedAry.length == 0 || this.state.checkedAry.length > 1 }
						onClick={()=>this.shopExport('MERCHANT_PARTNERS_CURRENT_MONTH_BV', true)}
					>导出指定店铺所有下线当月bv</Button>
				</div>
				
				<div className="s_body"  style={{paddingTop: '16px'}}>
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入关键词'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						{
							window.hasPermission("shop_management_switch_state") && 	<Button size="small" disabled={this.state.checkedAry.length == 0} onClick={this.showChangeStatus}>修改店铺状态</Button>
						}
						{
							window.hasPermission("shop_management_add_group") && <Button
								size="small"
								disabled={this.state.checkedAry.length == 0}
								onClick={this.showAddGroup}
							>加入群组</Button>
						}
					</div>
					<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
				</div>
				
				<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
					<CustomItem
						data={shop_values}
						targetKeys={this.state.defaultItem}
						firstItem={'name'}
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
						current={this.state.current}
					/>
				</div>
			
			
			
			
			</div>
		)
	}
}
export default withRouter(ShopManage)

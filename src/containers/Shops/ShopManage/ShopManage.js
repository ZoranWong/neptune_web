import React from 'react';
import {Button, Table} from 'antd'
import './css/shopManage.sass'
import {withRouter} from 'react-router-dom'
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import {user_values} from "../../../utils/user_fields";
import {searchJson} from "../../../utils/dataStorage";
import CustomPagination from "../../../components/Layout/Pagination";
import {users} from "../../../api/user";
import AdvancedFilterComponent from "../../User/UserManage/AdvancedFilterComponent";
import AddGroup from "../../User/UserManage/AddGroup";
import ShopApplication from './ShopApplication'
import SelectChannel from './ShopAdd/SelectChannel'
class ShopManage extends React.Component{
	constructor(props){
		
		const columns = [
			{
				title: '昵称',
				dataIndex: 'nickname',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}
					onClick={()=>this.jump(record)}>{text}</span>,
			},
			{
				title: '手机号',
				dataIndex: 'mobile',
			},
			{
				title: '注册时间',
				dataIndex: 'created_at',
			},
			{
				title: '储值总额',
				dataIndex: 'charge_amount',
			},
			{
				title: '购买总额',
				dataIndex: 'total_purchase_amount',
			},
			{
				title: '购买次数',
				dataIndex: 'purchased_count',
			},
			{
				title: '账户余额',
				dataIndex: 'balance',
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:users,
			id:'',
			filterVisible:false,
			customVisible:false,
			applicationVisible:false,
			groupVisible:false,
			addVisible:false,
			user_data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:''
			},
			columns:columns
		};
	}
	
	componentWillMount() {
		document.addEventListener('click', this.closeCustom);
		
	}
	refresh = ()=>{
		this.setState({filterVisible:false,paginationParams:{
				logic_conditions:[],
				search:''
			}},()=>{
			this.child.current.pagination(1)
		})
	};
	
	jump = () =>{
		this.props.history.push({pathname:"/shops/shopDetails"})
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
			api:users,
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
		this.setState({api:users,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
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
					showAddTags={this.showAddTags}
					closeAddTags={this.closeAddTags}
				/>
				
				<AddGroup
					visible={this.state.groupVisible}
					onClose={this.closeAddGroup}
					onSubmit={this.onSubmitGroup}
					checkedAry={this.state.checkedAry}
					conditionsData={this.state.conditions_data}
				/>
				
				
				<ShopApplication
					visible={this.state.applicationVisible}
					onClose={this.closeApplication}
				/>
				<SelectChannel
					visible={this.state.addVisible}
					onClose={this.closeAdd}
				/>
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				<div className="s_header">
					<Button size="small" type="primary" onClick={this.showApplication}>店铺申请</Button>
					<Button size="small" onClick={this.showAdd}>新增店铺</Button>
				</div>
				
				
				<div className="s_body">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入昵称或手机号码'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						<Button size="small" disabled={this.state.checkedAry.length == 0}>修改店铺状态</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.showAddGroup}
						>加入群组组</Button>
						<Button size="small" disabled={this.state.checkedAry.length == 0}>导出</Button>
					</div>
					<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
				</div>
				
				<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
					<CustomItem data={user_values}  handleCustom={this.handleCustom} />
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
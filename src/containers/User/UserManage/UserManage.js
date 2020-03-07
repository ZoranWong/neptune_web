import React from 'react';
import {withRouter} from 'react-router-dom'
import CustomPagination from '../../../components/Layout/Pagination'
import { users,groupUsers,tagUsers} from "../../../api/user";
import SearchInput from '../../../components/SearchInput/SearchInput'
import {Button} from "antd";
import './css/index.sass'
import CustomItem from '../../../components/CustomItems/CustomItems'
import AdvancedFilterComponent from './AdvancedFilterComponent'
import AddTags from './AddTags'
import AddGroup from './AddGroup'
import _ from 'lodash'
import {user_values} from "../../../utils/user_fields";
// 测试
import { Table } from 'antd';
import {searchJson} from "../../../utils/dataStorage";




class UserManage extends React.Component{
	
	constructor(props){
		
		const columns = [
			{
				title: '姓名',
				dataIndex: 'wx_name',
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
				dataIndex: 'account_balance',
			},
		];
		let defaultItem =  ['wx_name','mobile',"created_at",'charge_amount','total_purchase_amount','purchased_count','account_balance','id'];
		super(props);
		this.child = React.createRef();
		this.state = {
			api:users,
			id:'',
			filterVisible:false,
			customVisible:false,
			tagVisible:false,
			groupVisible:false,
			balanceVisible: false,
			user_data:[],
			defaultItem: defaultItem,
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:'',
				only: defaultItem.join(',')
			},
			columns:columns,
			current: 1
		};
	}
	
	
	
	componentWillMount() {
		if (this.props.location.state && this.props.location.state.current) {
			this.setState({current: this.props.location.state.current})
		}
		document.addEventListener('click', this.closeCustom);
		if(this.props.location.query&&this.props.location.query.groupId){
			this.setState({id:this.props.location.query.groupId,api:groupUsers})
		} else if(this.props.location.query&&this.props.location.query.tagId){
			this.setState({id:this.props.location.query.tagId,api:tagUsers})
		}
	}
	refresh = ()=>{
		this.setState({filterVisible:false,paginationParams:{
				logic_conditions:[],
				search:''
			}},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	// 失败标签组人
	failedTagList = (ids) =>{
		this.setState({tagVisible:false,paginationParams:{
				searchJson:searchJson({user_ids:ids})
			}},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};

	// 加标签
	closeAddTags = () =>{
		this.setState({tagVisible:false})
	};
	onSubmitAdd = () =>{
		this.setState({tagVisible:false})
	};
	showAddTags = (data) =>{
		this.setState({tagVisible:true,conditions_data:data})
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
	// 占位符 用于跳转至用户详情
	jump = (record) =>{
		this.props.history.push({pathname:"/user/userDetails",state:{id:record.id,path:'/user', current: this.child.current.state.current}})
	};
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:users,
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
		this.setState({api:users,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
			this.child.current.pagination(this.child.current.state.current)
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
		let index = e.indexOf('id');
		if (index < 0) {
			e.push('id');
		}
		ary[0].render = (text,record) => <span
			style={{'color':'#4F9863','cursor':'pointer'}}
			onClick={()=>this.jump(record)}>{text}</span>;
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
				<AddTags
					visible={this.state.tagVisible}
					onClose={this.closeAddTags}
					onSubmit={this.onSubmitAdd}
					checkedAry={this.state.checkedAry}
					failedTagList={this.failedTagList}
					conditionsData={this.state.conditions_data}
				/>
				<AddGroup
					visible={this.state.groupVisible}
					onClose={this.closeAddGroup}
					onSubmit={this.onSubmitGroup}
					checkedAry={this.state.checkedAry}
					conditionsData={this.state.conditions_data}
				/>
				<div className="userHeader">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入昵称或手机号码'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						{/*<Button size="small" disabled={this.state.checkedAry.length == 0}>发消息</Button>*/}
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.showAddGroup}
						>加群组</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.showAddTags}
						>加标签</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.showBalance}
						>赠送</Button>
						<Button size="small" disabled={this.state.checkedAry.length == 0}>导出</Button>
					</div>
					<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
				</div>
				
				<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
					<CustomItem
						data={user_values}
						targetKeys={this.state.defaultItem}
						handleCustom={this.handleCustom}
						firstItem={'wx_name'}
					/>
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
export default withRouter(UserManage)

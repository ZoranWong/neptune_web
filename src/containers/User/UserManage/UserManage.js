import React from 'react';
import {withRouter} from 'react-router-dom'
import CustomPagination from '../../../components/Layout/Pagination'
import { users,groupUsers,tagUsers} from "../../../api/user";
import SearchInput from '../../../components/SearchInput/SearchInput'
import {Button} from "antd";
import './css/index.sass'
import CustomItem from './CustomItems'
import AdvancedFilterComponent from './AdvancedFilterComponent'
import AddTags from './AddTags'
import AddGroup from './AddGroup'
// 测试
import { Table } from 'antd';
import {searchJson} from "../../../utils/dataStorage";




class UserManage extends React.Component{
	constructor(props){
		super(props);
		this.child = React.createRef();
		this.state = {
			api:users,
			id:'',
			filterVisible:false,
			customVisible:false,
			tagVisible:false,
			groupVisible:false,
			user_data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:''
			}
		};
	}
	
	
	
	componentWillMount() {
		document.addEventListener('click', this.closeCustom);
		if(this.props.location.query&&this.props.location.query.groupId){
			this.setState({id:this.props.location.query.groupId,api:groupUsers})
		} else if(this.props.location.query&&this.props.location.query.tagId){
			this.setState({id:this.props.location.query.tagId,api:tagUsers})
		}
	}
	
	// 加标签
	closeAddTags = () =>{
		this.setState({tagVisible:false})
	};
	onSubmitAdd = () =>{
		this.setState({tagVisible:false})
	};
	showAddTags = () =>{
		this.setState({tagVisible:true})
	};
	// 加群组
	closeAddGroup= () =>{
		this.setState({groupVisible:false})
	};
	onSubmitGroup = () =>{
		this.setState({groupVisible:false})
	};
	showAddGroup = () =>{
		this.setState({groupVisible:true})
	};
	// 占位符 用于跳转至用户详情
	jump = () =>{
		this.props.history.replace("/user/UserDetails")
	};
	// 头部搜索框
	search = (value) =>{
		users({limit:10,page:1,searchJson:searchJson({search:value})}).then(r=>{
			this.setState({user_data:r.data})
		}).catch(_=>{})
	};
	//高级筛选
	higherFilter = () =>{
		this.setState({filterVisible:true})
	};
	closeHigherFilter = () =>{
		this.setState({filterVisible:false})
	};
	onSubmit = (data) =>{
		console.log(data);
		this.setState({paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
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
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({user_data:list})
	};
	
	render(){
		
		const columns = [
			{
				title: '昵称',
				dataIndex: 'nickname',
				render: text => <span
					style={{'color':'#4F9863','cursor':'pointer'}}
					onClick={this.jump}>{text}</span>,
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
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			}),
		};
		
		return (
			<div>
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
				/>
				<AddTags
					visible={this.state.tagVisible}
					onCancel={this.closeAddTags}
					onSubmit={this.onSubmitAdd}
					checkedAry={this.state.checkedAry}
				/>
				<AddGroup
					visible={this.state.groupVisible}
					onCancel={this.closeAddGroup}
					onSubmit={this.onSubmitGroup}
					checkedAry={this.state.checkedAry}
				/>
				<div className="userHeader">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入昵称或手机号码'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						<Button size="small" disabled={this.state.checkedAry.length == 0}>发消息</Button>
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
						<Button size="small" disabled={this.state.checkedAry.length == 0}>赠送</Button>
						<Button size="small" disabled={this.state.checkedAry.length == 0}>导出</Button>
					</div>
					<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
				</div>
				
				<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
					<CustomItem  />
				</div>
				
				<div className="chart u_chart">
					<Table
						rowSelection={rowSelection}
						columns={columns}
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
						refresh={false}
						id={this.state.id}
						valChange={this.paginationChange}
					/>
				</div>
				
			</div>
		)
	}
}
export default withRouter(UserManage)
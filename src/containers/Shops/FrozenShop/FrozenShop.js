import React from 'react';
import {Button, Table, Modal, message} from 'antd'
import '../ShopManage/css/shopManage.sass'
import {withRouter} from 'react-router-dom'
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import {user_values} from "../../../utils/user_fields";
import {searchJson} from "../../../utils/dataStorage";
import {getFrozen,unfrozen,deleteFrozen} from "../../../api/shops/frozen";
import CustomPagination from "../../../components/Layout/Pagination";
import AdvancedFilterComponent from "../../User/UserManage/AdvancedFilterComponent";
class FrozenShop extends React.Component{
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
						{
							window.hasPermission("shop_frozen_unfreeze") && <span
								style={{'color':'#4F9863','cursor':'pointer'}}
								onClick={()=>this.unfreeze(record)}
							>解冻
						</span>
						}
						
						{
							window.hasPermission("shop_frozen_delete") && <span
								style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
								onClick={()=>this.deleteShop(record)}
							>删除
						</span>
						}
						
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
						>门店码
						</span>
					</div>
				,
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:getFrozen,
			id:'',
			filterVisible:false,
			customVisible:false,
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
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:''
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	jump = (record) =>{
		if (window.hasPermission("shop_frozen_display")) {
			this.props.history.push({pathname:"/shops/shopDetails",state:{id:record.id}})
		} else {
			message.error('暂无权限，请联系管理员')
		}
		
	};
	
	//解冻
	unfreeze = (record) =>{
		this.showConfirm('解冻',record.id,unfrozen)
	};
	
	// 删除
	deleteShop = (record) =>{
		this.showConfirm('删除',record.id,deleteFrozen)
	};
	
	showConfirm = (msg,id,fn) =>{
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
			content: (
				<div className="U_confirm">
					确定{msg}该店铺吗？
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small',
			},
			onOk() {
				fn({},id).then(r=>{
					message.success(`${msg}成功!`);
					refresh()
				})
			}
		});
	};
	
	
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:getFrozen,
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
		this.setState({api:getFrozen,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
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
		ary[0].render = (text,record) => <span
			style={{'color':'#4F9863','cursor':'pointer'}}
			onClick={()=>this.jump(record)}>{text}</span>
		this.setState({columns:ary})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		console.log(list);
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
				
				
				<div className="s_body frozen_body">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入关键词'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						{
							window.hasPermission("shop_frozen_export") && <Button size="small" disabled={this.state.checkedAry.length == 0}>导出</Button>
						}
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
export default withRouter(FrozenShop)

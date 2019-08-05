import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table,Modal} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/goodsManage.sass'
import {shops} from "../../../api/shops/shopManage";
import {searchJson} from "../../../utils/dataStorage";
import {user_values} from "../../../utils/user_fields";
import AdvancedFilterComponent from "../../Shops/ShopManage/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import ReleaseGoods from "./ReleaseGoods";
class GoodsManage extends React.Component{
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
				,
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:shops,
			id:'',
			filterVisible:false,
			customVisible:false,
			releaseVisible:false,
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
			this.child.current.pagination(1)
		})
	};
	
	jump = (record) =>{
		this.props.history.push({pathname:"/goods/goodDetails"})
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
	
	// 发布商品
	showRelease = () =>{
		this.setState({releaseVisible:true})
	};
	hideRelease = () =>{
		this.setState({releaseVisible:false})
	};
	
	// 下架商品
	unSale = () =>{
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
					确定下架商品么？
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
				// 确定按钮执行操作
			}
		});
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
				<ReleaseGoods
					visible={this.state.releaseVisible}
					onClose={this.hideRelease}
				/>
				
				<div className="goods_manage_header">
					<Button type="primary" size="small" onClick={this.showRelease}>发布商品</Button>
					<Button size="small">
						<IconFont type="icon-download" />
						批量导入
					</Button>
				</div>
				
				<div className="s_body">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入关键词'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						<Button size="small" disabled={this.state.checkedAry.length == 0} >加入店铺组</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.unSale}
						>下架</Button>
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
export default withRouter(GoodsManage)
import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table,Modal} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/goodsManage.sass'
import {searchJson} from "../../../utils/dataStorage";
import {user_values} from "../../../utils/user_fields";
import AdvancedFilterComponent from "./AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomItem from "../../../components/CustomItems/CustomItems";
import CustomPagination from "../../../components/Layout/Pagination";
import {products,offShelvesProducts} from "../../../api/goods/goods";
import AddGroup from "./AddGroup";
import {goodInGroup} from "../../../api/goods/groups";
import RecordSpec from "./RecordSpec";
class GoodsManage extends React.Component{
	constructor(props){
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}
					onClick={()=>this.jump(record)}>{text}</span>,
			},
			{
				title: '分类',
				dataIndex: 'category_desc',
			},
			{
				title: '规格',
				dataIndex: 'spec',
				render:(text,record) =>{
					return record.open_specification?(<div
						style={{'color':'#4F9863','cursor':'pointer'}}
						onClick={()=>{this.recordSpec(record)}}
					>
						查看规格
					</div>):('无')
				}
			},
			{
				title: '单位',
				dataIndex: 'unit',
			},
			{
				title: '零售价',
				dataIndex: 'retail_price',
			},
			{
				title: '总销量',
				dataIndex: 'total_sales',
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
					</div>
				,
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:products,
			id:'',
			filterVisible:false,
			customVisible:false,
			data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			columns:columns,
			groupVisible:false,
			recordSpecVisible:false,   // 查看规格
			recordSpecId:'',   // 查看规格
		};
	}
	
	componentWillMount() {
		document.addEventListener('click', this.closeCustom);
		if(this.props.location.query&&this.props.location.query.groupId){
			this.setState({id:this.props.location.query.groupId,api:goodInGroup})
		}

	}
	
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson:searchJson({status:true})
			}
		},()=>{
			this.child.current.pagination(1)
		})
	};
	
	jump = (record) =>{
		this.props.history.push({pathname:"/goods/goodDetails",state:{id:record.product_id}})
	};
	
	// 列表页查看规格
	recordSpec = (record) =>{
		this.setState({recordSpecId:record.product_id,recordSpecVisible:true})
	};
	closeRecordSpec = () =>{
		this.setState({recordSpecVisible:false})
	};
	
	// 编辑商品
	editShop = (record) =>{
		this.props.history.push({pathname:`/goods/releaseGoods`,state:{id:record.product_id}})
	};
	
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:products,
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
		this.setState({api:products,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:true})}},()=>{
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
	
	// 发布商品
	showRelease = () =>{
		//this.setState({releaseVisible:true})
		this.props.history.push({pathname:"/goods/releaseGoods"})
	};
	
	// 下架商品
	unSale = () =>{
		let refresh = this.refresh;
		let checkedAry = this.state.checkedAry;
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
				offShelvesProducts({product_ids:checkedAry}).then(r=>{
					refresh()
				}).catch(_=>{})
			}
		});
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
				
				<RecordSpec
					visible={this.state.recordSpecVisible}
					onCancel={this.closeRecordSpec}
					recordSpecId={this.state.recordSpecId}
				/>
				
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
				/>

				<AddGroup
					visible={this.state.groupVisible}
					onClose={this.closeAddGroup}
					onSubmit={this.onSubmitGroup}
					checkedAry={this.state.checkedAry}
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
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.showAddGroup}
						>加入商品组</Button>
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
export default withRouter(GoodsManage)
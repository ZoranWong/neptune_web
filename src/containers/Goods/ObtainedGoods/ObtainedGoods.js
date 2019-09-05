import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table, Modal, Input, message} from 'antd'
import './css/breakfastOrder.sass'
import {putOnShelves,products,deleteGoods} from "../../../api/goods/goods";
import {searchJson} from "../../../utils/dataStorage";
import AdvancedFilterComponent from "./AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomPagination from "../../../components/Layout/Pagination";
import {user_values} from "../../../utils/user_fields";
import RecordSpec from "../GoodsManage/RecordSpec";
class ObtainedGoods extends React.Component{
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
			filterVisible:false,  // 高级筛选
			warningStockVisible:false,   // 售卖范围
			shelfGoodsVisible:false,  // 上架商品
			product_id:'',
			user_data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson:searchJson({status:false})
			},
			columns:columns,
			recordSpecVisible:false,   // 查看规格
			recordSpecId:'',   // 查看规格
		};
	}
	
	componentWillMount() {
	
	}
	
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
				searchJson:searchJson({status:false})
			}
		},()=>{
			this.child.current.pagination(1)
		})
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
				searchJson:searchJson({search:value,status:false})}
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
		this.setState({api:products,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,status:false})}},()=>{
			this.child.current.pagination(1)
		});
	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({user_data:list})
	};
	// 列表页查看规格
	recordSpec = (record) =>{
		this.setState({recordSpecId:record.product_id,recordSpecVisible:true})
	};
	closeRecordSpec = () =>{
		this.setState({recordSpecVisible:false})
	};
	
	
	// 上架商品
	unSale = () =>{
		let checkedAry = this.state.checkedAry;
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
					确定上架商品么？
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
				putOnShelves({
					product_ids:checkedAry
				}).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			}
		});
	};
	
	// 删除商品
	delete = () =>{
		let checkedAry = this.state.checkedAry;
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
					确定删除商品么？
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
				deleteGoods({
					product_ids:checkedAry
				}).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			}
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
	
	
	
	render(){
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				console.log(selectedRowKeys);
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
				/>
				
				<RecordSpec
					visible={this.state.recordSpecVisible}
					onCancel={this.closeRecordSpec}
					recordSpecId={this.state.recordSpecId}
				/>
				
				<div className="s_body">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入商品名称'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.unSale}
						>上架</Button>
						<Button
							size="small"
							disabled={this.state.checkedAry.length == 0}
							onClick={this.delete}
						>删除</Button>
						<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
					</div>
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
export default withRouter(ObtainedGoods)
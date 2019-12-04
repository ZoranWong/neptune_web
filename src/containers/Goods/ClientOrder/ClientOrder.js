import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table, Modal, Input, message, InputNumber} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/breakfastOrder.sass'
import {channelsGoods,onShelves,offShelves,setWarning,setVirtualSales} from "../../../api/goods/goods";
import {searchJson} from "../../../utils/dataStorage";
import SaleRange from "./SaleRange";
import AdvancedFilterComponent from "./AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomPagination from "../../../components/Layout/Pagination";
import WarningStock from "../Components/WarningStock";
import ShelfGoods from "../Components/ShelfGoods";
import RecordSpec from "../Components/RecordSpec";
class ClientOrder extends React.Component{
	constructor(props){
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}
					onClick={()=>this.jump(record)}
				>{text}</span>,
			},
			{
				title: '分类',
				dataIndex: 'category',
			},
			{
				title: '规格',
				render:(text,record) =>{
					if(record.open_specification){
						return (<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>{
								this.setState({recordSpecVisible:true,provide_id:record.provide_id})
							}
							}
						>查看规格</span>)
					} else {
						return <span>无</span>
					}
				}
			},
			{
				title: '零售价',
				dataIndex: 'retail_price',
			},
			{
				title: '库存',
				dataIndex:'stock',
				render: (text,record) =>
					<div className="warning" >
						{text}
						<span style={{display:record.stock_alert?'block':'none'}}>
							<IconFont type="icon-info-circle-fill" />
							警戒
						</span>
					</div>
				,
			},
			{
				title: '实际销量',
				dataIndex: 'total_sales',
			},
			{
				title: '虚拟销量',
				dataIndex: 'virtual_sales',
				render: (text,record) =>
					{if (window.hasPermission("product_merchant_book_set_virtual_sale")) {
						return <InputNumber
							className="virtualSales"
							defaultValue={text}
							onBlur={(e)=>{
								e.target.value = e.target.value < 0? 0:e.target.value;
								if(e.target.value <= 0) return;
								setVirtualSales({virtual_sales:e.target.value},record.provide_id).then(r=>{
									message.success(r.message)
								}).catch(_=>{})
							}}
						/>
					} else {
						return <span>{text}</span>
					}}
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						{
							window.hasPermission("product_merchant_book_set_sale_scope") && <span
								style={{'color':'#4F9863','cursor':'pointer'}}
								onClick={()=>this.showSaleRange(record)}
							>售卖范围
						</span>
						}
						
						{
							window.hasPermission("product_merchant_book_set_stock_alert") && <span
								style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
								onClick={()=>this.showWarningStock(record)}
							>警戒库存
						</span>
						}
					</div>
				,
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.channel = 'SHOP_KEEPER';
		this.state = {
			api:channelsGoods,
			filterVisible:false,  // 高级筛选
			warningStockVisible:false,   // 售卖范围
			shelfGoodsVisible:false,  // 上架商品
			stock_id:'',
			provide_id:'',  // 订货查看规格id
			user_data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:'',
				channel:this.channel
			},
			columns:columns,
			recordSpecVisible:false,
			rangeId:'',// 设置范围
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
				channel:this.channel
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 商品详情
	jump = (record) =>{
		this.props.history.push({pathname:"/goods/goodDetails",state:{id:record.product_id}})
	};
	
	// 售卖范围
	showSaleRange = (record) =>{
		this.setState({saleRange:true,rangeId:record.provide_id, scope: record.sale_scope})
	};
	hideSaleRange = () =>{
		this.setState({saleRange:false})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:channelsGoods,
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
		this.setState({api:channelsGoods,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
			this.child.current.pagination(1)
		});
	};
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({user_data:list})
	};
	
	// 有规格时设置警戒库存
	closeRecordSpec = () =>{
		this.setState({recordSpecVisible:false})
	};
	
	setWarning = (record) => {
		this.showWarningStock(record)
	};
	
	
	
	// 下架商品
	unSale = () =>{
		let products_ids = this.state.checkedAry;
		let channel = this.channel;
		// this.state.checkedAry.forEach(id=>{
		// 	this.state.user_data.forEach(item=>{
		// 		if(id == item.stock_id){
		// 			products_ids.push(item.product_id)
		// 		}
		// 	})
		// });
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
				offShelves({
					channel:channel,
					product_ids:products_ids
				}).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			}
		});
	};
	
	
	// 警戒范围
	showWarningStock = (record) =>{
		if(record.open_specification){
			this.setState({recordSpecVisible:true,provide_id:record.provide_id})
		} else {
			this.setState({warningStockVisible:true,stock_id:record.stock_id})
		}
		
	};
	
	hideWarningStock = () =>{
		this.setState({warningStockVisible:false})
	};
	
	onSubmitWarningStock = (value,id) =>{
		setWarning({warning_stock:value},id).then(r=>{
			message.success(r.message);
			this.hideWarningStock();
			this.refresh()
		}).catch(_=>{})
	};
	
	// 上架商品
	showShelfGoods = () =>{
		this.setState({shelfGoodsVisible:true})
	};
	
	hideShelfGoods = () =>{
		this.setState({shelfGoodsVisible:false})
	};
	
	onSubmitShelfGoods = (value) =>{
		onShelves({
			channel:this.channel,
			product_ids:value
		}).then(r=>{
			message.success(r.message);
			this.hideShelfGoods();
			this.refresh()
		}).catch(_=>{})
	};
	
	// 商品入库
	inStock = () =>{
		this.props.history.push({pathname:"/goods/inStock",state:{channel:this.channel}})
	};
	
	// 商品出库
	outStock = () =>{
		this.props.history.push({pathname:"/goods/outStock",state:{channel:this.channel}})
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
					onSubmit={this.setWarning}
					provide_id={this.state.provide_id}
				/>
				
				<WarningStock
					visible={this.state.warningStockVisible}
					onCancel={this.hideWarningStock}
					onSubmit={this.onSubmitWarningStock}
					id={this.state.stock_id}
				/>
				
				<ShelfGoods
					visible={this.state.shelfGoodsVisible}
					onCancel={this.hideShelfGoods}
					onSubmit={this.onSubmitShelfGoods}
				/>
				
				<SaleRange
					visible={this.state.saleRange}
					onCancel={this.hideSaleRange}
					rangeId={this.state.rangeId}
					scope={this.state.scope}
					refresh={this.refresh}
				/>
				
				
				<div className="breakfast_header">
					{
						window.hasPermission("product_merchant_book_put_on") && <Button type="primary" size="small" onClick={this.showShelfGoods}>上架商品</Button>
					}
					{
						window.hasPermission("product_merchant_book_add_stock") && <Button size="small" onClick={this.inStock}>
							<IconFont type="icon-download" />
							商品入库
						</Button>
					}
					{
						window.hasPermission("product_merchant_book_out_stock") && <Button size="small" onClick={this.outStock}>
							<IconFont type="icon-upload" />
							商品出库
						</Button>
					}
				</div>
				
				<div className="s_body">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search}
							text='请输入商品名称'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						{
							window.hasPermission("product_merchant_book_get_off") && <Button
								size="small"
								disabled={this.state.checkedAry.length == 0}
								onClick={this.unSale}
							>下架</Button>
						}
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
export default withRouter(ClientOrder)

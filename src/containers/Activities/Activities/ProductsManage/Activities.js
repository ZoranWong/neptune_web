import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table, Modal, Input, message, InputNumber} from 'antd'
import IconFont from "../../../../utils/IconFont";
import '../../../Goods/BreakfastOrder/css/breakfastOrder.sass'
import {channelsGoods,onShelves,offShelves,setWarning,setVirtualSales} from "../../../../api/goods/goods";
import {searchJson} from "../../../../utils/dataStorage";
import AdvancedFilterComponent from "./AdvancedFilterComponent";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import CustomPagination from "../../../../components/Layout/Pagination";
import WarningStock from "../../../Goods/Components/WarningStock";
import ShelfGoods from "../../../Goods/Components/ShelfGoods";
import RecordSpec from "../../../Goods/Components/RecordSpec";
class Activities extends React.Component{
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
				render: (text,record) =>{
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
				}
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
							onClick={()=>this.showWarningStock(record)}
						>警戒库存
						</span>
					</div>
				,
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.channel = 'ACTIVITY';
		this.state = {
			api:channelsGoods,
			filterVisible:false,  // 高级筛选
			shelfGoodsVisible:false,  // 上架商品
			stock_id:'',
			provide_id:'',  // 订货查看规格id
			user_data:[],
			checkedAry:[],     // 列表页选中的用户id组
			paginationParams:{
				logic_conditions:[],
				search:'',
				channel:this.channel,
				activity_id: ''
			},
			columns:columns,
			recordSpecVisible:false,
			rangeId:'',// 设置范围
			current: 1,
			actId: 1,
		};
	}
	
	componentWillMount() {
		this.setState({
			actId: this.props.location.state.id,
			paginationParams: {...this.state.paginationParams,activity_id: this.props.location.state.id}
		});
		if (this.props.location.state && this.props.location.state.current) {
			this.setState({current: this.props.location.state.current})
		}
	}
	
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
				channel:this.channel,
				activity_id: this.props.location.state.id
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	// 商品详情
	jump = (record) =>{
		this.props.history.push({pathname:"/goods/goodDetails",state:{id:record.product_id,path:'/activities', current: this.child.current.state.current}})
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:channelsGoods,
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
		this.setState({api:channelsGoods,paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}},()=>{
			this.child.current.pagination(this.child.current.state.current)
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
		let products_ids = 	this.state.checkedAry;
		let channel = this.channel;
		// this.state.checkedAry.forEach(id=>{
		// 	this.state.user_data.forEach(item=>{
		// 		if(id == item.stock_id){
		// 			products_ids.push(item.product_id)
		// 		}
		// 	})
		// });
		let refresh = this.refresh;
		let actId = this.state.actId;
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
					product_ids:products_ids,
					activity_id: actId
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
			product_params:value,
			activity_id: this.state.actId
		}).then(r=>{
			message.success(r.message);
			this.hideShelfGoods();
			this.refresh()
		}).catch(_=>{})
	};
	
	// 商品入库
	inStock = () =>{
		this.props.history.push({pathname:"/goods/inStock",state:{channel:this.channel,actId: this.state.actId}})
	};
	
	// 商品出库
	outStock = () =>{
		this.props.history.push({pathname:"/goods/outStock",state:{channel:this.channel,actId: this.state.actId}})
	};
	
	backAct = () => {
		this.props.history.push({pathname:"/activities"})
	};
	
	// 蛋糕分类
	cakeClassification = () => {
		this.props.history.push({pathname:"/activities/cakeClassification",state:{actId: this.state.actId}})
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
				
				
				<div className="breakfast_header">
					<Button type="primary" size="small" onClick={this.showShelfGoods}>上架商品</Button>
					<Button size="small" onClick={this.inStock}>
						<IconFont type="icon-download" />
						商品入库
					</Button>
					<Button size="small" onClick={this.outStock}>
						<IconFont type="icon-upload" />
						商品出库
					</Button>
					<Button size="small" onClick={this.cakeClassification}>
						蛋糕商品分类
					</Button>
					<Button size='small' className='backActsManage' onClick={this.backAct}>返回蛋糕管理</Button>
				</div>
				
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
						>下架</Button>
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
						valChange={this.paginationChange}
						current={this.state.current}
					/>
				</div>
			</div>
		)
	}
}
export default withRouter(Activities)

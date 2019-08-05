import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table, Modal, Input} from 'antd'
import IconFont from "../../../utils/IconFont";
import './css/breakfastOrder.sass'
import {shops} from "../../../api/shops/shopManage";
import {searchJson} from "../../../utils/dataStorage";
import SaleRange from "./SaleRange";
import AdvancedFilterComponent from "../../Shops/ShopManage/AdvancedFilterComponent";
import SearchInput from "../../../components/SearchInput/SearchInput";
import CustomPagination from "../../../components/Layout/Pagination";
import WarningStock from "../Components/WarningStock";
class BreakfastOrder extends React.Component{
	constructor(props){
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				render: (text,record) => <span
					style={{'color':'#4F9863','cursor':'pointer'}}
					>{text}</span>,
			},
			{
				title: '分类',
				dataIndex: 'keeper_name',
			},
			{
				title: '规格',
				dataIndex: 'code',
			},
			{
				title: '零售价',
				dataIndex: 'channel',
			},
			{
				title: '库存',
				dataIndex:'total_sale',
				render: (text,record) =>
					<div className="warning">
						{text}
						<span>
							<IconFont type="icon-info-circle-fill" />
							警戒
						</span>
					</div>
				,
			},
			{
				title: '实际销量',
				dataIndex: 'status',
			},
			{
				title: '虚拟销量',
				dataIndex: 'statusSale',
				render: (text,record) =>
					<Input className="virtualSales" />
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={this.showSaleRange}
						>售卖范围
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer',marginLeft:'30px'}}
							onClick={this.showWarningStock}
						>警戒库存
						</span>
					</div>
				,
			},
		];
		
		super(props);
		this.child = React.createRef();
		this.state = {
			api:shops,
			filterVisible:false,  // 高级筛选
			warningStockVisible:false,   // 售卖范围
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
	
	// 售卖范围
	showSaleRange = () =>{
		this.setState({saleRange:true})
	};
	hideSaleRange = () =>{
		this.setState({saleRange:false})
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
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({user_data:list})
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
	
	
	// 警戒范围
	showWarningStock = () =>{
		this.setState({warningStockVisible:true})
	};
	
	hideWarningStock = () =>{
		this.setState({warningStockVisible:false})
	};
	
	onSubmitWarningStock = (value) =>{
		console.log(value);
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
				/>
				
				<WarningStock
					visible={this.state.warningStockVisible}
					onCancel={this.hideWarningStock}
					onSubmit={this.onSubmitWarningStock}
				/>
				
				<SaleRange
					visible={this.state.saleRange}
					onCancel={this.hideSaleRange}
				/>
				
				
				<div className="breakfast_header">
					<Button type="primary" size="small" onClick={this.showRelease}>上架商品</Button>
					<Button size="small">
						<IconFont type="icon-edit" />
						修改库存
					</Button>
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
export default withRouter(BreakfastOrder)
import React, {Component} from 'react';
import SearchInput from "../../../../components/SearchInput/SearchInput";
import {Button, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {getToken, searchJson} from "../../../../utils/dataStorage";
import {pickupCashback} from "../../../../api/distribution/records";
import AdvancedFilterComponent from "./AdvancedFilterComponent";
import {self_pick_fields,operation} from "../../../../utils/self_pick_fields";
import IconFont from "../../../../utils/IconFont";
import Reviews from "../Modals/Reviews";
import Export from "../../../Order/Components/Export";
import Config from "../../../../config/app";
class PickupCashback extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '返现时间',
				dataIndex: 'cashback_time',
			},
			{
				title: '店铺',
				dataIndex: 'shop_name',
			},
			{
				title: '订单号',
				dataIndex: 'trade_no',
			},
			{
				title: '实付款',
				dataIndex: 'settlement_total_fee',
			},
			{
				title: '商品',
				render: (text,record) => {
					if(record.products.length){
						return <span style={{'color':'#4F9863','cursor':'pointer','display':'flex'}} className="i_span">
							<span className="orderGoods">{record.products[0].name+'......'}</span>
							<IconFont type="icon-eye-fill" onClick={()=>this.reviewGoods(record.products)} />
						</span>
					} else {
						return <span>无</span>
					}
				},
			},
			{
				title: '用户',
				dataIndex: 'user_name',
			},
			{
				title: '返现金额',
				dataIndex: 'cashback_amount',
				render: (text, record) => (`${text}元`)
			}
		];
		this.state = {
			filterVisible:false,
			customVisible:false,
			exportVisible: false,
			api:pickupCashback,
			data:[],
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			columns:columns,
			reviewGoodsVisible: false,
			items:[],
			conditions: {}
		};
		this.child = React.createRef();
	}
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				logic_conditions:[],
				search:'',
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	//高级筛选
	higherFilter = () =>{
		this.setState({filterVisible:true})
	};
	closeHigherFilter = () =>{
		this.setState({filterVisible:false})
	};
	onSubmit = (data) =>{
		this.setState({
			api:pickupCashback,
			paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:pickupCashback,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	// 商品回显
	// 商品回显
	reviewGoods = (record,text) =>{
		this.setState({reviewGoodsVisible:true,items:record,text: text})
	};
	closeReviewGoods = () =>{
		this.setState({reviewGoodsVisible:false})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	onDateChange = () =>{
	
	};
	
	// 导出
	showExport = (conditions) =>{
		this.setState({conditions, exportVisible: true, isToday: false}, ()=>{
			this.closeHigherFilter()
		})
	};
	hideExport = () =>{
		this.setState({exportVisible: false})
	};
	// 确定导出
	export = (type, items,conditions) =>{
		console.log(type, '--- type---');
		console.log(conditions, '>>>>>>>>>>>>>>>>>>>>>>>>>>');
		let json = searchJson({
			strategy: type,
			customize_columns: items,
			logic_conditions: conditions
		});
		window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
	};
	
	render() {
		const strategy = [
			{key: 'MERCHANT_SELF_PICK_CASHBACK_RECORD', value: '店铺自提返佣',},
		];
		const exportsProps = {
			visible : this.state.exportVisible,
			onCancel : this.hideExport,
			export: this.export,
			strategy,
			conditions: this.state.conditions
		};
		
		
		return (
			<div className="basic_statistics">
				<Export {...exportsProps} />
				
				
				<Reviews
					visible={this.state.reviewGoodsVisible}
					onCancel={this.closeReviewGoods}
					items={this.state.items}
					text={'商品'}
				/>
				<AdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					value={self_pick_fields}
					operation={operation}
					export={this.showExport}
				/>
				<div className="basic_statistics_header">
					<ul className="header_left">
						<li>
							店铺:
							<SearchInput
								getDatas={this.search}
								text='请输入店铺名称/店铺编号/店铺主姓名/手机号码'
							/>
						</li>
						<li>
							<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						</li>
					</ul>
				</div>
				<div className="chart u_chart">
					<Table
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
						text='条数据'
						api={this.state.api}
						ref={this.child}
						params={this.state.paginationParams}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default PickupCashback;

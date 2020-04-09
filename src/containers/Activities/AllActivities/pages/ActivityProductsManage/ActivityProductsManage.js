import React, {Component} from 'react';
import {Button, message, Modal, Table} from "antd";
import CustomPagination from "../../../../../components/Layout/Pagination";

import EditProduct from "./Modal/EditProduct";
import {
	shelfableProducts,
	products,
	offShelvesProducts,
	activityDetails
} from "../../../../../api/activities/activities";

class ActivityProductsManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api: products,
			id: '',
			data: [],
			shelfGoodsVisible: false, // 上架商品
			editProductVisible: false, // 编辑商品
			record: {},
			details: {}
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.setState({id: this.props.location.state.actId, name: this.props.location.state.name}, ()=> {
			this.getDetails()
		})
	}

	getDetails = () => {
		activityDetails({},this.state.id).then(r=>{
			this.setState({details: r.data})
		}).then(r=>{})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		console.log(list);
		this.setState({data:list})
	};
	
	refresh = () => {
		this.child.current.pagination(this.child.current.state.current)
	};
	
	
	//编辑商品
	showEditProduct = (record) => {
		this.setState({editProductVisible: true, record})
	};
	hideEditProduct = () =>{
		this.setState({editProductVisible:false})
	};
	submitEditProduct = (value) => {
		console.log(value, '???????????????????');
	};
	
	// 返回活动管理
	back = () => {
		this.props.history.push({pathname:"/activities/all"});
	};
	
	// 上架商品
	jumpProduct = () => {
		this.props.history.push({pathname:"/activities/onShelvesProducts", state: {id: this.state.id, name: this.state.name}});
	};
	
	// 下架
	offShelves = (record) => {
		console.log(record);
		let {id} = this.state;
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
			maskClosable:true,
			content: (
				<div className="U_confirm">
					确定下架该商品么？
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
				offShelvesProducts({entity_ids: [record['product_entity'].id]},id).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			},
			onCancel() {
			
			},
		});
	};
	
	render() {
		const columns = [
			{
				title: '商品',
				dataIndex: 'name',
				align: 'center',
				render: (text,record) => {
					if (record['product_entity']['spec_value']) {
						return <span>{record['product_entity'].name} - {record['product_entity']['spec_value'][Object.keys(record['product_entity']['spec_value'])[0]]}</span>
					} else {
						return <span>{record['product_entity'].name}</span>
					}
				}
			},
			{
				title: '上架时间',
				dataIndex: 'created_at',
				align: 'center',
			},
			{
				title: '促销价',
				dataIndex: 'act_price',
				align: 'center',
			},
			{
				title: '每天限购',
				dataIndex: 'user_limit_day',
				align: 'center',
				render: (text, record) => {
					if (text === 0) {
						return "无"
					} else {
						return <span>
							每位用户{text}天限购{record['user_limit_num']}件
						</span>
					}
				}
			},
			{
				title: '操作',
				align: 'center',
				render: (text, record) => (
					<div>
						<Button size="small" onClick={()=>this.offShelves(record)}>
							下架
						</Button>
						<Button
							size="small"
							onClick={()=>this.showEditProduct(record)}
							disabled={this.state.details['user_limit_num'] && this.state.details['user_limit_day']}
						>
							编辑
						</Button>
					</div>
				)
			}
		];
		
		
		return (
			<div className='activityProductsManage'>
				
				
				
				<EditProduct
					visible={this.state.editProductVisible}
					onClose={this.hideEditProduct}
					onSubmit={this.submitEditProduct}
					record={this.state.record}
					id={this.state.id}
					refresh={this.refresh}
				/>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<Button size="small" onClick={this.jumpProduct}>
						上架商品
					</Button>
					<Button size="small" onClick={this.back}>
						返回活动管理
					</Button>
				</div>
				
				<div className="chart u_chart">
					<Table
						columns={columns}
						rowKey={record => record.id}
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
						id={this.state.id}
						valChange={this.paginationChange}
						text={"个商品"}
					/>
				</div>
				
			</div>
		);
	}
}

export default ActivityProductsManage;

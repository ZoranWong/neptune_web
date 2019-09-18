import React, {Component,Fragment} from 'react';
import {Button, Input, Table} from "antd";
import '../css/index.sass'
import IconFont from "../../../../utils/IconFont";
import CustomPagination from "../../../../components/Layout/Pagination";
import CreateNew from '../Modal/CreateNew'
class RedemptionManage extends Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				title: '优惠价名称',
				dataIndex: 'name',
			},
			{
				title: '上架时间',
				dataIndex: 'category_desc',
			},
			{
				title: '所需积分',
				dataIndex: 'spec',
			},
			{
				title: '可兑换/已兑换',
				dataIndex: 'unit',
			},
			{
				title: '状态',
				dataIndex: 'retail_price',
			},
			{
				title: '操作',
				dataIndex: 'status',
				render: (text, record) => (
					<div className="1">1111</div>
				)
			},
		];
		this.child = React.createRef();
		this.state = {
			data:[],
			activeTab:'全部',
			columns:columns,
			visible:false
		};
	}
	
	
	// 切换tab
	onChangeTab = activeTab =>{
		this.setState({activeTab})
	};
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	refresh = ()=>{
		this.child.current.pagination(1)
	};
	
	showCreate = () =>{
		this.setState({visible:true});
	};
	hideCreate = () =>{
		this.setState({visible:false})
	};
	
	
	
	
	render() {
		const tabs =['全部','已上架','已下架','过期下架'];
		let props = {
			visible:this.state.visible,
			onCancel:this.hideCreate
		};
		return (
			<Fragment>
				<CreateNew {...props}/>
				
				<div className="i_banner">
					<div className="i_inputs">
						<span>优惠券名称:</span>
						<Input size="small" placeholder="请输入优惠券名称"  />
					</div>
					<div className="i_inputs">
						<span>兑换时间:</span>
						<Input size="small" placeholder="请输入兑换时间称"  />
					</div>
					<Button size="small">搜索</Button>
					<span className="i_filter">清空筛选条件</span>
				</div>
				<ul className="i_tabs">
					{
						tabs.map((item,index)=>{
							return <li
								key={index}
								className={this.state.activeTab == item?'active':''}
								onClick={()=>this.onChangeTab(item)}
							>{item}</li>
						})
					}
					<Button size="small" onClick={this.showCreate}>
						<IconFont type="icon-plus-circle-fill" />
						新建积分商品
					</Button>
				</ul>
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
						api={this.state.api}
						ref={this.child}
						params={this.state.paginationParams}
						id={this.state.id}
						valChange={this.paginationChange}
					/>
				</div>
			</Fragment>
		);
	}
}

export default RedemptionManage;
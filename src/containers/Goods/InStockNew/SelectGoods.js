import React from "react";
import {Input, Modal, Select, Button, Table,Checkbox} from 'antd'
import './css/selectGoods.sass'
import {channelsGoods} from "../../../api/goods/goods";
export default class SelectGoods extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			scrollPage:1
		}
	}
	
	componentDidMount() {
		// let chart = document.getElementsByClassName('selectGoodsChart');
		console.log(document);
		// console.log(chart);
		// chart.addEventListener('scroll', this.handleScroll);
		this.getGoods()
	}
	// 获取列表数据
	getGoods = (page) =>{
		channelsGoods({
			channel:this.props.channel,
			limit:10,
			page:page
		}).then(r=>{
			if(!r.data.length) return;
			this.setState({data:r.data})
		}).catch(_=>{})
	};
	
	// 下拉框分页加载
	handleScroll = e => {
		e.persist();
		const { target } = e;
		if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
			const { scrollPage } = this.state;
			const nextScrollPage = scrollPage + 1;
			this.setState({ scrollPage: nextScrollPage });
			this.getGoods(nextScrollPage); // 调用api方法
		}
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.onSubmit()
	};
	
	render() {
		const columns = [
			{
				title: '商品',
				dataIndex: 'name',
			},
			{
				title: '规格',
				render:(text,record) =>{
					if(record.open_specification){
						return (<span style={{'color':'#4F9863','cursor':'pointer'}}>选择规格</span>)
					} else {
						return <span>无</span>
					}
				}
			},
			{
				title: '商品分类',
				dataIndex: 'category',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div className="checkBox">
						<Checkbox > </Checkbox>
					</div>
				,
			},
		];
		return(
			<div className="selectGoods">
				<Modal
					title="选择入库商品"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={false}
				>
					<div className="selectGoodsHeader">
						<span>商品分类：</span>
						<Select
							placeholder="请选择"
						></Select>
						<Input
							placeholder="请输入商品名称"
						/>
						<Button
							type="primary"
							size="small"
						>搜索</Button>
						<Button
							size="small"
							className="button"
						>刷新</Button>
					</div>
					<div className="selectGoodsChart" onScrollCapture={this.handleScroll}>
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
					<div className="selectGoodFooter">
						<div className="text">
							已选<span>1</span>个产品
						</div>
						<Button
							type="primary"
							size="small">确定</Button>
					</div>
				</Modal>
			</div>
		)
	}
	
	
}
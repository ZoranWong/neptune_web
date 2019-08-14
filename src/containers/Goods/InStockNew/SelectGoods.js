import React from "react";
import {Input, Modal, Select, Button, Table,Checkbox} from 'antd'
import './css/selectGoods.sass'
export default class SelectGoods extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[]
		}
	}
	
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
				render: (text, record) => (
					<div>111</div>
				)
			},
			{
				title: '商品分类',
				dataIndex: 'code',
			},
			{
				title: '添加时间',
				dataIndex:'time'
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
		const data = [
			{
				name:'1',
				code:'2',
				time:'222'
			}
		]
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
					<div className="selectGoodsChart">
						<Table
							columns={columns}
							rowKey={record => record.id}
							pagination={false}
							rowClassName={(record, index) => {
								let className = '';
								if (index % 2 ) className = 'dark-row';
								return className;
							}}
							dataSource={data}
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
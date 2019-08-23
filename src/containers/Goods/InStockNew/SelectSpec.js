import React from "react";
import {Button, Checkbox, Input, Modal, Select, Table} from "antd";
import './css/selectGoods.sass'
export default class SelectSpec extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			selectedRowKeys:[],
			selectedRows:[]
		};
		
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.recordStocks) return;
		this.setState({data:nextProps.recordStocks.data})
	}
	
	handleSubmit = () =>{
		this.handleCancel();
		this.props.onSubmit(this.state.selectedRows)
	};
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	
	render() {
		const columns = [
			{
				title: '规格',
				dataIndex: 'spec',
			},
			{
				title: '商品条码',
				dataIndex: "productEntity.data.barcode"
			},
		];
// rowSelection object indicates the need for row selection
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({selectedRowKeys,selectedRows})
			}
		};
		return (
			<div className="selectSpec">
				<Modal
					title="选择规格"
					width={526}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={false}
					mask={false}
				>
					<div className="selectGoodsChart" >
						<Table
							rowSelection={rowSelection}
							columns={columns}
							rowKey={record => record.stock_id}
							pagination={false}
							rowClassName={(record, index) => {
								let className = '';
								if (index % 2 ) className = 'dark-row';
								return className;
							}}
							dataSource={this.state.data}
						/>
					</div>
					<div className="selectSpecFooter">
						<Button
							size="small"
							onClick={this.handleCancel}
						>取消</Button>
						<Button
							type="primary"
							size="small"
							onClick={this.handleSubmit}
						>确定</Button>
					</div>
				</Modal>
			</div>
		)
	}
	
}
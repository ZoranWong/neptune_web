import React from "react";
import { Modal, Table} from 'antd'
import '../InStockNew/css/selectGoods.sass'
import {goodSpec} from "../../../api/goods/specification";

export default class RecordSpec extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.recordSpecId) return;
		goodSpec({},nextProps.recordSpecId).then(r=>{
			this.setState({data:r.data})
		})
		
	}
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	

	
	render() {
		const columns = [
			{
				title: '规格',
				dataIndex: 'spec_desc',
			},
			{
				title: '零售价',
				dataIndex:'retail_price'
			},
			{
				title: '销量',
				dataIndex: 'total_sales',
			},
			
		];
		return(
			<div className="selectGoods">
				<Modal
					title="规格"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={false}
				>
					<div className="selectGoodsChart" >
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
				</Modal>
			</div>
		)
	}
	
	
}
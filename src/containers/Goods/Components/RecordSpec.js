import React from "react";
import { Modal, Table} from 'antd'
import '../InStockNew/css/selectGoods.sass'
import {stockSpec} from "../../../api/goods/specification";
import IconFont from "../../../utils/IconFont";

export default class RecordSpec extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.provide_id) return;
		stockSpec({},nextProps.provide_id).then(r=>{
			this.setState({data:r.data})
		}).catch(_=>{})
	}
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	

	
	render() {
		const columns = [
			{
				title: '规格',
				dataIndex: 'spec',
			},
			{
				title: '零售价',
				dataIndex:'retail_price'
			},
			{
				title: '库存',
				dataIndex:'stock',
				render: (text,record) =>
					<div className="warning" >
						{text}
						<span style={{display:record.stock_alert?'block':'none',marginLeft:'20px'}}>
							<IconFont type="icon-info-circle-fill" />
							警戒
						</span>
					</div>
				,
			},
			{
				title: '销量',
				dataIndex: 'total_sales',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.props.onSubmit(record)}
						>警戒库存
						</span>
					</div>
				,
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

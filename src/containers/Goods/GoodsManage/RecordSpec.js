import React from "react";
import { Modal, Table} from 'antd'
import '../InStockNew/css/selectGoods.sass'
export default class RecordSpec extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data:[],
		}
	}
	
	componentDidMount() {
	
	}
	
	
	
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	

	
	render() {
		const columns = [
			{
				title: '规格',
				dataIndex: 'name',
			},
			{
				title: '零售价',
				dataIndex:''
			},
			{
				title: '销量',
				dataIndex: 'category',
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
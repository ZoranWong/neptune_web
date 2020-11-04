import React,{Fragment} from "react";
import {Modal, Table} from "antd";
export default class ReviewAdjustment extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			adjustments:[],
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.adjustments) {
			return
		}
		if (nextProps.adjustments && nextProps.adjustments.length) {
			console.log(nextProps);
			this.setState({adjustments:nextProps.adjustments})
		} else {
			this.setState({adjustments: []})
		}
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	
	render() {
		const {adjustments} = this.state;
		const columns = [
			{
				title: '完成时间',
				dataIndex: 'finished_time',
			},
			{
				title: '调整',
				dataIndex: 'sys_remark',
				render: (text, record) => (
					<span>{text}{record['adjust_data'][0].value}</span>
				)
			},
			{
				title: '备注',
				dataIndex: 'remark',
			},
		];
		return (
			<Fragment>
				<Modal
					title='调整记录'
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<div className="chart" id="s_chart">
						<Table
							columns={columns}
							rowKey={record => record.id}
							pagination={false}
							dataSource={adjustments}
						/>
					</div>
				</Modal>
			</Fragment>
		)
	}
	
	
}

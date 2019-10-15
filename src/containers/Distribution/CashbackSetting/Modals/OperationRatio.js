import React, {Component} from 'react';
import {Button, Input, message, Modal} from "antd";
import '../css/operationRatio.sass';
import {addNewLevels,updateLevels} from "../../../../api/distribution/setting";

class OperationRatio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ratio: '',
			title: '',
			min_pv: '',
			max_pv: ''
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.record.id) return;
		for (let k in nextProps.record) {
			this.setState({
				[k]: nextProps.record[k]
			})
		}
	}
	
	handleCancel = () =>{
		this.props.onClose()
	};
	
	check  = () => {
		let {ratio, title, min_pv, max_pv} = this.state;
		if (!title) {
			message.error('请填写名称');
			return
		}
		if (!min_pv) {
			message.error('请填写区间最小值');
			return
		}
		if (!max_pv) {
			message.error('请填写区间最大值');
			return
		}
		if (!ratio) {
			message.error('请填写分佣比例');
			return
		}
		if (min_pv > max_pv) {
			message.error('分区最小值不可大于分区最大值');
			return
		}
		this.submit(title,min_pv,max_pv,ratio)
	};
	
	submit = (title, min , max, ratio) => {
		let api = this.state.id ? updateLevels : addNewLevels;
		api({
			title,
			min_pv:min,
			max_pv: max,
			ratio
		},this.state.id).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
		}).catch(_=>{});
	};
	
	render() {
		return (
			<Modal
				title="新建佣金比例"
				maskClosable={false}
				width={520}
				visible={this.props.visible}
				onCancel={this.handleCancel}
				onOk={this.check}
				okText="确认"
				cancelText="取消"
			>
				<ul className="mainUl">
					<li>
						<span className="left">名称</span>
						<Input
							className="liInput"
							placeholder='请填写名称'
							value={this.state.title}
							onChange={(e)=>{
								this.setState({title:e.target.value})
							}}
						/>
					</li>
					<li>
						<span className="left">PV区间</span>
						<div className="rangeRatioBox">
							<Input
								className="rangeRatioInput"
								placeholder='请填写区间最小值'
								value={this.state.min_pv}
								onChange={(e)=>{
									this.setState({min_pv:e.target.value})
								}}
							/>
							-
							<Input
								className="rangeRatioInput"
								placeholder='请填写区间最大值'
								value={this.state.max_pv}
								onChange={(e)=>{
									this.setState({max_pv:e.target.value})
								}}
							/>
						</div>
					</li>
					<li>
						<span className="left">分佣比例</span>
						<Input
							className="liInput"
							placeholder='请填写分佣比例'
							value={this.state.ratio}
							onChange={(e)=>{
								this.setState({ratio:e.target.value})
							}}
						/>
					</li>
				</ul>
			</Modal>
		);
	}
}

export default OperationRatio;

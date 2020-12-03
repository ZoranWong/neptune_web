import React, {Component} from 'react';
import {Button, Input, message, Modal} from "antd";
import '../css/operationRatio.sass';
import {addBreakfastNewLevels,updateLevels} from "../../../../api/distribution/setting";
import {min} from "moment";

class breakfastOperationRatio extends Component {
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
		console.log(nextProps);
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
		console.log(min_pv);
		if (typeof min_pv === 'undefined' || min_pv === null || min_pv === '') {
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
		if (min_pv - max_pv > 0) {
			message.error('分区最小值不可大于分区最大值');
			return
		}
		this.submit(title,min_pv,max_pv,ratio)
	};
	
	submit = (title, min , max, ratio) => {
		min = parseInt(min);
		max = parseInt(max);
		ratio = parseInt(ratio);
		let api = this.state.id ? updateLevels : addBreakfastNewLevels;
		api({
			title,
			min_pv:min,
			max_pv: max,
			ratio
		},this.state.id).then(r=>{
			this.setState({
				ratio: '',
				title: '',
				min_pv: '',
				max_pv: ''
			},()=>{
				message.success(r.message);
				this.handleCancel();
				this.props.refresh();
			});
		}).catch(_=>{});
	};
	
	render() {
		return (
			<Modal
				title="早餐车佣金比例"
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

export default breakfastOperationRatio;

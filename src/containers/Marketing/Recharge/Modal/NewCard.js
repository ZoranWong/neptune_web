import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, message, Modal, Select} from "antd";
import '../css/index.sass';
import zh_CN from "antd/lib/locale-provider/zh_CN";
const { RangePicker } = DatePicker;
class NewCard extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.banner = React.createRef();
	}

	
	handleCancel = () =>{
		this.props.onClose()
	};
	
	handleSubmit = () => {

	};

	// 活动起始时间
	actDateChange = (date, dateString) => {
		this.setState({
			start_date: dateString[0],
			end_date: dateString[1]
		})
	};

	inputChange = (e,type) => {
		this.setState({[type]: e.target.value})
	};
	

	

	
	render() {
		return (
			<div>
				<Modal
					title='新建充值卡'
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={
						<div>
							<Button
								size="small"
								onClick={this.handleCancel}
								type="default">取消</Button>
							<Button
								size="small"
								onClick={this.handleSubmit}
								type="primary">保存</Button>
						</div>
					}
				>
					<ul className="mainUl">
						<li className="normalLi imgLi">
							<span className="left c_left">充值卡名称</span>
							<Input className="liInput" type="text" value={this.state.title} onChange={(e)=>this.inputChange(e, 'title')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">充值卡金额</span>
							<Input className="liInput" type="text" value={this.state.title} onChange={(e)=>this.inputChange(e, 'title')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">数量</span>
							<Input className="liInput" type="text" value={this.state.title} onChange={(e)=>this.inputChange(e, 'title')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">有效期</span>
							<LocaleProvider locale={zh_CN}>
								<RangePicker style={{width: '300px'}} showTime onChange={this.actDateChange} />
							</LocaleProvider>
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default NewCard;

import React, {Component,Fragment} from 'react';
import {Button, Input, Modal} from "antd";
import '../css/newStoreCard.sass'
class NewStoreCard extends Component {
	
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
	
	};
	
	render() {
		return (
			<Fragment>
				<Modal
					title="新建储值卡"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<ul className="mainUl">
						<li>
							<span className="left">储值名称:</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">储值金额（元）:</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">赠送金额（元）:</span>
							<Input
								className="liInput"
							/>
						</li>
					</ul>
					<div className="us_save_btn">
						<Button size="small" onClick={this.handleCancel} >取消</Button>
						<Button size="small" type="primary" onClick={this.handleSubmit}>保存</Button>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default NewStoreCard;
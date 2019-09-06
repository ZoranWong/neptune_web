import React, {Component} from 'react';
import {Button, DatePicker, Input, LocaleProvider, Modal, Radio} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
class NewModule extends Component {
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	render() {
		return (
			<Modal
				title="新建模板"
				width={520}
				centered={true}
				visible={this.props.visible}
				onCancel={this.handleCancel}
				footer={null}
				maskClosable={false}
			>
				<ul className="mainUl">
					<li>
						<span className="left">发送类型:</span>
						<Input
							className="liInput"
						/>
					</li>
					<li >
						<span className="left">模板名称:</span>
						<Input
							className="liInput"
						/>
					</li>
					<li>
						<span className="left">短信内容:</span>
						<Input
							className="liInput"
						/>
					</li>
					<li>
						<span className="left">发送方式:</span>
						<Input
							className="liInput"
						/>
					</li>
					<li>
						<span className="left">发送规则:</span>
						<Input
							className="liInput"
						/>
					</li>
				</ul>
				<div className="i_save_btn">
					<Button size="small" type="primary" >保存</Button>
				</div>
			</Modal>
		);
	}
}

export default NewModule;
import React, {Component} from 'react';
import {Button, message, Modal, Select} from "antd";
import 'moment/locale/zh-cn';
import '../css/newSmsModule.sass'

const {Option} = Select;
class BulkDelivery extends Component {
	state = {
		obj_type: 'USER',
		biz_type:0,
		name:'',
		content:'',
		remark:'',
		is_auto_send:0,
		code: ''
	};
	
	handleCancel = () =>{
		this.props.onCancel();
	};
	
	submit = () =>{
		console.log(this.props.mode);
		let data = this.state;
		this.create(data)
	};
	
	create = data =>{
		let api = this.props.mode === 'export' ? exportSmsTemplates : createSMS;
		api({...data}).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
		}).catch(_=>{})
	};
	
	typeChange = (type,e) =>{ this.setState({[type]:e}) };
	
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
						<span className="left">发送对象:</span>
						<Select
							value={this.state.obj_type}
							onChange={(e)=>this.typeChange('obj_type',e)}
							className='sms_select'>
							<Option value="USER">用户</Option>
							<Option value="MERCHANT">商家</Option>
						</Select>
					</li>
                    <li className="normalLi imgLi" >
							<span className="left c_left">上传表格</span>
							<Upload 
							><Button type='primary'>选择文件</Button></Upload>
							
							{/* onChange={this.selsetFile} fileList={this.state.fileList} 
							action = {this.state.excelUploadUrl}
							headers={{'Authorization': `${getToken()}`}} */}
						</li>
				</ul>
				<div className="i_save_btn">
					<Button size="small" type="primary" onClick={this.submit} >保存</Button>
				</div>
			</Modal>
		);
	}
}

export default BulkDelivery;

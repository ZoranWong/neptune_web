import React, {Component} from 'react';
import {Modal, Input, message} from "antd";
import XLSX from 'xlsx';
import _ from 'lodash';
import {orderTransformer} from "../utils/transformer";

class NewForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			mobile: '',
			address: '',
			village: '',
			formData: []
		}
	}
	
	
	handleCancel = () => {
		this.props.onClose();
	};
	
	handleSubmit = () => {
		console.log(this.state.formData, '.......');
		let {state} = this;
		if (!state.village) {
			message.error('请先填写小区');
			return
		}
		if (!state.address) {
			message.error('请先填写地址');
			return
		}
		if (!state.name) {
			message.error('请先填写收货人姓名');
			return
		}
		if (!state.mobile) {
			message.error('请先填写收货人手机号码');
			return
		}
		if (!state.formData.length) {
			message.error('请先上传表格');
			return
		}
		let obj = {
			mobile: state.mobile,
			name: state.name,
			address: state.address,
			village: state.village,
			order: state.formData
		};
		this.props.onSubmit(obj);
		this.setState({
			name: '',
			mobile: '',
			address: '',
			village: '',
			formData: []
		}, ()=> {
			this.handleCancel()
		})
	};
	
	importExcal = (event) => {
		event.persist();
		let rABS = false;
		let wb;
		let self = this;
		let files = event.target.files;
		let reader = new FileReader();
		reader.readAsBinaryString(files[0]);
		reader.onload = function (e) {
			let data = e.target.result;
			if(rABS) {
				wb = XLSX.read(btoa(self.fixdata(data)), {//手动转化
					type: 'base64'
				});
			} else {
				wb = XLSX.read(data, {
					type: 'binary'
				});
			}
			self.handleData(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
		};
	};
	
	fixdata = (data) => { //文件流转BinaryString
		var o = "",
			l = 0,
			w = 10240;
		for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
		o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
		return o;
	};
	
	inputChange = (type, e) => {
		this.setState({[type]: e.target.value})
	};
	
	// 处理表格数据
	handleData = (data) => {
		this.setState({formData: orderTransformer(data)})
	};
	
	render() {
		let {state} = this;
		return (
			<div>
				<Modal
					title="新增店铺"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确认"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<ul className="mainUl shops-input">
						<li>
							<span className="left">小区</span>
							<Input value={state.village}  onChange={(e)=>this.inputChange('village',e)}/>
						</li>
						<li>
							<span className="left" >地址</span>
							<Input value={state.address}  onChange={(e)=>this.inputChange('address',e)} />
						</li>
						<li>
							<span className="left">收货人</span>
							<Input value={state.name}  onChange={(e)=>this.inputChange('name',e)}/>
						</li>
						<li>
							<span className="left">联系电话</span>
							<Input type='number' value={state.mobile} onChange={(e)=>this.inputChange('mobile',e)} />
						</li>
						<li>
							<span className="left">上传表格</span>
							<input type='file' onChange={(e)=>this.importExcal(e)} />
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default NewForm;

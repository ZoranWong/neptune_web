import React, {Component} from 'react';
import {Button, DatePicker, Input, ConfigProvider, message, Modal,Radio,Checkbox,Upload } from "antd";
import '../css/index.sass';
import zh_CN from "antd/lib/locale-provider/zh_CN";
import {createNewCard,uploadExcel} from "../../../../api/marketing/cards";
// import * as XLSX from 'xlsx'
import Config from '../../../../config/app';
import {getToken} from "../../../../utils/dataStorage";
// import e from 'express';

const { RangePicker } = DatePicker;
class NewCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			amount: '',
			total_quantity: '',
			start_time: '',
			end_time: '',
			access_method:'PLATFORM_PUT',  // 领取方式
			used_scene:[],
			file_url:'',
			excelUploadUrl: Config.apiUrl + "/" + Config.apiPrefix + "api/backend/consume_cards/upload"
		};
	}

	
	handleCancel = () =>{
		this.props.onClose()
	};
	
	handleSubmit = () => {
		let {used_scene,name,amount, total_quantity, start_time,end_time} = this.state;
		if(!used_scene){
			message.error('请勾使用场景');
			return
		}
		if (!name) {
			message.error('请填写充值卡名称');
			return
		}
		if (!amount) {
			message.error('请填写充值卡金额');
			return
		}
		if (this.state.access_method =='EXCHANGE' && !total_quantity) {
			message.error('请填写充值卡数量');
			return
		}
		if (!start_time || !end_time) {
			message.error('请选择充值卡有效期');
			return
		}
		let param={
			name:this.state.name,
			amount:this.state.amount,
			start_time:this.state.start_time,
			total_quantity:this.state.total_quantity,
			end_time:this.state.end_time,
			access_method:this.state.access_method,
			used_scene:this.state.used_scene,
			file_url:this.state.file_url
		}
		createNewCard(param).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh()
		})
	};

	// 活动起始时间
	actDateChange = (date, dateString) => {
		this.setState({
			start_time: dateString[0],
			end_time: dateString[1]
		})
	};
	//单选
	radioChange = (e,type )=>{
		if (e.target.value=='') {
			
		}
		console.log('radio checked', e.target.value);
		this.setState({[type]:e.target.value})
	};
	// 多选
	checkboxChange=(checkedValues)=>{
		this.setState({used_scene:checkedValues})
	}	
	inputChange = (e,type) => {
		this.setState({[type]: e.target.value})
	};
	inputNumChange = (e,type) => {
		this.setState({[type]: parseInt(e.target.value)})
	};
	selsetFile=(e)=>{
		const self =this;
		// 限制上传的文件只能有一个
		let fileList =[...e.fileList];
		fileList = fileList.slice(-1);
		this.setState({fileList});
		// if (e.status === 200) {
		// 	console.log(e);
		//   }
		if(e.file.response){
			this.setState({file_url:e.file.response.data.url});
			console.log(e.file.response.data.url,"-------------------------11")
		}
		
		//
	}
	

	

	
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
						<span className="c_left">领取方式</span>
							<Radio.Group onChange={(e)=>this.radioChange(e,'access_method')} value={this.state.access_method}>
								<Radio value='PLATFORM_PUT'>
									直接发送
								</Radio>
								<Radio value='EXCHANGE'>
									券码兑换
								</Radio>
							</Radio.Group>
						</li>
						<li className="normalLi imgLi">
							<span className="c_left">使用场景</span>
							<Checkbox.Group  onChange={this.checkboxChange}>
									<Checkbox value="SCAN_CODE_PAY">扫码付   </Checkbox>
									<Checkbox value="SHOP_MALL_ORDER">商城订单</Checkbox><br/>
									<Checkbox value="GROUP_ORDER">团购订单</Checkbox>
									<Checkbox value="SOCIETY_ORDER">社会餐订单</Checkbox>
							</Checkbox.Group>
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">充值卡名称</span>
							<Input className="liInput" type="text" value={this.state.name} onChange={(e)=>this.inputChange(e, 'name')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">充值卡金额</span>
							<Input className="liInput" type='number' value={this.state.amount} onChange={(e)=>this.inputNumChange(e, 'amount')} />
						</li>
						{this.state.access_method =='EXCHANGE' &&
							<li className="normalLi imgLi">
							<span className="left c_left">数量</span>
							<Input className="liInput" type="number" value={this.state.total_quantity} onChange={(e)=>this.inputNumChange(e, 'total_quantity')} />
						</li>
						}
						<li className="normalLi imgLi">
							<span className="left c_left">有效期</span>
							<ConfigProvider locale={zh_CN}>
								<RangePicker format="YYYY-MM-DD HH:mm" style={{width: '300px'}} showTime onChange={this.actDateChange} />
							</ConfigProvider>
						</li>
						{
							this.state.access_method=='PLATFORM_PUT' &&
							<li className="normalLi imgLi" >
							<span className="left c_left">上传表格</span>
							<Upload 
							onChange={this.selsetFile} fileList={this.state.fileList} 
							action = {this.state.excelUploadUrl}
							headers={{'Authorization': `${getToken()}`}}
							><Button type='primary'>选择文件</Button></Upload>
							
						</li>
						}
					</ul>
				</Modal>
			</div>
		);
	}
}

export default NewCard;

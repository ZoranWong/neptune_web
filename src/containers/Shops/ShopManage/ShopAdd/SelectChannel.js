import React from 'react';
import '../css/ShopAdd.sass'
import { Modal, Radio , Button,Upload,message} from "antd";
import BreakfastCar from './BreakfastCar'
import Distributor from './Distributor'
import ShopKeeper from './ShopKeeper'
import {getFatherChannels,batchAdd} from "../../../../api/shops/channel";
import Config from '../../../../config/app';
import {getToken} from "../../../../utils/dataStorage";

class SelectChannel extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			radio:'',
			breakfast:false,
			shopKeeper:false,
			distributor:false,
			channels:[],
			radioName:'',

			newAdd: false,
			file_extension_name:'',
			file_url:'',
			excelUploadUrl: Config.apiUrl + "/" + Config.apiPrefix + "api/backend/consume_cards/upload"
		}
	}
	componentDidMount() {
		getFatherChannels({}).then(r=>{
			this.setState({channels:r.data,radio:r.data[0].id,radioName:r.data[0].name})
		})
	}
	
	onChange = e => {
		let n = this.state.channels.filter(item=>{
			return item.id == e.target.value
		});
		this.setState({
			radio: e.target.value,
			radioName:n[0].name
		});
	};
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
		this.handleCancel();
		switch (this.state.radioName) {
			case "早餐车":
				this.showBreakfast();
				return;
			case "商户":
				this.showShopKeeper();
				return;
			default:
				this.showDistributor()
		}
	};
	handleOk(){
		let params={
			file_url:this.state.file_url,
			file_extension_name:this.state.file_extension_name
		}

		batchAdd(params).then(r=>{
			message.success(r.message);
			this.setState({
				newAdd : false,
			})
			this.props.refresh()
			
		})
	};
	cancelAdd = e =>{
		this.setState({
			newAdd : false,
		})
		// console.log(11111111111111111111111111)
	};
	
	
	// 早餐车
	showBreakfast = () =>{
		this.setState({breakfast:true})
	};
	hideBreakfast = () =>{
		this.setState({breakfast:false})
	};
	
	// 分销员
	showDistributor = () =>{
		this.setState({distributor:true})
	};
	hideDistributor = () =>{
		this.setState({distributor:false})
	};
	
	// 商户
	showShopKeeper = () =>{
		this.setState({shopKeeper:true})
	};
	hideShopKeeper = () =>{
		this.setState({shopKeeper:false})
	};
	selsetFile=(e)=>{
		const self =this;
		// 限制上传的文件只能有一个
		let fileList =[...e.fileList];
		fileList = fileList.slice(-1);
		this.setState({fileList});
		// if (e.status === 200) {
			console.log(e,"-----------2222--");
		//   }
		if(e.file.response){
			this.setState({file_url:e.file.response.data.url});
			this.setState({file_extension_name:e.file.response.data.file_extension});
			console.log(this.state.file_extension_name,"-------------------------11")
			if(e.file.response.status_code ===200){
				this.state.newAdd=true;
				this.handleCancel();
			}
		}

		
	}


	
	
	
	render(){
		return (
			<div>
				
				<BreakfastCar
					visible={this.state.breakfast}
					onClose={this.hideBreakfast}
					onShow={this.showBreakfast}
					id={this.state.radio}
				/>
				<Distributor
					visible={this.state.distributor}
					onClose={this.hideDistributor}
					onShow={this.showDistributor}
					id={this.state.radio}
				/>
				<ShopKeeper
					visible={this.state.shopKeeper}
					onClose={this.hideShopKeeper}
					onShow={this.showShopKeeper}
					id={this.state.radio}
				/>
				
				
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
					<div className="s_channel">
						<span className="left">选择店铺渠道</span>
						<Radio.Group onChange={this.onChange} value={this.state.radio}>
							{
								this.state.channels.map(item=>(
									<Radio value={item.id} key={item.id}>{item.name}</Radio>
								))
							}
						</Radio.Group>
						
					</div>
					{
						this.state.radioName =='早餐车' &&
					<div className="s_channel">
							<span className="left">批量新增:</span>
							{/* <input type='file' onChange={(e)=>this.importExcal(e)} /> */}
							<Upload 
							onChange={this.selsetFile} fileList={this.state.fileList} 
							action = {this.state.excelUploadUrl}
							headers={{'Authorization': `${getToken()}`}}
							><Button type='primary'>选择文件</Button></Upload>
						</div>
						}
				</Modal>


				<Modal
					title="批量新增"
					visible={this.state.newAdd}
					onOk={this.handleOk}
					onCancel={this.cancelAdd}
					>
							<h1>确定批量新增吗？</h1>
					</Modal>
			</div>
		)
	}
}
export default SelectChannel

import React from 'react';
import {Button, Input, Modal, Radio} from "antd";
import Map from '../../../../components/Map/Map'
class ShopApplication extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			visible:false
		}
	}
	
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	handleSubmit = () =>{
	
	};
	
	showMap = () =>{
		this.handleCancel();
		this.setState({visible:true})
	};
	hideMap = () =>{
		this.setState({visible:false})
	};
	
	
	render(){
		return (
			<div>
				<Map visible={this.state.visible}
					 hideMap={this.hideMap}
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
					<ul className="mainUl">
						<li>
							<span className="left">店铺渠道：</span>
							<span>早餐车</span>
						</li>
						<li>
							<span className="left">店铺编号</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">店铺名称</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">店铺地址</span>
						</li>
						<li>
							<span className="left">详细地址</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left" >地图位置</span>
							<span onClick={this.showMap} style={{'cursor':'pointer'}}>
								<i className="iconfont" style={{'fontSize':'14px','color':'#4F9863','marginRight':'3px'}}>&#xe7b0;</i>
								设置地图坐标
							</span>
						</li>
						<li>
							<span className="left">车主姓名</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">车主电话</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">车主身份证号码</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">店铺状态</span>
							<Radio.Group>
								<Radio value={1}>开业</Radio>
								<Radio value={2}>打烊</Radio>
							</Radio.Group>
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}
export default ShopApplication

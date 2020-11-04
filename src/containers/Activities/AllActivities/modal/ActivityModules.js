import React, {Component} from 'react';
import {Modal} from "antd";
import '../css/activityModules.sass'
class ActivityModules extends Component {
	
	
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	handleSubmit = () => {
		this.handleCancel()
	};
	
	render() {
		return (
			<div>
				<Modal
					title="活动模板(首页)"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					onOk={this.handleSubmit}
					okText='确定'
					cancelText='取消'
				>
					<ul className='activityModules'>
						<li>
							<h3>模板一：</h3>
							<div className='moduleContainer'>
								<span className='pics'>这是一张图片</span>
							</div>
						</li>
						<li>
							<h3>模板二：</h3>
							<div  className='moduleContainer'>
								<span>这是一张条幅</span>
								<div className="products">
									<em>这是一个商品</em>
									<em>这是一个商品</em>
									<em>这是一个商品</em>
								</div>
							</div>
							
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default ActivityModules;

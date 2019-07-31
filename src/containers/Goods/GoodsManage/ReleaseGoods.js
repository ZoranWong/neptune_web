import React from 'react';
import {Input, Modal} from "antd";

export default class ReleaseGoods extends React.Component{
	constructor(props) {
		super(props);
		
	}
	
	handleCancel = ()=>{
		this.props.onClose()
	};
	
	handleSubmit = () =>{
	
	};
	
	
	render() {
		return (
			<div className="release_goods">
				<Modal
					title="发布商品"
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
							<span className="left">商品名称</span>
							<Input
								className="liInput"
							
							/>
							
						</li>
						<li>
							<span className="left">商品条码</span>
							<Input
								className="liInput"
							
							/>
						</li>
						<li>
							<span className="left">商品缩略图</span>
							<Input
								className="liInput"
								
							/>
						</li>
						<li>
							<span className="left">商品详情图</span>
						</li>
						<li>
							<span className="left">商品简介</span>
							<Input
								className="liInput"
								
							/>
						</li>
						<li>
							<span className="left">商品描述</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">分享描述</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">商品属性</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">商品分类</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">规格</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">零售价</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">市场价</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">成本价</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">PV值</span>
							<Input
								className="liInput"
							/>
						</li>
						<li>
							<span className="left">选择批次</span>
							<Input
								className="liInput"
							/>
						</li>
					</ul>
				
				</Modal>
			</div>
		)
	}
}
import React,{Fragment} from "react";
import './css/goods.sass'
import {Modal} from "antd";
export default class ReviewGoods extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			items:[]
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.items ||!nextProps.items.data || !nextProps.items.data.length) return;
		let items = nextProps.items.data;
		items.forEach(item=>{
			let ary = [];
			for ( let k in item['spec_value']){
				ary.push(item['spec_value'][k])
			}
			item.spec_desc = ary.join(',')
		});
		this.setState({items:items})
	}
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	
	render() {
		const {items} = this.state;
		return (
			<Fragment>
				<Modal
					title="商品"
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<ul className="reviews">
						{
							(items&&items.length)&&items.map(item=>(
								<li key={item.item_id}>
									<img src={item.thumbnail} alt="" className="left"/>
									<div className="right">
										<span>商品名:{item.name}</span>
										<span>规格:{item.spec_desc || '无'}</span>
										<span>数量:{item.quantity}</span>
										<span>零售价:{item.price + '元'}</span>
									</div>
								</li>
							))
						}
					</ul>
				</Modal>
			</Fragment>
		)
	}
	
	
}

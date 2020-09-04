import React,{Fragment} from "react";
import '../../../../Order/Components/css/goods.sass'
import {Modal} from "antd";

export default class ReviewGoods extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			items:[],
			text: '商品'
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.items.length) return;
		this.setState({items: nextProps.items})
		
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	
	render() {
		const {items} = this.state;
		return (
			<Fragment>
				<Modal
					title='商品'
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
								<li key={item.id} >
									<span>{item.name}</span>
								</li>
							))
						}
					</ul>
				</Modal>
			</Fragment>
		)
	}
	
	
}

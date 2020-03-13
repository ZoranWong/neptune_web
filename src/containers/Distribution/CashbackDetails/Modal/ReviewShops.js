import React,{Fragment} from "react";
import {Modal} from "antd";
export default class ReviewShops extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			shops:[],
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.shops) {
			return
		}
		if (nextProps.shops && nextProps.shops.length) {
			console.log(nextProps);
			this.setState({shops:nextProps.shops})
		}
		
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	
	render() {
		const {shops} = this.state;
		return (
			<Fragment>
				<Modal
					title='下线店铺'
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<ul className="reviews">
						{
							(shops&&shops.length)&&shops.map((item,index)=>(
								<li key={index}>
									{item}
								</li>
							))
						}
					</ul>
				</Modal>
			</Fragment>
		)
	}
	
	
}

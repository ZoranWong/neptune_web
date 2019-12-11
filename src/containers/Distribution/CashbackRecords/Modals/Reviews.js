import React,{Fragment} from "react";
import '../css/reviews.sass'
import {Modal} from "antd";
export default class Reviews extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			items:[]
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		console.log(nextProps);
		if(!nextProps.items ||!nextProps.items.length) return;
		let items = nextProps.items;
		items.forEach(item=>{
			let ary = [];
			for ( let k in item['spec_value']){
				ary.push(item['spec_value'][k])
			}
			item.spec_desc = ary.join(',')
		});
		this.setState({items:items,text: nextProps.text})
	}
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	
	render() {
		const {items} = this.state;
		return (
			<Fragment>
				<Modal
					title={this.state.text}
					width={520}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
					maskClosable={false}
				>
					<ul className="distributionsReviews">
						{
							(items&&items.length)&&items.map((item,index)=>(
								<li key={index} className={index % 2 ? '':'dark-row'}>
									<div className="right">
										<span>{item.name}</span>
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

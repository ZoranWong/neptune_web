import React, {Component} from 'react';
import IconFont from "../../../utils/IconFont";
import {unbindTemplates} from "../../../api/marketing/message";
import {message} from "antd";
import {templates} from "../../../api/marketing/message";
import {searchJson} from "../../../utils/dataStorage";
import _ from 'lodash'
class DeleteMessage extends Component {
	state = {
		orders: [],
		coupons: []
	};
	componentDidMount() {
		this.init();
	}
	
	init  = () =>{
		
		templates({searchJson: searchJson({type: 'ORDER'})}).then(r=>{
			this.setState({orders: r.data})
		});
		templates({searchJson: searchJson({type: 'COUPON'})}).then(r=>{
			this.setState({coupons: r.data})
		});
	};
	
	unbind = (e) =>{
		e.preventDefault();
		e.stopPropagation();
		let {orders,coupons} = this.state;
		let all = orders.concat(coupons);
		_.map(all, item=>{
			if (item.template.id === this.props.id && item.trigger === this.props.type) {
				this.handleUnbind(item['binding_id'])
			}
		})
	};
	
	handleUnbind = (id) =>{
		unbindTemplates({},id).then(r=>{
			message.success(r.message + ',即将自动刷新');
			this.props.refresh();
		})
	};
	
	render() {
		return (
			<div className='deleteMessage' onClick={this.unbind}>
				<IconFont type='icon-delete-fill' />
			</div>
		);
	}
}

export default DeleteMessage;

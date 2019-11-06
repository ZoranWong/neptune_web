import React, {Component} from 'react';
import {Select} from "antd";
import {shops} from "../../../../api/shops/shopManage";

class SelectUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItems:[],
			users:[],
			scrollPage:1
		}
	}
	
	componentDidMount() {
		shops({limit:10,page:1}).then(r=>{
			this.setState({users:r.data})
		})
	}
	
	
	handleChange = selectedItems =>{
		selectedItems = selectedItems.filter(item=>parseInt(item));
		this.setState({selectedItems})
	};
	
	userScroll = (e) =>{
		e.persist();
		const { target } = e;
		if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
			const { scrollPage } = this.state;
			const nextScrollPage = scrollPage + 1;
			this.setState({ scrollPage: nextScrollPage });
			this.getUserList(nextScrollPage); // 调用api方法
		}
	};
	
	getUserList = (page) =>{
		shops({limit:10,page}).then(r=>{
			if(!r.data.length) return;
			this.setState({users:this.state.users.concat(r.data)})
		}).catch(_=>{})
	};
	
	render() {
		const {selectedItems} = this.state;
		
		return (
			
			<Select
				defaultActiveFirstOption={false}
				placeholder='请选择用户'
				mode="tags"
				value={selectedItems}
				className='selectedBox tagBox'
				onChange={this.handleChange}
				onPopupScroll={this.userScroll}
				allowClear
				optionLabelProp="label"
				optionFilterProp="children"
				filterOption={(input, option) =>
					option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{this.state.users.map(item => (
					<Select.Option key={item.id+''} label={item.name} value={item.id+''}>
						{item.name}
					</Select.Option>
				))}
			</Select>
		);
	}
}

export default SelectUser;

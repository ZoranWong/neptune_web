import React, {Component} from 'react';
import {Select} from "antd";
import {groups} from "../../../../api/goods/groups";

class SelectGoodsGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItems:[],
			goods:[],
			scrollPage:1
		}
	}
	
	componentDidMount() {
		groups({limit:10,page:1}).then(r=>{
			this.setState({goods:r.data})
		})
	}
	
	
	handleChange = selectedItems =>{
		selectedItems = selectedItems.filter(item=>parseInt(item));
		this.setState({selectedItems})
	};
	
	goodScroll = (e) =>{
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
		groups({limit:10,page}).then(r=>{
			if(!r.data.length) return;
			this.setState({goods:this.state.goods.concat(r.data)})
		}).catch(_=>{})
	};
	
	render() {
		const {selectedItems} = this.state;
		
		return (
			
			<Select
				defaultActiveFirstOption={false}
				placeholder='请选择用户群组'
				mode="tags"
				value={selectedItems}
				className='selectedBox tagBox'
				onChange={this.handleChange}
				onPopupScroll={this.goodScroll}
				allowClear
				optionLabelProp="label"
				optionFilterProp="children"
				filterOption={(input, option) =>
					option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{this.state.goods.map(item => (
					<Select.Option key={item.id+''} label={item.name} value={item.id+''}>
						{item.name}
					</Select.Option>
				))}
			</Select>
		);
	}
}

export default SelectGoodsGroup;
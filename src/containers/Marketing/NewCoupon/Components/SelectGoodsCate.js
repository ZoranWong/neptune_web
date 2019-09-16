import React, {Component} from 'react';
import {Select} from "antd";
import {SonClassification} from "../../../../api/goods/classification";

class SelectGoodsCate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItems:[],
			goods:[]
		}
	}
	
	componentDidMount() {
		SonClassification({}).then(r=>{
			this.setState({goods:r})
		})
	}
	
	
	handleChange = selectedItems =>{
		selectedItems = selectedItems.filter(item=>parseInt(item));
		this.setState({selectedItems})
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

export default SelectGoodsCate;
import React from 'react'
import {Transfer} from 'antd';
import './css/customItem.sass'
import {user_values} from "../../../utils/user_fields";

export default class CustomItem extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			dataList: [],
			targetKeys: [],
		};
	}
	componentWillMount() {
		let ary = [];
		user_values.forEach(item=>{
			item.children.forEach(i=>{
				ary.push(i)
			})
		});
		this.setState({dataList:ary});
	}
	
	filterOption = (inputValue, option) => {
		console.log(option);
		return option.label.indexOf(inputValue) > -1;
	};
	
	handleChange = targetKeys => {
		console.log(targetKeys);
		this.setState({ targetKeys });
	};
	
	handleSearch = (dir, value) => {
		console.log('search:', dir, value);
	};
	
	
	render() {
		return (
			<div>
				<Transfer
					className='transfer'
					dataSource={this.state.dataList}
					showSearch
					titles={['属性', '列名（最多6列）']}
					filterOption={this.filterOption}
					targetKeys={this.state.targetKeys}
					onChange={this.handleChange}
					onSearch={this.handleSearch}
					render={item => item.label}
					rowKey={record => record.value}
					locale={{'itemUnit': '项', 'itemsUnit': '项', 'notFoundContent': '列表为空', 'searchPlaceholder': '搜索'} }
				/>
			</div>
			
			
			
		)
	}
}
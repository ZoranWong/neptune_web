import React from 'react'
import {Transfer,message} from 'antd';
import './customItem.sass'
import {sortAry} from "../../utils/dataStorage";

export default class CustomItem extends React.Component{
	
	constructor(props){
		super(props);
		let ary = [];
		props.data.forEach(item=>{
			item.children.forEach(i=>{
				ary.push(i)
			})
		});
		this.state = {
			dataList: ary,
			targetKeys: props.targetKeys,
			selectedKeys:['name']
		};
	}
	
	componentDidMount() {
	
	}
	
	// 筛选关键字
	filterOption = (inputValue, option) => {
		return option.label.indexOf(inputValue) > -1;
	};
	
	handleChange = targetKeys => {
		let ary = targetKeys;
		if(ary.indexOf('name') === -1){
			ary.unshift('name')
		}
		console.log(ary);
		if(ary.length > 7){
			message.error('最多选择七列');
			return;
		}
		sortAry(ary,'name');
		this.setState({ targetKeys:ary });
		this.props.handleCustom(ary)
	};
	
	onSelectChange = (sourceSelectedKeys, targetSelectedKeys)=>{
		if(targetSelectedKeys.indexOf('name') === -1){
			targetSelectedKeys.push('name')
		}
		let ary = [];
		ary = ary.concat(sourceSelectedKeys).concat(targetSelectedKeys);
		this.setState({selectedKeys:ary});
	};
	
	render() {
		const {selectedKeys,targetKeys} = this.state;
		return (
			<div>
				<Transfer
					className='transfer'
					dataSource={this.state.dataList}
					showSearch
					lazy={false}
					titles={['属性', '列名（最多7列）']}
					filterOption={this.filterOption}
					targetKeys={targetKeys}
					selectedKeys={selectedKeys}
					onChange={this.handleChange}
					onSelectChange={this.onSelectChange}
					showSelectAll={false}
					render={item => item.label}
					rowKey={record => record.value}
					locale={{'itemUnit': '项', 'itemsUnit': '项', 'notFoundContent': '列表为空', 'searchPlaceholder': '搜索'} }
				/>
			</div>
			
			
			
		)
	}
}
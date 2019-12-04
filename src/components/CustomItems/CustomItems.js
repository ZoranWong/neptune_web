import React from 'react'
import {Transfer,message} from 'antd';
import './customItem.sass'
import {sortAry} from "../../utils/dataStorage";
function handleCode(item) {
	switch (item.value) {
		case "province_code":
			item.value = 'province';
			break;
		case "city_code":
			item.value = 'city';
			break;
		case "area_code":
			item.value = 'area';
			break;
	}
}
export default class CustomItem extends React.Component{
	
	constructor(props){
		super(props);
		let ary = [];
		let bry = [];
		bry.push(props.firstItem);
		props.data.forEach(item=>{
			item.children.forEach(i=>{
				handleCode(i);
				ary.push(i)
			})
		});
		this.state = {
			dataList: ary,
			targetKeys: props.targetKeys,
			selectedKeys:bry
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
		if(ary.indexOf(this.props.firstItem) === -1){
			ary.unshift(this.props.firstItem)
		}
		if (ary.indexOf('promotion_qr_code') < 0) {
			if(ary.length > 8){
				message.error('最多选择七列');
				return;
			}
		} else {
			if(ary.length > 10){
				message.error('最多选择七列');
				return;
			}
		}
		
		
		sortAry(ary,this.props.firstItem);
		this.setState({ targetKeys:ary });
		this.props.handleCustom(ary)
	};
	
	onSelectChange = (sourceSelectedKeys, targetSelectedKeys)=>{
		if(targetSelectedKeys.indexOf(this.props.firstItem) === -1){
			targetSelectedKeys.push(this.props.firstItem)
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

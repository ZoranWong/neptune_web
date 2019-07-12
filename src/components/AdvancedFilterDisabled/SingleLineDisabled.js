import React from 'react';
import {Select,Cascader} from 'antd';
import './index.sass'
import {user_values,operation} from "../../utils/user_fields";
import AdvancedFilterValuesDisabled from './AdvancedFilterValuesDisabled'
const { Option } = Select;
export default class SingleLineDisabled extends React.Component{
	constructor(props){
		super(props);
		this.itemData = props.item;
		this.cid = this.itemData.cid;//用于标识每一行数据
		this.state = {
			singleLineData:{},
			activeKey:{},      // 选中key框对应的对象
			activeOptions:operation['timeCompare'][0].label,  //默认选中的option
			activeValue:''
		};
	};
	
	
	render(){
		return (
			<div className="singleBox">
				<div style={{width:"100%"}} className="selectChild">
					<Cascader
						options={user_values}
						className="cascader"
						defaultValue={["purchase_information", "last_purchased_at"]}
						expandTrigger="hover"
						allowClear={false}
						disabled={true}
					/>
					<Select
						style={{ width: 120,marginLeft:5 }}
						disabled={true}
						value={this.state.activeOptions}
						defaultValue={operation['timeCompare'][0].label}
					>
						{
							this.state.activeKey&&this.state.activeKey.type?
								(operation[this.state.activeKey.type].map(item=>(
									<Option key={item.value}>{item.label}</Option>
								)))
								:
								(operation['timeCompare'].map(item=>(
									<Option key={item.value}>{item.label}</Option>
								)))
						}
					</Select>
					<AdvancedFilterValuesDisabled
						activeKey={this.state.activeKey}
						type={this.state.type}
					/>
				</div>
				
			</div>
			
		)
	}
}






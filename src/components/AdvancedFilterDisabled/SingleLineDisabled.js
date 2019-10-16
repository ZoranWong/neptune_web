import React from 'react';
import {Select,Cascader} from 'antd';
import './index.sass'
import {user_values,operation} from "../../utils/user_fields";
import AdvancedFilterValuesDisabled from './AdvancedFilterValuesDisabled'

const { Option } = Select;
export default class SingleLineDisabled extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			singleLineData:{},
			activeKey:[],      // 选中key框对应的对象
			activeOptions:'',  //默认选中的option
			item:props.item,   // 每一行的数据
			type:'',  // operation的类型
		};
	};
	componentDidMount() {
		let key_p =[];
		console.log(this.state.item, '=============');
		let stateItem = this.state.item;
		let index = stateItem.key.indexOf('_');
		stateItem.key = stateItem.key.substring(index + 1,stateItem.key.length);
		user_values.forEach(item=>{
			item.children.forEach(i=>{
				if(i.value == stateItem.key){
					key_p.push(item.value);
					this.setState({type:i.type});
					operation[i.type].forEach(item_operation=>{
						if(item_operation.value == stateItem.operation){
							this.setState({activeOptions:item_operation.label})
						}
					})
				}
			})
		});
		key_p.push(this.state.item.key);
		this.setState({activeKey:key_p})
	}

	render(){
		return (
			<div className="singleBox">
				{
					this.state.item && this.state.item.key?(
						<div style={{width:"100%"}} className="selectChild">
							<Cascader
								options={user_values}
								className="cascader"
								value={this.state.activeKey}
								expandTrigger="hover"
								allowClear={false}
								disabled={true}
							/>
							<Select
								defaultActiveFirstOption={false}
								style={{ width: 120,marginLeft:5 }}
								disabled={true}
								value={this.state.activeOptions}
							>
							</Select>
							<AdvancedFilterValuesDisabled
								activeKey={this.state.item.value}
								type={this.state.type}
								operation={this.state.item.operation}
							/>
						</div>
					):''
				}

			</div>
			
		)
	}
}






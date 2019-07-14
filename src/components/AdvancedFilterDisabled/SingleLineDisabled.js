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
			item:{},   // 每一行的数据
			type:'',  // operation的类型
		};
	};

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({item:nextProps.item});
		let key_p =[];
		user_values.forEach(item=>{
			item.children.forEach(i=>{
				if(i.value == nextProps.item.key){
					key_p.push(item.value);
					this.setState({type:i.type});
					operation[i.type].forEach(item_operation=>{
						if(item_operation.value == nextProps.item.operation){
							this.setState({activeOptions:item_operation.label})
						}
					})
				}
			})
		});
		key_p.push(nextProps.item.key);
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






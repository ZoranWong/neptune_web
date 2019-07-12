import React from 'react';
import {Select,Cascader} from 'antd';
import './index.sass'
import {user_values,operation} from "../../utils/user_fields";
import AdvancedFilterValues from './AdvancedFilterValues'
const { Option } = Select;
export default class SingleLine extends React.Component{
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
	
	
	onKeyChange = (value) => {
		this.setState({activeValue:''});
		let parent =  user_values.filter(item=>{
			return item.value == value[0]
		});
		let child = parent[0].children.filter(item=>{
			return item.value == value[value.length -1]
		});
		let type = operation[child[0].type][0].type;
		this.setState({
			activeKey:child[0],
			activeOptions:operation[child[0].type][0].value,
			type:type
		});
	}
	;

	// 选择后渲染的样式
	displayRender = (label) => {
		return label[0] + '-'+ label[label.length - 1];
	};
	
	onOperationChange = (value) => {
		let type;
		if(this.state.activeKey.type){
			type = operation[this.state.activeKey.type].filter(item=>{
				return item.value == value
			})[0].type;
		} else {
			type = value == 'between'?'period':'timestamp'
		}
		this.setState({type:type});
		this.setState({activeOptions:value});
		if(this.state.activeValue){
			let data = {
				key:this.state.activeKey.value,
				operation:value,
				value:this.state.activeValue,
				cid:this.cid
			};
			this.setState({singleLineData:data});
			this.props.onData(data);
		}
	};
	
	
	valueChange = (value) =>{
		let data = {
			key:this.state.activeKey.value || "last_purchased_at",
			operation:this.state.activeOptions,
			value:value,
			cid:this.cid
		};
		this.setState({singleLineData:data,activeValue:value});
		this.props.onData(data);
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
						displayRender={this.displayRender}
						onChange={this.onKeyChange}
						allowClear={false}
					/>
					<Select
						style={{ width: 120,marginLeft:5 }}
						onChange={this.onOperationChange}
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
					<AdvancedFilterValues
						activeKey={this.state.activeKey}
						type={this.state.type}
						onValueChange={this.valueChange} />
				</div>
				{
					this.props.lineNeedRemove?(
						<i
							className="iconfont"
							style={{'display':(this.props.lineNeedRemove) ?'block':'none'}}
							onClick={this.props.deleteSingle}
						>&#xe82a;</i>
					):''
				}
				
			</div>
			
		)
	}
}






import React from 'react'
import {DatePicker,Input,Select} from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {operation} from "../../utils/user_fields";
import './index.sass'
const { RangePicker } = DatePicker;


const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
export default class AdvancedFilterValuesDisabled extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			type:'',
			value:'',
			gender:'',
			period:'',
			timestamp:'',
			city:[],
			provinceData:[],
			cityData:[],
			areaData:[]
		}
	}

	// timecompare 1111
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({activeKey:nextProps.activeKey})
		if(nextProps.type === undefined) return;
		operation[nextProps.type].forEach(item=>{
			if(item.value == nextProps.operation){
				this.setState({type:item.type})
			}
		})
	}
	
	componentDidMount() {
		
	}
	renderTree = () =>{
		console.log(this.state.type);
		const { selectedItems } = this.state;
		switch (this.state.type) {
			case 'timestamp':
				return <span>
					<DatePicker
						placeholder="请选择日期"
						showToday={false}
					/>
				</span>;
				break;
			case 'period':
				return <span>
					  <RangePicker
						  //showTime={true}
						  locale={locale}
					  />
				</span>;
				break;
			case 'input':
				return  <span>
					<Input
						placeholder="Basic usage"
						disabled={true}
						className="optionInput"
						value={this.state.activeKey}
					/>
				</span>;
				break;
			case 'inputRange':
				return  <span className="inputRange">
					<Input
						placeholder="Basic usage"
						disabled={true}
						className="optionInput"
						value={this.state.activeKey[0]}
					/>
					<span>-</span>
					<Input
						placeholder="Basic usage"
						disabled={true}
						className="optionInput"
						value={this.state.activeKey[1]}
					/>
				</span>;
				break;
			case 'selectedBox':
				return  <span>
					<Select
							mode="tags"
							disabled={true}
							placeholder="Inserted are removed"
							value={this.state.activeKey}
							className='selectedBox'
						
						>
					</Select>
				</span>;
				break;
			case 'cityBox':
				return  <span>
					<Select
						disabled={true}
						mode="multiple"
						placeholder="Inserted are removed"
						value={this.state.activeKey}
						className='selectedBox tagBox'
						onChange={this.handleCityChange}
						optionLabelProp="label"
						showSearch
						optionFilterProp="children"
					>
					</Select>
				</span>;
				break;
			case 'selectedBoxGender':
				return  <span>
							<Select defaultValue="male" disabled={true} style={{ width: 120 }}>
							</Select>
					</span>;
				break;
			default:
				return null
		}
	};
	
	render() {
		
		return (
			<span>
				{
					this.renderTree()
				}
			</span>
		)
	}
}
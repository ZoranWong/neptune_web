import React from 'react'
import {DatePicker,Input,Select} from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './index.sass'
const { RangePicker } = DatePicker;
const { Option } = Select;
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
export default class AdvancedFilterValues extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			type:'selectedBox',
			selectedItems: [],
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.type === undefined) return;
		this.setState({type:nextProps.type+''})
	}
	
	//时间戳发生变化
	onTimestampChange = (date,dateString) =>{
		console.log(date, dateString);
	};
	
	// 时间段发生变化
	onPeriodChange = (date,dateString) =>{
		console.log(date, dateString);
	};
	
	// 选定下拉标签时
	handleChange = selectedItems => {
		this.setState({ selectedItems });
	};
	
	//性别选择框发生变化
	handleGenderChange = (value) =>{
		console.log(`selected ${value}`);
	};
	
	renderTree = () =>{
		const { selectedItems } = this.state;
		const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
		switch (this.state.type) {
			case 'timestamp':
				return <span>
					<DatePicker
						onChange={this.onTimestampChange}
						placeholder="请选择日期"
						showToday={false}
					/>
				</span>;
				break;
			case 'period':
				return <span>
					  <RangePicker
						  onChange={this.onPeriodChange}
						  showTime={true}
						  locale={locale}
					  />
				</span>;
				break;
			case 'input':
				return  <span>
					<Input
						placeholder="Basic usage"
						className="optionInput"
					/>
				</span>;
				break;
			case 'inputRange':
				return  <span className="inputRange">
					<Input
						placeholder="Basic usage"
						className="optionInput"
					/>
					<span>-</span>
					<Input
						placeholder="Basic usage"
						className="optionInput"
					/>
				</span>;
				break;
			case 'selectedBox':
				return  <div>
					<Select
							mode="tags"
							placeholder="Inserted are removed"
							value={selectedItems}
							className='selectedBox'
							onChange={this.handleChange}
						
						>
						{filteredOptions.map(item => (
							<Select.Option key={item} value={item}>
								{item}
							</Select.Option>
						))}
					</Select>
				</div>;
				break;
			case 'selectedBoxGender':
				return  <span>
						<Select defaultValue="male" style={{ width: 120 }} onChange={this.handleGenderChange}>
						<Option value="male">男</Option>
						<Option value="female">女</Option>
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
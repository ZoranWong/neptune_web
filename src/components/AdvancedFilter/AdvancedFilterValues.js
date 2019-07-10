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
			type:'timestamp',
			selectedItems: [],
			inputValue:'',
			inputRangeOne:'',
			inputRangeTwo:'',
			gender:'',
			period:'',
			timestamp:''
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.type === undefined) return;
		this.setState({type:nextProps.type+''})
	}
	
	//时间戳发生变化
	onTimestampChange = (date,dateString) =>{
		this.setState({timestamp:dateString});
		this.props.onValueChange(dateString)
	};
	
	// 时间段发生变化
	onPeriodChange = (date,dateString) =>{
		this.setState({period:dateString});
		this.props.onValueChange(dateString)
	};
	
	// 选定下拉标签时
	handleChange = selectedItems => {
		this.setState({ selectedItems });
		this.props.onValueChange(selectedItems)
	};
	
	//性别选择框发生变化
	handleGenderChange = (value) =>{
		this.setState({gender:value});
		this.props.onValueChange(value)
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
						  //showTime={true}
						  locale={locale}
					  />
				</span>;
				break;
			case 'input':
				return  <span>
					<Input
						placeholder="Basic usage"
						className="optionInput"
						value={this.state.inputValue}
						onChange={(e)=>{
							this.setState({inputValue:e.target.value})
						}}
						onBlur={()=>{
							this.props.onValueChange(this.state.inputValue)
						}}
					/>
				</span>;
				break;
			case 'inputRange':
				return  <span className="inputRange">
					<Input
						placeholder="Basic usage"
						className="optionInput"
						value={this.state.inputRangeOne}
						onChange={(e)=>{
							this.setState({inputRangeOne:e.target.value});
						}}
					/>
					<span>-</span>
					<Input
						placeholder="Basic usage"
						className="optionInput"
						value={this.state.inputRangeTwo}
						onChange={(e)=>{
							this.setState({inputRangeTwo:e.target.value});
						}}
						onBlur={()=>{
							this.props.onValueChange([this.state.inputRangeOne,this.state.inputRangeTwo])
						}}
					/>
				</span>;
				break;
			case 'selectedBox':
				return  <span>
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
				</span>;
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
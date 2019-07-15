import React from 'react'
import {DatePicker,Input,Select} from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {regions} from "../../api/common";
import './index.sass'
const { RangePicker } = DatePicker;
const { Option } = Select;

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
export default class AdvancedFilterValues extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			type:'timestamp',
			value:'',
			selectedItems: [],
			inputValue:'',
			inputRangeOne:'',
			inputRangeTwo:'',
			gender:'',
			period:'',
			timestamp:'',
			city:[],
			provinceData:[],
			cityData:[],
			areaData:[]
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.type === undefined) return;
		this.setState({type:nextProps.type+'',value:nextProps.activeKey.value})
	}
	
	componentDidMount() {
		regions({}).then(r=>{
			let cityAry = [];
			r.forEach(item=>{
				cityAry = cityAry.concat(item.children)
			});
			let areaAry=[];
			cityAry.forEach(item=>{
				areaAry = areaAry.concat(item.children)
			});
			this.setState({provinceData:r,cityData:cityAry,areaData:areaAry})
		}).catch(_=>{})
		
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
	
	// 城市选择发生变化
	handleCityChange = (value) =>{
		this.setState({city:value});
		this.props.onValueChange(value)
	};
	handleCityData = () =>{
		if(this.state.value == 'province'){
			return this.state.provinceData
		} else if(this.state.value == 'city'){
			return this.state.cityData
		} else {
			return this.state.areaData
		}
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
			case 'cityBox':
				return  <span>
					<Select
						mode="multiple"
						placeholder="Inserted are removed"
						value={this.state.city}
						className='selectedBox tagBox'
						onChange={this.handleCityChange}
						optionLabelProp="label"
						showSearch
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{this.handleCityData().map(item => (
							<Select.Option
								key={item.region_code+''}
								label={item.name}
								value={item.region_code+''}>
								{item.name}
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
import React from 'react'
import {DatePicker,Input,Select,LocaleProvider} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {regions} from "../../api/common";
import './index.sass'
import {consumerOrder, merchantOrder, refundOrder} from "./orderType";
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
			areaData:[],
			selectedTagItems:[],
			selectedGroupItems:[],
			scrollPage:1,
			selectedChannelItems:[]
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
		}).catch(_=>{});
		
		if(this.props.api){
			if(this.props.api.getStatic){
				this.props.api.getStatic({}).then(r=>{
					this.setState({selectedGroupItems:r.data})
				});
				this.props.api.tags({limit:10,page:1}).then(r=>{
					this.setState({selectedTagItems:r.data})
				});
			} else if(this.props.api.getChannels){
				this.props.api.getChannels({}).then(r=>{
					this.setState({selectedChannelItems:r.data})
				});
				this.props.api.groups({}).then(r=>{
					this.setState({selectedGroupItems:r.data})
				});
			}
		}
	}

	getTagList = (page) =>{
		this.props.api.tags({limit:10,page:page}).then(r=>{
			if(!r.data.length) return;
			this.setState({selectedTagItems:this.state.selectedTagItems})
		})
	};
	
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
	// 下拉框分页加载
	tagScroll = e => {
		e.persist();
		const { target } = e;
		if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
			const { scrollPage } = this.state;
			const nextScrollPage = scrollPage + 1;
			this.setState({ scrollPage: nextScrollPage });
			this.getTagList(nextScrollPage); // 调用api方法
		}
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
		switch (this.state.type) {
			case 'consumerOrder':
				return <Select
					defaultActiveFirstOption={false}
					mode="tags"
					value={selectedItems}
					className='selectedBox'
					onChange={this.handleChange}
					optionLabelProp="label"
					optionFilterProp="children"
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
					{consumerOrder.map(item => (
						<Select.Option key={item.key} label={item.name} value={item.key}>
							{item.name}
						</Select.Option>
					))}
				</Select>;
			break;
			case 'consumerOrderEqual':
				return <Select
					defaultActiveFirstOption={false}
					value={selectedItems}
					className='selectedBox'
					onChange={this.handleChange}
					optionLabelProp="label"
					optionFilterProp="children"
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
					{consumerOrder.map(item => (
						<Select.Option key={item.key} label={item.name} value={item.key}>
							{item.name}
						</Select.Option>
					))}
				</Select>;
				break;
			case 'merchantOrder':
				return <Select
					defaultActiveFirstOption={false}
					mode="tags"
					value={selectedItems}
					className='selectedBox'
					onChange={this.handleChange}
					optionLabelProp="label"
					optionFilterProp="children"
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
					{merchantOrder.map(item => (
						<Select.Option key={item.key} label={item.name} value={item.key}>
							{item.name}
						</Select.Option>
					))}
				</Select>;
			break;
			case 'merchantOrderEqual':
				return <Select
					defaultActiveFirstOption={false}
					value={selectedItems}
					className='selectedBox'
					onChange={this.handleChange}
					optionLabelProp="label"
					optionFilterProp="children"
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
				>
					{merchantOrder.map(item => (
						<Select.Option key={item.key} label={item.name} value={item.key}>
							{item.name}
						</Select.Option>
					))}
				</Select>;
				break;
			case 'timestamp':
				return <span>
					<LocaleProvider locale={zh_CN}>
						<DatePicker
							onChange={this.onTimestampChange}
							placeholder="请选择日期"
							showToday={false}
						/>
					</LocaleProvider>
				</span>;
				break;
			case 'period':
				return <span>
					<LocaleProvider locale={zh_CN}>
						<RangePicker
							onChange={this.onPeriodChange}
							//showTime={true}
						/>
					</LocaleProvider>
					
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
							defaultActiveFirstOption={false}
							mode="tags"
							value={selectedItems}
							className='selectedBox'
							onChange={this.handleChange}
							optionLabelProp="label"
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						
						>
						{OPTIONS.map(item => (
							<Select.Option key={item} label={item} value={item}>
								{item}
							</Select.Option>
						))}
					</Select>
				</span>;
				break;
			case 'selectedOneBox':
				return  <span>
					<Select
						defaultActiveFirstOption={false}
						mode="tags"
						value={selectedItems}
						className='selectedBox'
						onChange={this.handleChange}
						allowClear
						optionLabelProp="label"
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					
					>
						{this.state.selectedChannelItems.map(item => (
							<Select.Option key={item} label={item} value={item}>
								{item}
							</Select.Option>
						))}
					</Select>
				</span>;
				break;
			case 'selectedChannelOneBox':
				return <span>
					<Select
						defaultActiveFirstOption={false}
						value={selectedItems}
						className='selectedBox tagBox'
						onChange={this.handleChange}
						optionLabelProp="label"
						allowClear
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{this.state.selectedChannelItems.map(item => (
							<Select.Option key={item.id+""} label={item.name} value={item.id+''}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</span>;
				break;
			case 'selectedChannelBox':
				return <span>
					<Select
						defaultActiveFirstOption={false}
						mode="tags"
						value={selectedItems}
						className='selectedBox tagBox'
						onChange={this.handleChange}
						optionLabelProp="label"
						allowClear
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{this.state.selectedChannelItems.map(item => (
							<Select.Option key={item.id+""} label={item.name} value={item.id+''}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</span>;
				break;
			case 'selectedTagBox':
				return  <span>
					<Select
						defaultActiveFirstOption={false}
						mode="tags"
						value={selectedItems}
						className='selectedBox tagBox'
						onChange={this.handleChange}
						onPopupScroll={this.tagScroll}
						allowClear
						optionLabelProp="label"
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{this.state.selectedTagItems.map(item => (
							<Select.Option key={item.id+''} label={item.name} value={item.id+''}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</span>;
				break;
			case 'selectedGroupBox':
				return  <span>
					<Select
						defaultActiveFirstOption={false}
						mode="tags"
						value={selectedItems}
						className='selectedBox tagBox'
						onChange={this.handleChange}
						optionLabelProp="label"
						allowClear
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{this.state.selectedGroupItems.map(item => (
							<Select.Option key={item.id+""} label={item.name} value={item.id+''}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</span>;
				break;
			case 'cityBox':
				return  <span>
					<Select
						defaultActiveFirstOption={false}
						mode="multiple"
						value={this.state.city}
						className='selectedBox tagBox'
						onChange={this.handleCityChange}
						optionLabelProp="label"
						showSearch
						optionFilterProp="children"
						allowClear
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
			case 'cityOneBox':
				return  <span>
					<Select
						defaultActiveFirstOption={false}
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
							<Select
								defaultActiveFirstOption={false}
								placeholder="请选择性别"
								style={{ width: 120 }}
								onChange={this.handleGenderChange}>
								<Option value="1">男</Option>
								<Option value="2">女</Option>
								<Option value="0">无</Option>
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

import React from 'react'
import {DatePicker,Input,Select} from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {operation} from "../../utils/user_fields";
import './index.sass'
import {regions} from "../../api/common";
import {getStatic, tags} from "../../api/user";
const { RangePicker } = DatePicker;


const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
export default class AdvancedFilterValuesDisabled extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			activeKey:'',
			type:'',
			value:'',
			gender:'',
			period:'',
			timestamp:'',
			city:[],
			provinceData:[],
			cityData:[],
			areaData:[],
			selectedTagItems:[],
			selectedGroupItems:[],
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
	handleCityData = () =>{
		let ary = [];
		ary = ary.concat(this.state.provinceData);
		ary = ary.concat(this.state.cityData);
		ary = ary.concat(this.state.areaData);
		return ary
	};
	
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
		getStatic({}).then(r=>{
			this.setState({selectedGroupItems:r.data})
		});
		tags({limit:100,page:1}).then(r=>{
			console.log(r.data);
			this.setState({selectedTagItems:r.data})
		})
	}
	renderTree = () =>{
		const {Option} = Select;
		const { selectedItems } = this.state;
		switch (this.state.type) {
			case 'timestamp':
				return <span>
					<DatePicker
						placeholder="请选择日期"
						showToday={false}
						value={this.state.activeKey}
					/>
				</span>;
				break;
			case 'period':
				return <span>
					  <RangePicker
						  //showTime={true}
						  locale={locale}
						  value={this.state.activeKey}
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
			case 'selectedTagBox':
				return  <span>
					<Select
						disabled={true}
						value={this.state.activeKey+''}
						className='selectedBox'
					>
						{this.state.selectedTagItems.map(item => (
							<Select.Option key={item.id} value={item.id+''}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</span>;
				break;
			case 'selectedGroupBox':
				return  <span>
					<Select
						disabled={true}
						value={this.state.activeKey}
						className='selectedBox'
					>
						{this.state.selectedGroupItems.map(item => (
							<Select.Option key={item.id} value={item.id+''}>
								{item.name}
							</Select.Option>
						))}
					</Select>
				</span>;
				break;
			case 'cityBox':
				return  <span>
					<Select
						disabled={true}
						value={this.state.activeKey}
						className='selectedBox tagBox'
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
							<Select value={this.state.activeKey} disabled={true} style={{ width: 120 }}>
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
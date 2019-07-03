import React from 'react';
import {Select,Switch } from 'antd';
import './index.sass'
const { Option } = Select;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
	Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
	Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

export default class SingleLine extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cities: cityData[provinceData[0]],
			secondCity: cityData[provinceData[0]][0]
		};
	};
	
	handleProvinceChange = value => {
		this.setState({
			cities: cityData[value],
			secondCity: cityData[value][0],
		});
	};
	
	onSecondCityChange = value => {
		this.setState({
			secondCity: value,
		});
	};
	

	
	
	render(){
		const { cities } = this.state;
		return (
			<div className="singleBox">
				<div style={{width:"100%"}} className="selectChild">
					<Select
						defaultValue={provinceData[0]}
						style={{ width: 120 }}
						onChange={this.handleProvinceChange}
					>
						{provinceData.map(province => (
							<Option key={province}>{province}</Option>
						))}
					</Select>
					<Select
						style={{ width: 120 }}
						value={this.state.secondCity}
						onChange={this.onSecondCityChange}
					>
						{cities.map(city => (
							<Option key={city}>{city}</Option>
						))}
					</Select>
				</div>
				<Switch checkedChildren="且" unCheckedChildren="或" defaultChecked />
				{
					this.props.groupAry&&this.props.singleAry?(
						<i
							className="iconfont"
							style={{'display':(this.props.singleAry.length >1||this.props.groupAry.length >1) ?'block':'none'}}
						>&#xe82a;</i>
					):''
				}
				
			</div>
			
		)
	}
}
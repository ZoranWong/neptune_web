import './Address.sass'
import React from "react";
import { Select } from 'antd';
import {regions} from '../../api/common'
import _ from 'lodash'
const { Option } = Select;
export default class Address extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			province:[],
			activeProvince: '',
			cities: [],
			activeCity: '',
			area: [],
			activeArea: '',
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.defaultData['area_code'] === this.props.defaultData['area_code']) return;
		let data = nextProps.defaultData;
		console.log(data, ',................................');
		let isEmpty = _.isEmpty(data);
		let p = [];
		_.map(data, (item)=>{
			p.push(parseInt(item))
		});
		regions({}).then(r=>{
			this.setState({
				province:r,
				cities:r[0].children,
				area:r[0].children[0].children,
				activeProvince:r[0].region_code,
				activeCity:r[0].children[0].region_code,
				activeArea:r[0].children[0].children[0].region_code
			});
			if(!isEmpty){
				this.handleProvinceChange(p[0]);
				this.onSecondCityChange(p[1]);
				this.onAreaChange(p[2])
			}
		}).catch(_=>{})
	}
	
	componentWillMount() {
	
	}
	
	handleProvinceChange = value => {
		const {province} = this.state;
		let cities = province.filter(item=>{
			return item.region_code == value
		});
		if(!cities[0].children.length){
			this.setState({
				activeProvince:cities[0].region_code,
				cities:[],
				area:[]
			});
			return;
		}
		this.setState({
			activeProvince:cities[0].region_code,
			cities:cities[0].children,
			activeCity:cities[0].children[0].region_code,
			activeArea:cities[0].children[0].children[0].region_code,
			area:cities[0].children[0].children,
		});
		
	};
	onSecondCityChange = value => {
		const {cities} = this.state;
		let areas = cities.filter(item=>{
			return item.region_code == value
		});
		if(!areas[0].children.length){
			this.setState({
				activeProvince:areas[0].region_code,
				cities:[],
				area:[]
			});
			return;
		}
		this.setState({
			activeCity:areas[0].region_code,
			area:areas[0].children,
			activeArea:areas[0].children[0].region_code
		});
	};
	onAreaChange = (value) =>{
		const {area} = this.state;
		let areas = area.filter(item=>{
			return item.region_code == value
		});
		this.setState({
			activeArea:areas[0].region_code
		});
	};
	
	
	render() {
		const { cities } = this.state;
		return (
			<div className="selectedAddress">
				{
					this.state.province && this.state.province.length?(
						<div className="select_addr">
							<Select
								value={this.state.activeProvince}
								style={{ width: 80,marginLeft:0 }}
								onChange={this.handleProvinceChange}
								defaultActiveFirstOption={false}
							>
								{this.state.province.map(item => (
									<Option key={item.region_code } value={item.region_code}>{item.name}</Option>
								))}
							</Select>
							<Select
								style={{ width: 80,display:this.state.cities.length?'inline-block':'none' }}
								value={this.state.activeCity}
								onChange={this.onSecondCityChange}
								defaultActiveFirstOption={false}
							>
								{this.state.cities.map(city => (
									<Option key={city.region_code} value={city.region_code}>{city.name}</Option>
								))}
							</Select>
							<Select
								style={{ width: 80,display:this.state.area.length?'inline-block':'none' }}
								value={this.state.activeArea}
								onChange={this.onAreaChange}
								defaultActiveFirstOption={false}
							>
								{this.state.area.map(area => (
									<Option key={area.region_code} value={area.region_code}>{area.name}</Option>
								))}
							</Select>
						</div>
					):'暂无数据'
				}
				
			</div>
		);
	}
}


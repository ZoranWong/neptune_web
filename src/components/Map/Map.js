import { Map,Marker} from "react-amap";
import React from 'react'
import './map.sass'
import {Input, Modal} from "antd";
export default class CustomMap extends React.Component{
	constructor(props) {
		super(props);
		this.mapPlugins = ['ToolBar','MapType'];
		this.state = {
			markerPosition:{
				longitude: 117.227355,
				latitude: 31.820621,
			},
			searchContent:'安徽省合肥市政府',
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.position) return;
		this.setState({markerPosition:{...this.state.markerPosition,longitude:nextProps.position.lng,latitude:nextProps.position.lat},searchContent:''})
	}
	
	
	
	placeSearch = (e) => {
		this.setState({searchContent:e})
	};
	
	handleCancel = () =>{
		this.props.hideMap()
	};
	
	handleSubmit = ()=>{
		this.props.handleLocation(this.state.searchContent,this.state.markerPosition);
		this.handleCancel();
	};
	
	
	render() {
		const events = {
			created: (ins) => {
				let auto;
				let geocoder;
				window.AMap.plugin('AMap.Autocomplete',() => {
					auto = new window.AMap.Autocomplete({input:'SearchInput'});
				});
				window.AMap.plugin(["AMap.Geocoder"],function(){
					geocoder= new window.AMap.Geocoder({
						radius:1000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
						extensions: "all"//返回地址描述以及附近兴趣点和道路信息，默认"base"
					});
				});
				window.AMap.plugin('AMap.PlaceSearch', () => {
					let place = new window.AMap.PlaceSearch({});
					let self = this;
					window.AMap.event.addListener(auto, "select", (e) => {
						place.search(e.poi.name);
						geocoder.getAddress(e.poi.position, function (status, result) {
							if (status === 'complete' && result.regeocode) {
								let address = result.regeocode.aois[0].name;
								let data = result.regeocode.addressComponent;
								let name = data.township + data.street + data.streetNumber;
								 self.setState({
									markerPosition:
										{...self.state.markerPosition,
											longitude:e.poi.location.lng,
											latitude:e.poi.location.lat,
										},
									searchContent:address
								})
							}
						})
					})
				})
				
			},
			click: (e) => {
				let geocoder;
				let self = this;
				window.AMap.plugin(["AMap.Geocoder"],function(){
					geocoder= new window.AMap.Geocoder({
						radius:1000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
						extensions: "all"//返回地址描述以及附近兴趣点和道路信息，默认"base"
					});
				});
				geocoder.getAddress(e.lnglat, function (status, result) {
					console.log(status, result);
					if (status === 'complete' && result.regeocode) {
						let address = result.regeocode.formattedAddress;
						let data = result.regeocode.addressComponent;
						let name = data.township + data.street + data.streetNumber;
						self.setState({
							markerPosition:
								{...self.state.markerPosition,
									longitude:e.lnglat.lng,
									latitude:e.lnglat.lat,
								},
							searchContent:address
						})
					}
				});
				this.setState({markerPosition:{...this.state.markerPosition,longitude:e.lnglat.lng,latitude:e.lnglat.lat},searchContent:''})
			},
		};
		return (
			<div>
				<Modal
					title="选择位置"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确认"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="map_position">
						<Input
							id="SearchInput"
							placeholder="请输入地名搜索"
							value={this.state.searchContent}
							onKeyDown={(e) => this.searchPlace(e)}
							onChange={(e)=>{
								this.placeSearch(e.target.value)
							}}
						/>
						<div className="position_data">
							<div>
								经度
								<Input
									value={this.state.markerPosition.longitude}
									onChange={(e)=>{
										if(!e.target.value.length) return;
										this.setState({markerPosition:{...this.state.markerPosition,longitude:e.target.value}})
									}}
								/>
							</div>
							<div>
								纬度
								<Input
									value={this.state.markerPosition.latitude}
									onChange={(e)=>{
										if(!e.target.value.length) return;
										this.setState({markerPosition:{...this.state.markerPosition,latitude:e.target.value}})
									}}
								/>
							</div>
						</div>
						
					</div>
					<div id="app">
						<Map
							amapkey="fd248e6677dd92df77bf4a9a1a502d57"
							plugins={this.mapPlugins}
							events={events}
							center={ [ this.state.markerPosition.longitude,this.state.markerPosition.latitude] }
						>
							<Marker
								position={this.state.markerPosition}
								title={this.state.searchContent}
							/>
						</Map>
					</div>
				</Modal>
			</div>
			
		)
	}
}
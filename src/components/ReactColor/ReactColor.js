import React from "react";
import {Button,Icon} from "antd";
import { SketchPicker } from 'react-color';
import './css/index.sass'
export default class ReactColor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: props.defaultColor || '#666',
			displayColorPicker: "none",
		};
	}
	
	componentDidMount() {
		document.addEventListener('click', this.close);
	}
	
	stay = e =>{
		e.nativeEvent.stopImmediatePropagation();
	};
	
	close = () =>{
		this.setState({displayColorPicker:'none'});
	};
	
	handleClick = ()=> {
		let {displayColorPicker} =this.state;
		displayColorPicker = displayColorPicker === "none"?"block":"none";
		this.setState({displayColorPicker});
	};
	handleChange = (value)=>{
		let color = value.hex;
		this.setState({color});
		this.props.colorChange(color);
	};
	render() {
		let {color,displayColorPicker} = this.state;
		return (
			<div className="reactColor" onClick={this.stay}>
				<Button onClick={ this.handleClick } size="small" style={{background:color}}>
					<Icon type="down" />
				</Button>
				<div style={{position:"absolute",zIndex:66,display:displayColorPicker}}>
					<SketchPicker  color={this.state.color}  onChange={this.handleChange} />
				</div>
			</div>
		);
	}
}
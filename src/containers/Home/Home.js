import React from 'react';
import {withRouter} from 'react-router-dom'
import {Input,Tag,Select,} from 'antd'
import './1.sass'


class Home extends React.Component{
	state = {
		selectedItems: [],
	};
	componentDidMount() {
	
	}
	
	handleChange = selectedItems => {
		this.setState({ selectedItems });
	};
	render(){
		const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
		const { selectedItems } = this.state;
		const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
		return (
			<Select
				defaultActiveFirstOption={false}
				mode="multiple"
				className="home"
				placeholder="Inserted are removed"
				value={selectedItems}
				onChange={this.handleChange}
				style={{ width: '100%',height:'28px' }}
			>
				{filteredOptions.map(item => (
					<Select.Option key={item} value={item}>
						{item}
					</Select.Option>
				))}
			</Select>
		);
	}
}
export default withRouter(Home)
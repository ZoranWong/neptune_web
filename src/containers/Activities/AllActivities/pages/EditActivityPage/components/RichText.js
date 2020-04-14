import React, {Component, Fragment} from 'react';


class RichText extends Component {

	constructor(props) {
		super(props);
		this.state = {
			details: ''
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.details) return;
		this.setState({details: nextProps.details})
	}


	operation = () => {
		this.props.onChange('RICH_TEXT')
	};
	
	render() {
		return (
			<Fragment>
				{
					this.state.details ? <div onClick={this.operation} dangerouslySetInnerHTML={{
						__html: this.state.details
					}}/> : <div className='images' onClick={this.operation}>
						<i
							style={{color:'#4F9863',fontSize:'24px'}}
							className="iconfont"
						>&#xe7a0;</i>
						<div className="ant-upload-text" style={{fontSize:'12px'}}>点击编写富文本</div>
					</div>
				}
			</Fragment>
		);
	}
}

export default RichText;

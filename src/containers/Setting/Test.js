import React from 'react'
import { Modal, Button } from 'antd';
import './css/common.sass'
class Test  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			ModalText: 'Content of the modal',
			confirmLoading: false,
		};
	}
	
	
	
	handleOk = () => {
		this.setState({
			ModalText: 'The modal will be closed after two seconds',
			confirmLoading: true,
		});
		setTimeout(() => {
			this.props.onSubmit();
			this.setState({
				confirmLoading: false,
			});
		}, 2000);
	};
	
	handleCancel = () => {
		this.props.onCancel()
	};
	
	render() {
		const {  confirmLoading, ModalText } = this.state;
		return (
			<div>
				
				<Modal
					title="Title"
					visible={this.props.visible}
					onOk={this.handleOk}
					confirmLoading={confirmLoading}
					onCancel={this.handleCancel}
					okButtonProps={{className:'subBtn optBtn'}}
					cancelButtonProps={{className:'canBtn optBtn'}}
				>
					<p>{ModalText}</p>
				</Modal>
			</div>
		);
	}
}
export default Test
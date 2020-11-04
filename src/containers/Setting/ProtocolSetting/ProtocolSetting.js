import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Table,} from "antd";
import './css/AppVersion.sass'
class ProtocolSetting extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			versions : [],
			type: 0,
			version: '',
			desc: '',
			platform: 'IOS',
			appUrl: '',
			uploadType: 'ID'
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
	}
	
	create = () => {
		this.props.history.push({pathname:"/setting/editProtocol"})
	};
	
	
	render(){
		const columns = [
			{
				title: '版本号',
				dataIndex: 'version'
			},
			{
				title: '资源包地址',
				dataIndex: 'resource_url',
			},
			{
				title: '版本平台',
				dataIndex: 'platform',
				render: (text, record) => (
					<span>{text === 'ANDROID'? '安卓': 'IOS' }</span>
				)
			},
			{
				title: '创建时间',
				dataIndex: 'created_at',
			},
		];
		return (
			<div className='protocol_setting'>
				<Button size='small' onClick={this.create}>新建</Button>
				<div className="chart u_chart">
					<Table
						columns={columns}
						rowKey={record => record.id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.versions}
					/>
				</div>
			</div>
		)
	}
}
export default withRouter(ProtocolSetting)

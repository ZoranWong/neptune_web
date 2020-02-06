import React from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Input, Table, Radio, message} from "antd";
import {packages,newPackages} from "../../../api/appVersion";
import './css/AppVersion.sass'
import UploadApp from "./components/UploadApp";
class AppVersionSetting extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			versions : [],
			type: 0,
			version: '',
			desc: '',
			platform: 'IOS'
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.refresh()
	}
	
	refresh = () =>{
		packages({}).then(r=>{
			this.setState({versions: r.data})
		}).catch(_=>{})
	};
	
	onRadioChange = e =>{
		this.setState({type: e.target.value})
	};
	
	onPlatformChange = e => {
		this.setState({platform: e.target.value})
	};
	
	check = () =>{
		let {state} = this;
		if (!state.version) {
			message.error('请填写版本号');
			return
		}
		if (!this.child.current.state.resource_id) {
			message.error('请上传资源包');
			return
		}
		if (!state.desc) {
			message.error('请填写APP描述');
			return
		}
		this.submit(state.version,this.child.current.state.resource_id,state.type,state.desc,state.platform)
	};
	
	submit = (version, resource_id, type, desc, platform) =>{
		newPackages({
			version,
			resource_id,
			type,
			desc,
			platform
		}).then(r=>{
			message.success('新建APP版本成功');
			this.setState({
				type: 0,
				version: '',
				desc: '',
				platform: 'IOS'
			},()=>{
				this.child.current.remove();
				this.refresh();
			})
		}).catch(_=>{})
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
				title: '创建时间',
				dataIndex: 'created_at',
			},
		];
		return (
			<div className='app_version'>
				<div className="new_app_version">
					<div className="app_header">
						新建
						<Button type='primary' size='small' onClick={this.check}>保存</Button>
					</div>
					<div className="app_body">
						<div className="setting_item">
							<span>
								<h5>版本号:</h5>
								<Input
									value={this.state.version}
									onChange={(e)=>{
										this.setState({version: e.target.value})
									}}
								/>
							</span>
							<span>
								<h5>资源包：</h5>
								<UploadApp ref={this.child} />
							</span>
							<span>
								<h5>资源包类型：</h5>
								<Radio.Group onChange={this.onRadioChange} value={this.state.type}>
									<Radio value={0}>补丁</Radio>
									<Radio value={1}>非补丁</Radio>
							  	</Radio.Group>
							</span>
							<span>
								<h5>资源包平台：</h5>
								<Radio.Group onChange={this.onPlatformChange} value={this.state.platform}>
									<Radio value='IOS'>IOS端</Radio>
									<Radio value='ANDROID'>安卓端</Radio>
							  	</Radio.Group>
							</span>
							<span>
								<h5>APP版本描述：</h5>
								<Input
									value={this.state.desc}
									onChange={(e)=>{
										this.setState({desc: e.target.value})
									}}
								/>
							</span>
						</div>
					</div>
				</div>
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
export default withRouter(AppVersionSetting)

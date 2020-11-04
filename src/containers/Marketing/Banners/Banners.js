import React, {Component} from 'react';
import {Button, message, Modal, Select, Table,Switch} from "antd";
import BannerSetting from "./Modal/BannerSetting";
import {banners, deleteBanner,enableBanner,disableBanner} from "../../../api/marketing/banners";
import './css/index.sass'
import {searchJson} from "../../../utils/dataStorage";
class Banners extends Component {
	constructor(props) {
		super(props);
		this.state = {
			banners: [],
			settingVisible: false,
			banner: {},
			state: null,
			scene: null
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.refresh();
	};
	
	refresh = () => {
		banners({}).then(r=>{
			this.setState({banners: r.data})
		}).catch(_=>{})
	};
	
	paginationChange = (list)=>{
		this.setState({banners:list})
	};
	
	createNewBanner = () =>{
		this.setState({settingVisible: true,banner: {}})
	};
	
	editBanner = (record) =>{
		this.setState({settingVisible: true,banner: record})
	};
	
	closeModal = () =>{
		this.setState({settingVisible: false})
	};
	
	
	deleteBanner = id => {
		let refresh = this.refresh;
		let confirmModal = Modal.confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			content: (
				<div className="U_confirm">
					确定删除该活动banner么？
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small'
			},
			onOk() {
				// 确定按钮执行操作
				deleteBanner({},id).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			}
		});
	};
	
	handleChange = (type,e) => {
		this.setState({[type]: e}, ()=>{
			console.log(e);
			console.log(this.state, '...');
		})
	};
	
	search = () => {
		let {scene,state} = this.state;
		let params = {};
		if (!state && state !== false) {
			if (scene) {
				params = {
					scene
				}
			} else {
				params = {}
			}
		} else {
			if (scene) {
				params = {
					scene,
					is_active: state
				}
			} else {
				params = {
					is_active: state
				}
			}
			
		}
		banners({searchJson: searchJson(params)}).then(r=>{
			this.setState({banners: r.data})
		}).catch(_=>{})
	};
	
	// 开关
	onSwitchChange = (e, record) => {
		console.log(e);
		console.log(record);
		let api = e ? enableBanner : disableBanner;
		let text = e ? '启用' : '禁用';
		api({},record.id).then(r=>{
			message.success(`${text}Banner成功`);
			this.search()
		}).catch(_=>{})
	};
	
	
	render() {
		const columns = [
			{
				title: '标题',
				dataIndex: 'title',
			},
			{
				title: '使用场景',
				dataIndex: 'scene_desc',
			},
			{
				title: '简介',
				dataIndex: 'synopsis',
			},
			{
				title: '图片',
				dataIndex: 'image',
				render: (text, record) => (
					<img src={text} className='tableImage' alt=""/>
				)
			},
			{
				title: '是否可跳转',
				dataIndex: 'can_jump',
				render: (text,record) => (
					<span>{text ? '是' : '否'}</span>
				)
			},
			{
				title: '跳转类型',
				dataIndex: 'action_type',
				render: (text,record)=>{
					if (record['can_jump']) {
						return text === 'PRODUCT_DETAIL'? '商品详情' : '网址链接'
					} else {
						return '无'
					}
				}
			},
			{
				title: '跳转地址',
				dataIndex: 'action_link',
				render: (text,record)=>{
					return record['can_jump'] ? text : '无'
				}
			},
			{
				title: '序号',
				dataIndex: 'sort',
			},
			{
				title: '状态',
				dataIndex: 'is_active',
				render: (text,record) => (
					<span>{text ? '已使用' : '未使用'}</span>
				)
			},
			{
				title: '开关',
				render: (text,record) => (
					<Switch checked={record['is_active']} onChange={(e)=>this.onSwitchChange(e,record)} />
				)
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer','marginRight' : '10px'}}
							onClick={()=>this.editBanner(record)}
						>编辑
						</span>
						{
							!record['is_active'] && <span
								style={{'color':'#4F9863','cursor':'pointer'}}
								onClick={()=>this.deleteBanner(record.id)}
							>删除
						</span>
						}
					</div>
			},
		];
		
		const scene = [
			{name: '通用首页',value: 'GENERAL_INDEX'},
			{name: '小程序首页',value: 'WECHAT_MINIPROGRAM_INDEX'},
			{name: 'APP商户首页',value: 'APP_INDEX_MERCHANT'},
			{name: 'APP分销员首页',value: 'APP_INDEX_DISTRIBUTOR'}
		];
		
		const state = [
			{name: '已使用', value: true},
			{name: '未使用', value: false}
		];
		
		const bannerSettingProps = {
			visible: this.state.settingVisible,
			banner: this.state.banner,
			onclose : this.closeModal,
			actId: this.state.actId,
			refresh: this.refresh
		};
		
		return (
			<div className='bannerSetting'>
				<BannerSetting {...bannerSettingProps} />
				
				<div className="chart">
					<Button className="addNew" onClick={this.createNewBanner}>
						<i className="iconfont">&#xe7e0;</i>
						新增Banner</Button>
					
					<div className="searchSelect">
						<Select
							defaultActiveFirstOption={false}
							value={this.state.scene}
							onChange={(e)=>this.handleChange('scene',e)}
							optionLabelProp="label"
							allowClear
							placeholder='请选择使用场景'
						>
							{scene.map(item => (
								<Select.Option key={item.value} label={item.name}  value={item.value}>
									{item.name}
								</Select.Option>
							))}
						</Select>
						<Select
							defaultActiveFirstOption={false}
							value={this.state.state}
							onChange={(e)=>this.handleChange('state',e)}
							optionLabelProp="label"
							allowClear
							placeholder='请选择状态'
						>
							{state.map(item => (
								<Select.Option  key={item.value} label={item.name}  value={item.value}>
									{item.name}
								</Select.Option>
							))}
						</Select>
						<span style={{color: '#4f9863', fontSize: '12px', cursor: 'pointer'}} onClick={this.search}>筛选</span>
					</div>
					
					<Table
						dataSource={this.state.banners}
						rowKey={record => record.id}
						pagination={false}
						columns={columns}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
					>
					
					</Table>
				</div>
			</div>
		);
	}
}

export default Banners;

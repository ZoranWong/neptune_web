import React, {Component} from 'react';
import {Button, Input, message, Modal, Switch, Select} from "antd";
import CustomUpload from "../../../../components/Upload/Upload";
import '../css/index.sass';
import {createNewBanner, editNewBanner} from "../../../../api/marketing/banners";
const {Option} = Select;
class BannerSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canJump: false,
			isActive: true,
			jumpUrl: '',
			text: '新建',
			defaultImg: '',
			title: '',
			synopsis: '',
			sort: ''
		};
		this.banner = React.createRef();
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if (!nextProps.banner.id) {
			this.setState({
				canJump: false,
				jumpType: '',
				jumpUrl: '',
				defaultImg: '',
				title: '',
				synopsis: '',
				sort: '',
				isActive: true,
				scene: 'WECHAT_MINIPROGRAM_INDEX'
			})
		} else {
			console.log(nextProps);
			this.setState({
				text: '编辑',
				title: nextProps.banner['title'],
				synopsis: nextProps.banner['synopsis'],
				canJump: nextProps.banner['can_jump'],
				jumpType: nextProps.banner['action_type'],
				jumpUrl: nextProps.banner['action_link'] || '',
				defaultImg: nextProps.banner['image'],
				sort: nextProps.banner['sort'],
			})
		}
	}
	
	handleCancel = () =>{
		this.props.onclose()
	};
	
	handleSubmit = () => {
		let banner = this.banner.current.state.imgUrl || this.banner.current.state.imageUrl;
		let {canJump, jumpType, jumpUrl, title, synopsis, sort} = this.state;
		if (!title) {
			message.error('请先填写轮播标题');
			return
		}
		if (title.length < 5) {
			message.error('轮播图标题长度必须大于5');
			return
		}
		if (!synopsis) {
			message.error('请先填写轮播简介');
			return
		}
		if (!banner) {
			message.error('请先上传轮播图片');
			return
		}
		if (canJump) {
			if (!jumpUrl) {
				message.error('请填写轮播图跳转链接');
				return
			}
		}
		if (!sort) {
			message.error('请先填写轮播序号');
			return
		}
		this.operateBanner(title, synopsis,banner,canJump,jumpUrl,sort );
	};
	
	operateBanner = (title, synopsis, image, can_jump, action_link, sort) => {
		let api = this.props.banner.id ? editNewBanner : createNewBanner;
		let id = this.props.banner.id ? this.props.banner.id : this.props.actId;
		api({
			title,
			synopsis,
			sort,
			scene: 'WECHAT_MINIPROGRAM_INDEX',
			action_type: 'INSIDE_WECHAT_MINIPROGRAM',
			is_active: this.state.isActive,
			image,can_jump,action_link
		},id).then(r=>{
			message.success(r.message);
			this.handleCancel();
			this.props.refresh();
		}).catch(_=>{})
	};
	
	changeCanJump = (e) =>{
		this.setState({canJump: e})
	};
	changeIsActive = (e) =>{
		this.setState({isActive: e})
	};
	
	inputChange = (e, type) => {
		this.setState({[type]: e.target.value})
	};
	
	handleSceneChange = (e) => {
		this.setState({scene: e})
	}
	
	
	render() {
		let img = (this.props.banner && this.props.banner['image']) || this.state.defaultImg;
		console.log(img);
		return (
			<div>
				<Modal
					title={this.state.text}
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					footer={
						<div>
							<Button
								size="small"
								onClick={this.handleCancel}
								type="default">取消</Button>
							<Button
								size="small"
								onClick={this.handleSubmit}
								type="primary">保存</Button>
						</div>
					}
				>
					<ul className="mainUl">
						<li className="normalLi imgLi">
							<span className="left c_left">标题</span>
							<Input className="liInput" type="text" value={this.state.title} onChange={(e)=>this.inputChange(e, 'title')} />
						</li>
						<li className="normalLi imgLi">
							<span className="left">使用场景</span>
							<Select value={this.state.scene} onChange={this.handleSceneChange}>
								{/*<Option value="GENERAL_INDEXL">网址，链接</Option>*/}
								<Option value="WECHAT_MINIPROGRAM_INDEX">小程序首页</Option>
							</Select>
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">简介</span>
							<Input className="liInput" type="text" value={this.state.synopsis} onChange={(e)=>this.inputChange(e, 'synopsis')}/>
						</li>
						<li className="normalLi imgLi">
							<span className="left c_left">banner图片</span>
							<CustomUpload ref={this.banner} defaultImg={img} />
						</li>
						<li className='bannerSwitch'>
							<span className="left">是否可跳转</span>
							<Switch checked={this.state.canJump} onChange={this.changeCanJump} />
						</li>
						{
							this.state.canJump && <li>
								<span className="left">跳转地址</span>
								<Input
									className="liInput"
									value={this.state.jumpUrl}
									onChange={(e)=>{
										this.setState({jumpUrl: e.target.value})
									}}
								/>
							</li>
						}
						<li className='bannerSwitch'>
							<span className="left">是否使用</span>
							<Switch checked={this.state.isActive} onChange={this.changeIsActive} />
						</li>
						<li className='bannerSwitch'>
							<span className="left">排序</span>
							<Input className="liInput" type="number" value={this.state.sort} onChange={(e)=>this.inputChange(e, 'sort')} />
						</li>
					</ul>
				</Modal>
			</div>
		);
	}
}

export default BannerSetting;

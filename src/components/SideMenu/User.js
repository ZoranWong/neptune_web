import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'

const mockList = ['nav-user-manage','nav-user-taps','nav-user-groups','nav-user-membership','nav-user-integralRules'];
const baseMenu = [
	{
		path:'/user',
		icon:'&#xe7d4;',
		text:'用户管理',
		name:'nav-user-manage'
	},
	{
		path:'/user/tagManage',
		icon:'&#xe7d4;',
		text:'标签管理',
		name:'nav-user-taps'
	},
	{
		path:'/user/groupManage',
		icon:'&#xe7d4;',
		text:'群组管理',
		name:'nav-user-groups'
	},
	{
		path:'/user/integralRules',
		icon:'&#xe7d4;',
		text:'积分规则',
		name:'nav-user-integralRules'
	},
	{
		path:'/user/membership',
		icon:'&#xe7d4;',
		text:'会员等级',
		name:'nav-user-membership'
	}
];
const User = ({ match }) => (
	<div style={{ paddingBottom: '120px' ,width:'216px'}}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			{
				baseMenu.map(item=>{
					if(mockList.indexOf(item.name) > -1){
						return (
							<Menu.Item key={item.path}>
								<Link to={item.path}>
									<Icon type="home" />
									<span>{item.text}</span>
								</Link>
							</Menu.Item>
						)
					}
				})
			}
			{/*<Menu.Item key="/user">*/}
			{/*	<Link to="/user">*/}
			{/*		<Icon type="home" />*/}
			{/*		<span>用户管理</span>*/}
			{/*	</Link>*/}
			{/*</Menu.Item>*/}
			{/*<Menu.Item key="/user/tagManage">*/}
			{/*	<Link to="/user/tagManage">*/}
			{/*		<Icon type="home" />*/}
			{/*		<span>标签管理</span>*/}
			{/*	</Link>*/}
			{/*</Menu.Item>*/}
			{/*<Menu.Item key="/user/groupManage">*/}
			{/*	<Link to="/user/groupManage">*/}
			{/*		<Icon type="home" />*/}
			{/*		<span>群组管理</span>*/}
			{/*	</Link>*/}
			{/*</Menu.Item>*/}
			{/*<Menu.Item key="/user/consumerBehavior">*/}
			{/*	<Link to="/user/consumerBehavior">*/}
			{/*		<Icon type="home" />*/}
			{/*		<span>消费行为分析</span>*/}
			{/*	</Link>*/}
			{/*</Menu.Item>*/}
			{/*<Menu.Item key="/user/integralRules">*/}
			{/*	<Link to="/user/integralRules">*/}
			{/*		<Icon type="home" />*/}
			{/*		<span>积分规则</span>*/}
			{/*	</Link>*/}
			{/*</Menu.Item>*/}
			{/*<Menu.Item key="/user/membership">*/}
			{/*	<Link to="/user/membership">*/}
			{/*		<Icon type="home" />*/}
			{/*		<span>会员等级</span>*/}
			{/*	</Link>*/}
			{/*</Menu.Item>*/}
		</Menu>
	</div>
)

User.propTypes = {
	match: PropTypes.object.isRequired
}

export default User

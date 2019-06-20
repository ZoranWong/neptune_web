import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

const User = ({ match }) => (
	<div style={{ paddingBottom: '120px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="inline"
		>
			<Menu.Item key="/user">
				<Link to="/user">
					<Icon type="home" />
					<span>用户管理</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/user/tagManage">
				<Link to="/user/tagManage">
					<Icon type="home" />
					<span>标签管理</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/user/groupManage">
				<Link to="/user/groupManage">
					<Icon type="home" />
					<span>群组管理</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/user/consumerBehavior">
				<Link to="/user/consumerBehavior">
					<Icon type="home" />
					<span>消费行为分析</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/user/integralRules">
				<Link to="/user/integralRules">
					<Icon type="home" />
					<span>积分规则</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/user/membership">
				<Link to="/user/membership">
					<Icon type="home" />
					<span>会员等级</span>
				</Link>
			</Menu.Item>
		</Menu>
	</div>
)

User.propTypes = {
	match: PropTypes.object.isRequired
}

export default User

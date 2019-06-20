import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

const Setting = ({ match }) => (
	<div style={{ paddingBottom: '120px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="inline"
		>
			<Menu.Item key="/setting">
				<Link to="/setting">
					<Icon type="home" />
					<span>人员配置</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/setting/warningSetting">
				<Link to="/setting/warningSetting">
					<Icon type="home" />
					<span>预警设置</span>
				</Link>
			</Menu.Item>
		</Menu>
	</div>
)

Setting.propTypes = {
	match: PropTypes.object.isRequired
}

export default Setting

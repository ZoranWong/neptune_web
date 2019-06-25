import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
const { SubMenu } = Menu;

const Finance = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			<Menu.Item key="/finance">
				<Link to="/finance">
					<Icon type="home" />
					<span>财务</span>
				</Link>
			</Menu.Item>
		</Menu>
	</div>
)

Finance.propTypes = {
	match: PropTypes.object.isRequired
}

export default Finance
import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
const { SubMenu } = Menu;

const Order = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			<Menu.Item key="/order">
				<Link to="/order">
					<Icon type="home" />
					<span>订单</span>
				</Link>
			</Menu.Item>
			
		</Menu>
	</div>
)

Order.propTypes = {
	match: PropTypes.object.isRequired
}

export default Order

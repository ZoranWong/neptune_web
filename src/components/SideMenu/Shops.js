import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
const { SubMenu } = Menu;

const Shops = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'226px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			<Menu.Item key="/shops">
				<Link to="/shops">
					<Icon type="home" />
					<span>店铺</span>
				</Link>
			</Menu.Item>
			
		</Menu>
	</div>
)

Shops.propTypes = {
	match: PropTypes.object.isRequired
}

export default Shops

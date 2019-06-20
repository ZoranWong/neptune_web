import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

const Goods = ({ match }) => (
	<div style={{ paddingBottom: '120px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="inline"
		>
			<Menu.Item key="/goods">
				<Link to="/goods">
					<Icon type="home" />
					<span>商品</span>
				</Link>
			</Menu.Item>
			
		</Menu>
	</div>
)

Goods.propTypes = {
	match: PropTypes.object.isRequired
}

export default Goods

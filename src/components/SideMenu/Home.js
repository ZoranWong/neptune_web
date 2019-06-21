import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
const { SubMenu } = Menu;

const Home = ({ match }) => (
	<div style={{ paddingBottom: '120px' ,width:'216px'}}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			<Menu.Item key="/home">
				<Link to="/home">
					<Icon type="home" />
					<span>首页</span>
				</Link>
			</Menu.Item>
		</Menu>
	</div>
)

Home.propTypes = {
	match: PropTypes.object.isRequired
}

export default Home

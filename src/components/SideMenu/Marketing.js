import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
const { SubMenu } = Menu;

const Marketing = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			<Menu.Item key="/marketing">
				<Link to="/marketing">
					<Icon type="home" />
					<span>营销</span>
				</Link>
			</Menu.Item>
		</Menu>
	</div>
)

Marketing.propTypes = {
	match: PropTypes.object.isRequired
}

export default Marketing

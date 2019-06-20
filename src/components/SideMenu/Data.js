import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Badge } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
const { SubMenu } = Menu;

const Data = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'226px'}}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="inline"
		>
			<Menu.Item key="/data">
				<Link to="/data">
					<Icon type="home" />
					<span>数据</span>
				</Link>
			</Menu.Item>
			{/*<SubMenu*/}
			{/*	key="sub1"*/}
			{/*	title={*/}
			{/*		<span>*/}
			{/*			<Icon type="switcher" />*/}
			{/*			<span>林一</span>*/}
			{/*		</span>*/}
			{/*	}*/}
			{/*>*/}
			{/*	<Menu.Item key="/forestOneOne">*/}
			{/*		<Link to="/forestOneOne">林一一</Link>*/}
			{/*	</Menu.Item>*/}
			{/*	<Menu.Item key="/forestTwoTwo">*/}
			{/*		<Link to="/forestTwoTwo">林二二</Link>*/}
			{/*	</Menu.Item>*/}
			{/*</SubMenu>*/}
		</Menu>
	</div>
)

Data.propTypes = {
	match: PropTypes.object.isRequired
}

export default Data

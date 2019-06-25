import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
const { SubMenu } = Menu;

const Setting = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			<Menu.Item key="/setting">
				<Link to="/setting">
					<i className="iconfont">&#xe7d4;</i>
					<span>人员配置</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/setting/warningSetting">
				<Link to="/setting/warningSetting">
					<i className="iconfont">&#xe81a;</i>
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

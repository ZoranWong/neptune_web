import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from '../../utils/IconFont'
import {hasPermission} from "../../utils/hasPermissions";

let Setting = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			{
				hasPermission('menu_user_setting') && <Menu.Item key="/setting">
					<Link to="/setting">
						<IconFont type="icon-userplus-fill" />
						<span>人员配置</span>
					</Link>
				</Menu.Item>
			}
			<Menu.Item key="/setting/logs">
				<Link to="/setting/logs">
					<IconFont type="icon-dingdanjilu-kongbaiye" />
					<span>操作设置</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/setting/warningSetting">
				<Link to="/setting/warningSetting">
					<IconFont type="icon-calendar-alt" />
					<span>APP版本设置</span>
				</Link>
			</Menu.Item>
		</Menu>
	</div>
);

Setting.propTypes = {
	match: PropTypes.object.isRequired
};

export default Setting

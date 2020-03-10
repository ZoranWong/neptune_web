import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
import {hasPermission} from "../../utils/hasPermissions";
const { SubMenu } = Menu;
let baseMenu = [
	{
		path:'/distribution/distributionStatistics',
		icon:'icon-dingdan',
		text:'分销数据',
		slug: 'menu_cashback_record'
	},
	{
		path:'/distribution',
		icon:'icon-dingdanjilu-kongbaiye',
		text:'返现记录',
		slug: 'menu_cashback_record'
	},
	{
		path:'/distribution/cashbackSetting',
		icon:'icon-tubiaozhizuomoban',
		text:'返现设置',
		slug: 'menu_cashback_setting'
	}
];
baseMenu = baseMenu.filter(item=> hasPermission(item.slug));
const Distribution = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px'}}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="inline"
		>
			{
				baseMenu.map(item=>{
					return (
						<Menu.Item key={item.path}>
							<Link to={item.path}>
								<IconFont type={item.icon} />
								<span>{item.text}</span>
							</Link>
						</Menu.Item>
					)
				})
			}
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

Distribution.propTypes = {
	match: PropTypes.object.isRequired
}

export default Distribution

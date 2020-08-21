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
		path:'/goods',
		icon:'icon-resource',
		text:'商品库管理',
		slug: 'menu_product_management'
	},
	{
		path:'/goods/obtainedGoods',
		icon:'icon-inboxin-fill',
		text:'下架商品',
		slug: 'menu_product_off_shelves'
	},
	{
		path:'/goods/classification',
		icon:'icon-all-fill',
		text:'商品分类',
		slug: 'menu_product_category'
	},
	{
		path:'/goods/specification',
		icon:'icon-box-fill',
		text:'商品规格',
		slug: 'menu_product_spec'
	},
	{
		path:'/goods/groups',
		icon:'icon-database-fill',
		text:'商品组',
		slug: 'menu_product_group'
	},
	{
		path:'/goods/breakfastOrder',
		icon:'icon-shopping-cart-fill',
		text:'早餐车订货',
		slug: 'menu_product_breakfast_book'
	},
	{
		path:'/goods/clientOrder',
		icon:'icon-arraive',
		text:'商户订货',
		slug: 'menu_product_merchant_book'
	},
	// {
	// 	path:'/goods/activities',
	// 	icon:'icon-huodong',
	// 	text:'活动',
	// 	slug: 'menu_product_activity_book'
	// },
	{
		path:'/goods/distributionMall',
		icon:'icon-fenxiao',
		text:'分销商城',
		slug: 'menu_product_distribution_mall_book'
	},
	{
		path:'/goods/hypermarket',
		icon:'icon-fenxiao',
		text:'社会餐商城',
		slug: 'menu_product_food_hypermarket'
	},
	{
		path:'/goods/shopHypermarket',
		icon:'icon-fenxiao',
		text:'门店商城',
		slug: 'menu_product_shop_hypermarket'
	}
];
// baseMenu = baseMenu.filter(item=> hasPermission(item.slug));
const Goods = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px' }}>
		<Menu theme="light" defaultSelectedKeys={[match.url]} selectedKeys={[match.url]} defaultOpenKeys={['sub4']} mode="vertical">
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
			
		</Menu>
	</div>
)

Goods.propTypes = {
	match: PropTypes.object.isRequired
}

export default Goods

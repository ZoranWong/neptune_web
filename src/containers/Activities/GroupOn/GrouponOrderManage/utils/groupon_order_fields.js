export const groupon_order_fields = [
	{
		value:'base_attributes',
		label:'基本属性',
		children:[
			{
				label:'拼团',
				value:'shopping_group_id',
				type:'equalGrouponCompare'
			},
			// {
			// 	label:'拼团单编号',
			// 	value:'trade_no'
			// },
			{
				label:'拼团单',
				value:'shop_shopping_group_id',
				type:'equalGrouponListCompare'
			},
			{
				label:'开团店铺',
				value:'initiator_id',
				type:'equalShopCompare'
			},
			{
				label:'自提店铺名',
				value:'pick_shop_name',
				type:'like'
			},
			{
				label:'自提店铺编号',
				value:'pick_shop_code',
				type:'like'
			},
			{
				label:'截单时间',
				value:'orderable_deadline',
				type:'detailTimeCompare'
			},
			{
				label:'配送日期',
				value:'delivery_date',
				type:'dataCompare'
			},
			{
				label:'下单时间',
				value:'created_at',
				type:'detailTimeCompare'
			},
			{
				label:'支付时间',
				value:'paid_at',
				type:'detailTimeCompare'
			},
			{
				label:'实付款',
				value:'settlement_total_fee',
				type:'numCompare'
			},
			{
				label:'应付款',
				value:'total_fee',
				type:'numCompare'
			},
			{
				label:'优惠金额',
				value:'total_preferential_fee',
				type:'numCompare'
			},
			{
				label:'订单状态',
				value:'order_state',
				type:'orderStateCompare'
			},
			// {
			// 	label:'应付款',
			// 	value:'orders_total_settlement_fee',
			// 	type:'numCompare'
			// },
			// {
			// 	label:'应付款',
			// 	value:'orders_total_settlement_fee',
			// 	type:'numCompare'
			// }
		]
	},
];


export const operation = {

	'absoluteCompare':[
		{
			label:'等于',
			value:'=',
			type:'input'
		}
	],
	'numCompare':[
		{
			label:'等于',
			value:'=',
			type:'input'
		},
		{
			label:'不等于',
			value:'<>',
			type:'input'
		},
		{
			label:'小于',
			value:'<',
			type:'input'
		},
		{
			label:'小于等于',
			value:'<=',
			type:'input'
		},
		{
			label:'大于',
			value:'>',
			type:'input'
		},
		{
			label:'大于等于',
			value:'>=',
			type:'input'
		},
		{
			label:'区间',
			value:'between',
			type:'inputRange'
		}
	],
	'contain':[
		{
			label:'包含以下任意',
			value:'in',
			type:'selectedTagBox'
		},
		{
			label:'包含以下所有',
			value:'all',
			type:'selectedTagBox'
		},
		{
			label:'不包含以下任意',
			value:'not in',
			type:'selectedTagBox'
		},
	],
	'isTrue': [
		{
			label: '是否',
			value: '=',
			type: 'boolean'
		}
	],
	'orderStateCompare':[
		{
			label:'等于',
			value:'=',
			type:'grouponOrderStatus'
		},
	],
	'group':[
		{
			label:'在以下任意群组中',
			value:'in',
			type:'selectedGroupBox'
		},
		{
			label:'在以下所有群组中',
			value:'all',
			type:'selectedGroupBox'
		},
		{
			label:'不在以下任意群组中',
			value:'not in',
			type:'selectedGroupBox'
		},
	],
	'equalShopCompare':[
		{
			label:'等于',
			value:'=',
			type:'selectedOneGrouponBox',
			advanceSearchKey: 'name'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'selectedGrouponBox',
			advanceSearchKey: 'name'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'selectedGrouponBox',
			advanceSearchKey: 'name'
		},
	],
	'equalGrouponCompare':[
		{
			label:'等于',
			value:'=',
			type:'selectedOneGrouponBox'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'selectedGrouponBox'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'selectedGrouponBox'
		},
	],
	'equalGrouponListCompare':[
		{
			label:'等于',
			value:'=',
			type:'selectedOneGrouponBox'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'selectedGrouponBox'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'selectedGrouponBox'
		},
	],
	'deadlineType':[
		{
			label:'等于',
			value:'=',
			type:'deadlineType'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'deadlineType'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'deadlineType'
		},
	],
	'deliveryType':[
		{
			label:'等于',
			value:'=',
			type:'deliveryTime'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'deliveryTime'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'deliveryTime'
		},
	],
	'grouponStatus':[
		{
			label:'等于',
			value:'=',
			type:'grouponListStatus'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'grouponListStatus'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'grouponListStatus'
		},
	],
	'detailTimeCompare': [
		{
			label: '等于',
			value:'=',
			type: 'detailTime'
		},
		{
			label:'不等于',
			value:'<>',
			type:'detailTime'
		},
		{
			label:'晚于',
			value:'>',
			type:'detailTime'
		},
		{
			label:'晚于(含)',
			value:'>=',
			type:'detailTime'
		},
		{
			label:'早于',
			value:'<',
			type:'detailTime'
		},
		{
			label:'早于(含)',
			value:'<=',
			type:'detailTime'
		},
		{
			label:'区间',
			value:'between',
			type:'periodDetailTime'
		}
	],
	'dataCompare':[
		{
			label:'等于',
			value:'=',
			type:'times'
		},
		{
			label:'不等于',
			value:'<>',
			type:'times'
		},
		{
			label:'晚于',
			value:'>',
			type:'times'
		},
		{
			label:'晚于(含)',
			value:'>=',
			type:'times'
		},
		{
			label:'早于',
			value:'<',
			type:'times'
		},
		{
			label:'早于(含)',
			value:'<=',
			type:'times'
		},
		{
			label:'区间',
			value:'between',
			type:'dateRange'
		}
	],
	'emptyCompare':[
		{
			label:'等于',
			value:'=',
			type:'input'
		},
		{
			label:'为空',
			value:'is null',
			type:''
		},
		{
			label:'不为空',
			value:'is not null',
			type:''
		},
	],
	'like': {
		label:'等于',
		value:'like',
		type:'input'
	}
};
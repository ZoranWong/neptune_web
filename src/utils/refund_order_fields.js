export const refund_order_values = [
	{
		value:'money_attributes',
		label:'退款属性',
		children:[
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
				label:'退款金额',
				value:'refund_fee',
				type:'numCompare'
			},
			{
				label:'退款状态',
				value:'refund_state',
				type:'equalCompare'
			},
			{
				label:'退款类型',
				value:'refund_type',
				type:'equalCompare'
			},
			{
				label:'退款申请时间',
				value:'refund_apply_at',
				type:'timeCompare'
			},
			{
				label:'到账时间',
				value:'refund_handled_at',
				type:'timeCompare'
			},
		]
	},
	{
		value:'base_attributes',
		label:'基本属性',
		children:[
			{
				label:'订单号',
				value:'trade_no',
				type:'absoluteCompare'
			},
			{
				label:'用户手机号',
				value:'user_mobile',
				type:'emptyCompare'
			},
			{
				label:'用户昵称',
				value:'user_nickname',
				type:'emptyCompare'
			},
			{
				label:'退款单号',
				value:'refund_no',
				type:'emptyCompare'
			}
		]
	},
	{
		value:'order_attribution',
		label:'订单属性',
		children:[
			{
				label:'支付状态',
				value:'state',
				type:'group'
			},
			{
				label:'下单时间',
				value:'created_at',
				type:'timeCompare'
			},
			{
				label:'商品',
				value:'products',
				type:'equalCompare'
			},
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
	'equalCompare':[
		{
			label:'等于',
			value:'=',
			type:'selectedOneBox'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'selectedBox'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'selectedBox'
		},
	],
	'timeCompare':[
		{
			label:'等于',
			value:'=',
			type:'timestamp'
		},
		{
			label:'不等于',
			value:'<>',
			type:'timestamp'
		},
		{
			label:'晚于',
			value:'>',
			type:'timestamp'
		},
		{
			label:'晚于(含)',
			value:'>=',
			type:'timestamp'
		},
		{
			label:'早于',
			value:'<',
			type:'timestamp'
		},
		{
			label:'早于(含)',
			value:'<=',
			type:'timestamp'
		},
		{
			label:'区间',
			value:'between',
			type:'period'
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
};

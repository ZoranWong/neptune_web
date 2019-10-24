export const good_values = [
	{
		value:'base_attributes',
		label:'基本属性',
		children:[
			{
				label:'商品名称',
				value:'name',
				type:'absoluteCompare'
			},
			{
				label:'商品条码',
				value:'barcode',
				type:'emptyCompare'
			},
			{
				label:'PV值',
				value:'pv',
				type:'numCompare'
			},
			{
				label:'零售价',
				value:'retail_price',
				type:'numCompare'
			},
			{
				label:'市场价',
				value:'market_price',
				type:'numCompare'
			},
			{
				label:'成本价',
				value:'cost_price',
				type:'numCompare'
			}
		]
	},
	{
		value:'good_attributes',
		label:'商品属性',
		children:[
			{
				label:'配送批次',
				value:'delivery_batch',
				type:'equalCompare'
			},
			{
				label:'保存方式',
				value:'keep_mode',
				type:'equalCompare'
				
			},
			{
				label:'属性',
				value:'property',
				type:'absoluteCompare'
			},
			{
				label:'商品分类',
				value:'category',
				type:'contain'
			},
			{
				label:'商品组',
				value:'group',
				type:'group'
			},
		]
	},
	{
		value:'sale',
		label:'销售数据',
		children:[
			{
				label:'总销量',
				value:'total_sales',
				type:'numCompare'
			},
			{
				label:'订货总量',
				value:'total_order_product_sales',
				type:'numCompare'
			},
			{
				label:'预定总量',
				value:'total_preorder_sales',
				type:'numCompare'
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

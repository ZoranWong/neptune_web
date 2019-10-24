export const good_values = [
	{
		value:'base_attributes',
		label:'基本属性',
		children:[
			{
				label:'店铺名称',
				value:'shop_name',
				type:'absoluteCompare'
			},
			{
				label:'店铺编号',
				value:'shop_no',
				type:'emptyCompare'
			},
			{
				label:'店主名称',
				value:'shop_keeper_name',
				type:'numCompare'
			},
			{
				label:'店主手机',
				value:'shop_keeper_mobile',
				type:'numCompare'
			},
			{
				label:'反佣时间',
				value:'commission_at',
				type:'numCompare'
			},
			{
				label:'返佣比例',
				value:'commission_ratio',
				type:'numCompare'
			},
			{
				label:'返佣金额',
				value:'commission_fee',
				type:'numCompare'
			}
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

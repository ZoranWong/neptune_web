export const deadlineType = [
	{name:'当日',key:'TODAY'},
	{name:'次日',key:'TODAY_PLUS_1'},
	{name:'某日期前不限',key:'BEFORE_FIXED_DATE'},
	{name:'固定日期',key:'FIXED_DATE'},
	];

export const deliveryTime = [
	{name:'次日',key:'TODAY_PLUS_1'},
	{name:'隔日',key:'TODAY_PLUS_2'},
	{name:'固定日期',key:'FIXED_DATE'}
];

export const grouponState = [
	{name:'未开始',key:0},
	{name:'进行中',key:1},
	{name:'已结束',key:2},
];
export const grouponListState = [
	{name:'待成团',key:0},
	{name:'未成团',key:1},
	{name:'已成团',key:2},
	{name:'已完成',key:3},
];
export const grouponOrderState = [
	{name:'待成团',key:'GROUPON_ORDER_PAY_COMPLETED'},
	{name:'待收货',key:'GROUPON_ORDER_WAIT_AGENT_VERIFY'},
	{name:'未成团',key:'GROUPON_ORDER_CANCEL_AUTO'},
	{name:'待自提',key:'GROUPON_ORDER_WAIT_CUSTOMER_VERIFY'},
	{name:'已完成',key:'GROUPON_ORDER_COMPLETED'}
];
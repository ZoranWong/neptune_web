export const consumerOrder = [
	{name:'全部',key:'ALL'},
	{name:'待确认',key:'WAIT_PLATFORM_VERIFY'},
	{name:'待收货',key:'WAIT_AGENT_VERIFY'},
	{name:'待自提',key:'WAIT_CUSTOMER_VERIFY'},
	{name:'已完成',key:'COMPLETED'},
	{name:'已退款',key:'REFUNDED'},
	{name:'用户取消',key:'CANCEL_MANUAL'},
	{name:'平台取消',key:'CANCEL_PLATFORM'},
	{name:'订单异常',key:'EXCEPTION'},
	{name:'申请售后',key:'AFTER_SALE'},
	{name:'拒绝退款',key:'REFUSE_REFUND'}
	];

export const merchantOrder = [
	{name:'全部',key:'ALL'},
	{name:'待收货',key:'WAIT_AGENT_VERIFY'},
	{name:'已完成',key:'COMPLETED'},
	{name:'商品异常',key:'GOODS_UNQUALIFIED_WAIT_PROCESS'},
	{name:'处理中',key:'GOODS_UNQUALIFIED_WAIT_VERIFY'},
	{name:'已退款',key:'GOODS_UNQUALIFIED_REFUNDED'}
];

export const deliveryType = [
	{name:'配送到家',key:'HOME_DELIVERY'},
	{name:'到店自提',key:'SELF_PICK'},
];

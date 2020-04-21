// 成团限制
const group_limit_type = [
    {name: '总金额', key: 'ORDERS_TOTAL_FEE_LIMIT'},
    {name: '订单数', key: 'ORDERS_COUNT_LIMIT'},
];

// 截单周期
const order_deadline_type = [
    {name: '当日', key: 'FIXED_TERM_0'},
    {name: '次日', key: 'FIXED_TERM_1'},
    {name: '某日期签不限制', key: 'BEFORE_FIXED_DATE'},
    {name: '固定日期', key: 'FIXED_DATE'},
];

// 配送周期
const delivery_type = [
    {name: '次日达', key: 'FIXED_TERM_0'},
    {name: '隔日达', key: 'FIXED_TERM_1'},
    {name: '固定日期', key: 'FIXED_DATE'},
];



export default {
    group_limit_type,
    order_deadline_type,
    delivery_type,
}
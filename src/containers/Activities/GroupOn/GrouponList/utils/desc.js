import _ from 'lodash'

export function orderDeadline(record) {
    let text = '';
    if (record['order_deadline_type'] === 'FIXED_TERM') {
        if (record['order_deadline_args']['fixed_term'] === 0) {
            text = `当日 ${record['order_deadline_args'].time}`
        } else if (record['order_deadline_args']['fixed_term'] === 1) {
            text = `次日 ${record['order_deadline_args'].time}`
        }
    } else if (record['order_deadline_type'] === 'BEFORE_FIXED_DATE') {
        text = `${record['order_deadline_args']['fixed_date']}前 ${record['order_deadline_args'].time}`
    } else if (record['order_deadline_type'] === 'FIXED_DATE') {
        text = `${record['order_deadline_args']['fixed_date']}日 ${record['order_deadline_args'].time}`
    }
    return text
}

export function delivery(record) {
    let text = '';
    if (record['delivery_type'] === 'FIXED_TERM') {
        if (record['delivery_args']['fixed_term'] === 1) {
            text = `次日 ${record['delivery_args']['time_period_start']} - ${record['delivery_args']['time_period_end']} `
        } else if (record['delivery_args']['fixed_term'] === 2) {
            text = `隔日 ${record['delivery_args']['time_period_start']} - ${record['delivery_args']['time_period_end']}`
        }
    } else if (record['delivery_type'] === 'FIXED_DATE') {
        text = `${record['delivery_args'].fixed_date}日 ${record['delivery_args']['time_period_start']} - ${record['delivery_args']['time_period_end']}`
    }
    return text
}

export function groupLimit(record) {

    let text = '';
    if (record['has_group_limit']) {
        if (record['group_limit_type'] === 'ORDERS_COUNT_LIMIT') {
            text = `满${record['group_limit_args'].group_orders_count_floor}笔订单成团`
        } else if (record['group_limit_type'] === 'ORDERS_TOTAL_FEE_LIMIT') {
            text = `订单总额满${record['group_limit_args'].group_orders_total_fee_floor}元成团`
        }
    } else {
        text = '无'
    }
    return text
}

export function getStatus(status) {
    let text = '';
    switch (status) {
        case 0:
            text = '未开始';
            break;
        case 1:
            text = '进行中';
            break;
        case 2:
            text = '已结束';
            break;
        default:
            text = '未知'
    }
    return text
}

export function discount(record) {
    let text = '';
    if (record.discount === 100) {
        text = '无'
    } else {
        text = `${record.discount / 10}折`
    }
    return text
}

export function redPacketLevel(record) {
    let text = '';
    if (record['has_group_red_packet']) {
        let levels = record['group_red_packet_levels'];
        _.map(levels, level=>{
            text += `满${level['gift_amount']}元，赠送${level['minimum_total_fee']}元\n`
        })
    } else {
        text = '无红包'
    }
    return text
}

export function giftInfo(record) {
    let text = '';
    if (record['has_gift']) {
        _.map(record['gift_products'], product => {
            text += `${product['product_entity_info'].name} * 1、`
        });
        text = `满${record['gift_floor']}元赠送` + text;
        text = text.substring(0, text.length - 1);
    } else {
        text = '无赠品'
    }
    return text
}
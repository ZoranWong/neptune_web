import React, {Component} from 'react';
import {Modal} from "antd";
import {delivery, discount, giftInfo, groupLimit, orderDeadline, redPacketLevel} from "../utils/desc";
import _ from 'lodash'
class PreviewDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: {}
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!nextProps.data.id) return;
        this.setState({details: nextProps.data})
    }


    handleCancel = () => {
        this.props.onClose()
    };


    handleProducts = products => {
        let text = '';
        _.map(products, product => {
            text += `${product.name}、`
        });
        text = text.substring(0, text.length - 1);
        return text
    };




    render() {
        const {details} = this.state;
        return (
            <div>
                <Modal
                    title="拼团详情"
                    width={520}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    footer={null}
                >
                    <ul className="mainUl couponDetail">
                        <li>
                            <span className="left">活动名称:</span>
                            <span className='limit'>{details.name}</span>
                        </li>
                        <li>
                            <span className="left">展示名称（团购主题）:</span>
                            <span className='limit'>{details.display_name}</span>
                        </li>
                        <li>
                            <span className="left">活动时间:</span>
                            <span className='limit'>{details['start_date']}至{ details['end_date']}</span>
                        </li>
                        <li>
                            <span className="left">参与商品:</span>
                            <span className='limit'>{this.handleProducts(details['group_products'])}</span>
                        </li>
                        <li>
                            <span className="left">成团限制:</span>
                            <span className='limit'>{details['group_limit_desc']}</span>
                        </li>
                        <li>
                            <span className="left">截单周期:</span>
                            <span className='limit'>{orderDeadline(details)}</span>
                        </li>
                        {
                            details['consume_stock_args'] && <li>
                                <span className="left">开始消耗库存时间:</span>
                                <span className='limit'>截单前{details['consume_stock_args']['day_before_order_deadline']}天 {details['consume_stock_args'].time}</span>
                            </li>
                        }
                        <li>
                            <span className="left">配送时间:</span>
                            <span className='limit'>{delivery(details)}</span>
                        </li>
                        <li>
                            <span className="left">折扣:</span>
                            <span className='limit'>{discount(details)}</span>
                        </li>
                        <li>
                            <span className="left">成团红包:</span>
                            <span className='limit'>{redPacketLevel(details)}</span>
                        </li>
                        <li>
                            <span className="left">赠品:</span>
                            <span className='limit'>{giftInfo(details)}</span>
                        </li>
                        <li>
                            <span className="left">可见范围:</span>
                            <span className='limit'>{details['visible_scope_desc']}</span>
                        </li>
                        <li>
                            <span className="left">是否拼团记录生成图片:</span>
                            <span className='limit'>{details.auto_generate_shared_picture ? '是' : '否'}</span>
                        </li>
                        <li>
                            <span className="left">固定分享图片:</span>
                            <img style={{width: '100px', height: '100px'}} src={details['fixed_shared_picture']} alt=""/>
                        </li>
                        <li>
                            <span className="left">分享文案:</span>
                            <span className='limit'>{details.share_text}</span>
                        </li>


                    </ul>
                </Modal>
            </div>
        );
    }
}

export default PreviewDetails;
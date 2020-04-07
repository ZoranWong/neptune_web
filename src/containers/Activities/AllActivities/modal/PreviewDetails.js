import React, {Component} from 'react';
import {Modal} from "antd";

class PreviewDetails extends Component {

    constructor(props) {
        super(props);
    }


    handleCancel = () => {
        this.props.onClose()
    };

    status = (status) => {
        let text = '';
        switch (status) {
            case 0:
                text = '待开始';
                break;
            case 2:
                text = '已结束';
                break;
            default:
                text = '进行中'
        }
        return text
    };


    render() {
        return (
            <div>
                <Modal
                    title="活动详情"
                    width={520}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    footer={null}
                >
                    <ul className="mainUl couponDetail">
                        <li>
                            <span className="left">活动名称:</span>
                            <span className='limit'>{this.props.details.name}</span>
                        </li>
                        <li>
                            <span className="left">活动描述:</span>
                            <span className='limit'>{this.props.details.desc}</span>
                        </li>
                        <li>
                            <span className="left">活动图片:</span>
                            <img style={{width: '100px', height: '100px'}} src={this.props.details.image} alt=""/>
                        </li>
                        <li>
                            <span className="left">参与活动最大优惠数量:</span>
                            <span className='limit'>{this.props.details['buy_max_num']}</span>
                        </li>
                        <li>
                            <span className="left">享受优惠活动产品的购买金额:</span>
                            <span className='limit'>{this.props.details['act_price']}</span>
                        </li>
                        <li>
                            <span className="left">最大优惠金额:</span>
                            <span className='limit'>{this.props.details['max_discount_amount']}</span>
                        </li>
                        <li>
                            <span className="left">折扣(0-100百分制):</span>
                            <span className='limit'>{this.props.details.discount}</span>
                        </li>
                        <li>
                            <span className="left">满减金额:</span>
                            <span className='limit'>{this.props.details['limit_amount']}</span>
                        </li>
                        <li>
                            <span className="left">活动起始时间:</span>
                            <span className='limit'>{this.props.details['start_date'] || '无'}</span>
                        </li>
                        <li>
                            <span className="left">活动结束时间:</span>
                            <span className='limit'>{this.props.details['end_date'] || '无'}</span>
                        </li>
                        <li>
                            <span className="left">活动状态:</span>
                            <span className='limit'>{this.status(this.props.details.status)}</span>
                        </li>
                    </ul>
                </Modal>
            </div>
        );
    }
}

export default PreviewDetails;
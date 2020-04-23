import React, {Component, Fragment} from 'react';
import {Button, Input, DatePicker, LocaleProvider, Radio, Select, message, TimePicker} from "antd";
import '../css/newGroupon.sass';
import SelectionComponent from "./components/SelectionComponent";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import selection from './fields'
import CustomUpload from "../../../../../components/Upload/Upload";
import Editor from "../../../../../components/Editor/Editor";
import {shelfableProducts} from "../../../../../api/activities/activities";
import GroupRedPacketLevel from "./components/GroupRedPacketLevel";
import _ from 'lodash';
import moment from 'moment';
import {createNewGroupon} from "../../../../../api/activities/groupon";
import {delivery, discount, groupLimit, orderDeadline, redPacketLevel} from "../utils/desc";

const { RangePicker } = DatePicker;
//const { RangePicker } = TimePicker;
const { TextArea } = Input;
const format = 'HH:mm';

class EditGroupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            display_name: '',
            share_text: '',
            group_limit_type: 'ORDERS_COUNT_LIMIT',
            group_order_fee_floor: '',
            group_orders_count_floor: '',
            group_orders_total_fee_floor: '',
            order_deadline_fixed_date: '',
            has_group_limit: false,
            isDiscount: false,
            discount: '',
            has_group_red_packet: false,
            has_gift: false,
            gift_floor: '',
            products: [],
            gift_products: [],
            group_products: [],
            delivery_fixed_date: '',
            auto_generate_shared_picture: false,
            order_deadline_time: '',
            delivery_time_period_start: '',
            delivery_time_period_end: '',
            consume_stock_day_before_deadline: '',
            timeRange: []
        };
        this.image = React.createRef();
        this.redPacket = React.createRef();
        this.editor = React.createRef();
    }

    componentDidMount() {
        let props = this.props.location.state;
        if(props && props.data && props.data.id){
            let group_products = [];
            _.map(props.data['group_products'], product => {
                group_products.push(product.id)
            });
            let start = props.data['start_date'];
            let end = props.data['end_date'];

            let startMoment = moment(start,'YYYY-MM-DD HH:mm:ss');
            let endMoment = moment(end,'YYYY-MM-DD HH:mm:ss');
            let timeRange = [startMoment, endMoment];
            this.setState({...props.data, group_products: group_products, timeRange}, ()=>{
                console.log(this.state, '============>');
            })
        }
        shelfableProducts({limit:100,page:1}, 13).then(r=>{
            this.setState({products: r.data})
        }).catch(_=>{})
    }

    selectionChange = (type, value) => {
        this.setState({[type]: value})
    };

    // 返回活动管理
    back = () => {
        this.props.history.go(-1)
    };

    // 是非框选择
    onRadioChange = (e, type) => {
        this.setState({[type]: e.target.value})
    };

    //输入框填写内容
    onInputChange = (e, type) => {
        if (e.target.value < 0) e.target.value = 0;
        let value = parseInt(e.target.value)  ? Number(e.target.value) : e.target.value;
        this.setState({[type]: value})
    };

    // 活动起始时间
    actDateChange = (date, dateString) => {
        this.setState({
            start_date: dateString[0],
            end_date: dateString[1],
            timeRange: date
        })
    };

    // 选择商品
    onProductChange = (e, type) => {
        this.setState({
            [type]: e
        })
    };

    // 日期选择
    onDatePicker = (dateString, type) => {
        this.setState({[type]: dateString})
    };

    // 时间选择
    onTimeChange = (time, type) => {
        this.setState({[type]: time})
    };
    // 时间范围选择
    onTimeRangeChange = (time, type) => {
        this.setState({[type]: time})
    };

    // 检验数据
    checkData = () => {
        let {state} = this;
        let image = this.image.current ? this.image.current.state.imgUrl || this.image.current.state.imageUrl : '';
        let detail = this.editor.current?this.editor.current.state.outputHTML : '';

        if (!state.name) {
            message.error('请填写拼团名称');
            return
        }
        if (!state.display_name) {
            message.error('请填写展示名称');
            return
        }
        if (!state.start_date) {
            message.error('请选择拼团时间');
            return
        }
        if (!state.group_products.length) {
            message.error('请选择拼团参与商品');
            return
        }
        if (state.has_group_limit && state.group_limit_type === 'ORDERS_COUNT_LIMIT' && !state.group_orders_count_floor) {
            message.error('请填写成团订单数限制');
            return
        }
        if (state.has_group_limit && state.group_limit_type === 'ORDERS_COUNT_LIMIT' && !state.group_order_fee_floor) {
            message.error('请填写订单起订金额');
            return
        }
        if (state.has_group_limit && state.group_limit_type === 'ORDERS_TOTAL_FEE_LIMIT' && !state.group_orders_total_fee_floor) {
            message.error('请填写订单总金额限制');
            return
        }

        if (state.order_deadline_type === 'BEFORE_FIXED_DATE' && !state.order_deadline_fixed_date) {
            message.error('请选择截单周期');
            return
        }
        if (state.order_deadline_type === 'FIXED_DATE' && !state.order_deadline_fixed_date) {
            message.error('请选择截单周期');
            return
        }
        if (!state.order_deadline_time) {
            message.error('请选择截单具体时间');
            return
        }

        if (state.order_deadline_type === 'FIXED_TERM_0') {
            state.order_deadline_fixed_term = 0;
            state.order_deadline_type = 'FIXED_TERM';
        } else if (state.order_deadline_type === 'FIXED_TERM_1') {
            state.order_deadline_fixed_term = 1;
            state.order_deadline_type = 'FIXED_TERM';
        }
        if (state.delivery_type === 'FIXED_DATE' && !state.delivery_fixed_date) {
            message.error('请选择配送周期');
            return
        }
        if (!state.delivery_time_period_start) {
            message.error('请选择配送开始时间');
            return
        }
        if (!state.delivery_time_period_end) {
            message.error('请选择配送结束时间');
            return
        }
        if (state.delivery_type === 'FIXED_TERM_0') {
            state.delivery_fixed_term = 1;
            state.delivery_type = 'FIXED_TERM';
        } else if (state.delivery_type === 'FIXED_TERM_1') {
            state.delivery_fixed_term = 2;
            state.delivery_type = 'FIXED_TERM';
        }
        if (state.has_group_limit && state.group_limit_type === 'ORDERS_TOTAL_FEE_LIMIT' && !state.group_orders_total_fee_floor) {
            message.error('请填写订单总金额限制');
            return
        }
        if (state.isDiscount && !state.discount) {
            message.error('请填写折扣');
            return
        }
        state.discount = state.isDiscount ? state.discount : 100;
        // 校验成团红包
        if (state.has_group_red_packet) {
            let redPacket = this.redPacket.current && this.redPacket.current.state.ary;
            let group_red_packet_levels = [];
            _.map(redPacket, item => {
                let all = true;
                for (let k in item) {
                    if (!item[k]) {
                        all = false;
                        break
                    }
                }
                all && group_red_packet_levels.push({
                    minimum_total_fee: Number(item.full),
                    gift_amount: Number(item.send)
                })
            });
            if (group_red_packet_levels.length < redPacket.length) {
                message.error('请正确填写成团红包');
                return
            }

            state.group_red_packet_levels = group_red_packet_levels;
        }


        if (state.has_gift && !state.gift_floor) {
            message.error('请填写赠品起送金额');
            return
        }
        if (state.has_gift && !state.gift_products.length) {
            message.error('请选择赠品');
            return
        }

        if (state.has_gift && state.gift_products.length) {
            let items = [];
            _.map(state.gift_products, item => {
                let obj = {};
                obj['product_entity_id'] = Number(item);
                obj['gift_quantity'] = 1;
                items.push(obj)
            });
            state.gift_products = items;
        }

        // 此处校验上传图片
        if (!image) {
            message.error('请上传分享图片');
            return
        }
        state.fixed_shared_picture = image;

        if (!state.share_text) {
            message.error('请填写分享文案');
            return
        }
        if (!detail) {
            message.error('请填写富文本详情页');
            return
        }
        state.detail = detail;

        this.submit(state)
    };

    submit = data => {
        createNewGroupon(data).then(r=>{
            message.success(r.message);
            this.back()
        }).catch(_=>{})
    };

    render() {
        const {state} = this;
        return (
            <div className='newGroupon'>
                <div className="header">
                    <Button size='small' onClick={this.checkData}>保存</Button>
                    <Button onClick={this.back} size='small' >返回上一页</Button>
                </div>
                <ul className='forms'>
                    <li>
                        <h4>拼团名称</h4>
                        <h5>{state.name}</h5>
                    </li>
                    <li>
                        <h4>展示名称（团购主题）1111</h4>
                        <Input value={this.state.display_name} onChange={(e)=>this.onInputChange(e, 'display_name')} />
                    </li>
                    <li>
                        <h4>活动时间1111</h4>
                        <LocaleProvider locale={zh_CN}>
                            <RangePicker showTime value={this.state.timeRange} onChange={this.actDateChange} />
                        </LocaleProvider>
                    </li>
                    <li>
                        <h4>参与商品111</h4>
                        <Select
                            mode='multiple'
                            defaultActiveFirstOption={false}
                            value={this.state.group_products}
                            className='selectedBox'
                            onChange={(e)=>this.onProductChange(e, 'group_products')}
                            optionLabelProp="label"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }

                        >
                            {this.state.products.map(item => (
                                <Select.Option key={item['product_entity_id']} value={item['product_entity_id']} label={item['product_entity'].name} >
                                    {item['product_entity'].name}
                                </Select.Option>
                            ))}
                        </Select>
                    </li>
                    <li>
                        <h4>成团限制</h4>
                        <h5>{groupLimit(this.state)}</h5>
                    </li>
                    <li>
                        <h4>截单周期</h4>
                        <h5>{orderDeadline(this.state)}</h5>
                    </li>
                    {
                        this.state['consume_stock_args'] && <li>
                            <h4>开始消耗库存时间</h4>
                            <h5>截单前{this.state['consume_stock_args']['day_before_order_deadline']}天 {this.state['consume_stock_args'].time}</h5>
                        </li>
                    }
                    <li>
                        <h4>配送时间</h4>
                        <h5>{delivery(this.state)}</h5>
                    </li>
                    <li>
                        <h4>折扣</h4>
                        <h5>{discount(this.state)}</h5>
                    </li>
                    <li>
                        <h4>成团红包</h4>
                        <h5>{redPacketLevel(this.state)}</h5>
                    </li>
                    <li>
                        <h4>是否有赠品</h4>
                        <Radio.Group onChange={(e)=>this.onRadioChange(e, 'has_gift')} value={this.state['has_gift']}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </li>
                    <li>
                        <h4>是否拼团记录生成图片</h4>
                        <Radio.Group onChange={(e)=>this.onRadioChange(e, 'auto_generate_shared_picture')} value={this.state['auto_generate_shared_picture']}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </li>
                    <li>
                        <h4>固定分享图片1111</h4>
                        <CustomUpload ref={this.image}/>
                    </li>
                    <li>
                        <h4>分享文案1111</h4>
                        <TextArea rows={4} value={this.state.share_text} onChange={(e)=>this.onInputChange(e, 'share_text')} />
                    </li>
                    <li>
                        <h4>拼团页富文本编辑1111</h4>
                        <Editor ref={this.editor} />
                    </li>
                </ul>
            </div>
        );
    }
}

export default EditGroupon;
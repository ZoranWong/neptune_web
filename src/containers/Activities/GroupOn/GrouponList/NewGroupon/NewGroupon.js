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
import {shops} from "../../../../../api/shops/shopManage";
import {groups} from "../../../../../api/shops/groups";

const { RangePicker } = DatePicker;
//const { RangePicker } = TimePicker;
const { TextArea } = Input;
const format = 'HH:mm';

class NewGroupon extends Component {
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
            has_discount: false,
            discount: '',
            has_group_red_packet: false,
            has_gift: false,
            gift_floor: '',
            products: [],
            gift_products: [],
            group_products: [],
            delivery_fixed_date: '',
            auto_generate_shared_picture: false,
            is_join_sales_cashback: false,
            order_deadline_time: '',
            delivery_time_period_start: '',
            delivery_time_period_end: '',
            consume_stock_day_before_deadline: '',
            visible_scope: null,
            data: [], // 可见范围的店铺或店铺组
            type: 'shop',
            scrollPage: 1
        };
        this.image = React.createRef();
        this.redPacket = React.createRef();
        this.editor = React.createRef();
    }

    componentDidMount() {

        shelfableProducts({limit:100,page:1}, 13).then(r=>{
            this.setState({products: r.data})
        }).catch(_=>{});
        shops({limit:10,page:1}).then(r=>{
            this.setState({data:r.data})
        });
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
            end_date: dateString[1]
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
        console.log(dateString);
        console.log(type);
        this.setState({[type]: dateString})
    };

    // 可见范围
    onShopGroupChange = (e) =>{
        this.setState({where:[]});
        let api = '';
        api = e === 'shop'?shops:groups;
        api({}).then(r=>{
            this.setState({type:e,data:r.data})
        });

    };
    onShopChange = selectedItems =>{
        this.setState({where:selectedItems})
    };
    onTypeChange = opt =>{
        this.setState({opt})
    };
    // 店铺或店铺组滚动加载
    tagScroll = e => {
        e.persist();
        const { target } = e;
        if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
            const { scrollPage } = this.state;
            const nextScrollPage = scrollPage + 1;
            this.setState({ scrollPage: nextScrollPage });
            this.getList(nextScrollPage); // 调用api方法
        }
    };
    getList = (page) =>{
        let api = this.state.type === 'shop'?shops:groups;
        api({limit:10,page:page}).then(r=>{
            if(!r.data.length) return;
            this.setState({data: this.state.data.concat(r.data)})
        })
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
            state.delivery_fixed_term = 0;
            state.delivery_type = 'FIXED_TERM';
        } else if (state.delivery_type === 'FIXED_TERM_1') {
            state.delivery_fixed_term = 1;
            state.delivery_type = 'FIXED_TERM';
        } else if (state.delivery_type === 'FIXED_TERM_2') {
            state.delivery_fixed_term = 2;
            state.delivery_type = 'FIXED_TERM';
        }
        if (state.has_group_limit && state.group_limit_type === 'ORDERS_TOTAL_FEE_LIMIT' && !state.group_orders_total_fee_floor) {
            message.error('请填写订单总金额限制');
            return
        }
        if (state.has_discount && !state.discount) {
            message.error('请填写折扣');
            return
        }
        state.discount = state.has_discount ? state.discount : 100;
        // 校验成团红包
        console.log(state, '=============<<<<<<<<<<<<<');
        if (state.has_group_red_packet) {
            let redPacket = this.redPacket.current && this.redPacket.current.state.ary;
            console.log(redPacket, 'redPacket');
            let group_red_packet_levels = [];
            _.map(redPacket, item => {
                let all = true;
                for (let k in item) {
                    if (k !== 'id' && !item[k]) {
                        all = false;
                        break
                    }
                }
                all && group_red_packet_levels.push({
                    minimum_total_fee: Number(item.full),
                    gift_amount: Number(item.send)
                })
            });
            console.log(group_red_packet_levels, 'group_red_packet_levels');
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
        let giftProducts = [];
        if (state.has_gift && state.gift_products.length) {
            _.map(state.gift_products, item => {
                let obj = {};
                obj['product_entity_id'] = Number(item);
                obj['gift_quantity'] = 1;
                giftProducts.push(obj)
            });
        }

        if (state['visible_scope']) {
            if(!state.opt){
                message.error('请选择可见类型');
                return;
            }
            if(!state.where || !state.where.length){
                message.error('请选择店铺或店铺组');
                return
            }
            state['visible_scope'] = {
                type: state.type,
                opt: state.opt,
                where: state.where
            }
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

        this.submit(state, giftProducts)
    };

    submit = (data, giftProducts) => {
        data['gift_products'] = giftProducts;
        createNewGroupon(data).then(r=>{
            message.success(r.message);
            this.back()
        }).catch(_=>{})
    };

    render() {
        return (
            <div className='newGroupon'>
                <div className="header">
                    <Button size='small' onClick={this.checkData}>保存</Button>
                    <Button onClick={this.back} size='small' >返回上一页</Button>
                </div>
                <ul className='forms'>
                    <li>
                        <h4>拼团名称</h4>
                        <Input value={this.state.name} onChange={(e)=>this.onInputChange(e, 'name')} />
                    </li>
                    <li>
                        <h4>展示名称（团购主题）</h4>
                        <Input value={this.state.display_name} onChange={(e)=>this.onInputChange(e, 'display_name')} />
                    </li>
                    <li className='longDatePicker'>
                        <h4>拼团时间</h4>
                        <LocaleProvider locale={zh_CN}>
                            <RangePicker showTime onChange={this.actDateChange} />
                        </LocaleProvider>
                    </li>
                    <li>
                        <h4>参与商品</h4>
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
                                <Select.Option key={item['product_entity_id'] + ''} value={item['product_entity_id'] + ''} label={item['product_entity'].name} >
                                    {item['product_entity'].name}
                                </Select.Option>
                            ))}
                        </Select>
                    </li>
                    <li>
                        <h4>成团限制</h4>
                        <Radio.Group onChange={(e)=>this.onRadioChange(e, 'has_group_limit')} value={this.state['has_group_limit']}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </li>
                    {
                        this.state.has_group_limit && <li>
                            <h4>成团限制类型</h4>
                            <SelectionComponent
                                strategy={selection.group_limit_type}
                                type='group_limit_type'
                                selectionChange={this.selectionChange}
                                value={this.state.group_limit_type}
                            />
                        </li>
                    }
                    {
                        (this.state.has_group_limit && this.state.group_limit_type === 'ORDERS_COUNT_LIMIT') && <li>
                            <h4>订单数限制</h4>
                            <Input type='number' value={this.state.group_orders_count_floor} onChange={(e)=>this.onInputChange(e, 'group_orders_count_floor')} />
                        </li>
                    }
                    {
                        (this.state.has_group_limit && this.state.group_limit_type === 'ORDERS_COUNT_LIMIT') && <li>
                            <h4>订单起订金额</h4>
                            <Input type='number' value={this.state.group_order_fee_floor} onChange={(e)=>this.onInputChange(e, 'group_order_fee_floor')} />
                        </li>
                    }
                    {
                        (this.state.has_group_limit && this.state.group_limit_type === 'ORDERS_TOTAL_FEE_LIMIT') && <li>
                            <h4>订单总金额限制</h4>
                            <Input type='number' value={this.state.group_orders_total_fee_floor} onChange={(e)=>this.onInputChange(e, 'group_orders_total_fee_floor')} />
                        </li>
                    }
                    <li>
                        <h4>截单周期</h4>
                        <SelectionComponent
                            strategy={selection.order_deadline_type}
                            type='order_deadline_type'
                            selectionChange={this.selectionChange}
                            value={this.state.order_deadline_type}
                        />
                    </li>
                    {
                        this.state.order_deadline_type === 'BEFORE_FIXED_DATE' && <li className='longDatePicker'>
                            <h4>某日期前</h4>
                            <LocaleProvider locale={zh_CN}>
                                <DatePicker onChange={(d,ds)=>this.onDatePicker(ds, 'order_deadline_fixed_date')} />
                            </LocaleProvider>
                        </li>
                    }
                    {
                        this.state.order_deadline_type === 'FIXED_DATE' && <li>
                            <h4>固定日期</h4>
                            <LocaleProvider locale={zh_CN}>
                                <DatePicker onChange={(d,ds)=>this.onDatePicker(ds, 'order_deadline_fixed_date')} />
                            </LocaleProvider>
                        </li>
                    }
                    <li className='time'>
                        <h4>选择截单具体时间</h4>
                        <LocaleProvider locale={zh_CN}>
                            <TimePicker  format={format} onChange={(time,t)=>this.onTimeChange(t, 'order_deadline_time')}/>
                        </LocaleProvider>
                    </li>
                    <li>
                        <h4>开始消耗库存时间</h4>
                        <div className='short'>
                            截单前 <Input type='number' value={this.state.consume_stock_day_before_deadline} onChange={(e)=>this.onInputChange(e, 'consume_stock_day_before_deadline')} />
                            天
                        </div>
                    </li>
                    <li className='time'>
                        <h4>开始消耗库存具体时间</h4>
                        <LocaleProvider locale={zh_CN}>
                            <TimePicker  format={format} onChange={(time,t)=>this.onTimeChange(t, 'consume_stock_time')}/>
                        </LocaleProvider>
                    </li>
                    <li>
                        <h4>配送周期</h4>
                        <SelectionComponent
                            strategy={selection.delivery_type}
                            type='delivery_type'
                            selectionChange={this.selectionChange}
                            value={this.state.delivery_type}
                        />
                    </li>
                    {
                        this.state.delivery_type === 'FIXED_DATE' && <li>
                            <h4>固定日期</h4>
                            <LocaleProvider locale={zh_CN}>
                                <DatePicker onChange={(d,ds)=>this.onDatePicker(ds, 'delivery_fixed_date')} />
                            </LocaleProvider>
                        </li>
                    }
                    <li className='timeRange'>
                        <h4>配送时间</h4>
                        <LocaleProvider locale={zh_CN}>
                            <TimePicker  format={format} onChange={(time,t)=>this.onTimeRangeChange(t, 'delivery_time_period_start')}/>
                            <TimePicker  format={format} onChange={(time,t)=>this.onTimeRangeChange(t, 'delivery_time_period_end')}/>
                        </LocaleProvider>
                    </li>
                    <li>
                        <h4>是否打折</h4>
                        <Radio.Group onChange={(e)=>this.onRadioChange(e, 'has_discount')} value={this.state['has_discount']}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </li>
                    {
                        this.state.has_discount && <li>
                            <h4>折扣</h4>
                            <Input type='number' value={this.state.discount} onChange={(e)=>this.onInputChange(e, 'discount')} />
                        </li>
                    }
                    <li>
                        <h4>是否有成团红包</h4>
                        <Radio.Group onChange={(e)=>this.onRadioChange(e, 'has_group_red_packet')} value={this.state['has_group_red_packet']}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </li>
                    {
                        this.state.has_group_red_packet && <GroupRedPacketLevel ref={this.redPacket} />
                    }

                    <li>
                        <h4>是否有赠品</h4>
                        <Radio.Group onChange={(e)=>this.onRadioChange(e, 'has_gift')} value={this.state['has_gift']}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </li>
                    {
                        this.state.has_gift && <li>
                            <h4>起送金额</h4>
                            <Input type='number' value={this.state.gift_floor} onChange={(e)=>this.onInputChange(e, 'gift_floor')} />
                        </li>
                    }
                    {
                        this.state.has_gift && <li>
                            <h4>赠送商品</h4>
                            <Select
                                mode='multiple'
                                defaultActiveFirstOption={false}
                                value={this.state.gift_products}
                                className='selectedBox'
                                onChange={(e)=>this.onProductChange(e, 'gift_products')}
                                optionLabelProp="label"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }

                            >
                                {this.state.products.map(item => (
                                    <Select.Option key={item['product_entity_id'] + ''} value={item['product_entity_id'] + ''} label={item['product_entity'].name} >
                                        {item['product_entity'].name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </li>
                    }
                    <li>
                        <h4>可见范围</h4>
                        <Radio.Group onChange={(e)=>this.onRadioChange(e, 'visible_scope')} value={this.state['visible_scope']}>
                            <Radio value={null}>全部</Radio>
                            <Radio value={1}>部分</Radio>
                        </Radio.Group>
                    </li>
                    {
                        this.state['visible_scope'] && <div className="scope">
                            <Select
                                defaultActiveFirstOption={false}
                                onChange={this.onShopGroupChange}
                                value={this.state.type}
                                className='type'
                                placeholder="请选择可见范围"
                            >
                                <Select.Option value="shop">店铺</Select.Option>
                                <Select.Option value="group">店铺组</Select.Option>
                            </Select>
                            <Select
                                defaultActiveFirstOption={false}
                                className='opt'
                                onChange={this.onTypeChange}
                                placeholder= '请选择可见方式'
                            >
                                <Select.Option value="in">可见</Select.Option>
                                <Select.Option value="not in">不可见</Select.Option>
                            </Select>
                            <Select
                                defaultActiveFirstOption={false}
                                mode="multiple"
                                value={this.state.where}
                                placeholder='请选择范围'
                                className='value'
                                onChange={this.onShopChange}
                                onPopupScroll={this.tagScroll}
                                allowClear
                                optionFilterProp="children"
                                optionLabelProp="label"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {this.state.data.map(item => (
                                    <Select.Option key={item.id+""} label={item.name} value={item.id+''}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    }
                    <li>
                        <h4>是否拼团记录生成图片</h4>
                        <Radio.Group onChange={(e)=>this.onRadioChange(e, 'auto_generate_shared_picture')} value={this.state['auto_generate_shared_picture']}>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </li>
                    <li>
                        <h4>固定分享图片</h4>
                        <CustomUpload ref={this.image}/>
                    </li>
                    <li>
                        <h4>分享文案</h4>
                        <TextArea rows={4} value={this.state.share_text} onChange={(e)=>this.onInputChange(e, 'share_text')} />
                    </li>
                    <li className='richText'>
                        <h4>拼团页富文本编辑</h4>
                        <Editor ref={this.editor} />
                    </li>
                </ul>
            </div>
        );
    }
}

export default NewGroupon;
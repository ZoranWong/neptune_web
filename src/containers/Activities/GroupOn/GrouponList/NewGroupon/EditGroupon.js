import React, {Component, Fragment} from 'react';
import {Button, Input, DatePicker, LocaleProvider, Radio, Select, message} from "antd";
import '../css/newGroupon.sass';
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomUpload from "../../../../../components/Upload/Upload";
import Editor from "../../../../../components/Editor/Editor";
import {shelfableProducts} from "../../../../../api/activities/activities";
import _ from 'lodash';
import moment from 'moment';
import { editGroupon} from "../../../../../api/activities/groupon";
import {delivery, discount, giftInfo, groupLimit, orderDeadline, redPacketLevel} from "../utils/desc";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

class EditGroupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display_name: '',
            share_text: '',
            discount: '',
            products: [],
            gift_products: [],
            group_products: [],
            timeRange: []
        };
        this.image = React.createRef();
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
            this.setState({...props.data, group_products: group_products, timeRange})
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
        editGroupon(data, this.props.location.state.data.id).then(r=>{
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
                        <h4>拼团时间</h4>
                        <LocaleProvider locale={zh_CN}>
                            <RangePicker showTime value={this.state.timeRange} onChange={this.actDateChange} />
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
                                <Select.Option key={item['product_entity_id']} value={item['product_entity_id']} label={item['product_entity'].name} >
                                    {item['product_entity'].name}
                                </Select.Option>
                            ))}
                        </Select>
                    </li>
                    <li>
                        <h4>成团限制</h4>
                        <h5>{this.state['group_limit_desc']}</h5>
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
                        <h5>{giftInfo(this.state)}</h5>
                    </li>
                    <li>
                        <h4>是否拼团记录生成图片</h4>
                        <h5>{this.state['auto_generate_shared_picture'] ? '是' : '否'}</h5>
                    </li>
                    <li>
                        <h4>固定分享图片</h4>
                        <CustomUpload status='edit' ref={this.image} defaultImg={this.state['fixed_shared_picture']} />
                    </li>
                    <li>
                        <h4>分享文案</h4>
                        <TextArea rows={4} value={this.state.share_text} onChange={(e)=>this.onInputChange(e, 'share_text')} />
                    </li>
                    {
                        this.state.detail && <li className='richText'>
                            <h4>拼团页富文本编辑</h4>
                            <Editor ref={this.editor} default={this.state.detail} />
                        </li>
                    }

                </ul>
            </div>
        );
    }
}

export default EditGroupon;
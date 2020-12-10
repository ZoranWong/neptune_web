import React from "react";
import {Cascader, Modal, DatePicker, Select} from "antd";
import moment from 'moment';
import '../../SummaryOrders/css/modal.sass'
import {regions} from "../../../../api/common";
import _ from "lodash";

const {Option} = Select;
const startHours = [];
const endHours = [];
const MAX_TIME = 24;
for (let i = 0; i < MAX_TIME; i++) {
    startHours.push({
        label: `${i}点`,
        value: i
    });
    endHours.push({
        label: `${i + 1}点`,
        value: i + 1
    });
}
export default class SelectPosition extends React.Component {


    state = {
        regions: [],
        position: [],
        deliveryDate: moment(),
        deliveryStartTime: 0,
        deliveryEndTime: 24
    };

    componentDidMount() {
        regions({}).then(r => {
            r.forEach(item => {
                item.children.forEach(area => {
                    area.children.unshift({
                        region_code: null,
                        name: '全部',
                        children: []
                    })
                });
                item.children.unshift({
                    region_code: null,
                    name: '全部',
                    children: []
                })
            });
            this.setState({regions: r})
        }).catch(_ => {
        });
    }

    onPositionChange = (e) => {
        this.setState({position: e})
    };

    handleCancel = () => {
        this.props.onCancel()
    };

    handleSubmit = () => {
        let reg = this.state.position;
        let index = _.findIndex(reg, (region) => {
            if (this.props.type === 'deliveryOrders') {
                return region === '全部'
            } else {
                return !region
            }

        });
        let params = {};
        if (index > -1) {
            if (index === 1 && reg[index - 1]) {
                params.key = this.props.type === 'deliveryOrders' ? 'province' : 'shop_province_code';
                params.value = reg[index - 1];
            } else if (index === 2 && reg[index - 1]) {
                params.key = this.props.type === 'deliveryOrders' ? 'city' : 'shop_city_code';
                params.value = reg[index - 1];
            }
        } else {
            if(reg[reg.length - 1]) {
                params.key = this.props.type === 'deliveryOrders' ? 'area' : 'shop_area_code';
                params.value = reg[reg.length - 1];
            }
        }
        let deliveryDate = null;
        let deliveryTime = null;
        if (this.props.deliveryDateShow) {
            deliveryDate = this.state.deliveryDate.format('YYYY-MM-DD');
        }

        if (this.props.deliveryTimeShow) {
            deliveryTime = [
                `${this.state.deliveryStartTime}:00:00`,
                `${this.state.deliveryEndTime < MAX_TIME ? (this.state.deliveryEndTime + ':00:00') : '23:59:59'}`
            ];
        }
        console.log(deliveryDate,deliveryTime,'vvvvvvvvvvvvvvv')
        this.props.submit(params, deliveryDate, deliveryTime);
        this.handleCancel();
    };
    selectDate = (date) => {
        console.log(date, '---------------');
        this.setState({
            deliveryDate: date
        });
    };
    selectStartTime = (startTime) => {
        this.setState({
            deliveryStartTime: startTime
        });
    };
    selectEndTime = (endTime) => {
        this.setState({
            deliveryEndTime: endTime
        });
    };

    render() {
        const {selectedItems} = this.state;
        const flex = {
            display: 'flex'
        };
        const span = {
            margin: '6px'
        };
        return (
            <div className="refundMoney">
                <Modal
                    title="查询条件"
                    width={520}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    okText="确定"
                    cancelText="取消"
                >
                    <ul className='mainUl'>
                        {
                            !this.props.deliveryDateShow ? '' : (<li>
                                <span>配送日期:</span>
                                <DatePicker defaultValue={this.state.deliveryDate} onChange={this.selectDate}/>
                            </li>)
                        }
                        {
                            !this.props.deliveryTimeShow ? '' : (<li>
                                <span>配送时间:</span>
                                <div style={flex}>
                                    <Select style={{width: 120}} defaultValue={this.state.deliveryStartTime}
                                            onChange={this.selectStartTime}>
                                        {
                                            startHours.map((option, index) => (this.state.deliveryEndTime <= option.value ? '' :
                                                <Option key={index} value={option.value}>{option.label}</Option>))
                                        }
                                    </Select>
                                    <span style={span}>到</span>
                                    <Select style={{width: 120}} defaultValue={this.state.deliveryEndTime}
                                            onChange={this.selectEndTime}>
                                        {
                                            endHours.map((option, index) => (this.state.deliveryStartTime >= option.value ? '' :
                                                <Option key={index} value={option.value}>{option.label}</Option>))
                                        }
                                    </Select>
                                </div>
                            </li>)
                        }
                        <li>
                            <span>地区:</span> {
                            this.props.type === 'deliveryOrders' ? <Cascader
                                options={this.state.regions}
                                onChange={this.onPositionChange}
                                placeholder="请选择省市区"
                                fieldNames={{label: 'name', value: 'name', children: 'children'}}
                                className='positionCascader'
                            /> : <Cascader
                                options={this.state.regions}
                                onChange={this.onPositionChange}
                                placeholder="请选择省市区"
                                className='positionCascader'
                                fieldNames={{label: 'name', value: 'region_code', children: 'children'}}
                            />
                        }

                        </li>
                    </ul>

                </Modal>
            </div>
        )
    }


}

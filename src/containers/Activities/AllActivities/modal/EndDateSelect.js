import React, {Component} from 'react';
import {DatePicker, ConfigProvider, Modal} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

class EndDateSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            end_date: ''
        }
    }


    handleCancel = () => {
        this.props.onClose()
    };

    onDateChange = (date, dateString, type) => {
        this.setState({[type]: dateString})
    };

    submit = () => {
        this.props.onSubmit(this.state['end_date'])
        this.handleCancel()
    };


    render() {
        return (
            <div>
                <Modal
                    title="活动结束时间选择"
                    width={520}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    onOk={this.submit}
                    maskClosable={false}
                    okText='确定'
                    cancelText='取消'
                >
                    <ul className="mainUl">
                        <li>
                            <span className="left">结束时间:</span>
                            <ConfigProvider locale={zh_CN}>
                                <DatePicker style={{width: '300px'}} disabledDate={this.disabledDate} onChange={(date,dateString)=>this.onDateChange(date, dateString, 'end_date')} />
                            </ConfigProvider>
                        </li>
                    </ul>
                </Modal>
            </div>
        );
    }
}

export default EndDateSelect;
import React, {Component} from 'react';
import {Modal, Radio} from "antd";

class SelectType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'REWARD'
        }
    }

    onChange = (e) => {
        this.setState({type: e.target.value})
    };

    handleCancel = () => {
        this.props.onClose()
    };


    handleSubmit = () => {
        this.props.typeSelect(this.state.type)
    };

    render() {
        const sales = [
            {
                value: 'REWARD',
                name: '奖励'
            },
            {
                value: 'PUNISHMENT',
                name: '惩罚'
            }
        ];
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div>
                <Modal
                    title='选择调整类型'
                    width={520}
                    centered={true}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    okText='确定'
                    cancelText='返回上一页'
                    maskClosable={false}
                >
                    <div style={{display: 'flex', justifyContent: 'flex-start',alignItems: 'center',marginBottom: '20px',}}>
                        <span>调整类型</span>
                        <div style={{marginLeft: '20px'}}>
                            <Radio.Group onChange={(e)=>this.onChange(e)} value={this.state.type}>
                                {
                                    sales.map(item=>(
                                        <Radio style={radioStyle} value={item.value}>
                                            {item.name}
                                        </Radio>
                                    ))
                                }
                            </Radio.Group>
                        </div>
                    </div>
                </Modal>

            </div>
        );
    }
}

export default SelectType;
import React, {Component} from 'react';
import {Input, Modal, Upload, Button, message, Icon} from "antd";
import Config from '../../../../config/app'
class AdjustMuchBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remark: ''
        }
    }

    handleCancel = () => {
        this.props.onClose();
    };

    handleSubmit = () => {
        if (!this.state.remark) {
            message.error('请填写备注');
            return
        }
    };

    render() {
        let strategy = 'MERCHANT_BALANCE_ADJUST';
        let that = this;
        const props = {
            name: 'file',
            action: `${Config.apiUrl}/api/backend/import`,
            data: {
                strategy: 'MERCHANT_BALANCE_ADJUST',
                import_mode: 'IMMEDIATE',
                remark: this.state.remark,
            },
            headers: {
                authorization: 'authorization-text',
            },
            beforeUpload () {
                if (!that.state.remark) {
                    message.error('请填写备注');
                    return false
                }
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                    that.handleCancel();
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div>
                <Modal
                    title="批量调整余额"
                    width={520}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    okText="确定"
                    cancelText="取消"
                >
                    <ul className="mainUl">
                        <li className="normalLi">
                            <span className="left c_left">备注</span>
                            <Input className="liInput" type="text" value={this.state.remark} onChange={(e)=>{
                                this.setState({remark: e.target.value})
                            }} />
                        </li>
                        <li  className="normalLi">
                            <span className="left c_left">上传文件</span>
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> 点击上传文件
                                </Button>
                            </Upload>
                        </li>
                    </ul>
                </Modal>
            </div>
        );
    }
}

export default AdjustMuchBalance;
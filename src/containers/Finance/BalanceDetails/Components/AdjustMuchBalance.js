/* eslint-disable */
import React, {Component} from 'react';
import {Input, Modal, Upload, Button, message, Icon} from "antd";
import Config from '../../../../config/app';
import {dataImport} from "../../../../api/common";

class AdjustMuchBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remark: '',
            file: ''
        };
        this.loading = false
    }

    handleCancel = () => {
        this.props.onClose();
    };

    handleSubmit = () => {
        if (this.loading) {
            return
        }
        this.loading = true;
        if (!this.state.remark) {
            message.error('请填写备注');
            return
        }
        if (!this.state.file) {
            message.error('请上传文件');
            return
        }
        let formData = new FormData();
        formData.append('file', this.state.file.originFileObj);
        formData.append('strategy', 'MERCHANT_BALANCE_ADJUST');
        formData.append('import_mode', 'IMMEDIATE');
        formData.append('remark', this.state.remark);
        dataImport(formData).then(r=>{
            message.success(r.message);
            this.handleCancel();
            this.loading = false
        }).catch(error=>{
            this.loading = false;
        })
    };


    render() {
        let that = this;
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    console.log(info);
                    that.setState({file: info.file});
                    message.success(`${info.file.name} 上传成功`);
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
                    okButtonProps={
                        {disabled: this.loading}
                    }
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

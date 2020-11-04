import React, {Component} from 'react';
import {Modal} from "antd";
import Editor from "../../../../../../components/Editor/Editor";

class EditRichText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail : {}
        };
        this.editor = React.createRef();
    }


    handleCancel = () => {
        this.props.onClose();
    };

    handleSubmit = () => {
        let detail = this.editor.current?this.editor.current.state.outputHTML: this.state.detail;
        this.props.onSubmit(detail);
        this.handleCancel();
    };

    render() {
        return (
            <div>
                <Modal
                    title="编辑富文本"
                    width={1000}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    onOk={this.handleSubmit}
                    okText='确定'
                    cancelText='取消'
                >
                    <Editor ref={this.editor} default={this.state.detail}  />
                </Modal>
            </div>
        );
    }
}

export default EditRichText;
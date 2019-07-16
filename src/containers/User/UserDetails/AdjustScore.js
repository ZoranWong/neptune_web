import React from 'react'
import {Modal,Input} from 'antd'
import './css/adjust_score.sass'
import {addScore} from "../../../api/user";
export default class AdjustScore extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            scoreValue:'',
            score:''
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({score:nextProps.score})
    }



    handleCancel = () =>{
        this.props.onClose()
    };
    submit = () =>{
        addScore({score_num:this.state.scoreValue},this.props.id).then(r=>{
            this.handleCancel();
            this.props.refresh()
        }).catch(_=>{})
    };

    render() {
        return (
            <div>
                <Modal
                    title="群组详情"
                    className="adjustScore"
                    width={520}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    centered={true}
                    okText="确定"
                    cancelText="取消"
                    onOk={this.submit}
                >
                    <div className="a_header">
                        现有积分 : {this.state.score}
                    </div>
                    <div className="a_body">
                        <span>增加积分</span>
                        <Input
                            value={this.state.scoreValue}
                            onChange={(e)=>{
                                this.setState({scoreValue:e.target.value})
                            }}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}
import React, {Component} from 'react';
import {message, Modal, Radio, Table} from "antd";
import _ from 'lodash'
import {handleStatistics} from "../../../../../api/distribution/statistics";

class ConfirmHandle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!nextProps.adjusted.length)  return;
        this.setState({data: nextProps.adjusted});


    }



    handleCancel = () => {
        this.props.onClose()
    };

    handleSubmit = () => {
        let {data} = this.state;
        let adjust_items = [];
        let amount_type = this.props.type === 'ADJUST_SALES_AMOUNT' ? 'sales_amount' : 'amount';
        _.map(data, item=>{
            let obj = {};
            obj['record_id'] = item.id;
            obj['adjust_data'] = [];
            let adjust_data = {};
            adjust_data.column = amount_type;
            adjust_data.opt = item.operation === '增加' ? 'add' :'sub' ;
            adjust_data.value = item.operationValue;
            obj['adjust_data'].push(adjust_data);
            obj['remark'] = item.remark;
            adjust_items.push(obj)
        });
        this.checkData(adjust_items);

    };

    checkData = (adjust_items) => {
        handleStatistics({
            adjust_type: this.props.type,
            adjust_items: adjust_items,
        },this.props.id).then(r=>{
            message.success(r.message);
            this.handleCancel()
        }).catch(_=>{})
    };
    onChange = (e) => {
        this.setState({radioValue: e.target.value})
    };


    render() {

        const columns = [
            {
                title: '店铺名称',
                dataIndex: 'shop_name',
            },
            {
                title: '店铺编号',
                dataIndex: 'shop_code',
            },
            {
                title: '个人BV',
                dataIndex: 'personal_bv',
            },
            {
                title: '调整类型',
                dataIndex: 'operation',
            },
            {
                title: '调整金额',
                dataIndex: 'operationValue',
            },
            {
                title: '备注',
                dataIndex: 'remark',
            },
        ];

        return (
            <div>
                <Modal
                    title='确定处理'
                    width={800}
                    centered={true}
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    okText='确定'
                    cancelText='取消'
                    maskClosable={false}
                >
                    {
                        this.props.type !== 'ADJUST_SALES_AMOUNT' && <div style={{color: 'red', fontWeight: 'bold',marginBottom: '20px'}}>注意：调整过余额后将不能再进行销售额调整！！！</div>
                    }
                    <div className="chart" id="s_chart">
                        <Table
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={false}
                            dataSource={this.state.data}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ConfirmHandle;
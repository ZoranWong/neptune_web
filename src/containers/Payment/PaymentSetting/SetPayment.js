import React, { Component } from 'react';
import { Input, Table, Modal, Radio, message } from 'antd';
import PaymentSettingGroup from './PaymentSettingGroup'
import SearchInput from "../../../components/SearchInput/SearchInput"
import { searchJson } from "../../../utils/dataStorage"
import "../css/paymentsrt.sass"
import _ from 'lodash';
import { getBreakfastCart, wxPayment, zfbPayment } from "../../../api/shops/shopManage";
import CustomPagination from "../../../components/Layout/Pagination"
class SetPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentdata: [],
            api: getBreakfastCart,
            visible: false,
            zfbvisible: false,
            paginationParams: {},
            imgURL: '',
        }

        this.child = React.createRef();
    }

    componentDidMount() {
        this.refresh();
    };
    // 微信配置按钮
    wxConfigure = (record) => {
        this.setState({ visible: true, record: record })//merchant_name: record.name, subgroup_id: record.id 
    }

    handleCancel = e => {
        this.setState({
            visible: false, app_id: ''
        });
    };
    // 支付宝配置按钮
    zfbConfigure = (record) => {
        let subgroup = record.id
        let img = 'http://neptune.klsfood.cn/api/backend/ali/' + `${subgroup}` + '/auth_qr_code'
        this.setState({ zfbvisible: true, imgURL: img })
    }
    zfbhandleOk = e => {
        this.setState({ zfbvisible: false, });
    };

    zfbhandleCancel = e => {
        ;
        this.setState({ zfbvisible: false });

    };
    refresh = () => {
        this.child.current.pagination(this.child.current.state.current)
    };

    // 头部搜索框
    search = (value) => {
        this.setState({
            api: getBreakfastCart,
            paginationParams: {
                ...this.state.paginationParams,
                searchJson: searchJson({ search: value })
            }
        }, () => {
            this.child.current.pagination(this.child.current.state.current)
        });
    };

    paginationChange = (list) => {
        this.setState({ paymentdata: list })
    };
    clearAll = () => {
        // this.refresh()
        window.location.reload()
    }

    render() {

        const columns = [
            {
                title: '早餐车分组名称',
                dataIndex: 'name',
            },
            {
                title: '商户号简称（微信）',
                render: ((text, record) =>
                    <div>
                        {
                            record.payment.map((item, index) => {
                                if (item.type == '微信') {
                                    return item.merchant_name
                                }

                            })
                        }
                    </div>
                )
            },
            {
                title: '商户号名称（支付宝）',
                render: ((text, record) =>
                    <div>

                        {
                            record.payment.map((item, index) => {
                                if (item.type == '支付宝') {
                                    return item.merchant_name
                                }
                            })
                        }
                    </div>)
            },
            {
                title: '状态',
                render: (text, record) =>
                    <div>
                        {
                            !record.is_wx_pay ? <span style={{ 'color': 'red' }}>微信未配置</span> : <span>微信已配置</span>
                        }
                    /
                    {
                            !record.is_ali_pay ? <span style={{ 'color': 'red' }}>支付宝未配置</span> : <span>支付宝已配置</span>
                        }
                    </div>
            },
            {
                title: '操作',
                render: (text, record) =>
                    <div>
                        <span
                            style={{ 'color': '#4F9863', 'cursor': 'pointer' }}
                            onClick={() => this.wxConfigure(record)}
                        >微信配置
                        </span>/
                        <span
                            style={{ 'color': '#4F9863', 'cursor': 'pointer' }}
                            onClick={() => this.zfbConfigure(record)}
                        >支付宝配置
                        </span>

                    </div>
            }, ,
        ]


        return (
            <div className='bannerSetting'>

                {/* 微信配置 */}
                <PaymentSettingGroup
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    refresh={this.refresh}
                    record={this.state.record}
                />
                {/* 支付宝配置 */}

                <Modal
                    title="支付宝配置"
                    visible={this.state.zfbvisible}
                    onOk={this.zfbhandleOk}
                    onCancel={this.zfbhandleCancel}
                >
                    <h3>请用商户支付扫码进行授权，授权通过后，服务商模式设置成功</h3>
                    <img style={{ margin: '0 60px' }} src={this.state.imgURL} />


                </Modal>
                <div className="payment-top">
                    <span className="payment-tille">支付设置</span>
                    <span>服务商模式下为商户配置支付</span>
                </div>

                <div className="chart">
                    <div style={{ margin: '10px' }}>
                        <SearchInput
                            getDatas={this.search}
                            text='请输入早餐分组名称'
                        />
                        <span onClick={this.clearAll} style={{ color: '#4F9863', cursor: 'pointer' }}>清空搜素条件</span>

                    </div>

                    <Table
                        dataSource={this.state.paymentdata}
                        rowKey={record => record.id}
                        pagination={false}
                        columns={columns}
                        rowClassName={(record, index) => {
                            let className = '';
                            if (index % 2) className = 'dark-row';
                            return className;
                        }}
                    >

                    </Table>
                </div>
                <div className="pagination">
                    <CustomPagination
                        api={this.state.api}
                        text="条数据"
                        ref={this.child}
                        params={this.state.paginationParams}
                        current={this.state.current}
                        valChange={this.paginationChange}
                    />
                </div>
            </div>
        );
    }
}

export default SetPayment;

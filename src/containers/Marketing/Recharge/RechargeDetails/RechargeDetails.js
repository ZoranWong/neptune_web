import React, {Component} from 'react';
import {message, Modal, Table,Button} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {exchangeCodes, stopCode,getTodayActive} from "../../../../api/marketing/cards";
import {searchJson} from "../../../../utils/dataStorage";
import '../css/details.sass'
let logic_conditions = {
    conditions: [
        {
            key: 'consume_card_exchange_code_state',
            operation: '=',
            value: 0
        }
    ],
    logic: 'and'
};
class RechargeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            activeData:[],
            api: exchangeCodes,
            activeTab: 0,
            paginationParams:{
                logic_conditions:[],
                searchJson: searchJson({logic_conditions: logic_conditions})
            },
            current: 1,
            id: null,
            data: []
        };
        this.child = React.createRef()
    };

    componentDidMount() {
        this.setState({id: this.props.location.state.id})
        
    }

    refresh = (key)=>{
        // let logic_conditions = {
        //     conditions: [
        //         {
        //             key: 'consume_card_exchange_code_state',
        //             operation: '=',
        //             value: key
        //         }
        //     ],
        //     logic: 'and'
        // };
        this.setState({
            filterVisible:false,
            paginationParams:{
                // "searchJson[status]":key
                status:key
            }
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        })
    };
    // 获取今日激活
    todatActive= e=>{
        console.log(111)
        getTodayActive({},this.state.id).then(r=>{
            // let activesdata=[];
            // activesdata.push(r)
            this.setState({activeData:r.data})
            console.log(this.state.activeData.name,'wwwwwwwwwwwwwwwwwwwwwwwwwww')
        })
        this.setState({visible:true})
    }
    handleCancel =()=>{
        this.setState({visible:false})

    }
    handleOk =()=>{
        this.setState({visible:false})

    }
    // 停用
    stopExchange = (id) => {
        let refresh = this.refresh;
        let {activeTab} = this.state;
        let confirmModal = Modal.confirm({
            title: (
                <div className= 'u_confirm_header'>
                    提示
                    <i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
                        confirmModal.destroy()
                    }}>&#xe82a;</i>
                </div>
            ),
            icon:null,
            width:'280px',
            closable:true,
            centered:true,
            content: (
                <div className="U_confirm">
                    确定停用该兑换码吗？
                </div>
            ),
            cancelText: '取消',
            okText:'确定',
            okButtonProps: {
                size:'small'
            },
            cancelButtonProps:{
                size:'small'
            },
            onOk() {
                // 确定按钮执行操作
                stopCode({},id).then(r=>{
                    message.success(r.message);
                    refresh(activeTab)
                })
            }
        });
    };

    // 分页器改变值
    paginationChange = (list) =>{
        this.setState({data:list})
    };

    // 切换tab
    onChangeTab = (item) =>{
        this.setState({activeTab:item.key},()=>this.refresh(item.key));
       
    };



    render() {
        // const activeColnmns=[
        //     {
        //         title: '充值卡名称',
        //         dataIndex: 'name',
        //     },
        //     {
        //         title: '已使用人数',
        //         dataIndex: 'total_used_count',
        //     },
        //     {
        //         title: '已激活人数',
        //         dataIndex: 'total_active_count',
        //     },
        //     {
        //         title: '已使用金额',
        //         dataIndex: 'total_used_amount',
        //     },
        //     {
        //         title: '今日使用人数',
        //         dataIndex: 'today_used_count',
        //     },
        //     {
        //         title: '今日激活人数',
        //         dataIndex: 'today_active_count',
        //     },
        //     {
        //         title: '今日使用金额',
        //         dataIndex: 'today_used_amount',
        //     }
        // ];
        const columns = [
            {
                title: '兑换码',
                dataIndex: 'exchange_code',
            },
            {
                title: '兑换人昵称',
                dataIndex: 'user_nickname',
                render: (text, record) => (
                    <span>{text || '无'}</span>
                )
            },
            {
                title: '兑换人手机号',
                dataIndex: 'user_mobile',
                render: (text, record) => (
                    <span>{text || '无'}</span>
                )
            },
            {
                title: '兑换时间',
                dataIndex: 'exchange_time',
                render: (text, record) => (
                    <span>{text || '无'}</span>
                )
            },
            {
                title: '状态',
                dataIndex: 'state_desc',
            },
            {
                title: '操作',
                render: (text,record) =>
                    <div>
                        {
                            record.state === 0 && <span
                                style={{'color':'#4F9863','cursor':'pointer','marginRight' : '10px'}}
                                onClick={()=>this.stopExchange(record.id)}
                            >停用
						</span>
                        }
                    </div>
            },
        ];
        const tabs = [
            {name:'未兑换',key:0},
            {name:'已兑换',key:1},
            {name:'已停用',key:2},
            {name:'已过期',key:3}
        ];

        return (
            <div className='cardDetails'>
                 <Modal
                    // width={1200}
                    title="激活人数"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                     {/* <Table
                        columns={activeColnmns}
                        dataSource={this.state.activeData}
                        rowKey={record => record.id}
                        rowClassName={(record, index) => {
                            let className = '';
                            if (index % 2 ) className = 'dark-row';
                            return className;
                        }}
                    /> */}
                    <ul className="forms">
                        <li>
                            <h4>充值卡名称</h4>
                            <h5>{this.state.activeData.name}</h5>
                        </li>
                        <li>
                            <h4>已使用人数</h4>
                            <h5>{this.state.activeData.total_used_count}</h5>
                        </li>
                        <li>
                            <h4>已激活人数</h4>
                            <h5>{this.state.activeData.total_active_count}</h5>
                        </li>
                        <li>
                            <h4>已使用金额</h4>
                            <h5>{this.state.activeData.total_used_amount}</h5>
                        </li>
                        <li>
                            <h4>今日使用人数</h4>
                            <h5>{this.state.activeData.today_used_count}</h5>
                        </li>
                        <li>
                            <h4>今日激活人数</h4>
                            <h5>{this.state.activeData.today_active_count}</h5>
                        </li>
                        <li>
                            <h4>今日使用金额</h4>
                            <h5>{this.state.activeData.today_used_amount}</h5>
                        </li>
                    </ul>
                </Modal>


                <div className="tabs">
                    <ul className="left">
                        {
                            tabs.map((item,index)=>{
                                return <li
                                    key={index}
                                    className={this.state.activeTab == item.key?'active':''}
                                    onClick={()=>this.onChangeTab(item)}
                                >{item.name}</li>
                            })
                        }
                        <li onClick={(e)=>this.todatActive()}>
                            今日激活
                        </li>
                    </ul>
                </div>
                <div className="chart">
                    <Table
                        dataSource={this.state.data}
                        rowKey={record => record.id}
                        pagination={false}
                        columns={columns}
                        rowClassName={(record, index) => {
                            let className = '';
                            if (index % 2 ) className = 'dark-row';
                            return className;
                        }}
                    >

                    </Table>
                </div>
                <div className="pagination">
                    <CustomPagination
                        api={this.state.api}
                        text="条充值码"
                        id={this.state.id}
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

export default RechargeDetails;
import React, { Component } from 'react';
import { Input, Modal, message, Button, Table, Tooltip } from "antd";
import './css/breakfastCart.sass'
import OperateGroup from './Moda/OperateGroup'
import CustomPagination from "../../../components/Layout/Pagination";
import {getBreakfastCart,delBreakfastCart} from "../../../api/shops/shopManage";

class BreakfastCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api:getBreakfastCart,
      visible: false,
      data: [
        // {
        //   name: '哈哈哈哈哈哈哈哈哈哈少时诵诗书所所所',
        //   time: '111',
        //   id: 1,
        //   remarks: '哈哈哈哈哈哈哈哈哈哈aaaa'
        // }
      ]
    }
    this.child = React.createRef();
  }
  paginationChange = (list) => {
    this.setState({ data: list })
  };

  refresh = () => {
    this.child.current.pagination(this.child.current.state.current)
  };
  // 新增早餐车组
  addNew = () => {
    this.setState({ visible: true, record: {} });
  };
  closeNew = () => {
    this.setState({ visible: false })
  };
  // 编辑早餐车组
  editShops = (record) => {
    this.setState({ visible: true, record: record })
  };
  // 添加店铺
  addShops = (record) => {
    this.props.history.push({pathname:"/shops",state:{id:record.id,path:'/shops'}})
    console.log(record)
  }
  //详情
  detailShops = (record) => {
    this.props.history.push({pathname:"/shops/SupervisionDetails",state:{id:record.id,path:'/shops'}})
    console.log(record)
  }
  // 删除组
  deleteShops = (record) => {
    console.log(record)

    delBreakfastCart({},record.id).then(r => {
        message.success(r.message);
        this.refresh()
      }).catch(_ => {})
  }

  render() {
    const columns = [
      {
        title: '分组名称',
        // dataIndex: 'name',
        render:(text,record) =>
          <Tooltip title={record.name}>
            <span style={{'overflow': 'hidden','textOverflow': 'ellipsis','whiteSpace': 'nowrap',width:'140px',display:'block'}}>{record.name}</span>
          </Tooltip>
      },
      {
        title: '创建时间',
        dataIndex: 'create_at',
      },
      {
        title: '备注',
        // dataIndex: 'remarks',
        render:(text,record) =>
          <Tooltip title={record.remarks}>
            <span style={{'overflow': 'hidden','textOverflow': 'ellipsis','whiteSpace': 'nowrap',width:'140px',display:'block'}}>{record.remarks}</span>
          </Tooltip>
      },
      {
        title: '操作',
        render: (text, record) =>
          <div>
            <span
              style={{ 'color': '#4F9863', 'cursor': 'pointer', marginRight: '20px' }}
              onClick={() => this.addShops(record)}
            >添加店铺
                  </span>
            <span
              style={{ 'color': '#4F9863', 'cursor': 'pointer', marginRight: '20px' }}
              onClick={() => this.detailShops(record)}
            >详情
                  </span>
            <span
              style={{ 'color': '#4F9863', 'cursor': 'pointer', marginRight: '20px' }}
              onClick={() => this.editShops(record)}
            >编辑
                  </span>
            <span
              style={{ 'color': '#4F9863', 'cursor': 'pointer' }}
              onClick={() => this.deleteShops(record)}
            >删除
                  </span>
          </div>
      },
    ];

    return (
      <div>
        <OperateGroup
          visible={this.state.visible}
          onCancel={this.closeNew}
          refresh={this.refresh}
          record={this.state.record}
        />
        <div className='brackfast-top'>
          <h2>早餐车</h2>
          <span>该模块主要适用于早餐车主的支付配置，例如：A批次的早餐车主绑定A商户号，B批次的早餐车主绑定B商户号。那么可创建两个分组A，B,各自
                      添加早餐车主。</span>
        </div>
        <div>
          <Button onClick={this.addNew}>新增早餐车组</Button>
          <Table
            dataSource={this.state.data}
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
            ref={this.child}
            valChange={this.paginationChange}
          />
        </div>

      </div>
    )
  }
}

export default BreakfastCart;
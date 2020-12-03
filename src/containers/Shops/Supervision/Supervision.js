import React, { Component } from 'react';
import { Input, Modal, message, Button, Table,Tooltip } from "antd";
import SuoervisionGroup from './Moda/SupervisionGroup'
import CustomPagination from "../../../components/Layout/Pagination";
import {getSupervision,delSupervision} from "../../../api/shops/shopManage";
class Supervision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api:getSupervision,
      visible: false,
      data: []
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
    console.log(record)
    this.props.history.push({pathname:"/shops/SupervisionDetails",state:{id:record.id,path:'/shops'}})
    
  }
  // 删除组
  deleteShops = (record) => {
    console.log(record)
    // window.location.reload()

    delSupervision({},record.id).then(r => {
        message.success(r.message);
        this.refresh()
      }).catch(_ => {})//this.setState({handleCancel:true})
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
        <SuoervisionGroup
          visible={this.state.visible}
          onCancel={this.closeNew}
          refresh={this.refresh}
          record={this.state.record}
        />
        <div className='brackfast-top'>
          <h2>督导组</h2>
        </div>
        <div>
          <Button onClick={this.addNew}>新增督导组</Button>
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

export default Supervision;
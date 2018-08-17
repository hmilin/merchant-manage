import React, { Component } from 'react';
import './oderlist.css';
import { Breadcrumb, Table } from 'antd';
import { getorderlist } from "../../api/getorderlist";

class Oderlist extends Component {
  constructor() {
    super();
    this.state = {
      orderColumns:[
        { title: '商店名', dataIndex: 'name', key: 'name' },
        { title: '地址', dataIndex: 'address', key: 'address' },
        { title: '电话', dataIndex: 'phone', key: 'phone' },
        { title: '类型', dataIndex: 'category', key: 'category' },
        { title: '月销量', dataIndex: 'month_sales', key: 'month_sales'}
      ],
      orderData:[]
    }
  }

  componentWillMount() {
    getorderlist({}).then((response) => {
      console.log(response);
    })
  }

  render() {
    return (
      <div id="oderlist">
        <Breadcrumb>
          <Breadcrumb.Item>数据管理</Breadcrumb.Item>
          <Breadcrumb.Item>订单列表</Breadcrumb.Item>
        </Breadcrumb>
        <Table
          columns={this.state.orderColumns}
          dataSource={this.state.orderData}
          id="table"
        />
      </div>
    );
  }
}

export default Oderlist;
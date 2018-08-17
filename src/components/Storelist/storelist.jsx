import React, { Component } from 'react';
import './storelist.css';
import { Breadcrumb, Table } from 'antd';
import { getstorelist } from "../../api/getstorelist";


class Storelist extends Component {
  constructor() {
    super();
    this.state = {
      storeColumns:[
        { title: '商店名', dataIndex: 'name', key: 'name' },
        { title: '地址', dataIndex: 'address', key: 'address' },
        { title: '电话', dataIndex: 'phone', key: 'phone' },
        { title: '类型', dataIndex: 'category', key: 'category' },
        { title: '月销量', dataIndex: 'month_sales', key: 'month_sales'}
      ],
      storeData:[]
    }
  }
  componentWillMount() {
    getstorelist({}).then((response) => {
      if(response.data.code === 200)
      {
        let list = response.data.data;
        let storeData = this.state.storeData;
        for(let i=0; i<list.length; i++)
        {
          storeData[i] = {
            key: i+1,
            name: list[i].name,
            address: list[i].address,
            phone: list[i].call_center,
            category: list[i].third_category,
            month_sales: list[i].month_sales_tip
          }
        }
        this.setState({
          storeData
        });
      }
    });
  }
  render() {
    return (
      <div id="storelist">
        <Breadcrumb>
          <Breadcrumb.Item>数据管理</Breadcrumb.Item>
          <Breadcrumb.Item>商家列表</Breadcrumb.Item>
        </Breadcrumb>
        <Table
          columns={this.state.storeColumns}
          dataSource={this.state.storeData}
          id="table"
        />
      </div>
    );
  }
}

export default Storelist;
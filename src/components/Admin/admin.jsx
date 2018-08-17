import React, { Component } from 'react';
import { Breadcrumb, Table } from 'antd';
import { getuserlist } from '../../api/getuserlist';
import moment from 'moment';

class Adminlist extends Component {
  constructor(){
    super();
    this.state = {
      adminColumns:[
        { title: '用户名', dataIndex: 'name', key: 'name' },
        { title: '地区', dataIndex: 'address', key: 'address' },
        { title: '注册时间', dataIndex: 'date', key: 'date',defaultSortOrder: 'descend', sorter: (a, b) => parseInt(a.date) - parseInt(b.date) }
      ],
      adminData:[]
    }
  }
  componentWillMount(){
    getuserlist({status:2}).then((response) => {
      if(response.data.code === 200) {
        let list = response.data.data;
        let adminData = this.state.adminData;
        for (let i = 0; i < list.length; i++) {
          adminData[i] = {
            key: i + 1,
            name: list[i].username,
            address: list[i].city,
            date:moment(list[i].create_time).format('YYYY-MM-DD hh:mm:ss')
          }
        }
        this.setState({
          adminData
        });
      }
    })
  }
  render() {
    return (
      <div id="userlist">
        <Breadcrumb>
          <Breadcrumb.Item>数据管理</Breadcrumb.Item>
          <Breadcrumb.Item>管理员列表</Breadcrumb.Item>
        </Breadcrumb>
        <Table
          columns={this.state.adminColumns}
          dataSource={this.state.adminData}
          id="table"
        />
      </div>
    );
  }
}

export default Adminlist;
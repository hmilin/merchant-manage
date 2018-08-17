import React, { Component } from 'react';
import './userlist.css';
import { Breadcrumb, Table } from 'antd';
import { getuserlist } from '../../api/getuserlist';
import moment from 'moment';

class Userlist extends Component {
  constructor(){
    super();
    this.state = {
      userColumns:[
        { title: '用户名', dataIndex: 'name', key: 'name' },
        { title: '地区', dataIndex: 'address', key: 'address' },
        { title: '注册时间', dataIndex: 'date', key: 'date' }
      ],
      userData:[]
    }
  }
  componentWillMount(){
    getuserlist({status:1}).then((response) => {
      if(response.data.code === 200) {
        console.log(response.data.data);
        let list = response.data.data;
        let userData = this.state.userData;
        for (let i = 0; i < list.length; i++) {
          userData[i] = {
            key: i + 1,
            name: list[i].username,
            address: list[i].city,
            date:moment(list[i].create_time).format('YYYY-MM-DD hh:mm:ss')
          }
        }
        this.setState({
          userData
        });
      }
    })
  }
  render() {
    return (
      <div id="userlist">
        <Breadcrumb>
          <Breadcrumb.Item>数据管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </Breadcrumb>
        <Table
          columns={this.state.userColumns}
          dataSource={this.state.userData}
          id="table"
        />
      </div>
    );
  }
}

export default Userlist;
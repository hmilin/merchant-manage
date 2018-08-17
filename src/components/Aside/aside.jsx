import React, { Component } from "react"
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import "./aside.css";

const SubMenu = Menu.SubMenu;

class Aside extends React.Component{
  constructor() {
    super();
    this.state = {
      current: 'home'
    }
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu onClick={this.handleClick.bind(this)}
            selectedKeys={[this.state.current]}
            mode="inline"
            theme="dark"
            className="menu"
      >
        <Menu.Item key="home" ><Link to='/layout/home'>
          <Icon type="home" />首页</Link>
        </Menu.Item>
        <SubMenu title={<span><Icon type="appstore" />数据管理</span>}>
          <Menu.Item key="data:1" ><Link to='/layout/userlist'>用户列表</Link></Menu.Item>
          <Menu.Item key="data:2" ><Link to='/layout/storelist'>商家列表</Link></Menu.Item>
          <Menu.Item key="data:3" ><Link to='/layout/goodlist'>食物列表</Link></Menu.Item>
          <Menu.Item key="data:4" ><Link to='/layout/oderlist'>订单列表</Link></Menu.Item>
          <Menu.Item key="data:5" ><Link to='/layout/adminlist'>管理员列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu title={<span><Icon type="plus"/>数据添加</span>}>
          <Menu.Item key="add:1" ><Link to='/layout/addstore'>添加商店</Link></Menu.Item>
          <Menu.Item key="add:2" ><Link to='/layout/addtype'>添加分类</Link></Menu.Item>
          <Menu.Item key="add:3" ><Link to='/layout/addgood'>添加商品</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="user" ><Link to='/layout/user'>
          <Icon type="bar-chart" />用户统计</Link>
        </Menu.Item>
        <Menu.Item key="setting" ><Link to='/layout/setting'>
          <Icon type="setting" />设置</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Aside;
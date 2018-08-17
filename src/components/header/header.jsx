import React, { Component } from 'react';
import './header.css';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { exit } from '../../api/exit';

class Header extends Component{
    constructor(){
      super();
      this.state={
        userName:sessionStorage.getItem("username")
      }
    }

    exitLogin =() => {
      exit({}).then((response) => {
        if(response.data.code === 200)
        {
          sessionStorage.removeItem("username");
          this.props.history.push('/');
        }
      })
    }

    render(){
      return (
        <div className="header">
          <Row>
            <Col offset="20" span="2">
              <span>{ this.state.userName }您好</span>
            </Col>
            <Col  span="2" >
              <span onClick={this.exitLogin} className='exit'>退出登录</span>
            </Col>
          </Row>
        </div>
      );
    }
}

export default Header;
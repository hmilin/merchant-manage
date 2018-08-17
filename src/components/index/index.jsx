import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Header from '../header/header';
import Aside from '../Aside/aside';
import Addgood from "../Addgood/addgood";
import Home from "../Home/home";
import Goodlist from "../Goodlist/goodlist";
import Userlist from "../Userlist/userlist";
import User from "../User/user";
import Storelist from "../Storelist/storelist";
import Setting from "../Setting/setting";
import Oderlist from "../Oderlist/oderlist";
import Addstore from "../Addstore/addstore";
import Addtype from "../Addtype/addtype";
import Adminlist from "../Admin/admin";
import { Row, Col } from 'antd';
import './index.css';

class Index extends Component {
  render() {
    return (
      <div id="index">
        <Row >
          <Col span="4" >
            <Aside />
          </Col>
          <Col span="20">
            <div id="right">
              <Header history={this.props.history} />
              <Row className="content">
              <Switch>
                <Route path='/layout/home' component={ Home } />
                <Route path='/layout/addstore' component={ Addstore } />
                <Route path='/layout/addgood' component={ Addgood } />
                <Route path='/layout/addtype' component={ Addtype } />
                <Route path='/layout/setting' component={ Setting } />
                <Route path='/layout/goodlist' component={ Goodlist } />
                <Route path='/layout/adminlist' component={ Adminlist } />
                <Route path='/layout/oderlist' component={ Oderlist } />
                <Route path='/layout/storelist' component={ Storelist } />
                <Route path='/layout/userlist' component={ Userlist } />
                <Route path='/layout/user' component={ User } />
                <Redirect to='/layout/home' />
              </Switch>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Index;
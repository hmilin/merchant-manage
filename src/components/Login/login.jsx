import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import './login.css';
import { login } from '../../api/login';
const FormItem = Form.Item;

function noop() {
  return false;
}

class Login extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login({username:values.userName,password:values.password}).then((response) =>{
          if(response.data.code === 200)
          {
            message.success('登录成功！');
            sessionStorage.setItem("username", values.userName);
            this.props.history.push('/layout');
          }else if((response.data.status === -1)||(response.data.code === -1))
          {
            message.error('密码错误，该用户名已被注册！');
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login">
        <h1>后台管理系统</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录/注册
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }

}
Login = Form.create()(Login);
export default Login;

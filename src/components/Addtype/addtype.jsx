import React, { Component } from 'react';
import { Breadcrumb, Form, Input, Button, Select, message } from 'antd';
import { getstorelist } from "../../api/getstorelist";
import { addtype } from "../../api/addtype";
import './addtype.css';

const FormItem = Form.Item;
const Option = Select.Option;

class Addtype extends React.Component {
  constructor() {
    super();
    this.state = {
      storeList: []
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //提交
        addtype({category_name: values.category_name, restaurant_id: values.storeName}).then((response) => {
          console.log(response);
          if(response.data.code === 200)
          {
            message.success('添加分类成功！');
            this.props.form.resetFields();
          }
          else{
            message.error('添加失败！')
          }
        })

      }
    });
  }

  componentWillMount() {
    getstorelist({}).then((response) => {
      if (response.data.code === 200) {
        //将返回的商店列表存起来
        this.setState({
          storeList:response.data.data
        });
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 5},
    };
    return (
      <div id="addtype">
        <Breadcrumb>
          <Breadcrumb.Item>数据添加</Breadcrumb.Item>
          <Breadcrumb.Item>添加分类</Breadcrumb.Item>
        </Breadcrumb>
        <div id="type-form">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="店铺名"
            >
              {getFieldDecorator('storeName', {
                rules: [{
                  required: true, message: '必填',
                }],
              })(
                <Select
                  showSearch
                  style={{width: 200}}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {this.state.storeList.map((item, index) => (
                    <Option value={item.id} key={index}>{item.name}</Option>
                  ))
                  }
                </Select>
              )}
            </FormItem>
              <FormItem
                {...formItemLayout}
                label="分类名称"
              >
                {getFieldDecorator('category_name', {
                  rules: [{
                    required: true, message: '必填',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            <FormItem
              wrapperCol={{span: 12, offset: 8}}
            >
              <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

Addtype = Form.create()(Addtype);
export default Addtype;
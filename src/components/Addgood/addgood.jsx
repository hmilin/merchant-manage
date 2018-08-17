import React, {Component} from 'react';
import {Breadcrumb, Form, Input, Button, Select, message, Col, Upload, Icon} from 'antd';
import './addgood.css';
import {addfood} from "../../api/addfood";
import {getstorelist} from "../../api/getstorelist";
import { gettypelist } from "../../api/gettypelist";
import {uploadtoken} from "../../api/uploadtoken";

const FormItem = Form.Item;
const Option = Select.Option;


class Addgood extends Component {
  constructor() {
    super();
    this.state = {
      storelist: [],
      typelist: [],
      uptoken: {token: ''},
      imgKey:'',
      baseURL:'http://p3d0ne50u.bkt.clouddn.com/',
      storeID:'',
      categoryID:''
    }
  }

  //上传头像
  beforeUpload = (file) => {
    return uploadtoken({}).then((response) => {
      if (response.data.code === 403) {
        message.error('账号过期，请重新登录!');
        sessionStorage.removeItem("username");
        this.props.history.push('/');

      } else if (response.data.code === 200) {
        let uptoken = this.state.uptoken;
        uptoken.token = response.data.uptoken;
        this.setState({
          uptoken
        })
      }
    })
  }
  handlechange = (result) =>{
    /*如果返回结果，存储*/
    if(result.file.response){
      this.setState({
        imgKey:result.file.response.key
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addfood({
          restaurant_id:this.state.storeID,
          category_id:this.state.categoryID,
          food_name:values.foodName,
          min_price:values.minPrice,
          description: values.description,
          pic_url:this.state.baseURL+this.state.imgKey,
          skus:[
            {
              spec: this.state.description,
              price: values.minPrice
            }
          ]
        }).then((response) => {
          if(response.data.code === 200){
            message.success('添加食物成功!');
            this.props.form.resetFields();
          }
        })
      }
    });
  }

  componentWillMount() {
    getstorelist({}).then((response) => {
      if (response.data.code === 200) {
        this.setState({
          storelist: response.data.data
        });
      }
    })
  }

  storeChange = (id) =>{
    gettypelist({},id).then((response) => {
      console.log(response);
      this.setState({
        storeID: id
      });
      if(response.data.code === 200){
        if(response.data.data.length === 0)
        {
          message.warning('请先添加分类!');
        }else{
          this.setState({
            typelist: response.data.data
          })
        }
      }
    })
  }

  categoryChange = (id) =>{
    this.setState({
      categoryID: id
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const uploadButton = (
      <div>
        <div className="ant-upload-text">上传照片</div>
      </div>
    );
    return (
      <div id="addgood">
        <Breadcrumb>
          <Breadcrumb.Item>数据添加</Breadcrumb.Item>
          <Breadcrumb.Item>添加商品</Breadcrumb.Item>
        </Breadcrumb>
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
                onChange={this.storeChange}
              >
                {this.state.storelist.map((item, index) => (
                  <Option value={item.id} key={index}>{item.name}</Option>
                ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="分类名"
          >
            {getFieldDecorator('typeName', {
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
                onChange={this.categoryChange}
              >
                {this.state.typelist.map((item, index) => (
                  <Option value={item.id} key={index}>{item.name}</Option>
                ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="食物名称"
          >
            {getFieldDecorator('foodName', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Col span={5}>
                <Input/>
              </Col>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="价格"
          >
            {getFieldDecorator('minPrice', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Col span={5}>
                <Input/>
              </Col>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="食物照片"
          >
            {getFieldDecorator('foodImg', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://upload-z2.qiniup.com/"
                beforeUpload={this.beforeUpload}
                onChange={this.handlechange}
                data={this.state.uptoken}
              >
                {(this.state.imgKey !== '') ? <img src={this.state.baseURL+this.state.imgKey} style={{width:'100px', height:'100px'}} alt="avatar"/> : uploadButton}
              </Upload>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('description')(
              <Input/>
            )}
          </FormItem>
          <FormItem
            wrapperCol={{span: 12, offset: 6}}
          >
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Addgood = Form.create()(Addgood);
export default Addgood;

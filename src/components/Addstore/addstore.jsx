import React, {Component} from 'react';
import './addstore.css';
import {Breadcrumb, Form, Input, InputNumber, Button, Col, TimePicker, Select, Upload, Icon, message} from 'antd';
import {getsuggestion} from '../../api/getsuggestion';
import {addstore} from "../../api/addsrore";
import {uploadtoken} from "../../api/uploadtoken";

const FormItem = Form.Item;
const Option = Select.Option;

class Addstore extends Component {
  constructor() {
    super();
    this.state = {
      reAddress: [],
      addressId: '',
      uptoken: {token: ''},
      imgKey:'',
      baseURL:'http://p3d0ne50u.bkt.clouddn.com/'
    }
  }

  beforeUpload = (file) => {
    return uploadtoken({}).then((response) => {
      if (response.data.code === 403) {
        message.error('账号过期，请重新登录!');
        sessionStorage.removeItem("username");
        this.props.history.push('/');

      } else if (response.data.code === 200) {
        let uptoken = this.state.uptoken;
        console.log('token', response.data.uptoken)
        uptoken.token = response.data.uptoken;
        this.setState({
          uptoken
        })
      }
    })
  }
  //上传头像
  handlechange = (result) =>{
    /*如果返回结果，存储*/
    if(result.file.response){
      this.setState({
        imgKey:result.file.response.key
      });
    }
  }
  //提交
  handleSubmit = (e) => {
    e.preventDefault();
    let location={};
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.state.reAddress.map((item) => {
          if (item.id === this.state.addressId) {
            //将经纬度存进location
            location = item.location;
          }
        })
        addstore({
          name: values.storeName,
          pic_url:this.state.baseURL+this.state.imgKey,
          shipping_fee: values.shippingFee,
          min_price: values.lowestPrice,
          shopping_time_start: values.startTime,
          shopping_time_end: values.endTime,
          address: values.address,
          call_center: values.phone,
          lng: location.lng,
          lat: location.lat,
          third_category: values.storeType,
          bulletin: values.notice
        }).then((response) => {
          if(response.data.code === 200)
          {
            message.success('添加商店成功！');
            this.props.form.resetFields();
          }
        })
      }
    });
  }
  onchange = (value, item) => {
    let setTime;

    setTime = setTimeout(()=>{
      getsuggestion({keyword: value}).then((response) => {
        if (response.data.code === 200) {
          this.setState({
            reAddress: response.data.data.data,
            addressId: item.key
          })
        }
        console.log(response.data.data)
      });
      clearTimeout(setTime);
    },1000);


  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const uploadButton = (
      <div>
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    return (
      <div id="addstore">
        <Breadcrumb>
          <Breadcrumb.Item>数据添加</Breadcrumb.Item>
          <Breadcrumb.Item>添加商店</Breadcrumb.Item>
        </Breadcrumb>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
          {...formItemLayout}
          label="头像"
        >
          {getFieldDecorator('storeImg', {
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
            label="店铺名"
          >
            {getFieldDecorator('storeName', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="地址"
          >
            {getFieldDecorator('address', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Select
                mode="combobox"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onChange={this.onchange}
              >
                {(this.state.reAddress!==[])?this.state.reAddress.map((item) => (
                  <Option value={item.title} key={item.id}>{item.title}</Option>
                )):(<Option value={''}>请输入地址</Option>)
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
          >
            {getFieldDecorator('phone', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="配送费"
          >
            {getFieldDecorator('shippingFee', {
                initialValue: 0,
                rules: [{
                  required: true, message: '必填',
                }]
              },
            )(
              <InputNumber min={0} max={50}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="最低起送价"
          >
            {getFieldDecorator('lowestPrice', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Col span={4}>
                <Input/>
              </Col>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="营业时间"
          >
            {getFieldDecorator('startTime', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <TimePicker/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="停业时间"
          >
            {getFieldDecorator('endTime', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <TimePicker/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="餐厅类型"
          >
            {getFieldDecorator('storeType', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Col span={6}>
                <Input/>
              </Col>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="公告"
          >
            {getFieldDecorator('notice', {})(
              <Input/>
            )}
          </FormItem>

          <FormItem
            wrapperCol={{span: 12, offset: 6}}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Addstore = Form.create()(Addstore);
export default Addstore;
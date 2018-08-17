import React, {Component} from 'react';
import './goodlist.css';
import {Breadcrumb, Form, Select, Table, Popconfirm, message} from 'antd';
import {getfoodlist} from "../../api/getfoodlist";
import {getstorelist} from "../../api/getstorelist";
import moment from 'moment';
import {deletefood} from "../../api/deletefood";

const FormItem = Form.Item;
const Option = Select.Option;

class Goodlist extends Component {
  constructor() {
    super();
    this.state = {
      storeID:0,
      storelist: [],
      listColumns: [
        {title: '食物名称', dataIndex: 'name', key: 'name'},
        {title: '所属分类', dataIndex: 'type',  key: 'type'},
        {title: '添加日期', dataIndex: 'date', key: 'date'},
        { title: '删除', dataIndex: '', key: 'x',
          render: (text, record) => (<Popconfirm title="确定删除？" onConfirm={() => this.confirm(record.key)}  okText="确定" cancelText="取消">
            <a href="javascript:;" >删除</a></Popconfirm>)}
      ],
      listData: []
    }
  }

  /*获得食物列表*/
  foodList = (id) =>{
    getfoodlist({}, id).then((response) => {
      if (response.data.code === 200) {
        let typelist = response.data.data;//分组列表
        let listData = [];
        typelist.map((item, index) => {
          if(item.spus.length > 0){
            item.spus.map(( _item, _index) => {
              listData[index*_index] = {
                key: _item.id,
                type: item.name,
                name: _item.name,
                date: moment(_item.created_at).format('YYYY-MM-DD hh:mm:ss')
              }
            })
          }
        });

        this.setState({
          listData
        })
      }

    })
  }

  handleChange = (id) => {
    this.setState({
      storeID: id
    });
    this.foodList(id)
  }

  componentWillMount() {
    //获取商店列表
    getstorelist({}).then((response) => {
      this.setState({
        storelist: response.data.data
      })
    })
  }

  /*确认删除*/
  confirm = (key) => {
    deletefood({},key).then((response) => {
      if(response.data.code === 200){
        message.success('删除食物成功!');
        this.foodList(this.state.storeID);
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div id="goodlist">
        <Breadcrumb>
          <Breadcrumb.Item>数据管理</Breadcrumb.Item>
          <Breadcrumb.Item>食物列表</Breadcrumb.Item>
        </Breadcrumb>
        <Form>
          <FormItem>
            {getFieldDecorator('storeName', {
              rules: [{
                required: true, message: '必填',
              }],
            })(
              <Select
                showSearch
                style={{width: 200}}
                placeholder="选择商店"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={this.handleChange}
              >
                {this.state.storelist.map((item, index) => (
                  <Option value={item.id} key={index}>{item.name}</Option>
                ))
                }
              </Select>
            )}
          </FormItem>
        </Form>
        <Table columns={this.state.listColumns} dataSource={this.state.listData} id="table"/>
      </div>
    );
  }
}

Goodlist = Form.create()(Goodlist);
export default Goodlist;
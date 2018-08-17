import React,{ Component } from 'react';
import './home.css';
import { getallorder } from "../../api/getallorder";
import { getalluser} from "../../api/getalluser";
import { getcountuser } from "../../api/getcountuser";
import { getallstore } from "../../api/getallstore";
import { getcountorder } from "../../api/getcountorder";
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import { Divider } from 'antd';

//首页
class Home extends Component {
  constructor() {
    super();
    this.state = {
      orderNumber: '',//订单总数
      allUser: '',//用户总数
      allAdmin: '',//管理员总数
      countUser: '',//新增用户
      countAdmin: '',//新增管理员
      storeNumber: '',//商家总数
      countOrder: '', //今日订单
      amount: [
        {genre: '商家总数', sold: 0},
        {genre: '用户总数', sold: 0},
        {genre: '管理员总数', sold: 0},
        {genre: '订单总数', sold: 0},
      ],
      amountcols: {
        sold: {alias: '总量'},
        genre: {alias: ''}
      },
      seven_change: [
        {date: '20180708', 新增用户: 2, 新增商家: 6, 新增订单: 1, 新增管理员: 3},
        {date: '20180707', 新增用户: 3, 新增商家: 4, 新增订单: 1, 新增管理员: 3},
        {date: '20180706', 新增用户: 2, 新增商家: 1, 新增订单: 0, 新增管理员: 3},
        {date: '20180705', 新增用户: 3, 新增商家: 3, 新增订单: 1, 新增管理员: 3},
        {date: '20180704', 新增用户: 7, 新增商家: 2, 新增订单: 1, 新增管理员: 3},
        {date: '20180703', 新增用户: 2, 新增商家: 1, 新增订单: 1, 新增管理员: 3},
        {date: '20180702', 新增用户: 4, 新增商家: 4, 新增订单: 1, 新增管理员: 3},
      ],
      change_cols: {
        date: {
          range: [0.1, 0.9]
        }
      },
      }
    }

  componentWillMount() {
    //获得订单总数
    getallorder({}).then((response) => {
      if (response.data.code === 200) {
        let amount = this.state.amount;
        amount[3].sold = response.data.data;
        this.setState({
          orderNumber: response.data.data,
          amount: [...amount]
        })

      }
    });
    //获得用户总数
    getalluser({status: 1}).then((response) => {
      if (response.data.code === 200) {
        let amount = this.state.amount;
        amount[1].sold = response.data.data;
        this.setState({
          allUser: response.data.data,
          amount: [...amount]
        })

      }
    });
    //获得管理员总数
    getalluser({status: 2}).then((response) => {
      if (response.data.code === 200) {
        let amount = this.state.amount;
        amount[2].sold = response.data.data;
        this.setState({
          allAdmin: response.data.data,
          amount: [...amount]
        })

      }
    });
    getcountuser({status: 1}).then((response) => {
      if (response.data.code === 200) {
        this.setState({
          countUser: response.data.data
        })
      }
    });
    getcountuser({status: 2}).then((response) => {
      if (response.data.code === 200) {
        this.setState({
          countAdmin: response.data.data
        })
      }
    });
    //获得商家总数
    getallstore({}).then((response) => {
      if (response.data.code === 200) {
        let amount = this.state.amount;
        amount[0].sold = response.data.data;
        this.setState({
          storeNumber: response.data.data,
          amount: [...amount]
        });

      }
    });
    getcountorder({}).then((response) => {
      if (response.data.code === 200) {
        this.setState({
          countOrder: response.data.data
        })
      }
    });


  }

  render() {
    const ds = new DataSet();
    const dv = ds.createView().source(this.state.seven_change);
    dv.transform({
      type: 'fold',
      fields: ['新增用户', '新增商家', '新增订单', '新增管理员'], // 展开字段集
      key: 'type', // key字段
      value: 'number', // value字段
    });

    return (
      <div id="home">
        <div id="allshow">
          <div id="container-top">
            <div>
              <span>用户总数: {this.state.allUser}</span>
            </div>
            <div>
              <span>商家总数: {this.state.storeNumber}</span>
            </div>
            <div>
              <span>管理员总数: {this.state.allAdmin}</span>
            </div>
            <div>
              <span>订单总数: {this.state.orderNumber}</span>
            </div>
          </div>
          <div id="container-bottom">
            <div>
              <span>今日新增用户: {this.state.countUser}</span>
            </div>
            <div>
              <span>今日新增管理员: {this.state.countAdmin}</span>
            </div>
            <div>
              <span>今日新增订单: {this.state.countOrder}</span>
            </div>
          </div>
        </div>
        <Divider/>
        <div id="mountNode">
          <Chart width={600} height={400} data={this.state.amount} scale={this.state.amountcols} className="chart">
            <Axis name="genre"/>
            <Axis name="sold"/>
            <Legend position="bottom" dy={-20}/>
            <Tooltip/>
            <Geom type="interval" position="genre*sold" color="genre"/>
          </Chart>
          <Divider />
          <h2>7天新增量走势图</h2>
          <Chart height={400} data={dv} scale={this.state.change_cols} forceFit>
            <Legend/>
            <Axis name="date"/>
            <Axis name="number" label={{formatter:  val => `${val} `}}/>
            <Tooltip crosshairs={{type: "y"}}/>
            <Geom type="line" position="date*number" size={2} color={'type'}/>
            <Geom type='point' position="date*number" size={4} shape={'circle'} color={'type'}
                  style={{stroke: '#fff', lineWidth: 1}}/>
          </Chart>
        </div>
      </div>
    );
  }
}

export default Home;
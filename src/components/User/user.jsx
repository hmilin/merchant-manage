import React, { Component } from 'react';
import { Chart, Coord, Label, Axis, Legend, Tooltip, Geom, message } from 'bizcharts';
import './user.css';
import { DataSet } from '@antv/data-set';
import { getuserlist } from "../../api/getuserlist";


//用户统计
class User extends Component {
  constructor() {
    super();
    this.state = {
      addressData: [
        {city: '北京', count: 0},
        {city: '广州', count: 0},
        {city: '西安', count: 0},
        {city: '深圳', count: 0},
        {city: '其它', count: 0}
      ],
      address_cols: {
        percent: {
          formatter: val => {
            val = Math.round(((val * 100)/1.00)*100)/100 + '%';
            return val;
          }
        }
      }
    }
  }

  componentWillMount() {
    getuserlist({}).then((response) => {
      if(response.data.code === 200){
        let userList = response.data.data;
        let Beijing = 0;
        let Guangzhou = 0;
        let Xian = 0;
        let Shenzhen = 0;
        let other = 0;
        if(userList.length > 0){
          userList.map((item, index) => {
            switch (item.city){
              case '北京':  Beijing+=1;
              case '广州':  Guangzhou+=1;
              case '西安':  Xian+=1;
              case '深圳':  Shenzhen+=1;
              default:  other+=1;
            }
          });
          this.setState({
            addressData: [
              {city: '北京', count: Beijing},
              {city: '广州', count: Guangzhou},
              {city: '西安', count: Xian},
              {city: '深圳', count: Shenzhen},
              {city: '其它', count: other}
            ]
          })
        }else{
          message.warn('当前用户为0！');
        }
      }else{
        message.error('获取用户列表失败！')
      }
    })
  }

    render()
    {
      const {DataView} = DataSet;
      const adv = new DataView();
      adv.source(this.state.addressData).transform({
        type: 'percent',
        field: 'count',
        dimension: 'city',
        as: 'percent'
      });
      return (
        <div id="user">
          <h2>用户地区分布</h2>
          <Chart height={window.innerHeight} data={adv} scale={this.state.address_cols} padding={[80, 100, 80, 80]}
                 forceFit>
            <Coord type='theta' radius={0.75}/>
            <Axis name="percent"/>
            <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100}/>
            <Tooltip
              showTitle={false}
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
            <Geom
              type="intervalStack"
              position="percent"
              color='city'
              tooltip={['city*percent', (city, percent) => {
                percent = percent * 100 + '%';
                return {
                  name: city,
                  value: percent
                };
              }]}
              style={{lineWidth: 1, stroke: '#fff'}}
            >
              <Label content='percent' formatter={(val, item) => {
                return item.point.city + ': ' + val;
              }}/>
            </Geom>
          </Chart>
        </div>
      );
    }
  };

export default User;
import React from 'react';
import echarts from 'echarts';
import styles from './index.less';

const colorList = ["#B23CF9", "#02E0F7", "#379FF9", "#F29420", "#F93737", '#40A9FF', '#95DE64', '#FAAD14', '#FF7A45', '#EB2F96',
  '#87E8DE', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
  '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
  '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5',
  '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
  '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
  '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
  '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0',
  '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
  '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51', 
  '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe', 
  '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f']
/**
 * echarts图
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.node = "";
  }

  // 绘图
  drawChart = () => {
    const { handlers } = this.state;
    const myChart = echarts.init(this.node);
    // 指定图表的配置项和数据
    const option = {
      color: colorList,
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  show: true,
                  formatter: '{b}\n{c}万',
                  fontSize: 48,
                  color: '#fff'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(216, 216, 216, 0.3)'
                },
                smooth: 0.2,
                length: 20,
                length2: 20
              },
              data: [
                  {value: 335, name: '直接访问'},
                  {value: 310, name: '邮件营销'},
                  {value: 234, name: '联盟广告'},
                  {value: 135, name: '视频广告'},
                  {value: 1548, name: '搜索引擎'}
              ]
          }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  render() {
    return <div ref={node => this.node = node} style={{ width: '100%', height: '100%' }} className={styles.echarts}></div>
  }
}

export default Index;

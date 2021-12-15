import React, { PureComponent } from "react";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';

// 饼图
class PieChart extends PureComponent {
  constructor (props) {
    super(props);
    this.node = "";
  }

  // 绘制饼图
  drawChart = () => {
    const { pie_color, value, total } = this.props;
    const myChart = echarts.init(this.node);
    // 指定图表的配置项和数据
    const option = {
      series: [
        {
          // name: '访问来源',
          type: 'pie',
          radius: '80%',
          center: ['50%', '60%'],
          hoverAnimation: false,
          data: [
              {
                  value, 
                  label: { 
                      show: true, 
                      position: "center",
                      formatter: "{d}%",
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: 'bold'
                  },
                  itemStyle: {
                      color: pie_color,
                      opacity: 0.2
                  }
              },
              {
                  value: total,
                  itemStyle: {
                      color: pie_color,
                      opacity: 1
                  }
              }
          ],
          label: {
              show: false,
              position: "center"
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  render () {
    const { width = 0 } = this.props;
    return <div ref={node => this.node = node} style={{ width, height: width }}></div>
  }
}

export default PieChart;

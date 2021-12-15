import React from 'react';
import echarts from 'echarts';
import 'echarts/lib/chart/graph';
import { isEqual } from 'lodash';

let colorList = [
  '64, 169, 255',
  '149, 222, 100',
  '250, 173, 20',
  '255, 122, 69',
  '235, 47, 150',
  '135, 232, 222'
];

const defaultDataQuery = [
  { name: '活期', value: 0, num: 0 },
  { name: '普通定期', value: 0, num: 0 },
  { name: '保本理财', value: 0, num: 0 },
  { name: '智能存款', value: 0, num: 0 },
  { name: '大额存单', value: 0, num: 0 },
  { name: '定制化定期存款', value: 0, num: 0 }
];

class EBubble extends React.Component {
  constructor(props) {
    super(props);
    const { dataProvider = [] } = props;
    console.info('bubble constructor', props);
    const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : defaultDataQuery;

    this.state = {
      data: this.formatData(dataQuery),
      active: [0, 1, 2, 3, 4, 5]
    };
  }

  componentDidMount() {
    this.drawChart(true);

    if (this.myChart) {
      this.myChart.on('click', (params) => {
        const { name, dataIndex } = params;

        this.setState({
          active: this.state.active.map((item, index) => {
            if (index === dataIndex) {
              if (item === undefined) {
                return dataIndex;
              } else {
                return undefined;
              }
            }
            return item;
          })
        }, () => {
          this.drawChart(false);
          this.handleChange();
        });
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dataProvider, style } = nextProps;
    console.info('bubble shouldComponentUpdate', nextProps, this.props);
    if (!isEqual(dataProvider, this.props.dataProvider)) {
      if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
        // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
      } else {
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : defaultDataQuery;

        this.setState({ data: this.formatData(dataQuery) }, () => {
          this.drawChart(true);
        });
      }
    }
    if (!isEqual(style, this.props.style) && style && style.rest) {
      this.setState({ active: [0, 1, 2, 3, 4, 5] }, () => {
        this.handleChange();
      });
    }

    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  formatData = (list) => {
    let total = 0;

    list.forEach(item => {
      total += item.value ? item.value : 0;
    });

    return list.map(item => {
      const { name, value } = item;

      return { name, value: total ? Math.round(value / total * 100 * 100) / 100 : 0, num: value };
    });
  }

  // 绘图
  drawChart = (bool) => {
    const { data: list = [] } = this.state;

    if (!this.myChart) {
      this.myChart = echarts.init(this.node);
    }

    const data = list.map((item, index) => {
      const value = item.value;
      const size = Math.log(value ? (value < 5 ? 5 : value) : 0) * 60;
      const itemStyle = {
        normal: {
          color: `rgba(${colorList[index]}, ${this.state.active.includes(index) ? '1' : '0.4'})`
        }
      }
      return { ...item, symbolSize: size, itemStyle }
    });

    // 指定图表的配置项和数据
    this.option = {
      tooltip: {
        formatter: ({ name, data }) => { return `<div><div>产品名称：${data.name}</div><div>余额：${data.num}</div><div>占比：${data.value}%</div></div>` }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        hoverAnimation: true,
        force: {
          repulsion: 800,
          edgeLength: [500, 1000],
          // initLayout: 'circular'
        },
        label: {
          normal: {
            show: true,
            formatter: ({ name, data }) => { return `${data.name}\n\n${data.value}%` },
            fontSize: 20
          }
        },
        data
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(this.option, bool);
  }

  handleChange = () => {
    const { active } = this.state;
    const { buffEvent = [] } = this.props;
    const selected = {};

    defaultDataQuery.forEach((item, index) => {
      selected[item.name] = active.includes(index);
    });


    if (buffEvent && buffEvent.length > 0) {
      buffEvent.forEach(item => {
        const { method, bindedComponents } = item;
        if (typeof method === 'function') {
          method({ selected }, bindedComponents);
        }
      });
    }
  }

  render() {
    return <div ref={node => this.node = node} style={{ width: '100%', height: '100%' }}></div>
  }
}

export default EBubble;

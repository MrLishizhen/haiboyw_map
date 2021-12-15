import React, { Component } from 'react';
import Chart from '../../utils/Chart';

// _haiboyw_waijika_summary
var blueicon = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAABKElEQVQ4ja2VMW6DQBBFn1dGpkzhFmnTW9r4Bq5c+irhKPgqLl35BjaS+yDRukiJhaVJsUBYsiSG8CUKxPy3w7B/QUTwXFpEEhG5yE9dqmfa5/XBEg+kT0nXPxMRKr0AJ8AA3EtIc8huUDxsQTgHvQQTwSKobaTABvgEGqADS3M4XqEo8SoMYLuy4C60BibAO8DhbIHPyESwWze3eyCeiYgGPurODufnYLV2a6fTVwXEYGd2vA6DgfXcv0cTK+y7k+b9M/tNRemMaKOoPkR2Gw6r1fIa1az0GA9se1V/2Tg1wHA+HtL2KuymRC/HA1veVGETgolsAgZ3Fzj78KSwKWFRxWmotisn14kCMmxsMJGz2p/q1O+BbMrD4Q2Y/via/ID1Af/1C/gC90Z5ftFK3k8AAAAASUVORK5CYII='
var greenicon = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAABW0lEQVQ4ja2VMW7CQBBFH+vCyC6cCokK0iJhcgPT0CVXoKcKRzEVPVdIOhp8AyASbaBCoooLLFzApjBLNrA4QPiSi5Hnvx2PPWOklBiuqpQylFKO5anG+3tVk9cECw2QcwqP/QUpJXs9ACOgAZDsUqJ4yixZsN6mALiWTc2pEHg+jrCVbwI0gS/gAPwFi+IPBqsh6+0Gk1yrSLvUIvDqJ1AFDIFXgP7ynSieGkHHCjyfTvlZhT2gW5BSVoFPVVl/+XYRTKlTftErfRRAF7KeDVbDq2AAg9WQZJeqsCvInp0onp7tWZ7W243eoqZg/yJmyeJqmJLmbYifk1Jz9gXSvSIn7yYdgK5l5+XlSvcKso+SmlO5Gah5J4JsQgg8H9cq3lBdkcDzVTgSZFOCI2zapdbVwHappc91KIA52dgQeHX9tD8VeL4+JT1gfs/l8ATcf33dfcGagP/6BXwD5wmYPJJk0AAAAAAASUVORK5CYII='

const dataSample = [
  {
    name: '明东',
    shanggangwuliu: 22,
    shehuicheliang: 44
  },  {
    name: '尚东',
    shanggangwuliu: 33,
    shehuicheliang: 65
  }, {
    name: '冠东',
    shanggangwuliu: 37,
    shehuicheliang: 12
  }, {
    name: '盛东',
    shanggangwuliu: 87,
    shehuicheliang: 44
  }, {
    name: '浦东',
    shanggangwuliu: 66,
    shehuicheliang: 22
  }
];

export default class index extends Component {
  getOption = props => {

    let xList = ['明东', '尚东', '冠东', '盛东', '浦东', '宜东', '沪东', '振东'],
      shanggangwuliuList = [],
      shehuicheliangList = [],
      fuzhu = [];
    try {
      const {dataProvider = []} = props;
      if (dataProvider && Array.isArray(dataProvider)) {
        if (JSON.stringify(dataProvider) !== '[""]') {
          xList.length = 0;
          for (let i = 0; i < dataProvider.length; i++) {
            const el = dataProvider[i];
            const {name = '', shanggangwuliu, shehuicheliang} = el;
            xList.push(name);
            shanggangwuliuList.push(shanggangwuliu);
            shehuicheliangList.push(shehuicheliang);
          }
        }
        fuzhu = new Array(xList.length).fill(1);

      }
    } catch (error) {
      console.log(error)
    }

    return {
      legend: {
        right: '14%',
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 30,
        textStyle: {
          color: 'white',
          fontSize: 16
        }
      }, 
      xAxis: {
        triggerEvent: true,
          data: xList,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 18,
            color: '#82B1FF'
          },
          splitLine: {
            show: false
          }
      },
      yAxis: [
          {
              show: false,
              axisLine: {
              show: false
          },
          splitLine: {
              show: false
          }
      },{show: false}],
      series: [
          {
            type: 'pictorialBar',
            data:  fuzhu,
            yAxisIndex: 1,
            symbol: 'rect',
            symbolSize: [1,5],
            symbolRepeat: true,
            itemStyle: {
                color: '#5F7EB2'
            }
          },
          {
            name: "上港物流",
            symbolSize: 30,
            symbol:blueicon,
            data: shanggangwuliuList,
            type: 'scatter',
            label: {
              show: true
          }
      }, {
          name: "社会车辆",
          symbolSize: 30,
          symbol:greenicon,
          data: shehuicheliangList,
          type: 'scatter',
          label: {
              show: true
          }
      }]
  }
}

  render() {
    
    const option = this.getOption(this.props);
    return (
      <div style={{ width: '100%', height: '100%'}} >
        <Chart
          option={option}
          resize={false}
          style={{ width: '100%', height: '100%' }}
          buffEvent = {[
            {
              type: 'click', 
              method: (data)=> {console.log("asd: ",data)}, 
              bindedComponents: []
            }
          ]}
        />
      </div>
    )
  }
}

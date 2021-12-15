import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/pictorialBar';
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import {isEqual} from 'lodash';

import elementResizeDetectorMaker from 'element-resize-detector';

const erd = elementResizeDetectorMaker();

/**
 * echarts中事件分为2种： 
 * 1，event，鼠标事件，点击图形会触发的事件
 * 2，dispatchAction，  调用action之后的事件，比如 legendselectchanged，切换图例开关，会触发这个事件
 */
export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.echartsLib = echarts;
  }
  static propTypes = {
    // option: PropTypes.object
  };
  static defaultProps = {
    notMerge: true
  }

  getEchartsInstance = () => this.echartsLib.getInstanceByDom(this.echartsElement) ||
    this.echartsLib.init(this.echartsElement, this.props.theme);

  dispose = () => {
    if (this.echartsElement) {
      try {
        erd.removeListener(this.echartsElement);
      } catch (_) { }

      const { buffEvent } = this.props;
      if (buffEvent) this.removeEvent();
      this.echartsLib.dispose(this.echartsElement);
    }
  };

  bindEvent = (eventList) => {
    const echartObj = this.getEchartsInstance();
    _.each(eventList, (eventObj, i) => {
      const { type, method, bindedComponents } = eventObj;
      echartObj.on(type, (param) => this.actionHandler(param, bindedComponents, method));
    })
  }

  removeEvent = (eventList) => {
    const echartObj = this.getEchartsInstance();
    _.each(eventList, (eventObj, i) => {
      const { type, method, bindedComponents } = eventObj;
      echartObj.off(type);
    })
  }

  actionHandler = (param, bindedComponents, method) => {
    method(param, bindedComponents)
  }

  renderEchartDom = props => {

    const echartObj = this.getEchartsInstance();
    const { buffEvent, option, notMerge, lazyUpdate, loadingOption, showLoading } = props;
    echartObj.setOption(option, notMerge || false, lazyUpdate || false);
    if (buffEvent) this.bindEvent(buffEvent);
    if (showLoading) echartObj.showLoading(loadingOption || null);
    else echartObj.hideLoading();

    return echartObj;
  };

  rerender = props => {
    const echartObj = this.renderEchartDom(props);

    // fix bug of 100px width * height.
    try {
      echartObj.resize();
    } catch (_) { }

    // on chart ready
    if (typeof onChartReady === 'function') this.props.onChartReady(echartObj);
    // on resize
    if (this.echartsElement) {
      erd.listenTo(this.echartsElement, () => {
        echartObj.resize();
      });
    }
  };

  componentDidMount() {
    this.rerender(this.props);
  }

  componentWillUnmount() {
    this.dispose();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {

      if (nextProps.dispose) {
        this.dispose();
        this.rerender(nextProps); // 重建
      } else {

        if (!isEqual(nextProps.buffEvent, this.props.buffEvent)) {
          this.removeEvent(this.props.buffEvent);
          this.bindEvent(nextProps.buffEvent);
        }

        if (!isEqual(nextProps.option, this.props.option)) {

          const echartObj = this.getEchartsInstance();
          echartObj.setOption(nextProps.option, nextProps.notMerge || false, nextProps.lazyUpdate || false);
        }
      }


    }
  }

  // update
  componentDidUpdate(nextProps) {

  }

  render() {
    return (
      <div ref={(node) => { this.echartsElement = node; }} style={this.props.style} className={this.props.className} />
    )
  }
}

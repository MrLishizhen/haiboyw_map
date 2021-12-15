import React, {Component} from 'react';


import {isEqual} from "lodash";


import styles from './index.less'

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data:dataQuery
        }
    }

    // //绘图


    componentDidMount() {
        // {tem: 10,wind_speed: 1.8,wind_dir: '西南',vis: '',rain: 0.5,rh: '',prs:''}
        this.setState({data:this.state.data[0]});
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, () => {
                    this.setState({data:this.state.data[0]});
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {

        return (
           <div className={[styles.web]}>
                   <h3>白云社区</h3>

                   <div className={'model-item'}>
                       <div className={'model-padd model-item-left'}>
                           <span className={'left-title'}>温度：</span>
                           <span
                               className={'left-cont'}>{this.state.data?.tem ? this.state.data?.tem + '℃' : '-'}</span>
                       </div>
                       <div className={'model-padd yl model-item-right'}>
                           <span className={'left-title'}>雨量：</span>
                           <span
                               className={'left-cont'}>{this.state.data?.rain ? this.state.data?.rain + 'mm' : '-'}</span>
                       </div>
                   </div>
                   <div className={'model-item'}>
                       <div className={'model-padd fk model-item-left'}>
                           <span className={'left-title'}>风况：</span>
                           <span
                               className={'left-cont'}>{(this.state.data?.wind_speed ? this.state.data?.wind_speed + 'm/s':'-')+ (this.state.data?.wind_dir ? this.state.data?.wind_dir:"-")}</span>
                       </div>
                       <div className={'model-padd sd model-item-right'}>
                           <span className={'left-title'}>湿度：</span>
                           <span className={'left-cont'}>{this.state.data?.rh ? this.state.data?.rh + '%' : '-'}</span>
                       </div>
                   </div>
                   <div className={'model-item'}>
                       <div className={'model-padd njd model-item-left'}>
                           <span className={'left-title'}>能见度：</span>
                           <span className={'left-cont'}>{this.state.data?.vis ? this.state.data?.vis + 'm' : '-'}</span>
                       </div>
                       <div className={'model-padd qy model-item-right'}>
                           <span className={'left-title'}>气压：</span>
                           <span className={'left-cont'}>{this.state.data?.prs ? this.state.data?.prs + 'hPa' : '-'}</span>
                       </div>
                   </div>


           </div>
        )
    }

}
import React, {Component} from 'react';

import {Modal} from 'antd';
import {isEqual} from "lodash";
import mapItem from './img/map.png'
import map from './img/mapCenter.png'

import styles from './index.less'

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data:dataQuery,
            // data:[
            //     {
            //         id: 3,
            //         left: "70%",
            //         prs: 999999,
            //         rain: 0,
            //         rh: 999999,
            //         tem: 17.5,
            //         title: "檀溪社区",
            //         top: "19%",
            //         vis: 999999,
            //         wind_dir: 999017,
            //         wind_speed: 0,
            //     }
            // ],
            isShow:false,
            showData:{},
        }
    }
    removeClick=(e)=>{
        if(this.state.isShow===true&&e.target===document.querySelector('.t-box-remove')){
            this.setState({isShow:false,showData:{}});
        }

    }

    clickItem=(id)=>{

      this.setState({isShow:true,showData:this.state.data.find(item=>item.id===id)});
    }
    componentDidMount() {
        // this.setState({data: dataQuery}, () => {
        // });
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

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {

        return (
            <div ref={node => this.node = node} className={[styles.web]}  style={{
                width: '973px',
                height: '853px',
                position:'relative',
                background: 'url(' + map + ') no-repeat center center/100%'
            }}>
                <div className={'item-box'}>
                    {this.state.data.map(item=>{
                        if(!item){
                            return '';
                        }else{
                            return(
                                <div onClick={()=>this.clickItem(item.id)} style={{cursor: 'pointer',zIndex:'100',width:'48px',height:'74px',background:"url("+mapItem+") no-repeat center center/100%",position:'absolute',left:item.left,top:item.top}} key={item.id}></div>
                            )
                        }

                    })}
                </div>

                <div className={'t-box-remove'} onClick={this.removeClick}>
                    <div className={'t-box'} style={{display:this.state.isShow?'block':'none'}}>
                        <h3>{this.state.showData?.title}</h3>
                        <div className={'model-item'}>
                            <div className={'model-padd model-item-left'}>
                                <span className={'left-title'}>温度：</span>
                                <span
                                    className={'left-cont'}>{this.state.showData?.tem||this.state.showData?.tem===0 ? this.state.showData?.tem + '℃' : '-'}</span>
                            </div>
                            <div className={'model-padd yl model-item-right'}>
                                <span className={'left-title'}>雨量：</span>
                                <span
                                    className={'left-cont'}>{this.state.showData?.rain||this.state.showData?.rain===0 ? this.state.showData?.rain + 'mm' : '-'}</span>
                            </div>
                        </div>
                        <div className={'model-item'}>
                            <div className={'model-padd fk model-item-left'}>
                                <span className={'left-title'}>风况：</span>
                                <span
                                    className={'left-cont'}>{(this.state.showData?.wind_speed ||this.state.showData?.wind_speed===0? this.state.showData?.wind_speed + 'm/s':'-')}</span>
                                { /*(this.state.showData?.wind_dir ? this.state.showData?.wind_dir:"")}*/}

                            </div>
                            <div className={'model-padd sd model-item-right'}>
                                <span className={'left-title'}>湿度：</span>
                                <span className={'left-cont'}>{this.state.showData?.rh ||this.state.showData?.rh===0 ? this.state.showData?.rh + '%' : '-'}</span>
                            </div>
                        </div>
                        <div className={'model-item'}>
                            <div className={'model-padd njd model-item-left'}>
                                <span className={'left-title'}>能见度：</span>
                                <span className={'left-cont'}>{this.state.showData?.vis ||this.state.showData?.vis===0 ? this.state.showData?.vis + 'm' : '-'}</span>
                            </div>
                            <div className={'model-padd qy model-item-right'}>
                                <span className={'left-title'}>气压：</span>
                                <span className={'left-cont'}>{this.state.showData?.prs ||this.state.showData?.prs===0 ? this.state.showData?.prs + 'hPa' : '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
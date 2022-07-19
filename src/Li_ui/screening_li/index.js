import React, {Component} from 'react';
import styles from './index.less'
import {isEqual} from "lodash";
import hot from './img/hot.png'
import nohot from './img/nohot.png'
class Checkbox extends Component {
    // state = {
    //     isCheck:false,//默认不选中
    // }

    // componentDidMount() {
    // let {isCheck} = this.props;
    // this.setState({
    //     isCheck:isCheck||false
    // })
    // }

    render() {
        let {isCheck, clickCheck} = this.props;
        return (
            <div className={'Checkbox'} onClick={clickCheck} style={{
                width: '24px',
                cursor: 'pointer',
                flexShrink: 0,
                height: '24px',
                margin: '0 16px',
                background: `url(${isCheck ? hot : nohot}) no-repeat center center /100% 100%`
            }}></div>
        )
    }
}


export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            data: dataQuery[0]||{
                timeOutCount:0,
                disposedOfCount:0,
                underDisposalCount:0
            },

            checkData: dataQuery[1] || {
                timeOut: false,//超时
                disposedOf: false,//已处置
                underDisposal: false,//处置中
            }
        }
    }


    componentDidMount() {
        const {buffEvent = [{type: 'click'}]} = this.props;
        let eventValue = {};
        for (let i = 0; i < buffEvent.length; i++) {
            const eventObj = buffEvent[i];
            const {type, method, bindedComponents} = eventObj;
            if (type === 'click') {
                eventValue = {
                    onClick: (data) => {
                        method && method({...data}, bindedComponents)
                    }
                }
            }
        }
        this.setState({
            handlers: Object.assign({}, eventValue)
        })
    }

    clickCheck = (names) => {

        switch (names) {
            case 'all' : {
                //初始化
                this.setAfterFunc({
                    checkData: this.props.dataProvider[1]||{
                        timeOut: false,
                        disposedOf: false,
                        underDisposal: false,
                    }
                })
                break;
            }
            case 'timeOut': {
                this.setAfterFunc({
                    checkData: {
                        ...this.state.checkData,
                        timeOut: !this.state.checkData.timeOut,
                    }
                })
                break;
            }
            case 'disposedOf': {

                this.setAfterFunc({
                    checkData: {
                        ...this.state.checkData,
                        underDisposal: false,
                        disposedOf: !this.state.checkData.disposedOf,
                    }
                })
                break;
            }
            case 'underDisposal': {

                this.setAfterFunc({
                    checkData: {
                        ...this.state.checkData,
                        disposedOf: false,
                        underDisposal: !this.state.checkData.underDisposal,
                    }
                })
                break;
            }
        }

    }

    setAfterFunc = (data) => {

        this.setState({
            ...data
        }, () => {
            this.state.handlers.onClick && this.state.handlers.onClick({...this.state.checkData});
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({
                    data: dataQuery[0]||{}, checkData: dataQuery[1] || {
                        timeOut: false,//超时
                        disposedOf: false,//已处置
                        underDisposal: false,//处置中
                    }
                }, () => {
                    this.state.handlers.onClick && this.state.handlers.onClick({...this.state.checkData});
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    //千分符
    format = (num)=>{
        let reg=/\d{1,3}(?=(\d{3})+$)/g;
        return (num + '').replace(reg, '$&,');
    }

    render() {
        let {timeOutCount=0,disposedOfCount=0,underDisposalCount=0} = this.state.data;

        let {timeOut, disposedOf, underDisposal} = this.state.checkData;
        return (
            <div ref={node => this.node = node}
                 style={{width: '582px', height: '48px'}} className={styles.box}>
                <span className={'reset-btn'} onClick={() => this.clickCheck('all')}></span>
                <div class={'timeout-box'}>
                    <Checkbox isCheck={timeOut} clickCheck={() => this.clickCheck('timeOut')}></Checkbox>
                    <span className={'icon'}></span>
                    <span className={'title'}>{this.format(timeOutCount)}</span>
                </div>
                <div className={'surplus'}>
                    <div className={'surplus-item'}>
                        <Checkbox isCheck={disposedOf} clickCheck={() => this.clickCheck('disposedOf')}></Checkbox>
                        <span className={'icon'}></span>
                        <span className={'title'}>{this.format(disposedOfCount)}</span>
                    </div>
                    <div className={'surplus-item'}>
                        <Checkbox isCheck={underDisposal}
                                  clickCheck={() => this.clickCheck('underDisposal')}></Checkbox>
                        <span className={'icon'}></span>
                        <span className={'title'}>{this.format(underDisposalCount)}</span>
                    </div>
                </div>
            </div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',
import {Component} from 'react';
import styles from './css/index.less'
import hot from './img/zwhot.png'
import nohot from './img/zw.png'
import {isEqual} from "lodash";
export default class zwButton extends Component{

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            hot_i:false,
            time:dataQuery[0]?.time||1000*60*5
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


    componentWillUnmount() {
        if(this.time){
            clearTimeout(this.time);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
                let {open} = dataQuery[0];
                this.setState({time: dataQuery[0]?.time||1000*60*5,hot_i:open===false?open:this.hot_i}, () => {
                    if(open===false&&this.time){
                        clearTimeout(this.time);
                    }
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    onClick_i=()=>{
        let {hot_i,time} =this.state;


        this.setState({
            hot_i:!hot_i
        },()=>{
            if(this.state.hot_i){//表示已经生效
                this.state.handlers.onClick && this.state.handlers.onClick({hot:'政务微信',date:new Date().getTime()});
                this.time = setInterval(()=>{
                    this.state.handlers.onClick && this.state.handlers.onClick({hot:'政务微信',date:new Date().getTime()});
                },time||1000*60*5);
            }else{//表示是非选中状态
                if(this.time){
                    this.state.handlers.onClick && this.state.handlers.onClick({hot:-1,date:new Date().getTime()});
                    clearTimeout(this.time);
                }
            }
        })
    }
    render(){
        let {hot_i} =this.state
        return (
            <div onClick={this.onClick_i} style={{width: 272,height:64,cursor: 'pointer',background:`url(${hot_i?hot:nohot}) no-repeat center center/100% 100%`,}}></div>
        )
    }
}
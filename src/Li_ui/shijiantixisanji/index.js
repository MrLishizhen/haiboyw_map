import React, {Component} from "react";
import {isEqual} from "lodash";
import styles from './index.less'
import TcBox from '../shijiantixisanji_new_list/index'
export default class index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;

        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        /*{name:'tianxia ',czsx:'20',jasx:30,czll:'中国公安',zt:'一般'}
        *{

                }
        * */

        this.state = {
            data: dataQuery,
            isShow:false,
            TcData:[]
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

    itemLiClick(v) {
        let {data} = this.state;
        let obj = data.find(item=>item.name===v.name);
        this.setState({
            isShow:true,
            TcData:[obj]
        })
    }

    componentWillUnmount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({
                    data: dataQuery
                }, () => {
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    hideBox=(e)=>{
        if(e.target===document.querySelector('#pBox')){
            this.setState({
                isShow:false,
                TcData:[]
            })
        }

    }
    getDom = () => {

        if (document.getElementById("panel_canvas")) {

            return document.getElementById("panel_canvas")
        } else {


            return document.getElementById("root")
        }

    }
    render() {
        let {data,isShow,TcData} = this.state;
        console.log(data)
        return (
            <div className={styles.shijian_san_box}>
                {
                    data.map((v, i) => {
                        return (<div className={styles.shijian_san_li} key={i}>
                            <div onClick={()=>this.itemLiClick(v)} className={styles.shijian_name}>
                                <span title={v.name || ''} >{v.name || ''}</span>
                            </div>
                        </div>)
                    })
                }
                { isShow?
                    ReactDOM.createPortal(
                        <div className={styles.pBox} id={'pBox'} onClick={this.hideBox}>
                            <TcBox dataProvider={TcData}></TcBox>
                        </div>,
                        this.getDom()
                    ):
                    ''
                }
            </div>
        )
    }
}


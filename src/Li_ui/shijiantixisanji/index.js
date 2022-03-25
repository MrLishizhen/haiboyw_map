import React, {Component} from "react";
import {isEqual} from "lodash";
import styles from './index.less'

const Item_li = (props) => {
    let {obj = {}} = props;

    return (
        <div className={styles.shijian_san_li}>
            <div title={obj.name||''} className={styles.shijian_name}>
                {obj.name||''}
            </div>

            <table className={styles.shijian_right} border={0} cellpadding={0} cellspacing={0}>
                <tr>
                    <td>处置时限</td>
                    <td>结案时限</td>
                    <td>处置力量</td>
                    <td></td>
                </tr>
                <tr className={styles.tr_color_td}>
                    <td  title={obj.czsx||''}>{obj.czsx||''}</td>
                    <td  title={obj.jasx||''}>{obj.jasx||''}</td>
                    <td  title={obj.czll||''}>{obj.czll||''}</td>
                    <td  title={obj.zt||''}>{obj.zt||''}</td>
                </tr>
                <tr>
                    <td>事件描述</td>
                    <td colspan="3" title={obj.sjms||''} style={{textAlign:'left',width:320,textIndent:'16px',color:'#AED4FF',maxWidth:'326px'}}>{obj.sjms||''}</td>

                </tr>
            </table>

        </div>
    )
}

export default class index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;

        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        dataQuery = this.checkArr(dataQuery);

        /*
        *{

                }
        * */

        this.state = {
            data: dataQuery,
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

    //处理函数，数组分类
    arrayPro(data) {
        const result = [];
        for (let i = 0; i < data.length; i += 3) {
            if (data[i]) {
                result.push(data.slice(i, i + 3));
            }
        }
        return result;
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
                dataQuery = this.checkArr(dataQuery);
                this.setState({
                    data: dataQuery
                }, () => {
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    checkArr(data) {
        const list = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i]) {
                list.push(data[i])
            }
        }
        return list;
    }


    render() {
        let {data} = this.state;

        return (
            <div className={styles.shijian_san_box}>
                {
                    data.map((v,i) => {
                        return (<Item_li key={i}  obj={v}></Item_li>)
                    })
                }
            </div>
        )
    }
}


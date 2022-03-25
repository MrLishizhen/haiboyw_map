import React, {Component} from "react";
import {isEqual} from "lodash";
import styles from './index.less'

export default class index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;

        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // {name: '大屏预警',id: 1,count:10}, {name: '大屏预警', id: 2,count:10}, {name: '大屏预警', id: 3,count:10}, {name: '大屏预警', id: 4,count:10}, {name: '大屏预警', id: 5,count:10}, {name: '大屏预警',id: 6,count:10}, {name: '大屏预警', id: 7,count:10}, {name: '大屏预警', id: 8,count:10}, {name: '大屏预警', id: 9,count:10}, {name: '大屏预警', id: 10,count:10}, {name: '大屏预警',id: 11,count:10},
        dataQuery = this.arrayPro(dataQuery);
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

                dataQuery = this.arrayPro(dataQuery);
                this.setState({
                    data: dataQuery
                }, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    itemLiClick(v) {
        console.log(v);
        this.state.handlers.onClick && this.state.handlers.onClick({...v});
    }

    render() {
        let {data} = this.state;
        return (
            <div className={styles.shijian_box}>
                {
                    data.map((u, i) => {
                        return (
                            <div className={`${styles.shijian_ul} ${u.length === 3 ? '' : styles.shijian_kong_ul}`}
                                 key={i}>
                                {
                                    u.map(v => {
                                        return (<div className={styles.item_li} onClick={() => this.itemLiClick(v)}>
                                            <span title={v.name+(v.count||'')}>{v.name} <i>{v.count||''}</i></span>
                                        </div>)
                                    })
                                }
                            </div>
                        )
                    })
                }


            </div>
        )
    }

}

{/*<div className={styles.shijian_ul}>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*</div>*/
}
{/*<div className={styles.shijian_ul}>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*</div>*/
}
{/*<div className={styles.shijian_ul}>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*</div>*/
}

{/*<div className={`${styles.shijian_ul} ${styles.shijian_kong_ul}`}>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*    <div className={styles.item_li}>大屏预警</div>*/
}
{/*</div>*/
}
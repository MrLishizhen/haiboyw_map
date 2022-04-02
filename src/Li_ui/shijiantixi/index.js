import React, {Component} from "react";
import {isEqual} from "lodash";
import styles from './index.less'

export default class index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;

        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // {name: '城市管理',subCount:175,count:8}, {name: '城乡建设',subCount:79,count:15}, {name: '大屏预警', subCount:2,count:1}, {name: '道路交通',subCount:63, count:11}, {name: '公共安全',subCount:96, count:6}, {name: '公共服务',subCount:146,count:9}, {name: '联勤联动', subCount:56,count:2}, {name: '矛盾纠纷', subCount:23,count:3}, {name: '生态环境', subCount:78,count:17}, {name: '卫生健康',subCount:38, count:6}, {name: '智能发现',subCount:19,count:3},
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
                                            <span title={v.name}>{v.name} </span>
                                            <i title={v.count||''}>{v.count||''}</i>
                                            <i style={{color:'#4AFFBB'}} title={v.subCount||''}>{v.subCount||''}</i>
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
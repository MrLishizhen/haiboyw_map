import React from 'react'
import styles from './index.less'
import { isEqual } from 'lodash';
import remarkImg from '../assets/img.jpg'
import BigImg from './bigImg'

const defaultValue = {
    "header": {
        "title": "蚊蝇检测处置",
        "content": [
            {
                "id": 0,
                "name": "案件类型：",
                "value": "公共服务"
            },
            {
                "id": 1,
                "name": "案件位置：",
                "value": "凯旋路 88号 笠圆凯旋坊"
            },
            {
                "id": 2,
                "name": "发现时间：",
                "value": "2020-11-13 09:27:56"
            },
            {
                "id": 3,
                "name": "处置状态：",
                "value": "结案"
            },
            {
                "id": 4,
                "name": "案件描述：",
                "value": "蚊蝇检测处置"
            }
        ]
    },
    "timeShaft": [
        {
            "id": 0,
            "title": "发现",
            "time": "2020-11-13 09:27:56",
            "staff": "郑翚",
            "remark": "蚊蝇检测处置",
            "img": [

            ]
        },
        {
            "id": 1,
            "title": "受理",
            "time": "2020-11-13 09:32:07",
            "staff": "卫燕",
            "remark": "同意受理！",
            "img": [

            ]
        },
        {
            "id": 2,
            "title": "立案",
            "time": "2020-11-13 09:32:07",
            "staff": "卫燕",
            "remark": "案件情况属实，予以立案，请派遣处置！",
            "img": [

            ]
        },
        {
            "id": 3,
            "title": "待派遣",
            "time": "2020-11-13 09:32:07",
            "staff": "卫燕",
            "remark": "案件情况属实，予以立案，请派遣处置！",
            "img": [

            ]
        },
        {
            "id": 4,
            "title": "指定处置人",
            "time": "2020-11-13 09:32:07",
            "staff": "李博",
            "remark": "请尽快进行处理，并在处理完成后及时反馈。",
            "img": [

            ]
        },
        {
            "id": 5,
            "title": "待处置",
            "time": "2020-11-13 09:32:07",
            "staff": "李博",
            "remark": "请尽快进行处理，并在处理完成后及时反馈。",
            "img": [

            ]
        },
        {
            "id": 6,
            "title": "处置",
            "time": "2020-11-13 09:27:56",
            "staff": "李博",
            "remark": "案件已处置完成",
            "img": [

            ]
        },
        {
            "id": 7,
            "title": "核查",
            "time": "",
            "staff": "自动",
            "remark": "核查通过！",
            "img": [

            ]
        },
        {
            "id": 8,
            "title": "结案",
            "time": "2020-11-13 09:32:07",
            "staff": "卫燕",
            "remark": "同意结案！",
            "img": [

            ]
        }
    ]
};

/**
 * 660*1874
 */
class TimeShaft extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShade: false,
            data: [],
            index: -1,
            type: 'time'
        }
    }

    componentDidMount() {
        console.info('componentDidMount', this.props)
        let data = [];
        const list = this.getData(this.props);
        if (list && list.length) {
            data = list;
        }
        this.setState({
            data
        })
    }

    // 校验datapROVIDER
    getData = (props) => {
        const { dataProvider = [] } = props;
        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length && dataProvider[0] !== '') {
            return [...dataProvider];
        }
        return [];
    }

    componentWillReceiveProps(nextProps) {
        console.info('componentWillReceiveProps', nextProps)
        if (!isEqual(this.props, nextProps)) {
            const data = this.getData(nextProps);
            this.setState({
                data
            });
        }
    }

    changeShade = (dex) => {
        const { isShade, index } = this.state

        if (dex == index) {
            this.setState({
                index: -1,
                isShade: false
            })
            return;
        }
        this.setState({
            index: dex,
            isShade: true
        })
    }

    reverse = (data = []) => {
        const result = [];

        for (let i = data.length - 1; i >= 0; i--) {
            result.push({ ...data[i] });
        }

        return result;
    }

    render() {
        const { isShade, data, type } = this.state;
        const json = data[0] || defaultValue;

        return <div className={styles.control} style={data[0] ? data[0].style : {}}>
            <p className={styles.close}></p>
            <div className={styles.top}>
                <h2>{json && json.header && json.header.title}</h2>
                {
                    json && json.header && json.header.content.map((item) => {
                        return <div className={styles.header_content} key={item.id}>
                            <span>{item.name}</span>
                            <span>{item.value}</span>
                        </div>
                    })
                }
            </div>
            <p className={styles.line}></p>
            <div className={styles.bottom}>
                <div className={styles.caption} onClick={() => this.setState({ type: type === 'time' ? 'process' : 'time' })}>
                    <h4>{'案件处置'}</h4>
                    <div className={[styles.on_off, type !== 'time' ? styles.right : null].join(' ')}>
                        {'时间'}<span></span>{'流程'}
                    </div>
                </div>
                <div className={styles.time_content}>
                    {
                        json && json.timeShaft && (type === 'time' ? this.reverse(json.timeShaft) : json.timeShaft).map((item) => {
                            return (
                                item.time &&
                                <div className={styles.time} key={item.id}>
                                    <div className={styles.time_left}>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className={styles.time_right}>
                                        <h5>{item.title}</h5>
                                        <p>{item.time}</p>
                                        <p>{'处置人员：' + item.staff}</p>
                                        {
                                            item.remark && (<div className={styles.header_content}>
                                                <span>{'案件备注：'}</span>
                                                <span>{item.remark}</span>
                                            </div>)
                                        }
                                        {
                                            item.img.length > 0 && (
                                                <>
                                                    <p>{'案件图片：'}</p>
                                                    <div className={styles.time_img}>
                                                        {item.img.map((url, index) => {
                                                            return <img src={remarkImg} onClick={this.changeShade.bind(this, index)} alt="" key={index} />
                                                        })}
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {isShade && (<BigImg url={remarkImg} changeShade={this.changeShade.bind(this, this.state.index)} />)}
        </div>
    }
}

export default TimeShaft;
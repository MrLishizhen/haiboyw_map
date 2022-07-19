//风险预警水球图
import React, {Component} from 'react';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import {isEqual} from "lodash";
import Jindu from './water'
import styles from './index.less'


export default class Jin extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // var data = [{
        //     type: 1,//0-5 0 为 优  良 轻度 中度 重度 严重
        //     widthString: '100px' , // 宽度,
        //     text: '50%', //显示文本
        //     fontSize: '15px',//文本字号
        //     amplitude: 2, //水波振幅
        //      }]
        this.state = {
            // data: dataQuery,
            data: [
                {
                    type: 4,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '天气',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '200px'
                },
                {
                    type: 3,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '空气质量',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '200px'
                },
                {
                    type: 3,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '安全生产',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '200px'
                },
                {
                    type: 2,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '火警',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '180px'
                },
                {
                    type: 1,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '疫情防控',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '180px'
                },
                {
                    type: 0,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '城管事件',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '180px'
                },
                {
                    type: 0,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '汛情',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '180px'
                },
                {
                    type: 0,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '地址灾害',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '180px'
                },
                {
                    type: 0,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '城市内涝',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '180px'
                },
                {
                    type: 0,
                    text: '暂无风险',
                    color: '',
                    fontSize: '34px',
                    subtitle: '森林防火',
                    subtitleSize: '24px',
                    amplitude: 10,
                    widthString: '180px'
                },
            ],
            firstData: [],//首屏的四个项
            playData: [],//弹窗包裹的内容
        }
    }


    /*
    * 优 #23cc72 35,204,114
    * 良 #f8c21c 248,194,28
    * 轻度 #fe9837 254,152,55
    * 中度 #f86965 248,105,101
    * 重度 #e4387f 228,56,127
    * 严重 #b61f7e 182,31,126
    * */
    // //绘图
    setEcharts = () => {
        // {
        //     type: 0,
        //         text: '暂无风险',
        //     color: '',
        //     fontSize: '34px',
        //     subtitle: '其他',
        //     subtitleSize: '24px',
        //     amplitude: 10,
        //     widthString: '200px'
        // }
        let datas = [
            {
                class: "天气",
                type: "雷电",
                level: "黄色",
                description: "",
                time: "",
                department: "生态环境局"
            }
        ]
        let data = this.state.data.sort((a, b) => {
            return b.type - a.type;
        });
        if (data.length > 3) {
            //表示需要用到其他

            let firstData = [...data.slice(0, 3), {
                type: data[3].type,
                text: (data.length - 3) > 0 ? data.length - 3 + '类风险' : '暂无风险',
                color: '',
                fontSize: '34px',
                subtitle: '其他',
                subtitleSize: '24px',
                amplitude: 10,
                widthString: '200px'
            }];


            this.setState({
                firstData: firstData,
                playData: data.slice(3),
                playIs: false,
            })
        } else if (data.length > 0 && data.length <= 3 && data[0] !== '') {
            let firstData = [...data, {
                type: 0,
                text: '暂无风险',
                color: '',
                fontSize: '34px',
                subtitle: '其他',
                subtitleSize: '24px',
                amplitude: 10,
                widthString: '200px'
            }];
            this.setState({
                firstData: firstData,
                playData: [],
                playIs: false,
            })
            //表示不需要其他
        } else {
            //去掉空数据或者首位数据为''的
        }

    }

    componentDidMount() {
        this.setEcharts();
        document.addEventListener('click', (e) => {
            if (this.state.playIs && e.target !== document.querySelector('.paly-box')) {
                this.hideClick();
            }

        }, false)
    }

    hideClick = () => {
        this.setState({
            playIs: false,
        })
    }
    showClick = (e) => {
        e.nativeEvent.stopImmediatePropagation();//组合合成事件和document事件的冲突
        if (this.state.data.length > 3) {
            this.setState({
                playIs: true,
            })
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

                this.setState({data: dataQuery}, () => {
                    this.setEcharts();

                });
            }
        }
        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {

        return (
            <div className={styles.web}>
                <div ref={node => this.node = node} style={{display: 'flex', justifyContent: 'space-between'}}>
                    {this.state.firstData.map((item) => {
                        if (item.subtitle === '其他') {

                            return <div onClick={this.showClick}><Jindu dataProvider={[item]}/></div>
                        } else {
                            return <Jindu dataProvider={[item]}/>
                        }

                    })}
                </div>

                {this.state.playIs ?
                    // <Modal title="" width={0} onCancel ={this.hideClick} visible={this.state.playIs} footer={null} bodyStyle={{backgroundColor:'rgba(0,0,0,0)'}} closable={false} centered wrapClassName={'playData-box'}>

                    <div className={'paly-box'}>
                        <div className={'title'}>其他风险弹窗</div>
                        <div className={'play'}>
                            {this.state.playData.map((item) => {
                                return <Jindu dataProvider={[item]}/>
                            })}
                        </div>
                    </div>
                    : ''
                    // </Modal>

                }
            </div>

        )
    }

}
// background:'url('+img+') no-repeat center center/100%',
[
    {
        class: "天气",
        type: "雷电",
        level: "黄色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "天气",
        type: "雷电",
        level: "红色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "空气质量",
        type: "空气质量",
        level: "黄色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "安全生产",
        type: "安全生产",
        level: "黄色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "火警",
        type: "火警",
        level: "橙色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "疫情防控",
        type: "疫情防控",
        level: "黄色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "城管事件",
        type: "城管事件",
        level: "黄色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "汛情",
        type: "汛情",
        level: "橙色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "汛情",
        type: "汛情",
        level: "红色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "地质灾害",
        type: "地质灾害",
        level: "绿色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "地质灾害",
        type: "地质灾害",
        level: "蓝色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "城市内涝",
        type: "城市内涝",
        level: "蓝色",
        description: "",
        time: "",
        department: "生态环境局"
    },
    {
        class: "森林防火",
        type: "森林防火",
        level: "红色",
        description: "",
        time: "",
        department: "生态环境局"
    }
]
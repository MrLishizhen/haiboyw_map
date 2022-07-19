//风险预警水球图
import React, {Component} from 'react';
// import * as echarts from 'echarts';
// import 'echarts-liquidfill'
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
            data: dataQuery,
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


        // let data = this.state.data.sort((a, b) => {
        //     return b.type - a.type;
        // });
        let value = this.state.data;
        // let value = ["天气&汛情&空气质量&火警&安全生产&疫情防控&城管事件&地质灾害&城市内涝&森林防火",{"level":"黄色","description":"目前，襄阳市区及各县市大部地区仍有轻到中度、局部重度霾，预计未来24小时仍将持续，请注意防范。","time":"2022-01-19 14:24:43","type":"霾","department":"襄阳市气象台","class":"天气"},{"level":"橙色","description":"预计今天夜间到明天上午，襄阳市区及各县市（区）将出现能见度小于500米，局部小于100米的雾，请注意防范。","time":"2022-01-18 21:43:04","type":"大雾","department":"襄阳市气象台","class":"天气"},{"level":"黄色","description":"公众加强健康防护，结合实际情况可以采取部分临时管控措施或提前采取黄色预警响应措施。","time":"2022-01-19 13:00:00","type":"空气质量","department":"环保局","class":"空气质量"}]
        let data, names;
        if (typeof value[0] == 'object') {
            names = []
            data = value;
        } else {
            names = !value[0] ? [] : value[0];
            data = value?.slice(1);
        }
        console.log(value)
        //剔除不良数据
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item === '' || JSON.stringify(item) === '{}'||JSON.stringify(item) =='null') {
                data.splice(i, 1);
                i--;
                continue;
            } else {

                item.subtitleSize = '30px'
                item.widthString = '200px';
                item.subtitle = item.class;
                switch (item?.level) {
                    case '蓝色' : {
                        item.jibie = 1;
                        break;
                    }
                    case '黄色' : {
                        item.jibie = 2;
                        break;
                    }
                    case '橙色' : {
                        item.jibie = 3;
                        break;
                    }
                    case '红色' : {
                        item.jibie = 4;
                        break;
                    }
                    default: {
                        item.jibie = 0;

                    }
                }
            }
        }

        data.sort((a, b) => {
            return b.jibie - a.jibie;
        })
        let TSArr = [];//暂存
        for (let i = 0; i < data.length; i++) {
            let arrIndex = TSArr.findIndex(item => item.class === data[i].class);
            if (arrIndex === -1) {
                data[i].text = 1;
                TSArr.push(data[i]);
            } else {

                if (data[i].jibie > TSArr[arrIndex].jibie) {//替换TSArr的内容
                    data[i].text += TSArr[arrIndex].text;
                    TSArr.splice(arrIndex, 1, data[i]);
                } else {//数据维持不变text+1
                    TSArr[arrIndex].text += 1;
                }
            }
        }


        if (!Array.isArray(names) && names) {
            let nameArr = [];

            names.split('&').forEach(item => {
                let index = TSArr.findIndex(items => item == items.class);
                if (index === -1) {
                    nameArr.push({
                        class: item,
                        type: item,
                        subtitle: item,
                        level: "绿色",
                        description: "",
                        jibie: 0,
                        text: 0,
                        // fontSize:'52px',
                        subtitleSize : '30px',
                        widthString: '200px'
                    })
                }
            })

            TSArr = TSArr.concat(nameArr);
        }

        this.setState({
            TSArr: TSArr,
        })

        console.log(TSArr);
        if (TSArr.length > 5) {
            //表示需要用到其他

            let datas = TSArr.slice(0, 5);
            let playDatas = TSArr.slice(5);
            let cont = 0;
            playDatas.forEach(item => {
                item.fontSize='64px';
                item.subtitleSize = '44px'
                item.widthString='400px';
                cont = cont + item.text;
            })

            let firstData = [...datas, {
                jibie: TSArr[5].jibie,
                text: cont !== 0 ? cont : 0,
                // color: '',
                // fontSize: '34px',
                subtitle: '其他',
                // subtitleSize: '24px',
               // fontSize:'52px',
                subtitleSize : '30px',
                // amplitude: 10,
                widthString: '200px'
            }];


            this.setState({
                firstData: firstData,
                playData: playDatas,
                playIs: false,
            })
        } else if (TSArr.length > 0 && TSArr.length <= 5 && TSArr[0] !== '') {

            let firstData = [...TSArr, {
                jibie: 0,
                text: 0,
                // color: '',
                // fontSize: '34px',
                subtitle: '其他',
                // subtitleSize: '24px',
                // amplitude: 10,
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
        if (this.state.TSArr.length > 5) {
            this.setState({
                playIs: true,
            }, () => {

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

    getDom = () => {
        if (document.getElementById("panel_canvas")) {
            return document.getElementById("panel_canvas")
        } else {
            return document.getElementById("root")
        }

    }

    render() {

        return (
            <div className={styles.web}>
                <div ref={node => this.node = node} style={{width:'100%',height:'100%',flexWrap: 'wrap',display: 'flex', 'alignContent': 'space-between',justifyContent: 'space-between'}}>
                    {this.state.firstData.map((item,i) => {
                        if (item.subtitle === '其他') {

                            return <div key={i} onClick={this.showClick}><Jindu dataProvider={[item]}/></div>
                        } else {
                            return <Jindu key={i} dataProvider={[item]}/>
                        }

                    })}
                    <div style={{width:200}}></div>
                    <div style={{width:200}}></div>
                </div>
                {
                    this.state.playIs ?

                        ReactDOM.createPortal(
                            <div className={styles.web2}>
                                <div className={'paly-box'}>
                                    <div className={'title'}>其他风险弹窗</div>
                                    <div className={'play'}>
                                        {this.state.playData.map((item,i) => {
                                            return <Jindu key={i} dataProvider={[item]}/>
                                        })}
                                    </div>
                                </div>
                            </div>,
                            this.getDom()
                        )
                        :
                        ''

                }
            </div>

        )
    }

}
// background:'url('+img+') no-repeat center center/100%',

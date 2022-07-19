import React, {Component} from 'react';

import {isEqual} from "lodash";
import styles from './index.less'
//table_li


// function(data, getLocalTempValue) {
//     const list = ["金融管理","企业诉求","营业执照，企业年报","税收征管","社保基金管理","住房公积金","扶贫开发政策","产业行业政策","劳务派遣纠纷","知识产权","知识产权申报","知识产权保护"];
//     const {tabId = 0} = data;
//     const val = list[tabId] || '';
//     const type = getLocalTempValue('qiyefuwu_node') || 'end';
//     if (val) {
//         const body1 = {
//             "pageNum":1,
//             "pageSize":1,
//             "city":"青羊区",
//             "$class_3$": val,
//             "nodeId": "notend"
//         };
//         const body2 = {
//             "pageNum":1,
//             "pageSize":1,
//             "city":"青羊区",
//             "$class_3$": val,
//             "nodeId": "end"
//         }
//         if (val === '企业诉求') {
//             body1['flowSource'] = '区县自建';
//             body2['flowSource'] = '区县自建';
//         }
//         return [{type: type}, {class3: val}, {body1: encodeURI(JSON.stringify(body1))}, {body2: encodeURI(JSON.stringify(body2))}]
//     }
//     return data;
// }
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            // data: [
            //     {
            //         line:1,
            //         tabItemHeight:'42px',
            //         tabHeader: [
            //             {
            //                 name: '建设地址',
            //                 style:{
            //                     width: '7.9%',
            //                 },
            //                 value:'jsdz'
            //             },
            //             {
            //                 name: '计划开工时间',
            //                 style:{
            //                     width: '9.9%',
            //                 },
            //                 value:'jhkgsj'
            //             },
            //             {
            //                 name: '计划竣工时间',
            //                 style:{
            //                     width: '9.9%',
            //                 },
            //                 value:'jhjgsj'
            //             },
            //             {
            //                 name: '行业分类',
            //                 style:{
            //                     width: '7.9%',
            //                 },
            //                 value:'xyfl'
            //             }, {
            //                 name: '建设内容及规模',
            //                 style:{
            //                     width: '9.9%',
            //                 },
            //                 value:'jsnrjgm '
            //             }
            //             , {
            //                 name: '总投资总计',
            //                 style:{
            //                     width: '9.9%',
            //                 },
            //                 value:'ztzzj'
            //             }, {
            //                 name: '2022年计划投资总计',
            //                 style:{
            //                     width: '11.9%',
            //                 },
            //                 value:'eleenjhtzzj'
            //             }, {
            //                 name: '2022年建设批次',
            //                 style:{
            //                     width: '9.9%',
            //                 },
            //                 value:'eleenjspc'
            //             }, {
            //                 name: '2022年工程形象进度',
            //                 style:{
            //                     width: '11.9%',
            //                 },
            //                 value:'eleengcxxjd'
            //             }, {
            //                 name: '项目业主单位',
            //                 style:{
            //                     width: '9.9%',
            //                 },
            //                 value:'xmyzdw'
            //             }, {
            //                 name: '形象进度',
            //                 style:{
            //                     width: '7.9%',
            //                 },
            //                 value:'xxjd'
            //             }
            //         ],
            //         tabCom:[
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             //
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //             // {jdmc:'食谱',lb:'求助',dz:'地址地址地址地址 地址地址地址地址',bjsj:'2022.5.23 19:23:54',xq:'详情详情详情详情详情 详情详情详情详情详详情详情详情详情详情 '},
            //
            //         ]
            //
            //     }
            //
            // ],

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

    handleChange = (value) => {
        this.setState({})
        this.state.handlers.onClick && this.state.handlers.onClick({value});
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
                    // let value = this.selectHot(dataQuery);
                    // console.log(value,123)
                    // this.handleChange(value)
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        let data = this.state?.data[0]||{};
        let {tabHeader = [],tabCom=[],tabItemHeight='42px',line=2,tabH='42px'} = data;

        return (
            <div ref={node => this.node = node} className={styles.box}>
                {
                    tabHeader.length > 0 ?
                        <>
                            <div className={styles.tableH} style={{height:tabH,lineHeight:tabH}}>
                                {
                                    tabHeader.map((u, i) => {
                                        return <div key={i} title={u.name} style={{...u.style}}
                                                    className={styles.tableH_item}>
                                            {u.name}
                                        </div>
                                    })
                                }
                            </div>
                            <div className={styles.com}>
                                {
                                    tabCom.length>0?tabCom.map((u,i)=>{
                                        return <div key={i} className={styles.comItem} style={{height:tabItemHeight}}>
                                            {
                                                tabHeader.map((j,l)=>{
                                                    return <div title={u[j.value]} style={{...j.style,WebkitLineClamp:line}}  key={l}>{u[j.value]}</div>
                                                })
                                            }
                                        </div>
                                    }):<div style={{height:42,lineHeight:'42px',textAlign:'center',color:'#fff',fontSize:'18px'}}>暂无数据</div>
                                }
                            </div>
                        </>
                        : ''
                }
            </div>
        )
    }

}

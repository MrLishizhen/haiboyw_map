import React, {Component} from 'react';
import {isEqual} from "lodash";
import styles from './index.less'
import bg from './images/bg.png'
import tableBg from './images/tableBg.png'
import gzjz from './images/gzjz.png'
// import data from './data'
import PdfView from './pdfjs'
import SelectLi from '../select_li'


/*
* 江河湖三个模块代码
* type
* 0 组织结构
* 1 工作机制
* 2 基础数据
* 宽高比
* 1280*720
* 1392*720
* 2182*720
*
*
* */
export default class Rivers_components extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            data: dataQuery[0]||{},
            // data:data,
            isShow:false,
        }
    }

    componentDidMount() {

    }
    //千分符
    format = (num=0)=>{

        let reg=/\d{1,3}(?=(\d{3})+$)/g;
        return (num + '').replace(reg, '$&,');
    }

    //生成组织结构代码
    createOrganizationHtml = () => {
        const {data = []} = this.state?.data;
        return (
            <div className={styles.zzjg_content}>
                {
                    data.map((item, index) => {
                        return (<div className={`${styles.item_content} ${styles.hide}`} title={item.name} key={index}>{item}</div>)
                    })
                }
            </div>
        )
    }
    getDom = () => {

        if (document.getElementById("panel_canvas")) {

            return document.getElementById("panel_canvas")
        } else {


            return document.getElementById("root")
        }

    }
    //加入pdf
    addPdf=(url)=>{

        this.setState({
            isShow:true,
            url:url
        })
    }

    //生成工作机制代码
    createMechanismHtml = () => {
        const {data = []} = this.state?.data;
        return (
            <div className={styles.mechanism_box}>
                {
                    data.map((item, i) => {
                        return (<div className={`${styles.mechanism_item} ${styles.hide}`} onClick={()=>this.addPdf(item.url)} title={item.name} key={i.toString()}>{item.name}</div>)
                    })
                }
            </div>
        )
    }
    //表格数据
    createBasicDataHtml = () => {
        const {data = []} = this.state?.data;
        return (
            <div className={styles.basic_box}>
                <div className={styles.table_top}>
                    <div className={`${styles.xzqh} ${styles.one}`}>
                        <span>行政区划</span>
                    </div>
                    <div className={`${styles.hhzzs} ${styles.two}`}>
                        <div className={styles.top}>
                            <span>河湖长总数</span>
                        </div>
                        <div className={styles.cent}>
                            <span>在任河湖长</span>
                            <span>全部</span>
                        </div>
                    </div>
                    <div className={`${styles.hhzs} ${styles.one}`}>
                        河湖总数
                    </div>
                    <div className={`${styles.hhzqzxczs} ${styles.two}`}>
                        <div className={styles.top}>
                            <span>河湖长亲自巡查次数</span>
                        </div>
                        <div className={styles.cent}>
                            <span>全线</span>
                            <span>局部</span>
                            <span>小计</span>
                        </div>
                    </div>
                    <div className={`${styles.hhzqzxcrs} ${styles.two}`}>
                        <div className={styles.top}>
                            <span>河湖长亲自巡查人数</span>
                        </div>
                        <div className={styles.cent}>
                            <span>全线</span>
                            <span>局部</span>
                            <span>小计</span>
                        </div>
                    </div>
                    <div className={`${styles.wtxccs} ${styles.two}`}>
                        <div className={styles.top}>
                            <span>委托巡查次数</span>
                        </div>
                        <div className={styles.cent}>
                            <span>全线</span>
                            <span>局部</span>
                            <span>小计</span>
                        </div>
                    </div>
                    <div className={`${styles.xczcs} ${styles.two}`}>
                        <div className={styles.top}>
                            <span>巡查总次数</span>
                        </div>
                        <div className={styles.cent}>
                            <span>全线</span>
                            <span>局部</span>
                            <span>小计</span>
                        </div>
                    </div>
                    <div className={`${styles.wbxchh} ${styles.one}`} style={{padding: '0 8px'}}>
                        <span>未被巡查河湖</span>
                    </div>
                    <div className={`${styles.wqzxchh} ${styles.one}`} style={{padding: '0 8px'}}>
                        <span>未亲自巡查人数</span>
                    </div>
                    <div className={`${styles.wxcqwwtxcrs} ${styles.one}`} style={{padding: '0 8px'}}>
                        <span>未巡查且未委托巡查人数</span>
                    </div>
                    <div className={`${styles.hhzlz} ${styles.two}`}>
                        <div className={styles.top}>
                            <span>河湖长履职</span>
                        </div>
                        <div className={styles.cent}>
                            <span>已履职</span>
                            <span>未履职</span>
                            <span>履职率％</span>
                        </div>
                    </div>
                    <div className={`${styles.lxbmlz} ${styles.two}`}>
                        <div className={styles.top}>
                            <span>联系部门履职</span>
                        </div>
                        <div className={styles.cent}>
                            <span>已履职</span>
                            <span>未履职</span>
                            <span>履职率％</span>
                        </div>
                    </div>
                    <div className={`${styles.jjwtgs} ${styles.one}`}>
                        <span>解决问题个数</span>
                    </div>
                </div>
                <div className={styles.table_cent}>
                    {data.map((item,i)=>{
                        return ( <div className={styles.tableItem}>
                                <div className={styles.xzqh}>
                                    <span className={styles.hide} title={item.xzqh}>{item.xzqh}</span>
                                </div>
                                <div className={styles.hhzzs}>
                                    <span className={`${styles.zrhhz_sapn} ${styles.hide}`} title={item.zrhhz}>{this.format(item.zrhhz)}</span>
                                    <span className={`${styles.qb_span} ${styles.hide}`} title={item.qb}>{this.format(item.qb)}</span>
                                </div>
                                <div className={styles.hhzs}>
                                    <span className={styles.hide} title={item.hhzs}>{this.format(item.hhzs)}</span>
                                </div>
                                <div className={styles.hhzqzxczs}>
                                    <span className={styles.hide} title={item.hhzqzxccs_qx}>{this.format(item.hhzqzxccs_qx)}</span>
                                    <span className={styles.hide} title={item.hhzqzxccs_jb}>{this.format(item.hhzqzxccs_jb)}</span>
                                    <span className={styles.hide} title={item.hhzqzxccs_xj}>{this.format(item.hhzqzxccs_xj)}</span>
                                </div>
                                <div className={styles.hhzqzxcrs}>
                                    <span className={styles.hide} title={item.hhzqzxcrs_qx}>{this.format(item.hhzqzxcrs_qx)}</span>
                                    <span className={styles.hide} title={item.hhzqzxcrs_jb}>{this.format(item.hhzqzxcrs_jb)}</span>
                                    <span className={styles.hide} title={item.hhzqzxcrs_xj}>{this.format(item.hhzqzxcrs_xj)}</span>
                                </div>
                                <div className={styles.wtxccs}>
                                    <span className={styles.hide} title={item.wtxccs_qx}>{this.format(item.wtxccs_qx)}</span>
                                    <span className={styles.hide} title={item.wtxccs_jb}>{this.format(item.wtxccs_jb)}</span>
                                    <span className={styles.hide} title={item.wtxccs_xj}>{this.format(item.wtxccs_xj)}</span>
                                </div>
                                <div className={styles.xczcs}>
                                    <span className={styles.hide} title={item.xczcs_qx}>{this.format(item.xczcs_qx)}</span>
                                    <span className={styles.hide} title={item.xczcs_jb}>{this.format(item.xczcs_jb)}</span>
                                    <span className={styles.hide} title={item.xczcs_xj}>{this.format(item.xczcs_xj)}</span>
                                </div>
                                <div className={styles.wbxchh}>
                                    <span className={styles.hide} title={item.wbxchh}>{this.format(item.wbxchh)}</span>
                                </div>
                                <div className={styles.wqzxchh}>
                                    <span className={styles.hide} title={item.wqzxcrs}>{this.format(item.wqzxcrs)}</span>
                                </div>
                                <div className={styles.wxcqwwtxcrs}>
                                    <span className={styles.hide} title={item.wxcqwwtxcrs}>{this.format(item.wxcqwwtxcrs)}</span>
                                </div>
                                <div className={styles.hhzlz}>
                                    <span className={styles.hide} title={item.hhzlzl_ylz}>{this.format(item.hhzlzl_ylz)}</span>
                                    <span className={styles.hide} title={item.hhzlzl_wlz}>{this.format(item.hhzlzl_wlz)}</span>
                                    <span className={styles.hide} title={item.hhzlzl_lzl}>{item.hhzlzl_lzl}</span>
                                </div>
                                <div className={styles.lxbmlz}>
                                    <span className={styles.hide} title={item.lxbmlzl_ylz}>{this.format(item.lxbmlzl_ylz)}</span>
                                    <span className={styles.hide} title={item.lxbmlzl_wlz}>{this.format(item.lxbmlzl_wlz)}</span>
                                    <span className={styles.hide} title={item.lxbmlzl_lzl}>{item.lxbmlzl_lzl}</span>
                                </div>
                                <div className={styles.jjwtgs}>
                                    <span className={styles.hide} title={item.jjwtgs}>{this.format(item.jjwtgs)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    createDom = () => {
        const {type = 0, data = []} = this.state?.data||{};
        switch (type) {
            //组织结构
            case 0: {
                return this.createOrganizationHtml();
            }
            //工作机制
            case 1: {
                return this.createMechanismHtml();
            }
            //基础数据
            case 2: {
                return this.createBasicDataHtml();
            }
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

                this.setState({
                    data: dataQuery[0]||{}
                    // data:data
                }, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    hideBox=(e)=>{
        if(e.target===document.querySelector('#pdfBox')){
            this.setState({
                isShow:false,
            })
        }

    }
    render() {
        const {data = [], title = '',type = 0,yarnData=[],quarterData=[]} = this.state?.data||{};

        const {isShow=false,url=''} = this.state;
        let img = bg;
        //判断背景图
        switch (type) {
            case 0 : {
                img = bg;
                break;
            }
            case 1 : {
                img = gzjz;
                break;
            }
            case 2 : {
                img = tableBg;
                break;
            }
        }
        return (
            <>
                <div className={styles.box} style={{background: `url(${img}) no-repeat center center/100% 100%`}}>
                    <div className={styles.top_box}>
                        <div className={styles.top_logo}>{title}</div>
                        {/*{*/}
                        {/*    type === 2 ? (*/}
                        {/*        <div className={styles.top_right}>*/}
                        {/*            <div className={styles.top_right_item}>*/}
                        {/*                <span>年度</span>*/}
                        {/*                <SelectLi width={96} dataProvider={yarnData}></SelectLi>*/}
                        {/*            </div>*/}
                        {/*            <div className={styles.top_right_item}>*/}
                        {/*                <span>季度</span>*/}
                        {/*                <SelectLi width={96} dataProvider={quarterData}></SelectLi>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    ) : ''*/}
                        {/*}*/}
                    </div>
                    <div className={styles.content_box} style={{'flexGrow': data.length <= 9 && type === 1 ? '0' : '1'}}>
                        {this.createDom()}
                    </div>
                </div>
                { isShow?
                    ReactDOM.createPortal(
                        <div className={styles.pdfBox} id={'pdfBox'} onClick={this.hideBox}>
                            <PdfView dataProvider={[url]}></PdfView>
                        </div>,
                        this.getDom()
                    ):
                    ''
                }
            </>

        )
    }

}

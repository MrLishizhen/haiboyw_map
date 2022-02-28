import React, {Component} from "react";
import Axios from 'axios';
import {PDFReader} from 'react-read-pdf';
import styles from './pdfCss.less'
import {isEqual} from "lodash";

export default class PDFViewer extends Component {
    constructor(props) {
        super(props)
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            page: 1,
            count: 0,
            url: dataQuery[0] || ''
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
                    url: dataQuery[0]
                }, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    componentDidMount() {

        // Axios({
        //     url:'http://47.94.12.253:3307/admin/captcha',
        //     method:'GET',
        //     headers:{
        //         "Content-Type":'application/x-www-form-urlencoded'
        //     }
        // }).then((res=>{
        //     console.log(res,'秋水')
        // }));
    }

    onDocumentComplete = (a) => {

        //页数
        this.setState({
            count: a
        })
    }

    clickPage = (i) => {
        let {page, count} = this.state;
        let num = 0;
        if (i === 1) {
            //表示增加
            page === count ? num = page : num = page + 1;
        } else if (i === -1) {
            // 表示上一页
            page === 1 ? num = page : num = page - 1;
        }

        this.setState({
            page: num
        })
    }

    render() {
        let {count, url = ''} = this.state;
        return (
            <div className={styles.pdf_box}>
                {
                    url === '' ? (<div style={{fontSize: '40px', color: "#fff",textAlign:'center'}}>无数据</div>) : (
                        <>
                            <PDFReader url={url} page={this.state.page} showAllPage={false}
                                       onDocumentComplete={this.onDocumentComplete}/>
                            <div className={styles.pdf_btns}>
                                <div className={styles.pdf_btn_box}>
                                    <div className={styles.pdf_btn} onClick={() => this.clickPage(-1)}>上一页</div>
                                    <div className={styles.pdf_btn} onClick={() => this.clickPage(1)}>下一页</div>
                                </div>
                                <div className={styles.count}>{`总页数：${count}`}</div>
                            </div>
                        </>)
                }
            </div>

        )
    }
}
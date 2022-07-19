import React, { Component } from 'react';
import styles from './index.less'
import { isEqual } from "lodash";


export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const { dataProvider = [] } = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : ['街道&总数&街道城运中心&综合执法中心&市场监管&派出所&供电&司法所&社区人员&网格员',
            [ {'街道':'定中门','总数':'245','街道城运中心':12,'综合执法中心':'14','市场监管':45,'派出所':14,'供电':14,'司法所':'65','社区人员':16,"网格员":'18'}
            ,{'街道':'定中门','总数':'245','街道城运中心':12,'综合执法中心':'14','市场监管':45,'派出所':14,'供电':14,'司法所':'65','社区人员':16,"网格员":'18'}
            ,{'街道':'定中门','总数':'245','街道城运中心':12,'综合执法中心':'14','市场监管':45,'派出所':14,'供电':14,'司法所':'65','社区人员':16,"网格员":'18'}
            ,{'街道':'定中门','总数':'245','街道城运中心':12,'综合执法中心':'14','市场监管':45,'派出所':14,'供电':14,'司法所':'65','社区人员':16,"网格员":'18'},
            {'街道':'定中门','总数':'245','街道城运中心':12,'综合执法中心':'14','市场监管':45,'派出所':14,'供电':14,'司法所':'65','社区人员':16,"网格员":'18'},
            {'街道':'定中门','总数':'245','街道城运中心':12,'综合执法中心':'14','市场监管':45,'派出所':14,'供电':14,'司法所':'65','社区人员':16,"网格员":'18'}]];
        let tableTopdata = '';

        if(dataQuery[0]){
            tableTopdata = dataQuery[0].split('&');
        }else{
            tableTopdata = []
        }

        let tableData = dataQuery[1] || []
        this.state = {
            data: {
                tableTopdata:tableTopdata||[],
                tableData:tableData||[]
            }

        }
    }



    componentDidMount () {

    }

    shouldComponentUpdate (nextProps, nextState) {
        const { dataProvider, style } = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider :
                    ['街道&总数&街道城运中心&综合执法中心&市场监管&派出所&供电&司法所&社区人员&网格员',
                    ];
                let tableTopdata = [];

                if(dataQuery[0]){
                    tableTopdata = dataQuery[0].split('&');
                }else{
                    tableTopdata = []
                }
                console.log(tableTopdata,123)
                let tableData = dataQuery[1] || []
                this.setState({
                    data: {
                        tableTopdata:tableTopdata||[],
                        tableData:tableData||[]
                    }
                }, () => {


                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render () {
        let {
            tableTopdata=[],
            tableData=[]
        } = this.state.data;
    console.log(tableData)
        let hot = tableTopdata.length > 0 ? true : false;
        let tableHot = tableData.length > 0 ? true : false;
        return (
            <div ref={node => this.node = node} className={styles.box} style={{width:900,height:214}}>
                <div className={styles.topBox} style={{width:tableTopdata.length*150}}>
                    {
                        tableTopdata.map((u,i)=>{

                            return <div className={styles.topItem} title={u} style={{fontSize:24}} key={i}>{u}</div>
                        })
                    }
                </div>
                <div className={styles.bomBox} style={{width:tableTopdata.length*150,}}>
                    {
                        tableData.map((u,i,arr)=>{

                            return <div key={i} style={{display:'flex',width:tableTopdata.length*150,}}>
                                {
                                    tableTopdata.map((m,j)=>{
                                        return <div className={styles.topItem} key={j} title={u[m]} style={{color:'#2FE8FF',fontSize:26}}>{u[m]}</div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>

            </div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',

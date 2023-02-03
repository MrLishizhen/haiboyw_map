import React, { Component } from 'react';
import { getDataProvider } from '../../utils/DataUtils';
import styles from './index.less'
import { Descriptions, Tooltip } from 'antd';



//yujingfenxilist

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handlres: "",
            seelist: [],
            list: ""
        }
    }

    componentDidMount() {
        try {
            const { buffEvent = [{ type: 'click' }] } = this.props;
            let eventValue = {};
            for (let i = 0; i < buffEvent.length; i++) {
                const eventObj = buffEvent[i];
                const { type, method, bindedComponents } = eventObj;
                if (type === 'click') {
                    eventValue = {
                        onClick: (data) => {
                            method && method({ ...data }, bindedComponents)
                        }
                    }
                }
            }
            this.setState({
                handlers: Object.assign({}, eventValue),
            })
            this.initData(this.props)
        } catch (error) {
            console.log(error)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.initData(nextProps)
    }

    initData(props) {
        const data = getDataProvider(props);
        let seearr = [], listarr = [];
        data && data.length > 0 ? seearr = data.filter(item => item && item.jjgd !== undefined && item.name) : seearr = []
        data && data.length > 0 ? listarr = data.filter(item => item && item.jjgd === undefined) : listarr = []
        let hot = this.state.seelist.findIndex(u=>u.hot);
        if(hot===-1){
            seearr.length > 0 ? seearr[0].hot = true : '';
        }else{
            seearr[hot].hot=true;
        }
        this.setState({ seelist: seearr, list: listarr })

    }
    clickseelist(item){
        let {seelist = [],handlers} = this.state;
        let name = '';
        for(let i = 0;i<seelist.length;i++){
            if(seelist[i].name === item.name){
                name = seelist[i].name;
                seelist[i].hot = true;
            }else{
                seelist[i].hot = false;
            }
        }

        this.setState({
            seelist:[...seelist]
        })
        handlers.onClick && handlers.onClick({ type: name});
    }

    render() {
        const { seelist, list } = this.state;
        console.info(seelist, 'seelist');

        try {
            return (
                <div className={styles.yjfxList}>
                    <div className={styles.seeall}>
                        {seelist && seelist.length > 0 && seelist.map((item, index) => {
                            if (item) {
                                return <div onClick={()=>this.clickseelist(item)} className={`${styles.seelist} ${item.hot?styles.hot:''}`} key={index}>
                                    <h4>{item.jjgd}</h4>
                                    <h5>{item.name}</h5>
                                </div>
                            }
                        })}
                    </div>
                    <div className={styles.openlist}>
                        {list && list.length > 0 && list.map((item, index) => {
                            return <div className={styles.arrlist} key={index}>
                                <Descriptions layout="vertical" column={5} className={styles.onelist}>
                                    <Descriptions.Item label="任务号">{item.TASKID}</Descriptions.Item>
                                    <Descriptions.Item label="发现时间">{item.DISCOVERTIME}</Descriptions.Item>
                                    <Descriptions.Item label="案件大类">{item.INFOBCNAME}</Descriptions.Item>
                                    <Descriptions.Item label="主责单位">{item.PEXECUTEDEPTNAME_MH}</Descriptions.Item>
                                    <Descriptions.Item label="案件状态">{item.ENDNUM}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions column={1} className={styles.twolist}>
                                    <Descriptions.Item label="问题描述"><Tooltip placement="topLeft" overlayClassName={styles.ant_tooltip} title={item.DESCRIPTION}>{item.DESCRIPTION}</Tooltip></Descriptions.Item>
                                    <Descriptions.Item label="办结意见">{item.ENDRESULTNEW}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        })}
                    </div>
                </div>
            )
        } catch (error) {
            console.log(e)
        }
    }
}

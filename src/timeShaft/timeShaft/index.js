import React from 'react'
import styles from './index.less'
import { isEqual } from 'lodash';
import remarkImg from '../../assets/img.jpg'
import BigImg from './bigImg'

const json = {
    header: {
        title: '医学隔离人员管控',
        content: [
            {id: 0, name: '案件类型：', value: '居家隔离测温观察'},
            {id: 1, name: '案件位置：', value: '淞虹路715弄威宁路358弄28号2105室'},
            {id: 2, name: '发现时间：', value: '2020-09-10  12:31:07'},
            {id: 3, name: '处置状态：', value: '结案'},
            {id: 4, name: '案件描述：', value: '居家隔离测温观察'},
        ]
    },
    timeShaft: [
        {id: 0, title: '核查通过', time: '2020-09-10  13:41:00', staff: '自动', remark: '核查通过', img:[]},
        {id: 1, title: '处置', time: '2020-09-10  13:41:00', staff: '卞雅艳', remark: '', img:[]},
        {id: 2, title: '待处置', time: '2020-09-10  13:41:00', staff: '张志强', remark: '请尽快进行处理，并在处理完成后及时反馈。', img:[]},
        {id: 3, title: '指定处置人', time: '2020-09-10  13:41:00', staff: '张志强', remark: '', img:['url','url','url']},
        {id: 4, title: '收回', time: '2020-09-10  13:41:00', staff: '卞雅艳', remark: '', img:[]},
    ]
} 

class TimeShaft extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isShade: false,
            data: []
        }
    }

    componentDidMount(){
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
        if (!isEqual(this.props, nextProps)) {
          const data = this.getData(nextProps);
          this.setState({
              data
          })
        }
    }

    changeShade = () => {
        const { isShade } = this.state   
        this.setState({
            isShade: !isShade
        })
    }

    render() {
        const { isShade, data } = this.state
        return <div className={styles.control} style={data[0] ? data[0].style : {}}>
                    <p className={styles.close}></p>
                    <div className={styles.top}>
                        <h2>{json.header.title}</h2>
                        {
                            json.header.content.map((item) => {
                                return <div className={styles.header_content} key={item.id}>
                                    <span>{item.name}</span>
                                    <span>{item.value}</span>
                                </div>
                            })
                        }
                    </div>
                    <p className={styles.line}></p>
                    <div className={styles.bottom}>
                        <div className={styles.caption}>
                            <h4>{'案件处置'}</h4>
                            <div className={styles.on_off}>
                                {'时间'}<span></span>{'流程'}
                            </div>
                        </div>
                        <div className={styles.time_content}>
                            {
                                json.timeShaft.map((item) => {                               
                                    return  <div className={styles.time} key={item.id}>
                                                <div className={styles.time_left}>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <div className={styles.time_right}>
                                                    <h5>{item.title}</h5>
                                                    <p>{item.time}</p>
                                                    <p>{'处置人员：' + item.staff}</p>
                                                    {
                                                        item.remark ? (<div className={styles.header_content}>
                                                            <span>{'案件备注：'}</span>
                                                            <span>{item.remark}</span>
                                                        </div>) : ''
                                                    }
                                                    {
                                                        item.img.length ? (
                                                            <>
                                                                <p>{'案件图片：'}</p>
                                                                <div className={styles.time_img}>
                                                                    {item.img.map((url, index) => {
                                                                        return <img src={remarkImg} onClick={this.changeShade} alt="" key={index} />
                                                                    })}
                                                                </div>
                                                            </>
                                                        ) : ''
                                                    } 
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                    </div>
                    { isShade ? (<BigImg url={remarkImg} changeShade={this.changeShade} />) : ''}
               </div>
    }
}

export default TimeShaft;
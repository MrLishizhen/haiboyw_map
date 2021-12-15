import React from 'react';
import ReactDOM from 'react-dom';
// import flow from './images/flow.jpg';
import styles from './index.less';

class SickWord extends React.Component {
    componentWillUnmount() {
        console.info('componentWillUnmount');
        if (this.div) {
            document.body.removeChild(this.div);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            const { data } = nextProps;

            if (data && data.content && data.type === 'img') {
                if (nextProps.visible) {
                    this.div = document.createElement('div');
                    ReactDOM.render(
                        <div style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, textAlign: 'center', cursor: 'pointer', zIndex: 1050 }} onClick={() => this.props.setState(false)}>
                            <img className={styles.preview_img} src={'http://bigdata.cn.gov:8070/' + data.content} alt='' />
                        </div>,
                        this.div
                    );
                    document.body.appendChild(this.div);
                } else {
                    if (this.div) {
                        document.body.removeChild(this.div);
                        this.div = null;
                    }
                }
            }
        }
    }

    render() {
        const { data = {}, visible } = this.props;

        return (
            <div className={styles.word} style={data && data.type === 'img' ? { overflow: 'hidden' } : {}}>
                {data && data.content && data.type === 'text' && <div dangerouslySetInnerHTML={{ __html: data.content }} />}
                {data && data.content && data.type === 'img' &&
                    <section>
                        <div style={{ width: 2861, cursor: 'pointer' }}>
                            <img src={'http://bigdata.cn.gov:8070/' + data.content} alt='' onClick={() => this.props.setState(true)} />
                        </div>
                        {/* {visible &&
                            <div style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0, textAlign: 'center', cursor: 'pointer' }} onClick={() => this.props.setState(false)}>
                                <img className={styles.preview_img} src={'http://bigdata.cn.gov:8070/' + data.content} alt='' />
                            </div>
                        } */}
                    </section>
                }
                {/* {(() => {
                    switch (0) {
                        case 0: return <section>
                            <h2>{'一、病例定义'}</h2>
                            <h3>{'1. 疑似病例'}</h3>
                            <p>{'有流行病学史中的任何1条，且符合临床表现中任意2条。无明确流行病学史的，符合临床表现中的3条。流行病学史包括：①发病前14天内有湖北省，或其他有病例报告社区的旅行史或居住史；②发病前14天内与新型冠状病毒感染者（核酸检测阳性者）有接触史；③发病前14天内曾接触过来自湖北省，或来自有病例报告社区的发热或有呼吸道症状的患者；④聚集性发病：两周内在小范围内，如家庭、办公室、学校班级等场所，出现2例及以上发热和/或呼吸道症状的病例。临床表现包括：①发热和/或呼吸道症状；②具有新型冠状病毒肺炎影像学特征；③发病早期白细胞总数正常或降低，淋巴细胞计数减少。'}</p>
                            <h3>{'2. 确诊病例'}</h3>
                            <p>{'疑似病例，具备以下病原学证据之一者：①实时荧光RT-PCR检测新型冠状病毒核酸阳性；②病毒基因测序，与已知的新型冠状病毒高度同源。'}</p>
                            <h3>{'3.无症状感染者'}</h3>
                            <p>{'无临床症状，呼吸道等标本新型冠状病毒病原学检测阳性者。主要通过聚集性疫情调查和传染源追踪调查等途径发现。'}</p>
                        </section>
                        case 1: return <section>
                            <h2>{'二、暴发定义（聚集性）'}</h2>
                            <p>{'聚集性疫情是指14天内在小范围（如一个家庭、一个工地、一个单位等）发现2例及以上的确诊病例或无症状感染者，且存在因密切接触导致的人际传播的可能性，或因共同暴露而感染的可能性。聚集性疫情的“小范围”不局限于家庭、工地、单位，也包括养老院、医院、实验室等场所，或飞机、火车、汽车、'}</p>
                        </section>
                        case 2: return <section>
                            <h2>{'三、密切接触者定义'}</h2>
                            <p>{'密切接触者指从疑似病例和确诊病例症状出现前2天开始，或无症状感染者标本采样前2天开始，未采取有效防护与其有近距离接触（1米内）的人员，具体接触情形包括：'}</p>
                            <p>{'1.同一房间共同生活的家庭成员。'}</p>
                            <p>{'2.直接照顾者或提供诊疗、护理服务者。'}</p>
                            <p>{'3.在同一空间内实施可能会产生气溶胶的诊疗活动的医务工作者。'}</p>
                            <p>{'4.在办公、车间、班组、电梯、食堂、教室等同一场所有近距离接触的人员。'}</p>
                            <p>{'5.密闭环境下共餐、共同娱乐以及提供餐饮和娱乐服务的人员。'}</p>
                            <p>{'6.探视病例的医护人员、家属或其他有近距离接触的人员。'}</p>
                            <p>{'7.乘坐同一交通工具并有近距离接触人员，包括在交通工具上照料护理人员、同行人员（家人、同事、朋友等），或经调查评估后发现有可能近距离接触病例和无症状感染者的其他乘客和乘务人员。不同交通工具密切接触判定方法参见附1。'}</p>
                            <p>{'8.现场调查人员调查后经评估认为其他符合密切接触者判定标准的人员。'}</p>
                        </section>
                        case 3: return <section>
                            <h2>{'四、处置流程图'}</h2>
                            <div style={{ width: 2290 }}>
                                <img src={flow} alt="" />
                            </div>
                        </section>
                        case 4: return <section>
                            <h2>{'五、历史案例（简介）'}</h2>
                            <p>{'2020年8月19日隔离点报告1例境外入境观察对象在海关留验的样本呈新冠核酸阳性结果。'}</p>
                        </section>

                        default:
                            break;
                    }
                })()} */}
            </div>
        )
    }
}

export default SickWord;
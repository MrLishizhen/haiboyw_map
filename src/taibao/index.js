import React, { Component } from 'react';
import _ from 'lodash';
import styles from './index.less';

import PieChart from './PieChart'

export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    onClick = (data) => {
        const { buffEvent = [] } = this.props;

        if (buffEvent && buffEvent.length > 0) {
            buffEvent.forEach(item => {
                const { method, bindedComponents } = item;
                if (typeof method === 'function') {
                    console.log('onClick', data)
                    method({ ...data }, bindedComponents);
                }
            });
        }
    }

    render() {
        const { dataProvider = [] } = this.props;

        return (
            <div className={styles.basic_wrapper}>
                <div className={styles.header}>
                    寿险系统指标看板
                </div>
                <div className={styles.content}>
                    <div>
                        <div>
                            <div style={{ padding: '20px 15px' }}>
                                {dataProvider && dataProvider.length > 0 && dataProvider.map((item, index) => {
                                    return <Item key={index} data={item} onClick={this.onClick} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Item extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props);
    }

    generateData = (L, Q, U) => {
        const xl = L ? parseInt(L) : 0;
        const zl = Q ? parseInt(Q) : 0;
        const aq = U ? parseInt(U) : 0;

        return [
            { value: xl, name: '效率' },
            { value: 50 - xl },
            { value: zl, name: '质量' },
            { value: 50 - zl },
            { value: aq, name: '安全' },
            { value: 50 - aq }
        ];
    }

    onClick = (data) => {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(data)
        }
    }

    render() {
        const { data } = this.props;
        const { A, B, C, D, E, F, Q, L, G, U } = data;

        return (
            <div className={styles.item_wrapper} onClick={this.onClick.bind(this, data)}>
                <div className={styles.top} style={A === '1' ? { backgroundColor: '#FF7E79' } : {}}>
                    <div>
                        <div className={styles.kpi}>KPI分数</div>
                        <div className={styles.no}>No.{A}</div>
                    </div>
                </div>
                <div className={styles.item_title}>
                    {C}
                </div>
                <div className={styles.item_content}>
                    <div>
                        <div className={styles.tips}>
                            <div className={styles.no}>
                                项目序号：{B}
                            </div>
                            <div className={styles.compare}>
                                做比较
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div>实施部门：</div>
                            <div>{D}</div>
                        </div>
                        <div className={styles.item}>
                            <div>技术经理：</div>
                            <div>{E}</div>
                        </div>
                        <div className={styles.item}>
                            <div>项目管理：</div>
                            <div>{F}</div>
                        </div>
                    </div>
                    <div>
                        <PieChart score={G} data={this.generateData(L, Q, U)} />
                    </div>
                </div>
            </div>
        );
    }
}

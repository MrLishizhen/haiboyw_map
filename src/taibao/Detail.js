import React, { Component } from 'react';
import styles from './index.less';

import PieChart from './PieChart';

const DEFAULT_ITEM = {
    'xl': {
        label: '效率', field: 'L', children: [
            { label: '需求实现率', field: 'H', suffix: '%' },
            { label: '需求交付时效（天）', field: 'I', suffix: '%' },
            { label: '项目结项延期率', field: 'J' },
            { label: '产能提升', field: 'K', suffix: '%' }
        ]
    },
    'zl': {
        label: '质量', field: 'Q', children: [
            { label: '功能开发缺陷率', field: 'M', suffix: '%' },
            { label: '安全开发缺陷率', field: 'N', suffix: '%' },
            { label: '测试缺陷检出率', field: 'O', suffix: '%' },
            { label: '一次发布成功率', field: 'P', suffix: '%' }
        ]
    },
    'aq': {
        label: '安全', field: 'U', children: [
            { label: '数据修改数量', field: 'R' },
            { label: '未按时修复/处置漏洞数', field: 'S' },
            { label: '外部通报漏洞数', field: 'T' },
        ]
    },
}

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'xl'
        };
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

    onClick = (active) => {
        this.setState({ active });
    }

    render() {
        const { active } = this.state;
        const { dataProvider = [] } = this.props;
        const data = dataProvider[0] || {};
        const { A, B, C, D, E, F, Q, L, G, U } = data;
        const keys = Object.keys(DEFAULT_ITEM);
        console.info(L, Q, U);
        return (
            <div className={styles.basic_wrapper}>
                <div className={styles.header}>
                    寿险系统指标详情
                </div>
                <div className={styles.content}>
                    <div>
                        <div style={{ padding: 0 }}>
                            <div style={{ width: 240, height: 215, margin: '0 auto', position: 'relative' }}>
                                <PieChart score={G} scoreStyle={{ lineHeight: '215px', fontSize: 48, fontWeight: 600 }} labelStyle={{ fontSize: 16 }} data={this.generateData(L, Q, U)} />
                            </div>
                            <div className={styles.detail_wrapper}>
                                <div className={styles.top} style={A === '1' ? { backgroundColor: '#FF7E79', top: 16, right: 16 } : { top: 16, right: 16 }}>
                                    <div>
                                        <div className={styles.kpi}>KPI分数</div>
                                        <div className={styles.no}>No.{A}</div>
                                    </div>
                                </div>
                                <div style={{ borderBottom: '1px solid rgba(243, 243, 243, 1)', padding: '27px 16px 0 16px' }}>
                                    <div className={styles.title}>
                                        {C}
                                    </div>
                                    <div className={styles.line} />
                                    <div className={styles.tips} style={{ background: 'none' }}>
                                        <div className={styles.no}>
                                            项目序号：{B}
                                        </div>
                                        <div className={styles.compare}>
                                            做比较
                                        </div>
                                    </div>
                                </div>
                                <div style={{ borderBottom: '1px solid rgba(243, 243, 243, 1)', padding: '20px 16px' }}>
                                    <div className={styles.item} style={{ fontSize: 14, lineHeight: '20px' }}>
                                        <div>实施部门：</div>
                                        <div>{D}</div>
                                    </div>
                                    <div className={styles.item} style={{ fontSize: 14, lineHeight: '20px', marginTop: 8, display: 'inline-block', verticalAlign: 'top', width: '50%' }}>
                                        <div>技术经理：</div>
                                        <div>{E}</div>
                                    </div>
                                    <div className={styles.item} style={{ fontSize: 14, lineHeight: '20px', marginTop: 8, display: 'inline-block', verticalAlign: 'top', width: '50%' }}>
                                        <div>项目管理：</div>
                                        <div>{F}</div>
                                    </div>
                                </div>
                                <div className={styles.detail_item_list} style={{ borderBottom: '1px solid rgba(243, 243, 243, 1)', padding: '10px 16px' }}>
                                    {keys.map(key => {
                                        const item = DEFAULT_ITEM[key];

                                        return (
                                            <div key={key} className={active === key ? styles.active : null} style={{ width: `${100 / keys.length}%` }} onClick={this.onClick.bind(this, key)}>
                                                <div>
                                                    {item.label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.detail_item_score} style={{ borderBottom: '1px solid rgba(243, 243, 243, 1)', padding: '10px 16px' }}>
                                    <div>
                                        {DEFAULT_ITEM[active].label}(得分)
                                    </div>
                                    <div style={{ fontSize: 32, fontWeight: 600, lineHeight: '45px' }}>
                                        {data[DEFAULT_ITEM[active].field] || 0}
                                    </div>
                                </div>
                                <div>
                                    {DEFAULT_ITEM[active].children.map((item, index) => {
                                        return (
                                            <div key={index} className={styles.item} style={{ fontSize: 14, height: 'unset', lineHeight: '20px', padding: '10px 16px', borderTop: index !== 0 ? '1px solid rgba(243, 243, 243, 1)' : 'none' }}>
                                                <div>{item.label}：</div>
                                                <div>{data[item.field] ? data[item.field] + '' + (item.suffix || '') : 0}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
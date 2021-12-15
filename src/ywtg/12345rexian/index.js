import React, { PureComponent } from 'react';
import _ from 'lodash';
import styles from './index.less';

/**
 * 854x496
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                        onClick: (record) => {
                            method && method({ ...record }, bindedComponents)
                        }
                    }
                }
            }

            this.setState({ handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    onClick = (type) => {
        const { handlers } = this.state;

        handlers && handlers.onClick && handlers.onClick({ type });
    }

    render() {
        const { dataProvider = [] } = this.props;

        return (
            <div className={styles.basic_wrapper}>
                <div className={styles.logo} />
                <div className={[styles.line, styles.line_1].join(' ')} onClick={this.onClick.bind(this, '未先行联系')}>
                    <div>信箱</div>
                    <div className={styles.value}>{dataProvider && !_.isNil(dataProvider[0]) ? dataProvider[0] : '-'}</div>
                </div>
                <div className={[styles.line, styles.line_2].join(' ')} onClick={this.onClick.bind(this, '未解决')}>
                    <div>好差评</div>
                    <div className={styles.value}>{dataProvider && !_.isNil(dataProvider[1]) ? dataProvider[1] : '-'}</div>
                </div>
                <div className={[styles.line, styles.line_3].join(' ')} onClick={this.onClick.bind(this, '不满意')}>
                    <div>微信</div>
                    <div className={styles.value}>{dataProvider && !_.isNil(dataProvider[2]) ? dataProvider[2] : '-'}</div>
                </div>
                <div className={[styles.line, styles.line_4].join(' ')} onClick={this.onClick.bind(this, '超时办结')}>
                    <div>来电</div>
                    <div className={styles.value}>{dataProvider && !_.isNil(dataProvider[3]) ? dataProvider[3] : '-'}</div>
                </div>
            </div>
        );
    }
}
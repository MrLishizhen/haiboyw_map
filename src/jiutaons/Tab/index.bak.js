import React from 'react';
import _ from 'lodash';
import styles from './index.less';

const types = [
    { name: '活期', color: '64, 169, 255' },
    { name: '普通定期', color: '149, 222, 100' },
    { name: '保本理财', color: '250, 173, 20' },
    { name: '智能存款', color: '255, 122, 69' },
    { name: '大额存单', color: '235, 47, 150' },
    { name: '定制化定期存款', color: '135, 232, 222' }
];

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: [0, 1, 2, 3, 4, 5]
        };
    }

    onClick = (index) => {
        // if (this.state.active.includes(index)) {
        //     this.setState({ active: this.state.active.filter(item => item !== index) }, () => this.handleChange());
        // } else {
        //     this.setState({ active: [...this.state.active, index] }, () => this.handleChange());
        // }
        if (this.state.active.includes(index)) {
            this.setState({ active: this.state.active.filter(item => item !== index) });
        } else {
            this.setState({ active: [...this.state.active, index] });
        }
    }

    handleChange = (active) => {
        const { buffEvent = [] } = this.props;
        const parameter = [];

        types.forEach((item, index) => {
            if (active.includes(index)) {
                parameter.push({ name: item.name, color: `rgba(${item.color}, 1)`, tabId: index, selected: true });
            } else {
                parameter.push({ name: item.name, color: `rgba(${item.color}, 0.4)`, tabId: index, selected: false });
            }
        });

        if (buffEvent && buffEvent.length > 0) {
            buffEvent.forEach(item => {
                const { method, bindedComponents } = item;
                if (typeof method === 'function') {
                    method({ types: parameter }, bindedComponents);
                }
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { active } = nextState;

        if (!_.isEqual(active, this.state.active)) {
            this.handleChange(active);
        }

        return true;
    }

    render() {
        return (
            <div className={styles.basic_wrapper}>
                {types.map((item, index) => {
                    return (
                        <div
                            className={this.state.active.includes(index) ? styles.active : null}
                            key={index}
                            style={{ borderColor: `rgba(${item.color}, 1)`, backgroundColor: `rgba(${item.color}, ${this.state.active.includes(index) ? '1' : '0.4'})` }}
                            onClick={() => this.onClick(index)}
                        >
                            {item.name}
                        </div>
                    );
                })}
            </div>
        );
    }
}
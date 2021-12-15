import React, { PureComponent } from 'react';
import './index.css';

import green from './images/green.png';
import greenActive from './images/green_active.png';
import blue from './images/blue.png';
import blueActive from './images/blue_active.png';

const defaultDataQuery = [
    { name: '公共设施', value: '51', type: '1' },
    { name: '公共设施', value: '51', type: '1' },
    { name: '公共设施', value: '51', type: '1' },
    { name: '公共设施', value: '51', type: '1' },
    { name: '公共设施', value: '51', type: '1' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' },
    { name: '公共设施', value: '51', type: '2' }
];

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: -1
        }
    }

    itemClick = (active) => {
        if (this.state.active !== active) {
            this.setState({ active });
        } else {
            this.setState({ active: -1 });
        }
    }

    render() {
        const { active } = this.state;
        const { option = {} } = this.props;
        const { clipTile = [] } = option;
        const dataQuery = clipTile[0] && clipTile[0].dataQuery ? clipTile[0].dataQuery : defaultDataQuery;

        return (
            <div>
                {dataQuery && dataQuery.length > 0 && dataQuery.map((item, index) => {
                    return (
                        <div key={index} className='item_wrapper' style={active === index ? { backgroundImage: `url(${item.type === '1' ? greenActive : blueActive})` } : {}}>
                            <div style={active !== index ? { backgroundImage: `url(${item.type === '1' ? green : blue})` } : {}} onClick={this.itemClick.bind(this, index)}>
                                <div className={item.type === '1' ? 'item_label_1' : 'item_label_2'}>{item.name}</div>
                                <div className='item_value'>{item.value}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
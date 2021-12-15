import React, { PureComponent } from 'react';
import styles from './index.less';

/**
 * 850*200
 */
export default class Index extends PureComponent {
    render() {
        const { dataProvider = [] } = this.props;
        const size = dataProvider && dataProvider.length > 0 ? dataProvider[0] : 0;
        const data = dataProvider && dataProvider.length > 0 ? dataProvider.slice(1) : [];

        return (
            <div className={styles.fxyj_icon_wrapper}>
                {data && data.length > 0 && data.map((item, index) => {
                    let value = 0;
                    try {
                        if (typeof item === 'number') {
                            value = item;
                        } else {
                            value = parseInt(item);
                            if (isNaN(value)) {
                                value = 1;
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }

                    return (
                        <div key={index} style={{ width: `${100 / data.length}%` }}>
                            <table style={{ width: '100%', height: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div style={{ width: '100%' }}>
                                                <div className={[styles.img, value === 1 ? styles.active : null].join(' ')} style={{ width: `${size}px`, height: `${size}px`, margin: '0 auto' }}>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })}
            </div>
        );
    }
}
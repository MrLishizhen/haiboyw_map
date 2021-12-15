import React, { PureComponent } from 'react';
import styles from './index.less';

/**
 * 84*84
 */
export default class Index extends PureComponent {
    onClick() {
        if (window.close) {
            window.open(window.location, '_self').close();
        }
    }

    render() {
        const href = window.location.href;

        return (
            <div className={styles.close_icon} style={href.indexOf('close=true') !== -1 ? {} : { display: 'none' }} onClick={this.onClick}></div>
        );
    }
}
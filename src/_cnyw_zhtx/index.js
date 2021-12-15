import React from 'react';
import styles from './index.less';

export default class Index extends React.PureComponent {
    render() {
        return (
            <table className={styles.basic_table}>
                <tbody>
                    <tr>
                        <td style={{ width: '33.33%' }}>
                            <div className={styles.item}>
                                <div>区领导</div>
                                <div>岑福康</div>
                            </div>
                        </td>
                        <td style={{ width: '33.33%' }}>
                            <div className={styles.item}>
                                <div>指挥长</div>
                                <div>王广辉</div>
                            </div>
                        </td>
                        <td style={{ width: '33.34%' }}>
                            <div className={styles.item}>
                                <div>值班长</div>
                                <div>沙志斌</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
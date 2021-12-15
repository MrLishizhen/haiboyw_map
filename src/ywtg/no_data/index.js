import React, { PureComponent } from 'react';
import styles from './index.less';

export default class Index extends PureComponent {
    render() {
        const { dataProvider = [] } = this.props;
        console.info(dataProvider);
        return (
            dataProvider && dataProvider.length > 1 ?
                null :
                <div className={styles.ywtg_no_data_basic_wrapper}>
                    <div className={styles.content}>
                        <div className={styles.icon}>
                            <div />
                        </div>
                        <div className={styles.title}>
                            无更多预警清单
                        </div>
                    </div>
                </div>
        );
    }
}
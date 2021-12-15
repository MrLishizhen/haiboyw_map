import React from 'react'
import styles from './index.less'

class smallSearch extends React.Component{
    render() {
        return  <div className={styles.search}>
                    <div className={styles.search_input}>
                        <input type="text" placeholder="请选择监测种类"/>
                    </div>
                    <span></span>
                </div>
    }
}

export default smallSearch;
import React from 'react'
import axios from 'axios'
import styles from './index.less'
import { message } from 'antd';

class Input extends React.PureComponent{

    constructor(props) {
        super(props)
        this.state = {
            values: '' 
        }
    }

    // 视频列表请求接口
    getSearchData = ( string = '' ) => {
        const { onChangeSearchList, showDrawer } = this.props
        axios.post(
            'http://10.207.204.33:5479/sign/vedioservice/searchByMenPaiHao',
            { address: string, radius: 1000 }
        )
        .then((response) => {
            const { status, data } = response
            if( status == 200 ) {
                const { result } = data
                if(result.length){
                    onChangeSearchList(result)
                    showDrawer('input')
                } else {
                    message.warning('未搜索到结果！');
                }
            }
        })
        .catch((error) => {
            console.error('searchByMenPaiHao\'s api is error')
        })
    }

    onChange = (e) => {
        let values = e.target.value
        this.setState((state) => {
            return { values }
        })
    }

    onClick = () => {
        const { values } = this.state
        if(!values) {
            message.warning('内容不能为空!');
            return
        }
        this.getSearchData(values)
    }

    render(){
        return  <div className={styles.graph_hull}>
                    <input className={styles.graph_input} type="text" 
                        placeholder="请输入搜索内容"
                        onChange={this.onChange}
                    />
                    <div className={styles.graph_img}
                        onClick={this.onClick}
                    >
                        <img src="data:image/png;base64,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" alt=""/>
                    </div>
                </div>
    }
}

export default Input;

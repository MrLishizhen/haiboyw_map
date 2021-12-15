import React, { Component } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import PrePlanTree from './PrePlanTree'

import styles from './index.less'

const { TabPane } = Tabs;


export default class PrePlanList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prePlanType: 'SPECIAL_PLAN'
        }
    }

    // onCallBack = (key) => {
    //     let prePlanType = null
    //     if(key == 1) {
    //         prePlanType = 'BASIC_PLAN'
    //     }

    //     if(key == 2) {
    //         prePlanType = 'SPECIAL_PLAN'
    //     }
    //     this.setState({ prePlanType })
    // }

    render() {
        const { prePlanType } = this.state
        const { onChangeVideosData, onClose } = this.props
        return (
            <div className={styles.PrePlanList}>
                <Tabs defaultActiveKey="2" onChange={this.onCallBack}>
                    {/* <TabPane tab="基础预案" key="1">
                        <PrePlanTree onChangeVideosData={onChangeVideosData} onClose={onClose} prePlanType={prePlanType} />
                    </TabPane> */}
                    <TabPane tab="专项预案" key="2">
                        <PrePlanTree onChangeVideosData={onChangeVideosData} onClose={onClose} prePlanType={prePlanType} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
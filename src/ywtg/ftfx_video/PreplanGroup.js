import React from 'react'
import SearchList from './SearchList'
import PrePlanList from './PrePlanList'
import Video from './Video'

import styles from './index.less'


export default class PreplanGroup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            prePlanVideoName: null,
            prePlanVideoId: null
        }
    }

    onChangeDeviceId = (deviceId,deviceName) => {
        this.setState({
            prePlanVideoId: deviceId,
            prePlanVideoName: deviceName
        })
    }

    render() {
        const { searchList = [], isDrawerType, onChangeVideosData, onClose, visible } = this.props
        const { prePlanVideoId, prePlanVideoName } = this.state
        return (
            <div className={styles.preplan_group}>
                <div 
                    className={styles.preplan_tree}
                    style={isDrawerType ? { borderRight: '2px solid #eee'} : {}}
                >
                    {
                        isDrawerType ? (
                            <SearchList searchList={searchList} onChangeDeviceId={this.onChangeDeviceId} />
                        ) : (
                            <PrePlanList onChangeVideosData={onChangeVideosData} onClose={onClose} />
                        )
                    }
                    
                </div>
                { isDrawerType && visible && (
                    <div className={styles.preplan_view}>
                        <div className={styles.preplan_video}>
                            <h2>{prePlanVideoName}</h2>
                            {
                                prePlanVideoId && (
                                    <Video scaleNum={1.1} deviceId={prePlanVideoId} />
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
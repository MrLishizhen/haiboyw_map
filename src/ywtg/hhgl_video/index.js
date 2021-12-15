import React, { PureComponent } from 'react'
import { Drawer, Button } from 'antd';
import Input from './Input'
import Assemble from './Assemble'
import PreplanGroup from './PreplanGroup'
import styles from './index.less'

export default class Main extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            searchList: null,
            chooseType: 'preplan',
            videosData: null,
            node: null
        }
    }

    showDrawer = (value) => {
        this.setState({
            visible: true
        });
        if (value == 'preplan') {
            this.setState({
                chooseType: 'preplan'
            })
        }
        if (value == 'input') {
            this.setState({
                chooseType: 'input'
            })
        }
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    onChangeSearchList = (searchList) => {
        this.setState({ searchList })
    }

    onChangeVideosData = (videosData, node) => {
        this.setState({ videosData, node })
    }

    resetVideosData = () => {
        this.setState({
            videosData: null,
            searchList: null,
            chooseType: 'preplan',
            node: null
        })
    }

    render() {
        const { searchList, chooseType, videosData, node, visible } = this.state
        const isDrawerType = chooseType == 'input'

        return (
            <div
                id='ftfx'
                style={{
                    // 河道
                    // width: 960,
                    // height: 2000,
                    width: 960,
                    height: 1700,
                    backgroundColor: 'rgba(14,39,60,1)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px',
                    boxSizing: 'border-box',
                    position: 'relative'
                }}
            >
                <div
                    className='ftfx_box_top'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 24
                    }}
                >
                    <div
                        className='ftfx_input'
                    >
                        <Input
                            onChangeSearchList={this.onChangeSearchList}
                            showDrawer={this.showDrawer}
                        />
                    </div>

                    <div
                        className='ftfx_preplan'
                    >
                        <Button type="primary" ghost
                            style={{
                                fontSize: '2em',
                                width: '5em',
                                height: '3em',
                                marginRight: '1em'
                            }}
                            onClick={() => this.showDrawer('preplan')}
                        >
                            <span style={{ fontSize: 44 }}>预 案</span>
                        </Button>
                        <Button type="primary" ghost
                            style={{
                                fontSize: '2em',
                                width: '5em',
                                height: '3em'
                            }}
                            onClick={this.resetVideosData}
                        >
                            <span style={{ fontSize: 44 }}>重 置</span>
                        </Button>
                    </div>
                </div>

                <div
                    className='ftfx_box_down'
                >
                    <div
                        className='ftfx_videos'
                        style={{
                            overflow: 'auto'
                        }}
                    >
                        <Assemble videosData={videosData} node={node} />
                    </div>
                </div>
                {/* <div style={{ overflow: 'hidden' }} className = {styles.choudiCss}> */}
                <Drawer
                    title={isDrawerType ? '视频点位' : '预案点位'}
                    placement="left"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={false}
                    width={visible ? (isDrawerType ? '100%' : '70%') : 0}
                    className={styles.preplan_wrapper}
                    style={{ position: 'absolute' }}
                    bodyStyle={{
                        height: '94%'
                    }}
                >
                    <PreplanGroup
                        visible={visible}
                        searchList={searchList}
                        isDrawerType={isDrawerType}
                        onChangeVideosData={this.onChangeVideosData}
                        onClose={this.onClose}
                    />
                </Drawer>
                {/* </div> */}
            </div>
        )
    }
}
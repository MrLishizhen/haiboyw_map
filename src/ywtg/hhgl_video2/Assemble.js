import React from 'react'
import Category from './Category'
import Videos from './Videos'
import axios from 'axios'
import { result } from 'lodash'

const temporaryCategoryData = [
    { type: '其它', cnt: 0 }
]
const temporaryVideoData = [
    // {  deviceId: "31010521001321005008", latitude: 0, longitude: 0, deviceName: '' }, 
    // {  deviceId: "31010514001321054057", latitude: 0, longitude: 0, deviceName: '' }, 
    // {  deviceId: "31010511001321053019", latitude: 0, longitude: 0, deviceName: '' },
    // {  deviceId: "31010521001321005012", latitude: 0, longitude: 0, deviceName: '' }, 
    // {  deviceId: "31010521001321005014", latitude: 0, longitude: 0, deviceName: '' }, 
    // {  deviceId: "31010511001321053020", latitude: 0, longitude: 0, deviceName: '' },
    // {  deviceId: "31010518001321050078", latitude: 0, longitude: 0, deviceName: '' },
    // {  deviceId: "31010521001321005005", latitude: 0, longitude: 0, deviceName: '' }
]
const CONST_DEFAULT_PAGE_SIZE = 4;

class Assemble extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            videoData: temporaryVideoData,
            categoryData: temporaryCategoryData,
            totalPages: null,
            size: CONST_DEFAULT_PAGE_SIZE,
            propsVideosData: null
        }
    }

    componentDidMount() {
        this.getVideosData()
    }

    // 视频列表请求接口
    getVideosData = async (page = 1, size = CONST_DEFAULT_PAGE_SIZE) => {
        // axios.post(
        //     'http://10.207.204.33:5479/sign/vedioservice/searchByPage',
        //     { 'page': page, 'size': size }
        // )
        //     .then((response) => {
        //         const { status, data } = response
        //         if (status == 200) {
        //             const { code, data: videoData } = data.result
        //             if (code == 0) {
        //                 const { content, totalElements, totalPages } = videoData
        //                 console.log(videoData)
        //                 if (content.length > 0) {
        //                     this.setState(() => {
        //                         return {
        //                             videoData: content,
        //                             categoryData: [{ type: '其它', cnt: totalElements }]
        //                         }
        //                     })
        //                 }
        //             }
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('searchByPage\'s api is error')
        //     })


                axios.post(
                  'http://10.207.204.33:5479/sign/vedioservice/planDeviceId',
                  { planId: 'c6d6c5dd674b461ea88044269f9401de' }
                )
                .then((response) => {
                    const { status, data } = response
                    if( status == 200 ) {
                        const { result } = data
                        const { data: prePlanVideoLists } = result
                        if(prePlanVideoLists.length) {
                            this.setState(() => {
                                return {
                                    videoData: prePlanVideoLists,
                                    categoryData: [{ type: '河道', cnt: prePlanVideoLists.length }]
                                }
                            })
                            this.onFuckChangeVideoLists()
                        } else {
                          message.warning('接口请求失败');
                        }
                    }
                })
                .catch((error) => {
                    message.error('planDeviceId接口请求失败');
                    console.error('planDeviceId\'s api is error')
                })
              
    }

    // 分页
    onChangeVideoLists = (current) => {
        const { size } = this.state
        this.getVideosData(current, size)
    }

    // 累赘分页
    onFuckChangeVideoLists = (current = 1) => {
        const { size } = this.state
        this.getFuckVideosData(current, size)
    }

    getFuckVideosData = (page = 1, size = CONST_DEFAULT_PAGE_SIZE) => {
        const { videoData = [] } = this.state
        const propsVideosData = videoData.slice((page - 1) * size, size * page)
        this.setState({ propsVideosData })
    }

    componentDidUpdate(prePros) {
        if (prePros.node != this.props.node) {
            if (this.props.node) {
                this.onFuckChangeVideoLists()
            } else {
                this.setState({ propsVideosData: null })
                this.getVideosData()
            }
        }
    }

    render() {
        
        const { node } = this.props
        const { categoryData, videoData, propsVideosData=[] } = this.state
        const list = propsVideosData
        // const list = propsVideosData ? propsVideosData : temporaryVideoData
        const type = node ? [{ type: node.title, cnt: node.deviceCount }] : categoryData
        return (
            (
                <div
                    style={{
                        width: '100%',
                        // 河道
                        // height: 1800,
                        height: 2000,
                        position: 'relative'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            zIndex: 9
                        }}
                    >
                        <Category
                            node={node}
                            dataProvider={type}
                            onChangeVideoLists={this.onChangeVideoLists}
                            onFuckChangeVideoLists={this.onFuckChangeVideoLists}
                        />
                    </div>
                    <div
                        style={{
                            height: '100%'
                        }}
                    >
                        <Videos dataProvider={list} style={{
                            direction: 'col',
                            marginNum: '5px',
                            // 河道
                            // scale: 1.1,
                            scale: 1.1,
                            text: '不可用'
                        }} />
                    </div>
                </div>
            )
        )
    }
}

export default Assemble
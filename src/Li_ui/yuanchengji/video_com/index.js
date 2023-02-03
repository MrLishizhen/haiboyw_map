import React, { Component } from 'react';
import { isEqual } from "lodash";
import Axios from 'axios'
import bg from './img/bg.png'
const showLog = (Text) => {
    console.log(Text)
}
//video_com_li

export default class Five_system extends Component {
    constructor(props) {
        super(props);
        const { dataProvider = [] } = props;
        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        let phone = '', name = '', userId = '';
        if (dataQuery[0]) {
            phone = dataQuery[0].phone || '';
            name = dataQuery[0].name || '';
            userId = dataQuery[0].userId || '';
        }


        this.state = {
            ifRameText: '加载中...',
            ifRameSrc: '',
            phone: phone,
            name: name,
            userId: userId
        }

    }




    shouldComponentUpdate (nextProps, nextState) {
        const { dataProvider, style } = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
                let phone = '', name = '', userId = '';
                if (dataQuery[0]) {
                    phone = dataQuery[0].phone || '';
                    name = dataQuery[0].name || '';
                    userId = dataQuery[0].userId || '';
                }
                this.setState({ phone: phone, name: name, userId: userId }, () => {
                    if (phone && name && userId) {
                        let data = {
                            "userId": userId, //大屏自己的用户id
                            "invit": [
                                {
                                    "userId": phone, //被邀请人用户id
                                    "userName": name,//被邀请人姓名
                                    "deptName": ""//被邀请人所属单位
                                },

                            ]
                        }
                        this.getPost('http://szwg.xyywtg.xf.cn:7000/szwg-server/tengxunyun/join', data)
                    }
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    getPost (url, params, headers) {
        return Axios({
            url: url,
            method: 'post',
            headers: headers,
            data: params
        }).then(({ data }) => {
            if (data.code === '200') {
                // this.setState({
                //     ifRameSrc: data.data
                // })
                console.log(data.data, 1)
                if (data.data != '') {
                    // console.log(data.data)
                    // window.open(data.data)
                    this.setState({
                        ifRameSrc: data.data || ''
                    })
                } else {
                    this.setState({
                        ifRameText: '请求失败'
                    })

                }
                this.state.handlers.onClick && this.state.handlers.onClick({ type: 'iframe', iframeUrl: data.data });
            } else {
                this.setState({
                    ifRameText: '请求失败'
                })
            }
        });
    }
    componentDidMount () {

        const { buffEvent = [{ type: 'click' }] } = this.props;
        let eventValue = {};
        for (let i = 0; i < buffEvent.length; i++) {
            const eventObj = buffEvent[i];
            const { type, method, bindedComponents } = eventObj;
            if (type === 'click') {
                eventValue = {
                    onClick: (data) => {
                        method && method({ ...data }, bindedComponents)
                    }
                }
            }
        }

        this.setState({
            handlers: Object.assign({}, eventValue)
        }, () => {


        })



        let { phone = '', name = '', userId = '' } = this.state

        if (phone && name && userId) {
            let data = {
                "userId": userId, //大屏自己的用户id
                "invit": [
                    {
                        "userId": phone, //被邀请人用户id
                        "userName": name,//被邀请人姓名
                        "deptName": ""//被邀请人所属单位
                    },

                ]
            }
            this.getPost('http://szwg.xyywtg.xf.cn:7000/szwg-server/tengxunyun/join', data)
        }
    }

    componentWillUnmount () {
        // if(this.cinVccBarObj){
        //     this.cinVccBarObj=null;
        // }
        let { ifRameSrc } = this.state;
        if (ifRameSrc) {
            this.setState({
                ifRameSrc: '',
                phone: '',
                name: '',
                userId: '',
            })
        }
    }


    render () {
        let { ifRameSrc = '', ifRameText = '加载中...' } = this.state;
        return (
            <div style={{
                width: 1200, height: 646,
                background: '#A4C2F4',
                boxShadow: '0px 0px 90px 0px #01154A',
                // filter: 'blur(4px)'
            }}>
                {
                    ifRameSrc ? <iframe allow="microphone;camera;midi;encrypted-media;" src={ifRameSrc} style={{ width: '100%', height: '100%' }} frameborder='0' scrolling='no'></iframe> : <div style={{ color: "#fff", fontSize: 18 }}>{ifRameText}</div>
                }
            </div>
        )
    }
}

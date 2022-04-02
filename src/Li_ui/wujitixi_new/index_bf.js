import React, {Component} from 'react';
import Axios from 'axios'
import styles from './index.less'
import Wujitixi from '../wujitixi/index'
import Wujitixierji from '../wujitixierji/index_new';
import Wuji_mb_list from '../wuji_mb_list/index';
import {message} from 'antd'

export default class Five_system extends Component {

    state = {
        interval: null,
        msg: '五级体系',
        index: 1,
        mb_list: [{name: '五级体系', id: 605}],
        mb_show: false,
        list: [],
    }

    componentDidMount() {
        const {buffEvent = [{type: 'click'}]} = this.props;
        let eventValue = {};
        for (let i = 0; i < buffEvent.length; i++) {
            const eventObj = buffEvent[i];
            const {type, method, bindedComponents} = eventObj;
            if (type === 'click') {
                eventValue = {
                    onClick: (data) => {
                        method && method({...data}, bindedComponents)
                    }
                }
            }
        }
        this.setState({
            handlers: Object.assign({}, eventValue)
        })

        this.getToken();


        // Axios.post({'',{},timeout:6000})
    }

    getPost(url, params, headers) {
        return Axios({
            url: url,
            method: 'post',
            headers: headers,
            params: params
        }).then(({data: res}) => {
            if (res && res.code === '0000') {
                return res.data
            } else {
                return []
            }
        });
    }

    componentWillUnmount() {
        let {interval} = this.state;
        // clearInterval(interval)
    }

    getToken() {
        const params = {
            'loginType': 'sso',
            'password': '',
            'userKey': '',
            'username': 'visData'
        }
        Axios.post(
            'http://10.203.4.224:9527/userOrg/api/org/login', params)
            .then(({data: res}) => {
                if (res && res.code === '0000') {
                    this.token = res.data.token;
                    this.setState({
                        token: res.data.token,
                    })
                    let params = {pid: 605};
                    this.getPost('http://10.203.4.224:9527/userOrg/api/org/group/treeChild', params, {token: this.token}).then(res => {
                        this.setState({
                            list: res,
                        })
                    })
                }
            });
    }

    createTitle() {


    }

    createModel(index) {
        const {list} = this.state;
        if (index === 1) {//表示第一层弹窗

            let data = [{name: '市直单位'}, {name: '市公共服务单位'}, {name: '县（市）区'}];
            let dataP = [];

            data.forEach((e, i) => {
                let obj = list.findIndex(v => v.name === e.name);
                if (obj != -1) {
                    dataP.push(list[obj])
                }
            })

            return (<Wujitixi dataProvider={[...dataP]} clickFunc={(e) => this.clickFunc(e)}/>)
        } else if (index === 2) {
            return (<Wujitixierji dataProvider={[...this.state.list
            ]} clickFunc={(e) => this.clickFunc(e)}/>)
        }


    }

    clickFunc(data) {
        console.log(data,'到我这里了');
        let {mb_list} = this.state;
        let cfDataIndex = mb_list.findIndex(v=>v.pid===data.pid);//重复的id
        let mb = [...mb_list];
        let _that=this
        if (data._type === 0) {//表示查看人
            let params = {"mapVo":{"groupId":data.id,"page":1,"size":1}};
            Axios.post('http://10.203.4.224:9527/userOrg/api/org/user/page', {...params}, {headers:{token: this.token}}).then((res = {}) => {
                console.log(res);
                if (res && res.code === '0000') {
                    console.log(res);
                    if (res.data.total === 0) {
                        message.error('无数据');
                    }else{
                        console.log(this.state.handlers.onClick && this.state.handlers.onClick({...data}))
                        _that.state.handlers.onClick && _that.state.handlers.onClick({...data});
                    }
                }
            })
        } else if (data._type === 1||data._type === undefined) {//表示查看部门

            let params = {pid: data.id}
            if( cfDataIndex!=-1&&cfDataIndex){
                mb.splice(cfDataIndex, 1);
            }

            this.getPost('http://10.203.4.224:9527/userOrg/api/org/group/treeChild',params,{token:this.token}).then((res=[])=>{
                let datas= []
                if(res.length>0){
                    datas=res;
                    if (data._type || data._type === undefined) {
                        this.setState({
                            mb_list: [...mb, data],
                            mb_show: true,
                            index: 2,
                            msg: data.name,
                            list: datas
                        })
                    }

                }else{
                    message.error('无下属部门')

                }

            })

        }


    }

    onMbClick(v) {
        let {mb_list} = this.state;
        let data = [...mb_list]
        let obj = {}

        if (v.name === '五级体系') {
            v.id=605;
            obj = {
                mb_list: [{name: '五级体系', pid: 605}],
                mb_show: false,
                index: 1,
                msg:'五级体系'
            }

        } else {
            let index = data.findIndex(e => e.id === v.id);
            data=data.slice(0, index+1);
            obj = {
                mb_list: [...data],
                index: 2
            }
        }

        let params = {pid: v.id}
        this.getPost('http://10.203.4.224:9527/userOrg/api/org/group/treeChild',params,{token:this.token}).then((res=[])=>{
            let datas= []
            if(res.length>0){
                datas=res;
                this.setState({
                    ...obj,
                    list:datas
                })
            }else{
                message.error('无下属部门')
            }


        })

    }

    render() {
        let {msg, index, mb_list, mb_show = false} = this.state;
        return (
            <div className={styles.Five_system}>
                <div className={index === 1 ? styles.Five_system_bg : styles.Five_system_bg1}>
                    <div className={styles.title}>{
                        msg
                    }</div>
                    <div className={styles.mb_list}>
                        {
                            mb_show ? <Wuji_mb_list dataProvider={mb_list}
                                                    onMbClick={(v) => this.onMbClick(v)}></Wuji_mb_list> : ''
                        }
                    </div>
                    <div className={styles.content}>
                        {
                            this.createModel(index)
                        }
                    </div>
                </div>

            </div>
        )
    }
}
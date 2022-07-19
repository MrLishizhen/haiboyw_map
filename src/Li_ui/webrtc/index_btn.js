import React, {Component} from 'react';
import {isEqual} from "lodash";
import CinVccBar from './vccbarExtension.js'
import styles from './index.less'

const showLog = (Text)=> {
    console.log(Text)
}


export default class Five_system extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // 吴胜军:
        //     dn：000002+企业号+工号短号
        //
        // 吴胜军:
        //     agengid：000010+企业号+工号短号


        let phone = '';
        if(dataQuery[0]){
            phone = dataQuery[0];
        }
        this.cinVccBarObj=null;

        this.state = {
            // btn1: true,
            // btn2: true,
            btn3: true,
            btn6: true,
            errText:'',
            // btn9: true,
            // btn10: true,

            agentState:0,
            aeStatus:0,
            agentStateTime:0,
            cinccTimer:null,
            phone:phone,//外呼电话
            formSign:{
                ctiServer: 'crm.ucckf.com',
                ctiPort: 14800,
                sipServer: 'crm.ucckf.com',
                sipxPath: 'sbc',
                agentPwd: 'cinAgt123#',
                sipPwd: 'Q6v^!t@HS1Cd?qF',
                agentId: '0000101000061003',
                dn: '0000021000061003',
                appType: 0,
                logMsgType: '32',
                logConsoleType: '1',
                vccId:100006,//集团号
                sipPort:5030,//sip端口号
                sipPassword:'Q6v^!t@HS1Cd?qF',//sip密码
                // taskId:'',//taskId
                barType: 1,
                defaultBtn: '0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,19,20,21,22,24,27,30,31',
                hiddenBtn: '7,8,10,11,12,13',

            }
        }

    }




    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
                console.log(dataQuery,'李秋雨')
                // this.cinVccBarObj=null;
                this.setState({phone: dataQuery[0],errText:''});
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    componentDidMount() {

        //    初始化创建电话条对象
        CinVccBar.load(this.state.formSign.barType).then(ve => {
//      这里的ve是电话条对象

            this.cinVccBarObj = ve

//      设置监听事件
            this.cinVccBarObj.on('reportBtnStatus', this.OnReportBtnStatus.bind(this))
            this.cinVccBarObj.on('prompt', this.OnPrompt.bind(this))
            this.cinVccBarObj.on('agentWorkReport', this.OnAgentWorkReport.bind(this))
            this.cinVccBarObj.on('eventPrompt', this.OnEventPrompt.bind(this))
            this.cinVccBarObj.on('methodResponseEvent', this.OnMethodResponseEvent.bind(this))
            this.cinVccBarObj.on('callRing', this.OnCallRing.bind(this))
            this.cinVccBarObj.on('answerCall', this.AnswerCall.bind(this))
            this.cinVccBarObj.on('callEnd', this.OnCallEnd.bind(this))
            this.cinVccBarObj.on('initalSuccess', this.OnInitalSuccess.bind(this))
            this.cinVccBarObj.on('initalFailure', this.OnInitalFailure.bind(this))
            this.cinVccBarObj.on('barExit', this.OnBarExit.bind(this))
//      设置参数属性
            this.cinVccBarObj.setBarAttributes(this.state.formSign)
//      设置可用按钮功能
            this.cinVccBarObj.serialBtn(this.state.formSign.defaultBtn, this.state.formSign.hiddenBtn)
//      电话条登录
            this.cinVccBarObj.initial()
        })


    }

    componentWillUnmount() {
        // if(this.cinVccBarObj){
        //     this.cinVccBarObj=null;
        // }
        if( this.cinVccBarObj){
            console.log(this.cinVccBarObj)
            this.cinVccBarObj.unInitial();
        }

        if (this.state.cinccTimer) {
            clearInterval(this.state.cinccTimer)
            this.setState({
                cinccTimer:null
            })
        }
    }
    timeToTimeTxt (time) {
        let hourTime = 0
        let minuteTime = 0
        let secondTime = parseInt(time)
        if (secondTime > 60) {
            // 获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60)
            // 获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60)
            // 如果分钟大于60，将分钟转换成小时
            if (minuteTime > 60) {
                // 获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60)
                // 获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60)
            }
        }
        if (hourTime < 10) {
            hourTime = '0' + hourTime
        }
        if (minuteTime < 10) {
            minuteTime = '0' + minuteTime
        }
        if (secondTime < 10) {
            secondTime = '0' + secondTime
        }
        return hourTime + ':' + minuteTime + ':' + secondTime
    }
    setAllBtnDisable () {
        // this.btn1 = true
        // this.btn2 = true
        // this.btn3 = true
        // this.btn6 = true
        // this.btn9 = true
        // this.btn10 = true

        this.setState({
            btn3:true,
            btn6:true,
        })
    }
    updateBtns (btnIDs) {
        if (btnIDs.indexOf('|') > -1) {
            const arrIDS = btnIDs.split('|')
            // this.setAllBtnDisable()
            this.setState({
                btn3:true,
                btn6:true,
            })
            for (let i = 0; i < arrIDS.length; i++) {
                this.setBtnStatus('btn' + parseInt(arrIDS[i]), false)
            }
        }
    }
    setBtnStatus (id, flag) {
        // this[id] = flag
        this.setState({
            [id]:flag
        })
    }
    showStatus () {
        switch (parseInt(this.state.agentState)) {
            case 0:
                return '签出'
            case 1:
                return '忙碌'
            case 2:
                return '空闲'
            case 3:
                if (parseInt(this.state.aeStatus) === 399) {
                    return '排队选中'
                } else if (parseInt(this.state.aeStatus) === 301) {
                    return '呼出'
                } else if (parseInt(this.state.aeStatus) === 302) {
                    return '用户振铃'
                } else if (parseInt(this.state.aeStatus) === 303) {
                    return '用户应答'
                } else if (parseInt(this.state.aeStatus) === 304) {
                    return '用户挂机'
                } else if (parseInt(this.state.aeStatus) === 305) {
                    return '用户忙'
                } else if (parseInt(this.state.aeStatus) === 306) {
                    return '呼入'
                } else if (parseInt(this.state.aeStatus) === 307) {
                    return '振铃'
                } else if (parseInt(this.state.aeStatus) === 308) {
                    return '应答'
                } else if (parseInt(this.state.aeStatus) === 309) {
                    return '分机挂'
                } else if (parseInt(this.state.aeStatus) === 310) {
                    return '转出'
                } else if (parseInt(this.state.aeStatus) === 311) {
                    return '保持'
                } else if (parseInt(this.state.aeStatus) === 312) {
                    return '取保持'
                } else if (parseInt(this.state.aeStatus) === 313) {
                    return '会议'
                } else if (parseInt(this.state.aeStatus) === 314) {
                    return '被咨询'
                } else {
                    return '通话中'
                }
            case 4:
                return '后处理'
        }
    }
    onBarClick(cmdName) {
        const destNum = this.state.phone
        let patt = /^[1][3-9][\d]{9}/;
        // 各种按钮命令
        if (cmdName === 'SetBusy') {
            this.cinVccBarObj.setBusy()
        } else if (cmdName === 'SetIdle') {
            this.cinVccBarObj.setIdle()
        } else if (cmdName === 'MakeCall') {
            console.log(destNum,'秋雨')
            if(patt.test(destNum)){
                this.cinVccBarObj.makeCall(destNum, 2, '', '', '')
            }else {
                this.setState({
                    errText:'手机号格式错误'
                })
            }

        } else if (cmdName === 'Disconnect') {
            this.cinVccBarObj.disconnect(0)
        } else if (cmdName === 'Answer') {
            this.cinVccBarObj.answer(0)
        } else if (cmdName === 'TransferOut') {
            this.cinVccBarObj.transferOut(0, '0000109999831000014000')
        }
    }

    // 电话条事件
    OnPrompt (code, description) {

        showLog('【OnPrompt】：\r\n')
        showLog(' code:【' + code + '】 description:【' + description + '】\r\n')
        showLog(' *******************************************************************\r\n')
    }

    OnReportBtnStatus (btnIDS) {
        showLog('【ReportBtnStatus】：\r\n')

        this.setState({
            agentState:this.cinVccBarObj.getAgentStatus()
        },()=>{
            if (this.state.agentState === 1) {
                this.setState({
                    aeStatus:this.cinVccBarObj.getAgentSubBusyStatus()
                })

            }
            showLog('         可现状态值   ：【' + btnIDS + '】\r\n 当前座席状态：【' + this.state.agentState + '】\r\n')
            showLog(' *******************************************************************\r\n')
            // 根据这个命令可以控制各个按钮对应的方法和可用状态
            this.updateBtns(btnIDS)
        })



    }
    OnAgentWorkReport (workStatus, description) {

        if (this) {
            if (this.state.cinccTimer) {
                clearInterval(this.state.cinccTimer)
                this.setState({
                    cinccTimer:null
                })
            }
            this.setState({
                agentStateTime:0
            },()=>{
                showLog('【OnAgentWorkReport】 场景编号：【' + workStatus + '】 场景描述：【' + description + '】\r\n')
                showLog(' *******************************************************************\r\n')
            })

        }

    }
    OnEventPrompt (code, description) {
        showLog('【OnEventPrompt】：\r\n')
        showLog(' code:【' + code + '】 description:【' + description + '】\r\n')
        showLog(' *******************************************************************\r\n')
    }
    OnBarExit (code, description) {
        showLog('【OnBarExit】 \r\n【' + code + '】 【' + description + '】\r\n')
        showLog(' *******************************************************************\r\n')
    }
    OnCallRing (callingNo, calledNo, orgCalledNo, callData, serialID, serviceDirect, callID, userParam, taskID, userDn, agentDn, areaCode, fileName, networkInfo, queueTime, opAgentID, ringTimer, projectID) {
        showLog('【OnCallRing】：\r\n')
        showLog('         callingNo：【' + callingNo + '】\r\n')
        showLog('         calledNo：【' + calledNo + '】\r\n')
        showLog('         orgCalledNo：【' + orgCalledNo + '】\r\n')
        showLog('         callData：【' + callData + '】\r\n')
        showLog('         callID ：【' + callID + '】\r\n')
        showLog('         serialID ：【' + serialID + '】\r\n')
        showLog('         serviceDirect ：【' + serviceDirect + '】\r\n')
        showLog('         userParam ：【' + userParam + '】\r\n')
        showLog('         taskID ：【' + taskID + '】\r\n')
        showLog('         userDn ：【' + userDn + '】\r\n')
        showLog('         agentDn ：【' + agentDn + '】\r\n')
        showLog('         areaCode ：【' + areaCode + '】\r\n')
        showLog('         fileName ：【' + fileName + '】\r\n')
        showLog('         networkInfo：【' + networkInfo + '】\r\n')
        showLog('         queueTime ：【' + queueTime + '】\r\n')
        showLog('         opAgenID ：【' + opAgentID + '】\r\n')
        showLog('         ringTimer ：【' + ringTimer + '】\r\n')
        showLog('         projectID ：【' + projectID + '】\r\n')
        showLog(' *******************************************************************\r\n')
    }
    AnswerCall (userNo, answerTime, serialID, serviceDirect, callID, userParam, taskID, AV, TC) {


        if (!this.state.cinccTimer) {

            const me = this
            me.setState({
                cinccTimer:setInterval( () =>{

                    let {agentStateTime} = this.state;
                    this.setState({
                        agentStateTime:++agentStateTime
                    },()=>{

                    })
                }, 1000)
            })

        }
        showLog(' 【OnAnswerCall】:\r\n')
        showLog('        answerTime ：【' + answerTime + '】\r\n')
        showLog('        userNo ：【' + userNo + '】\r\n')
        showLog('        callID ：【' + callID + '】\r\n')
        showLog('        serialID ：【' + serialID + '】\r\n')
        showLog('        serviceDirect ：【' + serviceDirect + '】\r\n')
        showLog('        userParam ：【' + userParam + '】\r\n')
        showLog('        taskID ：【' + taskID + '】\r\n')
        showLog(' *******************************************************************\r\n')
    }
    OnCallEnd (callID, serialID, serviceDirect, userNo, bgnTime, endTime, agentAlertTime, userAlertTime, fileName, directory, disconnectType, userParam, taskID, serverName, networkInfo) {
        showLog(' 【OnCallEnd】:\r\n')
        showLog('         fileName   ：【' + fileName + '】\r\n')
        showLog('         directory：【' + directory + '】\r\n')
        showLog('         bgnTime  ：【' + bgnTime + '】\r\n')
        showLog('         endTime  ：【' + endTime + '】\r\n')
        showLog('         userNo ：【' + userNo + '】\r\n')
        showLog('         CallID   ：【' + callID + '】\r\n')
        showLog('         SerialID ：【' + serialID + '】\r\n')
        showLog('         ServiceDirect  ：【' + serviceDirect + '】\r\n')
        showLog('         userAlertTime  ：【' + userAlertTime + '】\r\n')
        showLog('         agentAlertTime ：【' + agentAlertTime + '】\r\n')
        showLog('         fileName      ：【' + fileName + '】\r\n')
        showLog('         directory      ：【' + directory + '】\r\n')
        showLog('         disconnectType      ：【' + disconnectType + '】\r\n')
        showLog('         userParam      ：【' + userParam + '】\r\n')
        showLog('         taskID         ：【' + taskID + '】\r\n')
        showLog('         serverName         ：【' + serverName + '】\r\n')
        showLog('         networkInfo         ：【' + networkInfo + '】\r\n')
        showLog(' *******************************************************************\r\n')
    }
    OnMethodResponseEvent (cmdName, param) {
        showLog('【OnMethodResponseEvent】 cmdName：【' + cmdName + '】 param：【' + param + '】\r\n')
        showLog(' *******************************************************************\r\n')
    }
    OnInitalSuccess () {
        showLog('#############OnInitalSuccess################')
        showLog('当前版本：' + this.cinVccBarObj.getVersion())
        console.info('OnBarInitalSuccess')

    }
    OnInitalFailure (code, description) {
        showLog('【OnInitalFailure】\r\n 【' + code + '】 【' + description + '】\r\n')
        showLog(' *******************************************************************\r\n')
    }

    hangup=(cmd)=>{
        let {phone} = this.state;
        application.oJVccBar.Disconnect({callType:parseInt(phone),
            callback:function(data){this._displayCallBackEvent(cmd,data);}
        });
    }
    yimiduduaudio=()=>{

    }
    _displayCallBackEvent=(cmd,o)=>{
        var code = parseInt(o.data);
        if(code>0){
            showLog(cmd +" callback event data:["+o.data+"] des:["+application.oJVccBar.GetCodeDescription(code)+"]\r\n");
        }
        else{
            showLog(cmd +" callback event data:["+o.data+"]\r\n");
        }
    }
    // inputChange = (event)=>{
    //
    //     this.setState({
    //         phone:event.target.value
    //     })
    //     console.log(event.target.value);
    // }
    onClickfunc=(event)=>{
        let spevent = window.event;
        application.oJVccBar.PopDlg("MainSettingDlg",parseInt(10),parseInt(10));

    }
    render() {
        let {phone,btn6,btn3,agentStateTime,errText} = this.state;
        return (
            <div className={styles.webrtc}>
                {/*<input type="text" placeholder={'17560640208'} value={phone} onChange={this.inputChange}/>*/}
                <div className={styles.status}>座席状态：{this.showStatus()}</div>
                <div className={styles.timeToTimeTxt}>{agentStateTime?this.timeToTimeTxt(agentStateTime):''}</div>
                <div className={styles.text}>{errText}</div>
                {/*<div className={styles.timeToTimeTxt}>{this.timeToTimeTxt(agentStateTime)}</div>*/}
                {/*<audio loop ref={this.yimiduduaudio} preload="auto" src="./audio/ring.mp3"></audio>*/}
                <div className={styles.btns}>
                    <button className={styles.btns_jt} style={{opacity:!btn3?1:0.3}} onClick={()=>this.onBarClick('MakeCall')}>拨打</button>
                    <button className={styles.btns_gd} style={{opacity:!btn6?1:0.3}} onClick={()=>this.onBarClick('Disconnect')}>挂断</button>
                    <button className={styles.btns_gd}  onClick={()=>this.onClickfunc()}>设置</button>
                    {/*<button onClick={()=>this.onBarClick('Answer')}>应答</button>*/}
                </div>
            </div>
        )
    }
}

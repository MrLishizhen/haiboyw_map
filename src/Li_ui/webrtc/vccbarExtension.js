/**
 * Created by Wade (weida1985@163.com) on 2021/4/19.
 */
import EventEmitter from 'eventemitter3'
import md5 from 'js-md5'
import { xml2obj } from './monitorTool.js'
const MethodTimeoutMax = 10 * 1000 // 消息10秒超时

function loadEs5JS(path) {
  console.log(path)
  return new Promise((resolve, reject) => {
    const id = 's' + md5(path)
    const s = document.querySelector(`#${id}`)
    if (s) {
      if (s.dataset.s === 'loaded') {
        resolve(path)
      } else {
        if (s.dataset.s === 'error') {
          reject(`文件加载失败 ${path}`)
        } else {
          reject(`文件加载中...${path}`)
        }
      }
    } else {
      const script = document.createElement('script')
      script.src = path
      script.id = id
      script.type = 'text/javascript'
      script.dataset.s = 'loading'
      script.onload = () => {
        script.dataset.s = 'loaded'
        resolve(path)
      }
      script.onerror = () => {
        script.dataset.s = 'error'
        reject(path)
      }
      if (script.readyState) { // IE
        script.onreadystatechange = () => {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null
            resolve(path)
          }
        }
      }
      document.body.insertBefore(script, document.body.lastChild)
    }
  })
}

const getObjectProp = (o, p) => new Function('o', `return o.${p}`)(o, p)

class CinVccBar extends EventEmitter {
  constructor() {
    super()
    this.name = 'CIN-VCCBAR'
    this.instance = null

    this.config = new Map()

    this.monitorCache = {
      pos: 0,
      groups: []
    }
  }

  _setVccBarMethod() {
    if (this.application.oVccBarAssist.oBarAgentStatus) {
      const f = this.application.oVccBarAssist.oBarAgentStatus.OnAgentStatusTime
      this.application.oVccBarAssist.oBarAgentStatus.OnAgentStatusTime = (a, b, c) => {
        f(a, b, c)
        this.handleAgentStatusTimeChange(a, b, c)
      }
    }

    if (this.application.OnDebug) {
      const f = this.application.OnDebug
      this.application.OnDebug = (...arg) => {
        f.call(this.application, ...arg)
        this.emit('debug', ...arg)
      }
    }
    this.displayLog = this.application.DislayLog
    this.application.DislayLog(16, 1)

    Object.keys(this.application.oJVccBar).forEach(p => {
      if (typeof this.application.oJVccBar[p] === 'function' && !p.startsWith('_')) {
        if (p.startsWith('On') || p === 'AnswerCall') { // 事件绑定
          if (p.length > 2) {
            const event = p === 'AnswerCall' ? 'answerCall' : p.charAt(2).toLowerCase() + p.substr(3)
            if (event === 'methodResponseEvent') {
              if (this.application.oJVccBar[p]) {
                const f = this.application.oJVccBar[p]
                this.application.oJVccBar[p] = (a, b) => {
                  f(a, b)
                  this.handleMethodResponse(a, b)
                }
              }
            } else {
              this.application.oJVccBar.On(p, (...arg) => {
                if (event === 'reportBtnStatus') {
                  if (this.application.oVccBarAssist.oBarAgentStatus) {
                    this.application.oVccBarAssist.oBarAgentStatus.SetAgentStatus(this.getAgentStatus())
                  }
                  if (arg[0].startsWith('<')) { // agentSumInfo 也会报出
                    console.info(xml2obj(arg[0]))
                  } else {
                    this.emit(event, ...arg)
                  }
                } else {
                  this.emit(event, ...arg)
                }
              })
            }
          }
        } else { // 方法处理
          const method = p.charAt(0).toLowerCase() + p.substr(1)
          this[method] = (...arg) => {
            if ([
              'setIdle',
              'setBusy',
              'getVersion',
              'getAgentStatus',
              'getAgentSubBusyStatus',
              'getBusySubStatus',
              'getBtnStatus',
              'getAttribute',
              'configurate',
              'switchVideoSource',
              'initial',
              'setAttribute',
              'serialBtn',
              'transferOut',
              'connect',
              'consult',
              'answer',
              'conference',
              'getCallID',
              'getCallInfo',
              'getActiveService',
              'setActiveService',
              'getRemoteSnapShot',
              'unInitial' //  unInitial 触发其他事件
            ].indexOf(method) > -1) { // 同步方法处理

              return this.application.oJVccBar[p](...arg)
            } else { // 异步方法promise化

              return new Promise((resolve, reject) => {
                let h = -1

                this.once(`${method}:result`, (result) => {

                  clearTimeout(h)
                  resolve(result)
                })

                const localRtn = this.application.oJVccBar[p](...arg)

                if (localRtn !== 0) {
                  console.error('执行命令时返回失败', method, localRtn)
                  reject(null)
                } else {
                  h = setTimeout(() => {
                    console.error('执行命令超时', method)
                    throw new Error('执行命令超时')
                  }, MethodTimeoutMax)
                }
              })
            }
          }
        }
      }
    })
  }

  _parseUrl(url) {
    if (!url) {
      return null
    }
    let protocol = ''
    let path = ''
    const protocolDelimiterIndex = url.indexOf('://')
    if (protocolDelimiterIndex > -1) {
      protocol = url.substring(0, protocolDelimiterIndex).trimLeft()
      url = url.substring(protocolDelimiterIndex + 3).trimRight()
    }
    const pathDelimiterIndex = url.indexOf('/')
    if (pathDelimiterIndex > -1) {
      path = url.substring(pathDelimiterIndex + 1)
      url = url.substring(0, pathDelimiterIndex)
    }

    const s = url.split(':')
    // eslint-disable-next-line prefer-const
    let [ipOrDomain, port = 0] = s
    if (port === 0) {
      if (protocol === 'http') {
        port = 80
      } else if (protocol === 'https') {
        port = 443
      } else if (protocol === 'wss') {
        port = 5049
      } else {
        throw new Error('端口号未知')
      }
    } else {
      port = +port
    }

    return {
      protocol,
      ipOrDomain,
      port,
      path
    }
  }

  _parseParams({
    vccId = '',
    agentId = '',
    agentPwd = '',
    sipPwd = '',
    sipxPath = '',
    ctiServer = '',
    ctiPort = 14800,
    sipServer = '',
    sipPort = 5066,
    monitorServer = '',
    monitorPort = 4502,
    selfPrompt = 0,
    appType = 0,
    dn = '',
    agentPwdType = 0,
    extensionPwdType = 1,
    sipAuthType = 1,
    taskId = '',
    protocolType = 1,
    barType = 1
  }) {



    // const cs = [...ctiServer].map(s => this._parseUrl(s))
    // const ss = [...sipServer].map(s => this._parseUrl(s))
    // const mons = this._parseUrl(monitorServer)

    this.config.set('MainIP', ctiServer) // MainIP
    this.config.set('MainPortID', ctiPort) // MainPort
    this.config.set('MonitorIP', monitorServer) // MonitorIP
    this.config.set('MonitorPort', monitorPort) // MainPort
    this.config.set('SipServerIP', sipServer)
    this.config.set('SipServerPort', sipPort)

    this.config.set('SelfPrompt', selfPrompt)

    this.config.set('AppType', appType)
    this.config.set('PassWdCryptType', agentPwdType)
    this.config.set('PassWord', agentPwd)
    this.config.set('Dn', dn)

    this.config.set('SipPassWdCryptType', extensionPwdType) // 加密与不加密
    this.config.set('SipPassWord', sipPwd)
    this.config.set('SipAuthType', sipAuthType)
    this.config.set('MediaFlag', vccId)

    this.config.set('AgentID', agentId)

    this.config.set('TaskID', taskId)
    this.config.set('barType', barType)
    if (barType === 3) {
      this.config.set('SipProtocol', 'wss')
      this.config.set('SipXPath', sipxPath)
      this.config.set('CtiXPath', 'cti')
      this.config.set('MonitorXPath', 'monitor')
      this.config.set('ProtocolType', 1)
    }
  }

  static getInstance(options) {
    if (!this.instance) {
      this.instance = new CinVccBar(options)
    }
    return this.instance
  }

  static load(barType = 3) {
    const instance = this.getInstance()
    if (instance.application) {
      return Promise.resolve(instance)
    } else {
      let loadJSArray = []
      if (barType === 3) {
        loadJSArray = [
          './static/JVccBar3/jssip.min.js',
          './static/JVccBar3/jcinvccbar-pure.min.js'
        ]
      } else {
        loadJSArray = [
          '/libs/jquery/jcinvccbar.min.js'//放在了服务器上
        ]
      }
      return Promise.all(loadJSArray.map(js => loadEs5JS(js))).then(() => new Promise((resolve, reject) => {
        if (window.application) {
          return resolve(instance)
        } else {
          if (window.applicationLoad) {
            const args = barType === 3 ? [''] : [0, 0, 0, 0, 0, '']
            window.applicationLoad(...args, () => {
              instance.application = window.application
              instance._setVccBarMethod()
              console.warn('VccBar Version:', instance.getVersion())
              return resolve(instance)
            })
          } else {
            return reject(null)
          }
        }
      }))
    }
  }

  setBarAttributes(options) {
    this._parseParams(options)
    console.info('电话条参数: ', this.config)
    this.config.forEach((v, k) => this.setAttribute(k, v), this)
    if (options.funs) {
      const enabledBtns = options.funs.filter(b => b.enable)
      const hiddenBtns = enabledBtns.filter(b => !b.show)
      console.info('电话条使能按钮', enabledBtns)
      console.info('电话条隐藏按钮', hiddenBtns)
      this.serialBtn(enabledBtns.map(b => b.value).join(','), hiddenBtns.map(b => b.value).join(','))
    }
  }

  handleMethodResponse(methodName, result) {
    console.info('Method Response Event: ', methodName, result)
    this.emit(`${methodName.charAt(0).toLowerCase() + methodName.substr(1)}:result`, result)
  }

  handleAgentStatusTimeChange(agentStatus, agentStatusText, timerCount) {
    // console.info(agentStatus, agentStatusText, timerCount)
    this.emit('agentStatusTimeChange', { agentStatus, agentStatusText, timerCount })
  }

  async mInitialState() {
    return await this._monitorMethodAsync('initialState', 'monitorInfo.monitor')
  }

  async mAgentQuery(monitorId) {
    return await this._monitorMethodAsync('agentQuery', 'agentInfo.agent', monitorId)
  }

  async mTelQuery(monitorId) {
    return await this._monitorMethodAsync('telQuery', 'tel', monitorId)
  }

  async mIvrQuery(monitorId) {
    return await this._monitorMethodAsync('ivrQuery', 'service', monitorId)
  }

  async mServiceQuery(monitorId) {
    return await this._monitorMethodAsync('serviceQuery', 'serviceSumInfo.service', monitorId)
  }

  async mTaskQuery(monitorId) {
    return await this._monitorMethodAsync('taskQuery', 'task', monitorId)
  }

  async mCallReportQuery(monitorId) {
    return await this._monitorMethodAsync('callReportQuery', 'callReport', monitorId)
  }

  async mGetTaskSummary(monitorId) {
    return await this._monitorMethodAsync('getTaskSummary', 'taskSummary', monitorId)
  }

  async mTrunkQuery(monitorId) {
    return await this._monitorMethodAsync('trunkQuery', 'trunk', monitorId)
  }

  async _monitorMethodAsync(methodName, checkPath, ...arg) {
    let pos = 0
    let array = []
    let next = true
    while (next) {
      const result = xml2obj(await this[methodName](...arg, pos))
      let a = getObjectProp(result, checkPath)
      if (a) {
        if (!Array.isArray(a)) {
        a = [a]
      }

      if (a.length === 100) {
        pos += 101
      } else {
        next = false
      }
      array = [...array, ...a]
      } else {
        break
      }
    }
    return array
  }

  /* monitorInitialStateResponse (result) {
    const monitor = xml2obj(result)?.monitorInfo?.monitor
    if (monitor) {
      if (monitor.length < 100) {
        this.monitorCache.groups = [...monitor]
        console.info(this.monitorCache.groups)
        this.emit(`${methodName.charAt(0).toLowerCase() + methodName.substr(1)}:result`, this.monitorCache.groups)

        const monitorGroup = this.monitorCache.groups.find(g => g.type === '0')
        this.agentQuery(monitorGroup.id, 0)
      } else {
        this.monitorCache.pos += 101
        this.initialState(this.monitorCache.pos)
      }
    } else {
      this.emit(`${methodName.charAt(0).toLowerCase() + methodName.substr(1)}:result`, [])
    }
  }

  monitorAgentQueryResponse (result) {
    const {agentInfo} = xml2obj(result)
    console.info(agentInfo)
    this.emit(`${methodName.charAt(0).toLowerCase() + methodName.substr(1)}:result`, agentInfo)
    this.startNotification(agentInfo.monitorid, '0', '')
  } */

  loadMonitor() {
    return loadEs5JS('./JVccBar3/scripts/ui/jhtmlmonitor.js').then(() => {
      if (!this.application.oJMonitorData) {
        this.application.oJMonitorData = new window.JcmMonitorManager(this.application.oJVccBar)
        this.application.oJMonitorData.eventInit = false
      }

      return Promise.resolve({
        oJMonitorData: this.application.oJMonitorData,
        extension: window.G_MonitorExtension
      })
    })
  }
}

export default CinVccBar

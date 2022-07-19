import React from 'react'
import videojs from "video.js";
import "videojs-contrib-hls";
import "video.js/dist/video-js.css";
import _ from 'lodash'
import axios from 'axios'
import './index.less'

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.refVideo = React.createRef()
    this.player = null
    this.noShowData = []
    this.isVideoBreak = null
    this.state = {
      videoSrc: null,
      loadText: '视频加载中...',
      tgtSessionId: '',
      refreshVideoID: '',
      getVideoSrcCount: 0
    }
  }

  initVideoJs = () => {
    this.player = videojs(
      this.refVideo.current,
      {
        language: "zh-CN",
        preload: "auto",
        // controls: false,
        controlBar: {
          children: [{ name: "playToggle" }],
        },
        autoPlay: true,
        muted: true,
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false
      },
      () => {
        // this.player.on("error", () => {
        //   console.log('error')
        // })
        // this.player.on('suspend', function() {//延迟下载
        //   console.log("延迟下载")
        // });
        // this.player.on('loadstart', function() { //客户端开始请求数据
        //     console.log("客户端开始请求数据")
        // });
        // this.player.on('progress', function() {//客户端正在请求数据
        //     // console.log("客户端正在请求数据")
        // });
        // this.player.on('abort', function() {//客户端主动终止下载（不是因为错误引起）
        //     console.log("客户端主动终止下载")
        // });
        // this.player.on('error', function() {//请求数据时遇到错误
        //     console.log("请求数据时遇到错误")
        // });
        // this.player.on('stalled', function() {//网速失速
        //     console.log("网速失速")
        // });
        // this.player.on('play', function() {//开始播放
        //     console.log("开始播放")
        // });
        // this.player.on('pause', function() {//暂停
        //     console.log("暂停")
        // });
        this.player.on('loadedmetadata', () => {//成功获取资源长度
          // console.log("成功获取资源长度")
          this.startVideo();
        });
        // this.player.on('loadeddata', function() {//渲染播放画面
        //     console.log("渲染播放画面")
        // });
        // this.player.on('waiting', () => {//等待数据，并非错误
        //     console.log("等待数据中")
        // });
        // this.player.on('playing', () => {//开始回放
        //     console.log("开始回放")
        // });
        // this.player.on('canplay', function() {//可以播放，但中途可能因为加载而暂停
        //     console.log("可以播放，但中途可能因为加载而暂停")
        // });
        // this.player.on('canplaythrough', function() { //可以播放，歌曲全部加载完毕
        //     console.log("可以播放，歌曲全部加载完毕")
        // });
        // this.player.on('seeking', function() { //寻找中
        //     console.log("寻找中")
        // });
        // this.player.on('seeked', function() {//寻找完毕
        //     console.log("寻找完毕")
        // });
        // this.player.on('timeupdate', function() {//播放时间改变
        //   // console.log("播放时间")
        // });
        // this.player.on('ended', function() {//播放结束
        //     console.log("播放结束")
        // });
        // this.player.on('ratechange', function() {//播放速率改变
        //     console.log("播放速率改变")
        // });
        // this.player.on('durationchange', function() {//资源长度改变
        //     console.log("资源长度改变")
        // });
        // this.player.on('volumechange', function() {//音量改变
        //     console.log("音量改变")
        // });
      }
    );
    this.player.play()
  }

  startVideo = () => {
    // this.player.play()
    //全屏支持
    // window.screen.width  
    // window.screen.height 


    //判断开始播放视频，移除高斯模糊等待层
    let isVideoPlaying = setInterval(() => {
      let currentTime = this.player.currentTime();
      if (currentTime > 0) {
        // $('.vjs-poster').remove();
        clearInterval(isVideoPlaying);
      }
    }, 200)

    //判断视频是否卡住，卡主10s重新load视频
    let lastTime = -1,
      tryTimes = 0;

    clearInterval(this.isVideoBreak);
    this.isVideoBreak = setInterval(() => {
      let currentTime = this.player.currentTime();
      // console.log(this.player.currentTime())
      if (currentTime === lastTime) {
        //此时视频已卡主3s
        //设置当前播放时间为超时时间，此时videojs会在play()后把currentTime设置为0
        this.player.currentTime(currentTime + 10000);
        this.player.play();
        tryTimes++;
        // console.log( 'play后',this.player.currentTime())
        //尝试5次播放后，如仍未播放成功提示刷新
        if (tryTimes > 5) {
          sessionStorage.removeItem(this.state.refreshVideoID)
          const n = this.getVideoSrc()
          this.getPlayerUrl({ VIDEOID: this.noShowData[n] })
          tryTimes = 0;
        }
      } else {
        lastTime = currentTime;
        tryTimes = 0;
      }
    }, 30000)

  }

  getVideoSrc = () => {
    let boo = true
    let n = null
    while (boo) {
      n = parseInt(Math.random() * 5)
      const id = this.noShowData[n]
      const isExist = Boolean(sessionStorage.getItem(id))
      if (!isExist) {
        this.setState({
          refreshVideoID: id
        })
        boo = false
      }
    }
    return n
  }

  getPlayerUrl = ({ VIDEOID = null }) => {
    if (!VIDEOID) return
    axios.post(
      `${window.origin}/sign/vedioservice/open`,
      { "deviceId": VIDEOID, "protocol": "hls", "resolution": "UHD" }
    )
      .then((response) => {
        if (response.status === 200 && response.data.status === 200 && response.data.result.code === 0) {
          const url = response.data.result.data.send_uri;
          const tgtSessionId = response.data.result.data.tgt_session_id;
          this.setState({
            videoSrc: url,
            tgtSessionId,
            refreshVideoID: VIDEOID
          })
          this.setState((state) => {
            return {
              getVideoSrcCount: 0
            }
          })
          sessionStorage.setItem([VIDEOID], url)
        } else {
          this.setState({
            loadText: response.data.result.message || '接口请求失败!'
          })
          this.setState((state) => {
            return {
              getVideoSrcCount: ++state.getVideoSrcCount
            }
          })
          if (this.state.getVideoSrcCount < 20) {
            const n = this.getVideoSrc()
            this.getPlayerUrl({ VIDEOID: this.noShowData[n] })
          }
        }
      })
      .catch((error) => {
        this.setState({ loadText: '请求数据时遇到错误' })
        this.setState((state) => {
          return {
            getVideoSrcCount: ++state.getVideoSrcCount,
          }
        })
        if (this.state.getVideoSrcCount < 20) {
          const n = this.getVideoSrc()
          this.getPlayerUrl({ VIDEOID: this.noShowData[n] })
        }
      })
  }

  refresh = (e) => {
    e.stopPropagation()
    const VIDEOID = this.noShowData.find(item => !Boolean(sessionStorage.getItem(item)))
    if (!!VIDEOID) {
      this.getPlayerUrl({ VIDEOID: VIDEOID })
    }
  }

  componentDidMount() {
    this.getPlayerUrl(this.props)
    const { dataProvider = [] } = this.props
    dataProvider.forEach(e => {
      if (sessionStorage.getItem(e.VIDEOID)) {
        sessionStorage.removeItem(e.VIDEOID)
      }
    });
    const noShowData = dataProvider.filter(item => item.ISDAULT === '0')
    this.noShowData = noShowData.map(item => item.VIDEOID)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.VIDEOID != prevProps.VIDEOID) {
      this.getPlayerUrl(this.props)
    }
    if (this.state.videoSrc != prevState.videoSrc) {
      this.initVideoJs()
      this.player.src(this.state.videoSrc)
    }
  }


  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
    if (!!this.state.tgtSessionId) {

      axios.post(
        `${window.origin}/sign/vedioservice/close`,
        {
          "tgtSessionId": this.state.tgtSessionId
        }
      )
        .then((response) => {
          console.log(response)
        })
        .catch(function (error) {

        })
    }

  }

  render() {
    const { style, wrapper, video } = this.props;

    return (
      <div style={{ position: 'relative', ...style }}>
        <div style={{ overflow: "hidden", margin: 'auto', width: '100%', height: 334, backgroundColor: '#000', ...wrapper }}>
          {this.state.videoSrc ? (
            <video
              duration={2}
              ref={this.refVideo}
              id={this.props.ID + "camlab"}
              className="video-js"
              // height={720}
              autoPlay
              muted
              style={{
                width: '100%',
                height: 334,
                transform: 'scale(1.4)',
                cursor: 'pointer',
                // backgroundColor: 'rgba(0,0,0,0)'
                ...video
              }}
            >
              <source src={this.state.videoSrc} type="application/x-mpegURL"></source>
            </video>
          ) : (
              <div
                style={{
                  backgroundColor: '#000',
                  height: "100%",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#444444'
                }}
              >
                <h4>{this.state.loadText}</h4>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

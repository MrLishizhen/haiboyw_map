import React from 'react'
import videojs from "video.js";
import "videojs-contrib-hls";
import "video.js/dist/video-js.css";
import _ from 'lodash'
import axios from 'axios'
import PopVideo from './PopVideo'
import './index.less'

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.refVideo = React.createRef()
    this.player = null
    this.noShowData = []
    this.isVideoBreak = null
    this.state = {
      isShowPopVideo: false,
      videoSrc: null,
      loadText: '视频加载中...',
      tgtSessionId: '',
      refreshdeviceId: '',
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
        this.player.play()
        // this.player.play()
        // this.player.on("error", () => {
        //   this.player.errorDisplay.close();
        // })
        // this.player.on('suspend', function() {//延迟下载
        //   console.log("延迟下载")
        // });
        // this.player.on('loadstart', function() { //客户端开始请求数据
        //     console.log("客户端开始请求数据")
        // });
        // this.player.on('progress', function() {//客户端正在请求数据
        //     console.log("客户端正在请求数据")
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
        // this.player.on('loadedmetadata', () => {//成功获取资源长度
        //     // console.log("成功获取资源长度")
        //     if(this.state.videoSrc){
        //       // this.startVideo();
        //     }
        // });
        // this.player.on('loadeddata', function() {//渲染播放画面
        //     console.log("渲染播放画面")
        // });
        // this.player.on('waiting', () => {//等待数据，并非错误
        //     console.log("等待数据")
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
        //     console.log("播放时间改变")
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
  }

  startVideo = () => {
    // this.player.play()
    //全屏支持
    // window.screen.width  
    // window.screen.height 

    //判断开始播放视频，移除高斯模糊等待层
    let isVideoPlaying = setInterval(() => {
      if (!this.player.currentTime()) return
      let currentTime = this.player.currentTime();
      if (currentTime > 0) {
        // $('.vjs-poster').remove();
        clearInterval(isVideoPlaying);
      }
    }, 200)

    //判断视频是否卡住，卡主10s重新load视频
    let lastTime = -1;

    clearInterval(this.isVideoBreak);
    this.isVideoBreak = setInterval(() => {

      if (!this.player.currentTime()) return
      let time = this.player.currentTime();
      if (time === lastTime) {
        //此时视频已卡主3s
        //设置当前播放时间为超时时间，此时videojs会在play()后把currentTime设置为0
        this.player.currentTime(time + 10000);
        this.player.play();
      } else {
        lastTime = time;
      }
    }, 30000)

  }


  getPlayerUrl = async ({ deviceId = null }) => {
    if (!deviceId) return
    axios.post(
      'http://10.207.204.33:5479/sign/vedioservice/open',
      { "deviceId": deviceId, "protocol": "hls", "resolution": "UHD" }
    )
      .then((response) => {
        if (response.status === 200 && response.data.status === 200 && response.data.result.code === 0) {
          const url = response.data.result.data.send_uri;
          const tgtSessionId = response.data.result.data.tgt_session_id;
          this.setState(() => {
            return {
              videoSrc: url,
              tgtSessionId
            }
          })
        } else {
          this.setState(() => {
            return {
              loadText: response.data.result.message || '接口请求失败!'
            }
          })
        }
      })
      .catch((error) => {
        this.setState(() => {
          return { loadText: '请求数据时遇到错误' }
        })
      })
  }

  componentDidMount() {
    this.getPlayerUrl(this.props)
    this.setState({
      loadText: '资源加载中...'
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.deviceId != prevProps.deviceId) {
      this.getPlayerUrl(this.props)
    }
    if (this.state.videoSrc != prevState.videoSrc) {
      this.initVideoJs()
      this.player.src({
        src: this.state.videoSrc,
        type: 'application/x-mpegURL'
      })
    }
  }


  componentWillUnmount() {
    this.player && this.player.dispose();
    if (!!this.state.tgtSessionId) {

      axios.post(
        'http://10.207.204.33:5479/sign/vedioservice/close',
        {
          "tgtSessionId": this.state.tgtSessionId
        }
      )
        .then((response) => {
          // console.log(response)
        })
        .catch(function (error) {

        })
    }

  }

  onShowPopVideo = (e, type) => {
    e.stopPropagation()
    if (type === 'video' && !this.state.videoSrc) return;
    this.setState(state => {
      return {
        isShowPopVideo: !state.isShowPopVideo
      }
    })
  }

  render() {
    // const bg = this.state.videoSrc ? {} : {backgroundColor: '#000'}
    return (
      <div
        style={{ margin: 'auto', width: '100%', height: '100%' }}
      >
        <div
          style={{ overflow: "hidden", width: '100%', height: '100%', maxheight: 548, backgroundColor: '#000' }}
        >
          {this.state.videoSrc ? (
            <video
              onClick={(e) => this.onShowPopVideo(e, 'video')}
              ref={this.refVideo}
              duration={2}
              // id={this.props.ID + "camlab"}
              className="video-js"
              // height={720}
              autoPlay
              muted
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${this.props.scaleNum})`,
                cursor: 'pointer',
                backgroundColor: 'transparent'
              }}
            >
              <source src={this.state.videoSrc} type="application/x-mpegURL"></source>
            </video>
          ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#444444'
                }}
              >
                {this.state.loadText}
              </div>
            )}
        </div>
        {
          this.state.isShowPopVideo && <PopVideo videoSrc={this.state.videoSrc} onShowPopVideo={this.onShowPopVideo} />
        }
      </div>
    )
  }


}

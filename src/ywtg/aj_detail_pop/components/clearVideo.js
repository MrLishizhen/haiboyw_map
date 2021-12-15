import React from 'react'
import videojs from "video.js";
import _ from 'lodash'
import axios from 'axios'

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.refVideo = React.createRef()
    this.player = null
    this.state = {
      videoSrc: null,
      loadText: '视频加载中...',
      tgtSessionId: ''
    }
  }

  initVideoJs() {
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

      }
    );
    this.player.play()
  }

  getPlayerUrl(VIDEOID) {
    if (!VIDEOID) return
    axios.post(
      'http://10.207.204.33:5479/sign/vedioservice/open',
      { "deviceId": VIDEOID, "protocol": "hls", "resolution": "UHD" }
    )
      .then((response) => {
        if (response.status === 200 && response.data.status === 200 && response.data.result.code === 0) {
          const url = response.data.result.data.send_uri;
          const tgtSessionId = response.data.result.data.tgt_session_id;
          this.setState({
            videoSrc: url,
            tgtSessionId
          })
        } else {
          this.setState({
            loadText: '视频暂时不可用！请稍后再试...'
          })
        }
      })
      .catch((error) => {
        this.setState({ loadText: '视频暂时不可用！请稍后再试...' })
      })
  }

  componentDidMount() {
    this.getPlayerUrl(this.props.videoSrc)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.videoSrc != prevProps.videoSrc) {
      this.getPlayerUrl(this.props.videoSrc)
    }
    if (this.state.videoSrc != prevState.videoSrc) {
      if (prevState.tgtSessionId) {
        axios.post(
          'http://10.207.204.33:5479/sign/vedioservice/close',
          {
            "tgtSessionId": prevState.tgtSessionId
          }
        )
          .then((response) => {
            console.log(response)
          })
          .catch(function (error) {

          })
      }
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
        'http://10.207.204.33:5479/sign/vedioservice/close',
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
    return (
      <div style={{ position: 'relative', ...this.props.wrapperStyle }}>
        <div style={{ overflow: 'hidden', width: 2950, height: 1683, ...this.props.style }}>
          {this.state.videoSrc ? (
            <video
              duration={2}
              ref={this.refVideo}
              id={new Date().getTime() + "camlab"}
              className="video-js"
              // height={720}
              autoPlay
              muted
              style={{
                width: '100%',
                height: 1683,
                ...this.props.style,
                transform: `scale(${this.props.scale || 1})`,
                cursor: 'pointer',
                // backgroundColor: 'rgba(0,0,0,0)'
              }}
            >
              <source src={this.state.videoSrc} type="application/x-mpegURL"></source>
            </video>
          ) : (
              <div
                style={{
                  height: "100%",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={this.state.loadText !== '视频加载中...' ? () => { this.setState({ loadText: '视频加载中...' }); this.getPlayerUrl(this.props.videoSrc) } : undefined}
              >
                <h4
                  style={{
                    color: '#ffffff',
                    fontSize: 36
                  }}
                >{this.state.loadText}</h4>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

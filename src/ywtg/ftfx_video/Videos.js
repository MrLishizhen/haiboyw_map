import React from 'react'
import Video from './Video'

const boxStyle = {
    width: '49.5%',
    height: '32%'
}

const mainStyle = {
    display: 'flex',
    height: '100%',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
}

class Videos extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            handlers: ''
        }
    }

    componentDidMount() {
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
        })
    }

    //以后的初始化数据
    initData = () => {
        const { style = {}, dataProvider = [] } = this.props
        let directionStyle = {},
            margindirection = {},
            scaleNum = 1,
            notText = '资源不可用/刷新重试'
        const isdataProvider = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const isStyle = style && Object.keys(style).length != 0

        if (isStyle) {
            const { direction, marginNum, scale, text } = style
            if (direction === 'col') {
                directionStyle = { flexDirection: 'column' }
            }
            if (marginNum) {
                margindirection = direction === 'col' ? { marginBottom: marginNum } : { marginRight: marginNum }
            }
            if (scale) {
                scaleNum = scale
            }
            if (text) {
                notText = text
            }
        }

        return { isdataProvider, directionStyle, margindirection, dataProvider, scaleNum, notText }
    }

    onVideo = (data) => {
        const { handlers } = this.state
        handlers && handlers.onClick && handlers.onClick({ data })
    }

    render() {
        const { isdataProvider, directionStyle, margindirection, dataProvider, scaleNum, notText } = this.initData()

        return (
            <div style={{
                ...mainStyle
            }}>
                {isdataProvider &&
                    dataProvider.map((item, index) => {
                        let isMargin = {
                            marginBottom: '1%'
                        }
                        if (index % 2) {
                            isMargin.marginLeft = '1%'
                        }
                        if (index > 6) {
                            isMargin.marginBottom = '0'
                        }
                        return (
                            <div key={item.deviceId} style={{
                                ...boxStyle,
                                ...isMargin
                            }} onClick={this.onVideo.bind(this, item)}>
                                <Video {...item} scaleNum={scaleNum} notText={notText}></Video>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Videos
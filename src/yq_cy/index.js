import React, { Component } from 'react'
import styles from './index.css'
import {isEqual} from "lodash";

var width = 400
var height = 220
var direction = '-1' //方向  -1 横向顺时针 1 横向逆时针  -2 纵向顺时针 2 纵向逆时针
var speed = 600 //速度
var color = ['#B4D1FF', '#FFFFFF']
class index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            contentEle: [],
            timer: null,
            data: dataQuery||[]
        }
    }
    // state = {
    //     contentEle: [],
    //     timer: null,
    //     data: ['云图', '是个啥', '他啥都不是', '他就是词云', '就是他呆子', '傻子和疯子', '营养快线', '哈哈哈到家', '瑞士军刀', 'DW情侣对表', '清风抽纸', '这一刻更清晰', '债券评级']
    // }
    render() {
        const { data } = this.state
        return (
            <div id="main">
                <div className={styles.wordCloud__tagBall}>
                    {
                        data.map((it, idx) => this.renderContent(it, idx))
                    }
                </div>
            </div>
        )
    }
    // 内容
    renderContent = (it, idx) => {
        const { contentEle } = this.state
        if (contentEle[idx]) {
            return (
                <span className={styles.wordCloud__tag}
                    key={idx}
                    style={{
                        color: color[idx % color.length],
                        opacity: contentEle[idx].style.opacity,
                        transform: contentEle[idx].style.transform,
                        zIndex: contentEle[idx].style.zIndex
                    }}>
                    {it}</span>
            )
        } else {
            return (
                <span className={styles.wordCloud__tag} key={idx}> ss</span>
            )
        }
    }
    // 初始位点
    renderInit = () => {
        const { contentEle, data } = this.state
        const RADIUSX = (width - 50) / 2
        const RADIUSY = (height - 50) / 2
        for (let i = 0; i < data.length; i += 1) {
            const k = -1 + (2 * (i + 1) - 1) / data.length
            const a = Math.acos(k)
            const b = a * Math.sqrt(data.length * Math.PI)
            const x = RADIUSX * Math.sin(a) * Math.cos(b)
            const y = RADIUSY * Math.sin(a) * Math.sin(b)
            const z = RADIUSX * Math.cos(a)
            const singleEle = {
                x,
                y,
                z,
                style: {},
            }
            contentEle.push(singleEle)
            this.setState({
                contentEle: contentEle
            })
        }
      
        this.animate()
    }
    // 动画
    animate = () => {
        this.rotateX()
        this.rotateY()
        this.move()
        // window.requestAnimationFrame(this.animate)
    }
    // X轴
    rotateX = () => {
        const angleX = ['-1', '1'].includes(direction)
            ? Math.PI / Infinity
            : Math.PI / ((Number(direction) / 2) * Number(speed))
        const cos = Math.cos(angleX)
        const sin = Math.sin(angleX)
        let contentEle = this.state.contentEle.map((t) => {
            const y1 = t.y * cos - t.z * sin
            const z1 = t.z * cos + t.y * sin
            return {
                ...t,
                y: y1,
                z: z1,
            }
        })
        this.setState({
            contentEle: contentEle
        })
    }
    // y轴
    rotateY = () => {
        const angleY = ['-2', '2'].includes(direction)
            ? Math.PI / Infinity
            : Math.PI / (Number(direction) * Number(speed))
        const cos = Math.cos(angleY)
        const sin = Math.sin(angleY)
        let contentEle = this.state.contentEle.map((t) => {
            const x1 = t.x * cos - t.z * sin
            const z1 = t.z * cos + t.x * sin
            return {
                ...t,
                x: x1,
                z: z1,
            }
        })
        this.setState({
            contentEle: contentEle
        })
    }
    // 样式
    move = () => {
        const CX = width / 2
        const CY = height / 2
        let contentEle = this.state.contentEle.map((singleEle) => {
            const { x, y, z } = singleEle
            const fallLength = 500
            const RADIUS = (width - 50) / 2
            const scale = fallLength / (fallLength - z)
            const alpha = (z + RADIUS) / (2 * RADIUS)
            const left = `${x + CX - 15}px`
            const top = `${y + CY - 15}px`
            const transform = `translate(${left}, ${top}) scale(${scale})`
            const style = {
                ...singleEle.style,
                opacity: alpha + 0.5,
                zIndex: parseInt(scale * 100, 10),
                transform,
            }
            return {
                x,
                y,
                z,
                style,
            }
        })
        this.setState({
            contentEle: contentEle
        })
    }
    // 定时器
    iTimer = () => {
        const { data } = this.state
        this.setState({
            timer: setInterval(() => {
                this.renderInit()
                data.map((it, idx) => this.renderContent(it, idx))
            }, 50),
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {dataProvider, style} = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    componentDidMount() {
        this.renderInit()
        setTimeout(this.iTimer, 0);
    }

    componentWillUnmount() {
        this.state.timer && clearTimeout(this.state.timer);
    }

}

export default index

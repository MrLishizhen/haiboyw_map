import React from 'react'
import ja from '../img/ja.png'
import jl from '../img/jl.png'
import wa from '../img/wa.png'
import wl from '../img/wl.png'
import styles from '../index.less'

class Tab extends React.Component { 
    
    constructor(props) {
        super(props)
        this.state = {
            isVisible: true,
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

    onShow = (name) => {
        const isVisible = name == '居委' 
        this.setState({ isVisible })
        const { handlers } = this.state
        // console.log(name)
        handlers && handlers.onClick && handlers.onClick({ name })
    }

    render() {
        const { isVisible } = this.state
        const { dataProvider } = this.props
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const data = isHasData ? dataProvider : [0,0]
        return (
            <div className={styles.rubbishTab}>
                <div style={isVisible ? {border: '2px solid #00E6FF'} : {opacity: 0.6} } onClick={() => this.onShow('居委')} className={styles.rubbishTabBg}>
                    <img src={ isVisible ? jl : ja }></img>
                    <div className={!isVisible ? styles.showTab : null }>
                        <label>居委<br/>
                            <span>{data[0]}人</span>
                        </label>
                    </div>
                </div>
                <div style={isVisible ? {opacity: 0.6, marginLeft: 46} : {marginLeft: 46,border: '2px solid #00E6FF'}} onClick={() => this.onShow('物业')} className={styles.rubbishTabBg}>
                    <img src={ isVisible ? wa : wl }></img>
                    <div className={isVisible ? styles.showTab : null}>
                        <label>物业<br/>
                            <span>{data[1]}人</span>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tab
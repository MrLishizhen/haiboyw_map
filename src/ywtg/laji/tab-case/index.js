import React from 'react'
import casea from '../img/casea.png'
import casel from '../img/casel.png'
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
        const isVisible = name == '一般案件' 
        this.setState({ isVisible })
        const { handlers } = this.state
        console.log(name)
        handlers && handlers.onClick && handlers.onClick({ name })
    }

    render() {
        const { isVisible } = this.state
        const { dataProvider } = this.props
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const data = isHasData ? dataProvider : [0,0]
        return (
            <div className={styles.rubbishTabCase}>
                <div onClick={() => this.onShow('一般案件')} className={styles.rubbishTabBg}>
                    <img src={ isVisible ? casel : casea }></img>
                    <div className={styles.showTab}>
                        <span>一般案件上报列表</span>
                    </div>
                </div>
                <div onClick={() => this.onShow('流转案件')} className={styles.rubbishTabBg}>
                    <img src={ isVisible ? casea : casel }></img>
                    <div className={styles.showTab}>
                        <span>流转案件上报列表</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tab
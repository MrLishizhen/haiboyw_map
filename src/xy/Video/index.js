import React from 'react'
import Videos from './Videos'
import _ from 'lodash'

const TIME = 10000;

export default class Slide extends React.PureComponent {
    constructor(props) {
        super(props);
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

    VideoPop = () => {
        const { handlers } = this.state
        handlers && handlers.onClick && handlers.onClick({})
    }

    render() {
        const { dataProvider } = this.props
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const defaultData = isHasData ? dataProvider.filter(item => item.ISDAULT === '1') : []
        if (!isHasData) return null;

        return <Videos defaultData={defaultData} />
    }
}
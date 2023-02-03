import React, { Component } from 'react';
import styles from './index.less'
import { Tag } from 'antd';



//hotword
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handlers: '',
        }
    }

    componentDidMount() {
        try {
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
        } catch (error) {
            console.log(e)
        }
    }
    componentWillReceiveProps(nextProps) {
        try {

        } catch (error) {
            console.log(e)
        }
    }
    render() {
        const { dataProvider } = this.props;
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const data = isHasData ? dataProvider : [];
        return (
            <div className={styles.hotwordBox}>
                {data && data.length>0 && data.map((item) => {
                    return(
                        <div className={styles.item} style={{fontSize:item.C,marginLeft:item.D,marginTop:item.E,color:item.B}} >{item.A}</div>
                    )
                })}
            </div>
        )

    }

}

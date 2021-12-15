import React from 'react'
import { isEqual } from 'lodash';
import styles from './index.less'
import SickWord from '../sickWord';

/**
 * @_sick_pop
 * 3446.4*1728
 */
class SickPop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectId: 0,
            selectData: [],
            data: [],
            visible: false
        }
    }

    componentDidMount() {
        try {
            const list = this.getData(this.props);
            let selectData = [];
            if (list && list.length > 0) {
                list.forEach((item, index) => {
                    selectData.push({ id: index, value: item.littletabinfo });
                })
            }

            const { buffEvent = [{ type: 'click' }], style = {} } = this.props;
            let eventValue = {};

            for (let i = 0; i < buffEvent.length; i++) {
                const eventObj = buffEvent[i];
                const { type, method, bindedComponents } = eventObj;
                if (type === 'click') {
                    eventValue = {
                        onClick: (record) => {
                            method && method({ ...record }, bindedComponents)
                        }
                    }
                }
            }

            this.setState({
                selectId: 0,
                selectData,
                data: list,
                handlers: Object.assign({}, eventValue)
            });
        } catch (e) {
            console.error(e);
        }
    }

    // 校验dataProvider
    getData = (props) => {
        const { dataProvider = [] } = props;
        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider];
        }
        return [];
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!isEqual(this.props, nextProps)) {
                const list = this.getData(nextProps);
                let selectData = [];

                if (list && list.length > 0) {
                    list.forEach((item, index) => {
                        selectData.push({ id: index, value: item.littletabinfo });
                    })
                }
                this.setState({
                    selectId: 0,
                    selectData,
                    data: list
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    changeTab = (e, id) => {
        this.setState({
            selectId: id
        })
    }

    render() {
        const { selectId = 0, selectData, data = [], visible } = this.state;

        return (
            <div className={[styles.sickPop, visible ? styles.visible : null].join(' ')}>
                <div>
                    <ul>
                        {
                            selectData.map(item => {
                                return <li className={selectId === item.id ? styles.tab_bg_color : ''} onClick={(event) => this.changeTab(event, item.id)} key={item.id}>{item.value}</li>
                            })
                        }
                    </ul>
                </div>
                <SickWord data={data ? data[selectId] : {}} visible={visible} setState={(visible) => this.setState({ visible })} />
            </div>
        )
    }
}

export default SickPop;
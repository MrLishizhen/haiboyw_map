import React from 'react';
import { isEqual } from 'lodash';
import styles from './index.less';

/**
 * _sick_search
 */
class SickSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handlers: '',
            showResult: false,
            showTabId: 0,
            selectValue: '',
            selectData: [
                // { id: 0, value: '长宁区新冠肺炎应急处置预案' },
                // { id: 1, value: '长宁区新冠肺炎应急处置预案' },
                // { id: 2, value: '长宁区新冠肺炎应急处置预案' },
                // { id: 3, value: '长宁区新冠肺炎应急处置预案' }
            ]
        }

    }

    componentDidMount() {
        try {
            const list = this.getData(this.props);
            let selectData = [];
            if (list && list.length > 0) {
                list.forEach((item, index) => {
                    selectData.push({ id: index, value: item });
                })
            }

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
                showTabId: 0,
                selectValue: '',
                selectData,
                handlers: Object.assign({}, eventValue)
            })
        } catch (e) {
            console.error(e)
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!isEqual(this.props, nextProps)) {
                const list = this.getData(nextProps);
                let selectData = [];

                if (list && list.length > 0) {
                    list.forEach((item, index) => {
                        selectData.push({ id: index, value: item });
                    })
                }
                this.setState({
                    showTabId: 0,
                    selectValue: '',
                    selectData
                });
            }
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

    showResult = () => {
        this.setState({
            showResult: !this.state.showResult
        })
    }

    showResultFalse = () => {
        this.setState({
            showResult: false
        })
    }

    showPop = (id, value) => {
        if (id === -1) return;

        const { handlers, showResult } = this.state;
        this.setState({
            showResult: !showResult,
            selectValue: value,
            showTabId: id
        })
        handlers.onClick && handlers.onClick({ id, value })
    }

    onChangeText = (e) => {
        const { selectData } = this.state;

        let text = e.target.value;
        // let data = doc.filter((item) => item.value.indexOf(text) > -1);
        this.setState({
            selectValue: text,
            // selectData: data
        });
    }

    render() {
        const { showResult, selectValue, selectData, showTabId } = this.state;
        const list = selectData && selectData.length > 0 ? selectData.filter(item => item.value && item.value.indexOf(selectValue) !== -1) : []

        return (
            <div className={styles.search_outer}>
                <div className={styles.search}>
                    <div className={styles.search_input}>
                        <input
                            placeholder='搜索'
                            type='text'
                            // onClick={this.showResultFalse}
                            onFocus={() => this.setState({ showResult: true })}
                            // onBlur={() => this.setState({ showResult: false })}
                            onChange={(event) => this.onChangeText(event)} value={selectValue}
                        />
                        {
                            showResult && selectValue &&
                            (
                                <ul className={styles.search_result}>
                                    {
                                        list.length ? list.map(item => {
                                            return <li key={item.id} onClick={() => this.showPop(item.id, item.value)}>{item.value}</li>
                                        }) : <li onClick={this.showPop(-1)}>{'无结果'}</li>
                                    }
                                </ul>
                            )
                        }
                    </div>
                    <div className={styles.search_icon} onClick={this.showResult}>
                        <img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5pCc57SiPC90aXRsZT4KICAgIDxnIGlkPSLnlr7mjqflpKflsY8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLnlr7mjqfkuIDnvZHnu5/nrqE5LjE05L+u5pS5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjAxLjAwMDAwMCwgLTQ2LjAwMDAwMCkiIGZpbGw9IiMwNTQ0NzQiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSLliIbnu4QtOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjc2LjAwMDAwMCwgMzYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i5pCc57SiIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMjUuMDAwMDAwLCAxMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjkuMTc5NzIxNSwyNy4yMTA5NjkyIEwyNC4xNDA2NTMxLDIyLjE3MTkwMDggQzI2LjA0NDk1MjIsMTkuODMxMDc3OCAyNy4xODc1MzE2LDE2Ljg0NTcyMjcgMjcuMTg3NTMxNiwxMy41OTM3NjU4IEMyNy4xODc1MzE2LDYuMDg0OTY4MDIgMjEuMTAyNTYzNiwwIDEzLjU5Mzc2NTgsMCBDNi4wODQ5NjgwMiwwIDAsNi4wODc4OTc3MSAwLDEzLjU5Mzc2NTggQzAsMjEuMDk5NjMzOSA2LjA4NDk2ODAyLDI3LjE4NzUzMTYgMTMuNTkzNzY1OCwyNy4xODc1MzE2IEMxNi44MzY5MzM3LDI3LjE4NzUzMTYgMTkuODEzNDk5NiwyNi4wNTM3NDEzIDIyLjE0ODQ2MzMsMjQuMTU4MjMxMiBMMjcuMTkwNDYxMywyOS4yMDAyMjkzIEMyNy43NDEyNDMyLDI5Ljc1MTAxMTIgMjguNjI4OTM5NiwyOS43NTEwMTEyIDI5LjE3OTcyMTUsMjkuMjAwMjI5MyBDMjkuNzI3NTczNywyOC42NTIzNzcxIDI5LjcyNzU3MzcsMjcuNzYxNzUxMSAyOS4xNzk3MjE1LDI3LjIxMDk2OTIgWiBNMTMuNTkzNzY1OCwyNC4zNzUwMjg0IEM3LjY0MDYzMzg5LDI0LjM3NTAyODQgMi44MTI1MDMyNywxOS41NDY4OTc3IDIuODEyNTAzMjcsMTMuNTkzNzY1OCBDMi44MTI1MDMyNyw3LjY0MDYzMzg5IDcuNjQwNjMzODksMi44MTI1MDMyNyAxMy41OTM3NjU4LDIuODEyNTAzMjcgQzE5LjU0Njg5NzcsMi44MTI1MDMyNyAyNC4zNzUwMjg0LDcuNjQwNjMzODkgMjQuMzc1MDI4NCwxMy41OTM3NjU4IEMyNC4zNzUwMjg0LDE5LjU0Njg5NzcgMTkuNTQ2ODk3NywyNC4zNzUwMjg0IDEzLjU5Mzc2NTgsMjQuMzc1MDI4NCBaIiBpZD0i5b2i54q2Ij48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==' alt='' />
                    </div>
                </div>
            </div>
        )
    }
}

export default SickSearch;
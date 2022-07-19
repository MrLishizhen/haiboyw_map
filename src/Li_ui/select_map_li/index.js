import React, {Component} from 'react';
import {isEqual} from "lodash";
import {Select} from 'antd';

const {Option} = Select;
import styles from './index.less'

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            // data: dataQuery,
            data: [
                {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '东方小区“双报到”党支部',
                    count: 5
                }, {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '方小区“双报到”党支部',
                    count: 5

                }, {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西小区“双报到”党支部',
                    count: 5

                }
                , {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西方区“双报到”党支部',
                    count: 5

                }
                , {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西方小“双报到”党支部',
                    count: 5

                }, {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西方小区“报到”党支部',
                    count: 5

                }, {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西方小区“到”党支部',
                    count: 5

                }, {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西方小区“报”党支部',
                    count: 5

                }, {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西方小区“报到”支部',
                    count: 5

                }, {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西方小区“报到”党部',
                    count: 5

                }, {
                    jdb: '檀溪街道办事处',
                    sq: '滨河社区',
                    wg: '西方小区“报到”党支',
                    count: 5

                }

            ],
            hotData:{}
        }
    }


    componentDidMount() {
        const {buffEvent = [{type: 'click'}]} = this.props;
        let eventValue = {};
        for (let i = 0; i < buffEvent.length; i++) {
            const eventObj = buffEvent[i];
            const {type, method, bindedComponents} = eventObj;
            if (type === 'click') {
                eventValue = {
                    onClick: (data) => {
                        method && method({...data}, bindedComponents)
                    }
                }
            }
        }
        this.setState({
            handlers: Object.assign({}, eventValue)
        })

    }

    handleChange = (value) => {

        this.state.handlers.onClick && this.state.handlers.onClick({value});
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
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

    clickFunc=()=>{
        let {hotData}=this.state;
        if(JSON.stringify(hotData) !== "{}"){

            this.state.handlers.onClick && this.state.handlers.onClick({type:'select_dz',...hotData});
        }

    }
    onChange = (value) => {
        let {data} = this.state;
        let obj = data.find(u=>u.wg === value);
        this.setState({
            hotData:{...obj}
        })
    };

    onSearch = (value) => {
        console.log('search:', value);
    };
    // option.children.toLowerCase().includes(input.toLowerCase())
// (input, option) =>
    filterOption = (input, option) => {

        return option.props.children.includes(input)
    }
    notFoundContent = ()=>{
        return ''
    }
    render() {
        let {data = []} = this.state;

        return (
            <>
                <div ref={node => this.node = node}  className={styles.box}>
                    <div className={styles.inputs} id='select_map_li'>
                        <Select

                            style={{width: 230, height: 32}}
                            showSearch
                            bordered={false}
                            placeholder="请选择党支部"
                            optionFilterProp="children"
                            notFoundContent={this.notFoundContent}
                            onChange={this.onChange}
                            onSearch={this.onSearch}
                            filterOption={this.filterOption}
                            getPopupContainer={trigger => trigger.parentNode}
                        >
                            {data.map((u,i) => {
                                return <Option key={i} title={u.wg} value={u.wg}>{u.wg}</Option>
                            })}

                        </Select>
                    </div>
                    <div className={styles.btns} onClick={this.clickFunc}></div>
                </div>

            </>
        )
    }

}

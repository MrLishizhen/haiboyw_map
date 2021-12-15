import React from 'react'
import { Menu, Dropdown, Select } from 'antd';
import _ from 'lodash'
import styles from './index.less'
import Pagination from './Pagination'
import FuckPagination from './FuckPagination'
const { Option } = Select;

// 分类
class Category extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            type: '全部',
            pageSize: 8,
            current: 1,
            total: 8,
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

        this.initData()
    }

    componentDidUpdate(prevprops) {
        if (!_.isEqual(prevprops, this.props)) {
            this.initData()
        }
    }

    getMenu = () => {
        const { dataProvider = [] } = this.props
        const isdataProvider = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        let selectTotal = 0;
        if (isdataProvider) {
            dataProvider.forEach(element => {
                selectTotal += Number(element.cnt)
            });
        }
        return { isdataProvider, selectTotal, dataProvider }
    }

    // 以后的初始化数据
    initData = () => {
        const { style = {} } = this.props
        const { selectTotal: total } = this.getMenu()
        const isStyle = style && Object.keys(style).length != 0

        if (isStyle) {
            this.setState({
                current: 1,
                pageSize: style.pageSize
            })
        }

        this.setState({
            current: 1,
            total
        })
    }

    onChange = (pageType, page) => {
        const { onChangeVideoLists, onFuckChangeVideoLists, node } = this.props
        let current = 1;
        if (pageType === 'prev') {
            current = page - 1
            this.setState({ current })
        }

        if (pageType === 'next') {
            current = page + 1
            this.setState({ current })
        }

        if (node) {
            onFuckChangeVideoLists(current)
        } else {
            onChangeVideoLists(current)
        }

        const { handlers, pageSize, type } = this.state
        handlers && handlers.onClick && handlers.onClick({
            type,
            pageSize,
            offset: Number((current - 1) * pageSize)
        })
    }

    handleChange = (value) => {
        const data = JSON.parse(value)
        this.setState({
            type: data.type,
            current: 1,
            total: Number(data.cnt)
        })
        const { handlers, pageSize } = this.state
        handlers && handlers.onClick && handlers.onClick({
            type: data.type,
            pageSize,
            offset: 0
        })
    }

    render() {
        const { node } = this.props
        const { pageSize, current, total } = this.state
        const { isdataProvider, selectTotal, dataProvider } = this.getMenu()
        const VideosTotal = node ? node.deviceCount : selectTotal
        return (
            <div
                className={styles.category_box}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}
            >
                <Dropdown
                    overlay={
                        !node ? (
                            <Pagination
                                onChange={this.onChange}
                                pageSize={pageSize}
                                current={current}
                                total={total}
                            />) : (
                                <FuckPagination
                                    onChange={this.onChange}
                                    pageSize={pageSize}
                                    current={current}
                                    total={total}
                                />
                            )
                    }
                    placement='bottomCenter'
                >
                    <Select
                        showArrow={false}
                        placeholder={`全部视频(${VideosTotal})`}
                        onChange={this.handleChange}
                        dropdownClassName={styles.dropdown_select}
                    >
                        <Option className={styles.select_option} value={JSON.stringify({ type: '全部', cnt: VideosTotal })}>{`全部视频(${VideosTotal})`}</Option>
                        {
                            isdataProvider && dataProvider.map(item => {
                                return (
                                    <Option
                                        className={styles.select_option}
                                        value={JSON.stringify(item)}
                                        key={item.cnt}
                                    >{`${item.type}(${item.cnt})`}</Option>
                                )
                            })
                        }
                    </Select>
                </Dropdown>
            </div>
        )
    }
}

export default Category
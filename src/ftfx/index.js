import React, { PureComponent, Fragment } from 'react';

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const data = this.getDataProvider(this.props);
        this.generateData(data);
    }

    getDataProvider = props => {
        const { dataProvider } = props;

        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    generateData(list) {
        if (list) {
            const headers = [];
            const units = {};

            list.forEach(item => {
                if (typeof item === 'string') {
                    headers.push(item);
                } else {
                    if (units[item['类型']]) {
                        if (units[item['类型']][item['地址']]) {
                            units[item['类型']][item['地址']] = [...units[item['类型']][item['地址']], item];
                        } else {
                            units[item['类型']] = { [item['地址']]: [item] };
                        }
                    } else {
                        units[item['类型']] = { [item['地址']]: [item] };
                    }
                }
            });

            this.setState({ headers, units });
        }
    }

    generateTotal(units, field) {
        let result = 0;

        Object.keys(units).forEach(key => {
            Object.keys(units[key]).forEach(name => {
                const list = units[key][name]
                const data = list.filter(l => l.name === field)[0];

                result += isNaN(data['数量']) ? 0 : parseInt(data['数量']);
            });
        });

        return result;
    }

    render() {
        const { headers = [], units = {} } = this.state;

        return (
            <div>
                <div>
                    <div>总计</div>
                    <table>
                        <thead>
                            <tr>
                                {headers.filter(head => head !== '责任人' && head != '联系方式').map(head => {
                                    return (
                                        <td key={head}>{head}</td>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {headers.filter(head => head !== '责任人' && head != '联系方式').map(head => {
                                    if (head === '堆放点') {
                                        return <td>所有堆放点</td>
                                    } else {
                                        return <td>{this.generateTotal(units, head)}</td>
                                    }
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                {Object.keys(units).map(key => {
                    return (
                        <div key={key}>
                            <div>{key}</div>
                            <table>
                                <thead>
                                    <tr>
                                        {headers.map(head => {
                                            return (
                                                <td key={head}>{head}</td>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(units[key]).map(name => {
                                        const list = units[key][name];

                                        return (
                                            <tr>
                                                {headers.map(head => {
                                                    const data = list.filter(l => l.name === head)[0];

                                                    return <td>{data ? data['数量'] : ''}</td>
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        )
    }
}
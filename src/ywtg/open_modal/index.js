import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                        onClick: (record) => {
                            method && method({ ...record }, bindedComponents)
                        }
                    }
                }
            }

            this.setState({ handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            console.info(this.props.dataProvider, nextProps.dataProvider);
            if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
                const { dataProvider = [] } = nextProps;

                if (dataProvider && dataProvider[0]) {
                    console.info('add');
                    const { handlers } = this.state;

                    handlers && handlers.onClick && handlers.onClick({ ...dataProvider[0] });
                }
            }
        } catch (e) {
            console.error('componentWillReceiveProps', e);
        }
    }

    render() {
        return (
            <div></div>
        );
    }
}
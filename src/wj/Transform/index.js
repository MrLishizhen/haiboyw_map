import React, { Component } from 'react';

export default class Item extends Component {
    render() {
        const { dataProvider = [] } = this.props;
        let string = "";
        console.info(dataProvider);
        dataProvider.forEach(element => {
            const { id, scope } = element;
            if (id && scope) {
                const array = scope.split(',');
                array.forEach(scope => {
                    string += `INSERT INTO WJ_GGCS_SCOPE(户id, 经营范围) VALUES ('${id}', '${scope}');`
                });
            }
        });

        console.info(string);

        return (
            <div>add</div>
        )
    }
}
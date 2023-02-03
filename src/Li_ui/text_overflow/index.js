import React,{Component} from 'react';
import {isEqual} from "lodash";
import styles from './index.less'
export default class Text_overflow extends Component{
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            // data:[{
            //     text:'<p>秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水\n' +
            //         '                    秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水秋水</p>',
            //     textStyle:{fontSize:48,color:'#fff'}
            // }]
            data:dataQuery
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, () => {});
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    render(){
        let {text='',textStyle={}} = (this.state?.data && this.state.data[0]) || {};
        return (
            <div className={styles.text_box}>
                <div className={styles.text_auto} style={{...textStyle}} dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
        )
    }
}

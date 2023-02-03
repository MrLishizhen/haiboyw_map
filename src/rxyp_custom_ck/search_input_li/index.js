import React, {Component} from 'react';
import styles from "./index.less";
import { Input } from 'antd';
const {Search} = Input
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        // const {dataProvider = []} = props;
        // const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            // data: dataQuery,
            inputValue:'',
            handlers:null
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
    onChange(e){
        console.log(e.target.value)
        this.state.handlers.onClick && this.state.handlers.onClick({ value:e.target.value});
    }

    render() {
        return (
            <div className={styles.riqikuang}>
                <Search placeholder="请输入搜索内容" onPressEnter={this.onChange.bind(this)}/>
            </div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',

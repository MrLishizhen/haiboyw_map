import React, {Component} from "react";
import {isEqual} from "lodash";
import styles from './index.less'
import bc from './img/bg.png'
export default class index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;

        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // {name: '市直',id: 1,bc:'http://10.203.2.88:8090/fastdfs/20220322/65ca1423b07e3803eb0afcadf57e338c.png',count:30}, {name: '公共服务', id: 2,bc:'http://10.203.2.88:8090/fastdfs/20220322/a63bf3751fc65dcc99990b1566ea4db8.png',count:20}, {name: '行政', id: 3,bc:'http://10.203.2.88:8090/fastdfs/20220322/38e6f49b6963e9161a8f9d6609f56dc3.png',count:10}, {name: '事业单位', id: 4,bc:'http://10.203.2.88:8090/fastdfs/20220322/6dbedac0561b9ab201ad701f15ff00d6.png',count:15},  {name: '区',id: 11,bc:'http://10.203.2.88:8090/fastdfs/20220322/459a2a2cfe248aa14bce5c105f8cbe1c.png',count:12},
        dataQuery=this.checkArr(dataQuery);
        this.state = {
            data: dataQuery,
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



    componentWillUnmount() {

    }
    checkArr(data){
        const list  = [];
        for(let i = 0;i<data.length;i++){
            if(data[i]){
                list.push(data[i])
            }
        }
        return list;
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                dataQuery=this.checkArr(dataQuery);
                this.setState({
                    data: dataQuery
                }, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    itemLiClick(v) {
        console.log(v);
        this.state.handlers.onClick && this.state.handlers.onClick({...v});
    }

    render() {
        let {data=[]} = this.state;
        let {clickFunc} = this.props
        return (
            <div style={{width:1425,overflow:'auto',margin:'0 auto'}}>
                <div className={styles.wujitixi_box} style={{width:data.length*285}}>
                    {
                        data.map((v,i)=>{
                            return (<div className={styles.wujitixi_item} key={i} onClick={()=>clickFunc(v)} style={{background:`url(${bc}) no-repeat center center/100% 100%`}}>
                                <span style={{color:'#fff',fontSize:'32px',marginTop:162}} title={v.name}>{v.name}</span>
                                {/*<span style={{color:'#fff',fontSize:'32px',marginTop:205}} title={v.name}>{v.name}</span>*/}
                                {/*<span style={{color:'#87B3FF',fontSize:'48px',marginTop:24}}>{v.count}</span>*/}
                            </div>)
                        })
                    }
                </div>
            </div>

        )
    }

}

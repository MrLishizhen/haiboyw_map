import React, {Component} from 'react';
import styles from './index.less'
import {data} from './data'
import {isEqual} from "lodash";


export default class Menu_jcya extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            // data:data,
            hotItem:{},
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
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
    handleChange=(value)=> {

        this.state.handlers.onClick && this.state.handlers.onClick({value});
    }

    childrenTwoDom = (data) => {

        return (
            <ul className={styles.menu_ul} key={new Date().getTime().toString()}>
                {
                    data.map((item) => {
                        return (

                            <li className={styles.menu_li} key={item.id.toString()}  style={{paddingLeft: (item.layer * 4) + 10}}>
                                <div className={styles.menu_item} onClick={() => this.menuOneItem(item.id,item.childrens)}>
                                    {item.childrens ? <i className={item.hot?styles.menu_not_icon:styles.menu_icon}></i> : ''}
                                    <span style={{marginLeft: item.childrens ? '0' : '30px',color:item.isColor?'#5EADFF':''}}>{item.name}</span>
                                </div>
                                {item.childrens&&item.hot  ? this.childrenTwoDom(item.childrens) : ''}
                            </li>

                        )
                    })
                }
            </ul>
        )
    }
    deepClones=(obj)=> {
        //判断是对象还是数组
        var objClone = Array.isArray(obj)?[]:{};
        //判断obj是一个对象
        if(obj && typeof obj ==="object"){
            //遍历obj的key值
            for(let key in obj){
                //确认拿到的不是obj继承来的属性
                if(obj.hasOwnProperty(key)){
                    //如果说obj的属性或者方法也是一个对象的话
                    if(obj[key] && typeof obj[key] === "object"){
                        //调用自身，把key值传进去
                        objClone[key] = this.deepClones(obj[key]);
                    }else{
                        //说明仅仅是个属性
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        //return 拷贝后的对象
        return objClone;
    }

    menuOneItem = (id,children) => {
        event.stopPropagation()
        let {data=[],hotItem={}} = this.state;
        hotItem.isColor=false;

        let datas = this.deepClones(data);
        let obj = datas.find(item => item.id === id);

        if (obj.hot !== undefined) {

            obj.hot = !obj.hot
        }
        obj.isColor=true;

        this.setState({
            data:datas,
            hotItem:obj
        },()=>{
            console.log('我被执行额')
            // if(!is){
            //     console.log(is)
            //     this.handleChange({id})
            // }
        })



    }
    //一级
    childrenOneDom = (data) => {
        return data.map((item, i) => {
            return (<div className={styles.menuOne} key={item.id.toString()}>
                <div className={styles.menuOneItem} onClick={() => this.menuOneItem(item.id,item.childrens)}>
                    <span className={styles.menu_span_name} style={{color:item.isColor?'#5EADFF':''}}>{item.name}</span>
                    <span className={styles.menu_span_count}>{item.count}</span>
                </div>
                {item.childrens&& item.hot  ? this.childrenTwoDom(item.childrens) : ''}
            </div>)
        })
    }


    render() {
        let {data = []} = this.state;
        return (
            <div className={styles.menu_jcya}>
                {
                    this.childrenOneDom(menuArr(data))
                }
            </div>
        )
    }
}

export function menuArr(arr) {
    let array = arr;
    let index = 0;

    // let array =[{"id":1,"name":"文章管理","fid":0,"icon":"el-icon-notebook-1","routerUrl":"","routerName":""},{"id":2,"name":"网站管理","fid":0,"icon":"el-icon-s-tools","routerUrl":"","routerName":""},{"id":3,"name":"用户管理","fid":0,"icon":"el-icon-user-solid","routerUrl":"","routerName":""},{"id":4,"name":"随心贴","fid":1,"icon":"el-icon-first-aid-kit","routerUrl":"/Home/heart","routerName":"heart"},{"id":5,"name":"技术分享","fid":1,"icon":"el-icon-connection","routerUrl":"/Home/share","routerName":"share"},{"id":6,"name":"岁月年华","fid":1,"icon":"el-icon-date","routerUrl":"/Home/years","routerName":"years"},{"id":7,"name":"添加文章","fid":1,"icon":"el-icon-edit","routerUrl":"/Home/addArticle","routerName":"addArticle"},{"id":8,"name":"导航管理","fid":2,"icon":"el-icon-collection","routerUrl":"/Home/navAdministration","routerName":"navAdministration"},{"id":9,"name":"轮播图管理","fid":2,"icon":"el-icon-picture","routerUrl":"/Home/imgAdministration","routerName":"imgAdministration"},{"id":10,"name":"用户列表","fid":3,"icon":"el-icon-document","routerUrl":"/Home/user","routerName":"user"},{"id":11,"name":"后台权限","fid":3,"icon":"el","routerUrl":"/Home/userRole","routerName":"userRole"}]
    function getArrChildren() {
        let topItems = array.filter(item => item.fid === 0);
        //找出了所有的一级属性
        for (let i = 0; i < topItems.length; i++) {
            topItems[i].index = index;
            getItems(topItems[i]);
            index = 0;
        }

        return topItems;

    }

    function getItems(node) {

        let children = array.filter(item => item.fid === node.id);
        if (children.length === 0) return;
        else {
            node.hot ? node.hot = node.hot : node.hot = false;

            node.childrens = [];
            index++;
            children.forEach(item => {

                item.index = index;
                getItems(item, array);
                node.childrens.push(item);
            })
        }

    };

    return getArrChildren();
}
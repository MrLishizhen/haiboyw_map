// 打包名 select_li

import React, {Component} from 'react';

import {isEqual} from "lodash";
import { Cascader } from 'antd';
// import 'antd/dist/antd.less'
// const { Option } = Select;
import styles from './index.less'

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            // data: dataQuery,
            // data:[{"label":"2022",value:'2022',hot:false,fid:0},{fid:0,"label":"2021",value:"2021",hot:true},{fid:0,"label":"2020",value:"2020",hot:false}]
            // data:  [
            //     {
            //         label:'测试123',
            //         value :'测试123',
            //         hot:false,
            //         fid:0,
            //         id:1
            //     },
            //     {
            //         label:'测试1',
            //         value :'测试1',
            //         hot:false,
            //         fid:0,
            //         id:2
            //     },
            //     {
            //         label:'测试2',
            //         value :'测试2',
            //         hot:false,
            //         fid:0,
            //         id:3
            //     },
            //     {
            //         label:'测试4',
            //         value :'测试4',
            //         hot:true,
            //         fid:1,
            //         id:4,
            //     },
            // ],

        }
    }
     menuArr=(arr)=>{
        let array = arr;
        let index = 0;
        // let array =[{"id":1,"name":"文章管理","fid":0,"icon":"el-icon-notebook-1","routerUrl":"","routerName":""},{"id":2,"name":"网站管理","fid":0,"icon":"el-icon-s-tools","routerUrl":"","routerName":""},{"id":3,"name":"用户管理","fid":0,"icon":"el-icon-user-solid","routerUrl":"","routerName":""},{"id":4,"name":"随心贴","fid":1,"icon":"el-icon-first-aid-kit","routerUrl":"/Home/heart","routerName":"heart"},{"id":5,"name":"技术分享","fid":1,"icon":"el-icon-connection","routerUrl":"/Home/share","routerName":"share"},{"id":6,"name":"岁月年华","fid":1,"icon":"el-icon-date","routerUrl":"/Home/years","routerName":"years"},{"id":7,"name":"添加文章","fid":1,"icon":"el-icon-edit","routerUrl":"/Home/addArticle","routerName":"addArticle"},{"id":8,"name":"导航管理","fid":2,"icon":"el-icon-collection","routerUrl":"/Home/navAdministration","routerName":"navAdministration"},{"id":9,"name":"轮播图管理","fid":2,"icon":"el-icon-picture","routerUrl":"/Home/imgAdministration","routerName":"imgAdministration"},{"id":10,"name":"用户列表","fid":3,"icon":"el-icon-document","routerUrl":"/Home/user","routerName":"user"},{"id":11,"name":"后台权限","fid":3,"icon":"el","routerUrl":"/Home/userRole","routerName":"userRole"}]
        function getArrChildren(){
            let topItems = array.filter(item => item.fid === 0);
            //找出了所有的一级属性
            for (let i = 0; i < topItems.length;i++) {
                topItems[i].index = index;
                getItems(topItems[i]);
                index=0;
            }

            return topItems;

        }
        function getItems(node) {

            let children = array.filter(item => item.fid === node.id);
            if (children.length === 0) return;
            else {
                node.children = [];
                index++;
                children.forEach(item => {
                    item.index = index;
                    getItems(item,array);
                    node.children.push(item);
                })
            }

        };
        if(Array.isArray(getArrChildren())&&getArrChildren().length>0){
            return getArrChildren();
        }else{
            return arr;
        }

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
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
                // this.selectHot(dataQuery);
                this.setState({data: dataQuery}, () => {});
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    selectHot = (data)=>{

        if(data.length===0){
            return []
        }
        if(data[0]===''&&data.length===1){

            return [];
        }

        let datas = this.deepClones(data);
        let hot = [];
        let isHot = false;
        let getFs = (fid) => {
            let fiddatas = datas.find(item => item.id === fid);
            hot.push(fiddatas.value);
            if (fiddatas.fid !== 0) {
                getFs(fiddatas.fid);
            }
        }

        for(let i = 0; i<datas.length;i++){
            if(datas[i]?.hot){
                isHot=false;
                if(datas[i].fid===0){
                    //表示他是一级
                    return [datas[i].value];

                }else{
                    hot.push(datas[i].value);
                    datas[i].fid ?  getFs(datas[i].fid) : '';
                }
            }else{

                isHot=true;
            }

        }
        // 全部都没有hot标识
        if(isHot){

            return [datas[0].value];
        }
        return hot
    }

    getFItem = ()=>{

    }
    displayRender=(label)=> {
        return label[label.length - 1];
    }
    render() {
        let {data=[]} = this.state;
        let hot = this.selectHot(data).reverse();
        console.log(hot)
        return (
            <div ref={node => this.node = node} className={styles.box}>
                {
                    Array.isArray(data)&&data.length>0&&data[0]!=''?<Cascader allowClear={false} displayRender={this.displayRender} expandTrigger="hover" options={this.menuArr(data)} key={[...hot]} placeholder={'选择'} defaultValue={[...hot]} style={{ width: 181,height:32,color:'#fff',fontSize:18,fontWeight:600 ,backgroundColor:'rgba(93, 157, 248, 0.3)'}} onChange={this.handleChange}></Cascader>:<Cascader style={{ width: 181,height:32,color:'#fff',fontSize:18,fontWeight:600 ,backgroundColor:'rgba(93, 157, 248, 0.3)'}} placeholder={'选择'}></Cascader>
                }
            </div>
        )
    }

}
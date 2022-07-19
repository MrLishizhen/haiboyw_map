import React, {Component} from 'react';
import Axios from 'axios'
import styles from './index.less'
// import data from './data'
// import {tabledata} from "./tabledata";
import {Tree, Table, message,Pagination} from 'antd';
import { Icon } from 'antd';
import emit from './img/emit.png'
// console.log(data);
// console.log(tabledata.data.rows)
export default class Five_system extends Component {

    state = {
        id:609,
        list: [],
        page: 1,
        count: 10,
        total:0,
        dataSource: [],
        columns: [
            {
                title: '姓名',
                dataIndex: 'nickName',
                key:'nickName',
                align:'center',
                ellipsis:true,
            },
            {
                title: '职务',
                dataIndex: 'post',
                align:'center',
                key:'post',
                ellipsis:true,
                render:function(text){
                    if(text){
                        let data = JSON.parse(text)||''
                        if(Array.isArray(data)){
                            return data.join(',')
                        }
                    }else{
                        return ''
                    }


                }
            },
            {
                title: '电话',
                dataIndex: 'mobile',
                align:'center',
                key:'mobile',
                ellipsis:true,
            },
            // {
            //     title: '操作',
            //     dataIndex: '',
            //     key:'index',
            //     align:'center',
            // }
        ]
    }

    componentDidMount() {

        // let datas = this.menuArr(data);
        // console.log(datas, 123);
        // this.setState({
        //     list: datas
        // })
        this.getToken();


        // Axios.post({'',{},timeout:6000})
    }

    getPost(url, params, headers) {
        return Axios({
            url: url,
            method: 'post',
            headers: headers,
            data: params
        }).then(({data: res}) => {
            if (res && res.code === '0000') {
                return res.data
            } else {
                return []
            }
        });
    }

    componentWillUnmount() {
        let {interval} = this.state;


        // clearInterval(interval)
    }


    menuArr = (arr) => {
        let array = arr;

        let index = 0;

        // let array =[{"id":1,"name":"文章管理","fid":0,"icon":"el-icon-notebook-1","routerUrl":"","routerName":""},{"id":2,"name":"网站管理","fid":0,"icon":"el-icon-s-tools","routerUrl":"","routerName":""},{"id":3,"name":"用户管理","fid":0,"icon":"el-icon-user-solid","routerUrl":"","routerName":""},{"id":4,"name":"随心贴","fid":1,"icon":"el-icon-first-aid-kit","routerUrl":"/Home/heart","routerName":"heart"},{"id":5,"name":"技术分享","fid":1,"icon":"el-icon-connection","routerUrl":"/Home/share","routerName":"share"},{"id":6,"name":"岁月年华","fid":1,"icon":"el-icon-date","routerUrl":"/Home/years","routerName":"years"},{"id":7,"name":"添加文章","fid":1,"icon":"el-icon-edit","routerUrl":"/Home/addArticle","routerName":"addArticle"},{"id":8,"name":"导航管理","fid":2,"icon":"el-icon-collection","routerUrl":"/Home/navAdministration","routerName":"navAdministration"},{"id":9,"name":"轮播图管理","fid":2,"icon":"el-icon-picture","routerUrl":"/Home/imgAdministration","routerName":"imgAdministration"},{"id":10,"name":"用户列表","fid":3,"icon":"el-icon-document","routerUrl":"/Home/user","routerName":"user"},{"id":11,"name":"后台权限","fid":3,"icon":"el","routerUrl":"/Home/userRole","routerName":"userRole"}]
        function getArrChildren() {
            let topItems = array.filter(item => (item.pid === 605 && item.name !== '技术支持'));
            topItems.sort((a,b)=>b.seq-a.seq);
            //找出了所有的一级属性
            for (let i = 0; i < topItems.length; i++) {
                topItems[i].title = topItems[i].name;
                topItems[i].key = topItems[i].id;
                topItems[i].index = index;
                getItems(topItems[i]);
                index = 0;
            }

            return topItems;

        }

        function getItems(node) {

            node.title = node.name;
            node.key = node.id;
            let children = array.filter(item => item.pid === node.id);
            children.sort((a,b)=>b.seq-a.seq)
            if (children.length === 0) return;
            else {
                node.children = [];
                index++;

                children.forEach(item => {

                    item.index = index;
                    getItems(item, array);
                    node.children.push(item);
                })
            }

        };
        if (Array.isArray(getArrChildren()) && getArrChildren().length > 0) {
            return getArrChildren();
        } else {
            return arr;
        }

    }

    getToken() {
        const params = {
            'loginType': 'sso',
            'password': '',
            'userKey': '',
            'username': 'visData'
        }
        Axios.post(
            'http://10.203.4.224:9527/userOrg/api/org/login', params)
            .then(({data: res}) => {
                if (res && res.code === '0000') {
                    this.token = res.data.token;
                    this.setState({
                        token: res.data.token,
                    })


                    let params = {"mapVo": {"page": 1, "size": 1000000}};
                    this.getPost('http://10.203.4.224:88/userOrg/api/org/group/page', params, {token: this.token}).then(res => {



                        this.setState({
                            list: this.menuArr(res?.rows||[]),
                        },function(){
                            this.getRenData(609);
                        })
                    })
                }
            });
    }

    createTitle() {


    }

    getRenData = (id) => {
        let _that = this;
        let {page = 1, count = 10} = this.state;
        let params = {"mapVo": {"groupId": id, "page": page, "size": count}};
        Axios.post('http://10.203.4.224:9527/userOrg/api/org/user/page', {...params}, {headers: {token: this.token}}).then(({data: res}) => {

            if (res && res.code === '0000') {
                _that.setState({
                    dataSource: res?.data.rows||[],
                    total:res.data.total||0,
                })
            } else {

                message.error('数据请求错误');

            }
        })
    }
    onSelect=(selectedKeys)=>{
        if(selectedKeys[0]){
            this.setState({
                id:selectedKeys[0],
                page:1,
                total:0,
            },function(){
                this.getRenData(selectedKeys[0])
            })
        }else{
            this.setState({
                id:0,
                page:1,
                total:0,
                dataSource:[]
            })
        }



    }
    onChange=(page,pageSize)=>{
        this.setState({
            page:page
        },function(){
            let id = this.state.id;
            this.getRenData(id)
        })
    }
    render() {
        let {list=[], columns,dataSource=[],page=1,count=10,total=0} = this.state;
        return (
            <div className={styles.com_box}>
                <div className={styles.com_left}>

                    {
                        list.length>0?<Tree
                            onSelect={this.onSelect}
                            style={{color: '#fff',fontSize:18}}
                            className={styles.com_tree}
                            blockNode={true}
                            treeData={list}
                            defaultExpandedKeys={['11397']}
                            defaultSelectedKeys={['609']}
                        >

                        </Tree>:<Icon type="loading" style={{color:'#fff',fontSize:'28px'}}/>
                    }
                </div>

                <div className={styles.com_right}>
                    <div className={styles.table_box}>
                        {/*scroll={{y:660}}*/}
                        {
                            dataSource.length!==0? <Table columns={columns} dataSource={dataSource}  pagination={false}>

                            </Table>:<div className={styles.emit}><span className={styles.emit_img} style={{'background':`url(${emit}) no-repeat center center/100%`}}></span><span>无人员信息</span></div>
                        }

                    </div>
                    <div className={styles.pagin}>
                        {
                            total>0?<Pagination defaultCurrent={page} total={total} onChange={this.onChange}></Pagination>:''
                        }
                    </div>
                </div>
            </div>
        )
    }
}
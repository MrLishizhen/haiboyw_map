import React, {Component} from 'react';
import Axios from 'axios';
export default class TheFlow extends Component {

    componentDidMount() {

    }

    clickfunc(){
        // window.open('http://219.138.108.99:20039/','newOpen')
        let params = {
            username: 'admin',
            password: 'YWRtaW4='
        }
        Func('http://219.138.108.99:20039/login', params, '_blank');

        function Func(url, data, name){
            // // 创建 form 表单
            // let tempForm = document.createElement('form');
            // tempForm.id = 'tempForm';
            // tempForm.action = url;
            // tempForm.method = 'post';
            // // tempForm.enctype = 'multipart/form-data';
            // tempForm.target = name;
            //
            // // 创建 用户名输入框
            // let userName = document.createElement('input');
            // userName.type = 'hidden';
            // userName.name = 'userName';
            // userName.value = data.username;
            //
            // // 创建 密码输入框
            // let passWord = document.createElement('input');
            // passWord.type = 'hidden';
            // passWord.name = 'passWord';
            // passWord.value = data.password;
            //
            // // 将用户名和密码输入框插入 form 表单
            // tempForm.appendChild(userName);
            // tempForm.appendChild(passWord);
            // // 将 form 表单插入 body


            let tempForm = document.createElement('iframe')
            console.log(tempForm)
            tempForm.id = 'tempForm';
            tempForm.src=url


            document.body.appendChild(tempForm);
            setTimeout(()=>{
                let iframe = document.getElementById('tempForm').contentDocument;
                console.log(iframe)
            },1000)
            // console.log(document.getElementById('tempForm'));


            // // 增加提交监听 处理浏览器的兼容性
            // if (window.attachEvent) {
            //     tempForm.attachEvent('onsubmit', () => { window.open('http://219.138.108.99:20039/realTimeRemoting', name); });
            // } else if (window.addEventListener) {
            //     tempForm.addEventListener('onsubmit', () => { window.open('http://219.138.108.99:20039/realTimeRemoting', name); });
            // }
            //
            // // 触发监听 处理浏览器的兼容性
            // if(tempForm.fireEvent){
            //     tempForm.fireEvent('onsubmit');
            // }else{
            //     let evt = document.createEvent('HTMLEvents');
            //     evt.initEvent('onsubmit', true, true);
            //     tempForm.dispatchEvent(evt);
            // }
            //
            // // form 表单提交事件
            // tempForm.submit();
            // 从 body 中移除 form 表单
            // document.body.removeChild(tempForm);
        }
    }

    render() {
        return (
            <div onClick={this.clickfunc} >点击跳转</div>
        )

    }
}

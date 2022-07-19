import React, { Component } from 'react';
import nameBg from './assets/namebg.png';
import iphoneBg from './assets/iphone.png';
import jiedaobg from './assets/jiedaobg.png';
import defaultimg from './assets/defaultimg.png';
import { groupBy } from 'lodash';
import { getDataProvider } from '../../../utils/DataUtils';

// xiangyang_zhiban_jiedao

const LeaderBlock = props => {
  const {
    url = defaultimg,
    type = '',
    name = '',
    job = '',
    phone = ''
  } = props;
  return (
    <div style = {{width: 310, height: 174, display: 'flex'}}>
      <img style = {{width: 130, height: 173}} src = {url}></img>
      {/* <div style = {{width: 130, height: 173}}></div> */}
      <div style = {{flex: 1, display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center'}}>
        <div style = {{fontSize: 24, color: '#66C1FF', textAlign: 'center', marginTop: 2}}>{type}</div>
        <div style = {{background: `url(${nameBg}) no-repeat`,backgroundSize: '100% 100%', width: 156, height: 45, textAlign: 'center', lineHeight: '45px', color: 'white', fontSize: 24, marginTop: 5}}>
         {name}
        </div>
        <div style = {{fontSize: 15, color: '#A4D7FF', textAlign: 'center', height: 62, padding: '0px 20px', display: 'flex', alignItems: 'center'}}>{job}</div> 
        <div style = {{display: 'flex', alignItems: 'center'}}>
          <div style = {{background: `url(${iphoneBg}) no-repeat`, backgroundSize: '100% 100%',width: 22, height: 22, cursor: 'pointer'}}></div>
          <div style = {{fontSize: 20, color: 'white', marginLeft: 2}}>{phone}</div>
        </div>
      </div>
    </div>
  )
}

const LeaderItem = props => {
  const {
    top = 0,
    name = '',
    info = []
  } = props;

  const type1 = '带班领导', type2 = '街道值班', type3 = '中队值班';

  const lingdao = info.find(o => o.zbzw === type1) || {};
  const zhihui = info.find(o => o.zbzw === type2) || {};
  const zhiban = info.find(o => o.zbzw === type3) || {};

  return (
    <div style = {{marginTop: top}}>
      <div style = {{background: `url(${jiedaobg}) no-repeat`,backgroundSize: '100% 100%', width: 1065, height: 46, color: 'white', fontSize: 24, position: 'relative', marginTop: 10}}>
        <div style = {{display: 'block', position: 'absolute', top: -10, left: 30}}>{name}</div>
      </div>
      <div style = {{display: "flex", width: 1065, justifyContent: 'space-around', marginTop: 40}}>
        <LeaderBlock type = {type1} url = {lingdao.imgurl} name = {lingdao.zbxm} job = {lingdao.post} phone = {lingdao.phone}/>
        <LeaderBlock type = {type2} url = {zhihui.imgurl} name = {zhihui.zbxm} job = {zhihui.post} phone = {zhihui.phone}/>
        <LeaderBlock type = {type3} url = {zhiban.imgurl} name = {zhiban.zbxm} job = {zhiban.post} phone = {zhiban.phone}/>
      </div>
    </div>
  )
}


export default class index extends Component {


  render() {
    // const datalist = ["柿铺街道&定中门街道&王寨街道&中原街道&米公街道&清河口街道&汉江街道&屏襄门街道&太平店镇&牛首镇", {
    //   zbzw: "带班领导",
    //   zbxm: "3333",
    //   post: "檀溪街道办事处二级主任科员",
    //   phone: "15997231333",
    //   zbqy: "定中门街道",
    //   imgurl: "http://10.1.17.21:8090/group1/M00/00/80/CssCWGGbYJqAV33xAEypwjmGD2I794.jpg"
    // },{
    //   zbzw: "带班领导",
    //   zbxm: "1111",
    //   post: "檀溪街道办事处二级主任科员",
    //   phone: "15997231333",
    //   zbqy: "柿铺街道",
    //   imgurl: "http://10.1.17.21:8090/group1/M00/00/80/CssCWGGbYJqAV33xAEypwjmGD2I794.jpg"
    // },{
    //   zbzw: "街道值班",
    //   zbxm: "张飒",
    //   post: "檀溪街道办事处二级主任科员",
    //   phone: "15997231333",
    //   zbqy: "柿铺街道",
    //   imgurl: "http://10.203.2.88:8888/group1/M00/00/80/CssCWGGbYJqAV33xAEypwjmGD2I794.jpg"
    // },{
    //   zbzw: "中队值班",
    //   zbxm: "李大龙",
    //   post: "檀溪街道办事处二级主任科员",
    //   phone: "15997231333",
    //   zbqy: "定中门街道",
    //   imgurl: "http://10.203.2.88:8888/group1/M00/00/80/CssCWGGbYJqAV33xAEypwjmGD2I794.jpg"
    // }]


    const datalist = getDataProvider(this.props);

    const names = datalist[0] && typeof datalist[0] === 'string'? datalist[0].split('&'): []
    const jiedaoinfo = datalist.slice(1, datalist.length) || [];
    const chunkList = groupBy(jiedaoinfo, 'zbqy')
    const newList = names && Array.isArray(names) && names.map(el => {
      return {
        name: el,
        info: chunkList[el] || []
      }
    })
    return (
      <div style = {{width: '100%', height: 741, overflowY: 'scroll', overflowX: 'hidden'}}>
        {
          newList && Array.isArray(newList) && newList.map((el, i) => {
            const top = i === 0? 0: 60;
            return <LeaderItem {...el} key = {i} top = {top}/>
          })
        } 
      </div>
    )
  }
}

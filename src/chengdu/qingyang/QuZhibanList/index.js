import React, { Component } from 'react';
import nameBg from './assets/namebg.png';
import iphoneBg from './assets/iphone.png';
import defaultimg from './assets/defaultimg.png';
import { getDataProvider } from '../../../utils/DataUtils';

// _chengdu_qingyang_quzhiban

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
      <img style = {{width: 130, height: 173}} src = {!url? defaultimg: url}></img>
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
    data = []
  } = props;

  return (
    <div style = {{display: "flex", height: '100%', justifyContent: 'space-between', flexDirection: 'column'}}>
        {
          data && Array.isArray(data) && data.map((el, i) => {
            const {
              name = '',
              post = '',
              phone = '',
              imgurl = ''
            } = el;
            return  <LeaderBlock key = {i}  url = {imgurl} name = {name} job = {post} phone = {phone}/>
          })
        }
      </div>
  )
}


export default class index extends Component {


  render() {
    // const datalist = [
    // {
    //   name: "3333",
    //   post: "檀溪街道办事处二级主任科员",
    //   phone: "15997231333",
    //   imgurl: "http://10.1.17.21:8090/group1/M00/00/80/CssCWGGbYJqAV33xAEypwjmGD2I794.jpg"
    // },{
    //   name: "1111",
    //   post: "檀溪街道办事处二级主任科员",
    //   phone: "15997231333",
    //   imgurl: "http://10.1.17.21:8090/group1/M00/00/80/CssCWGGbYJqAV33xAEypwjmGD2I794.jpg"
    // },{
    //   name: "张飒",
    //   post: "檀溪街道办事处二级主任科员",
    //   phone: "15997231333",
    //   imgurl: "http://10.203.2.88:8888/group1/M00/00/80/CssCWGGbYJqAV33xAEypwjmGD2I794.jpg"
    // }]


    const datalist = getDataProvider(this.props);

    return (
      <div style = {{width: '100%', height: '100%'}}>
        {
         <LeaderItem  data = {datalist}/>
        } 
      </div>
    )
  }
}

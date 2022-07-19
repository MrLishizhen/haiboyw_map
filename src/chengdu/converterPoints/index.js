import React, { Component } from 'react'
import xuexiao from './school.json';

export default class index extends Component {


  fetchResult(addr) {
    return new Promise((resolve, reject) => {
      let newOption =   {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token:'7YhXk_h6JhqT9hfyvyLhXOhj_vt3zKjAukOcwkyKtrq9tuD1IUhIHDTz_tAqS-hu4EUDsUyRgwfZpKb8y8EvpSWUahgZagkn55_80v0UpNJ3v2k7EVIA-a2ZpkH3sQsZUTEb5WOTocgbf98UIDvjz0iC_4z6QMtA84BeJZS6Cls5CP4GhFXHB7xPJJsCaPFC'
        },
        body: JSON.stringify({"address": addr,"page":"1","limit":"1"})
      };

      fetch('https://gisserver.chengdumap.cn/CDServer/rest/services/GeocodeKeyWord/Transferx', {
        ...newOption
      }).then(function(res) {
        if (res.status === 200) {
          resolve(res.json())
        } else {
          resolve({result: void 0}) 
        }
      }).catch(error => { 
        reject(new Error('Could not load data'))
      })
    })
  }

  componentDidMount() {
    let pr = [], d  = [];
    console.log("xuexiao.records: ", xuexiao.records)
    // xuexiao.records.length = 1;
    xuexiao.records.forEach((el) => {
      let p = this.fetchResult(el.A008)
        .then(dataObj => {
          if (dataObj) {
            const {data = {}} = dataObj;
            const {rows = []} = data;
            const dd = rows[0] || {};
            d.push({
              xxqc: "",
              xxxxdz: "",
              jd: dd.lng,
              wd: dd.lat,
              fzrxm: "",
              fzrlxfs: "",
              dzs: el.A008,
              dzx: "",
              nc: el.A003,
              sz1:el.A004,
              sz2:el.A005,
              sz3:el.A006,
              sz4:el.A007

            })
          }
        })
        .catch(err => console.log(err))
      pr.push(p);
    })

    Promise.all(pr)
      .then(() => {
        console.log("d", JSON.stringify(d))
    });
  }

  render() {
    return (
      <div>index</div>
    )
  }
}

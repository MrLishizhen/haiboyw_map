import React, { Component } from 'react'
import {getDataProvider} from '../../utils/DataUtils';


//_chengdu_check_url

export default class index extends Component {

  getQueryVariable(variable, address) {
    try {
      const addr = decodeURIComponent(address? address: window.location.href);        
      let query = addr.substr(addr.indexOf('?') + 1)
      if (query) {
        const vars = decodeURIComponent(query).split('&');
        for (let i = 0; i < vars.length; i++) {
          const pair = vars[i].split('=');
          if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
      }
    } catch (e) {
      console.error(e)
    }
  }

  handleClick = evt => {
    const dataProvider = getDataProvider(this.props);
    let url = dataProvider[0];
    if (!url || typeof url !== 'string') return;
    const extraParams = this.token && this.userId? `accessToken=${this.token}&userId=${this.userId}`: '';
    let newUlr = url;
    if ( url.indexOf('?') >= 0 ) {
      newUlr = extraParams? url + `&` + extraParams: url;
    } else {
      newUlr = extraParams? url + "?" + extraParams: url;
    }
    window.open(newUlr);
}

  componentDidMount() {
    const urls =  window.location.href;
    const vars = urls.split('redirectUrl');
    const redirectUrl = (vars[1] || '').replace('=', '');

    this.token = this.getQueryVariable('accessToken', redirectUrl);
    this.userId = this.getQueryVariable('userId', redirectUrl);
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%', color: 'white', cursor: 'pointer'}} onClick = {this.handleClick}></div>
    )
  }
}

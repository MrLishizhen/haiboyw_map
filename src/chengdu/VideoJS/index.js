import { stubFalse } from 'lodash';
import React, { Component } from 'react';
import { getDataProvider } from '../../utils/DataUtils'; 
import styles from './style.css';

// _cd_video_play

const shuaxin = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABFhJREFUaEPtmV3IpVMUx39/5eNuEqIwkm8ywoXxGVFqFC4wjeZilBn5iMIUpcxcoIQRxveFGaSGOzO5IUIYoVC+ZmJEIZnkxoWPv5b2c+x3v885zznPOe/zztHs2j2n5+y11v+/195rP2ttMeVNU46f3QQqD9o+CLgUOBFYmPW/gG3A9tTj9weSvpqE98fygO2DgUuAC4GLRwT0FrAR2CzpxxFle8NbEbB9HLACuAo4oK3xJPcnsAl4StIbo+oamYDtxxL4fQYYy5fLHsCxqYfHBrW7JN0xComRCNh+Ezi7xkAAfiW6pHjWNtuHACcBS1Pfq2bgVuAsSeGZxjY0Ads7gMMKjR8CTyb3u9FaNsD20RmRE2pkT5f0XpPOoQjY/htmhdxr2gAvAdkODOuAm2rALpD0W/7e9p2S1lbvGgnY3gIsKZQvlRQbb2LN9jLgGSBfVp9LOr4yEuCBNZJ6uAcSsH0vsLpAuVDSdxNDXiiy/TZwZvb6aUkrK/DxfigCtq8D1hf6D5X0/VyBz2Y6zoUDMztrYuZ7y6bJA7Yjtr8DHJkpuULSi3MNPvTbPhn4qJ+tRg/Yvhu4PVOwXtINXYDPvLAyRbhZZgcSSOxj9quDKtx5hqRvOibw74ats9lEoBRcLem+XQV84ya2HYfHaQnwDkmH70rgBxKwHWC/zgBvkBQfbZ20PFQOMth3CdmOjfrwPEWeWLqNB2vywH8hNWdq+1Hg2rp424kLWhiZwdj2ZuCipGenpP1a6OxUpCTwSUoJA8R2SUd1iqaFsZLAr8CCpGerpMUtdHYq8r8jMPVLaOo38dSH0euBR7JduGRQkt7pbu1jrNzEUVH7Nhv7kKS6XLVT7OkTIzKxXi7cO2xLJLZfB85N77dJiurBvDXbkXtfngBEPjyDxKxvD9uRyERCU7VbJd0/HwxsXx2Vj8z2WkkzcoQ6AqekdHLvJPhDSmiiLtRZS8XiSPCPyIxeIOm1HETt15/te4DbsoHzkVI+WNSK1km6uZzBfgQiqX+3YH+LpAe6cIHt84FXM1tfRklT0s9DEYhBfcoqiyR9OpckUk7+AnBMZmeFpA11dpsKW88CyzPBqH/uL2nnXJCwfQ7wPBBF4KptkhTF4NrWmAHZ/hhYVJBYLOn9SZKwHeXL54B9M73xbbZM0metCaTlVFd5XiUpD3Gt+diOGlB8AeR10diDV0oaGP0aPVChqvFE/BXl9SfaErG9Coh+asE+NvByST81zcrQBJIn8lMx1x2zFNdDWyS91M+o7ZjhyPKieFsHPERfTuBnlNXHWkK5sO3H0xVTddCVumO5VVdM8YxJCtBRsom+Zx8wvwMRaW6U9EfTzFf/j+SBbDlFzT7qRdHHveSLancA39jm6rUVgYxIhLvL0hXrecPOWhoX0S2uWaN49suIsr3hYxEollaQiYvu8E58lsd9WjxjOcRJWvUvqt+SRrpXqyM5MQJtZ3Bcud0Exp3BceX/Ab+Mf0CCWR7NAAAAAElFTkSuQmCC';
const quanping = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAjZJREFUaEPtWrFOG0EQfS+/gkSR0EGLwKkpoKGghQYJFEQ+APMDFggEDbQUdEjUgIRERZEiobCUIrU7fuBFY91ZZ4P3Vne75pzsSS7sm519b2Z3dmfGxJQ/nHL8GCIg6TOAbQBzDSX2E8A5yZcc34BABv4awJeGgs9h/QKwnpMoErgAsNlw8Dm8S5Jb9qVI4B7AcibxtaFE7jJcDyRbLgItkg9NIiHJjGtGticRmLhzanlA0gEA+4x7egAWSXZ9mEmycGghe9xzQ3Kt+LIuAXkAG6xLl2xmjLaHvqF9GJvAHwCrJH94AIMkCxBLJbLRCHwanZikj4eGhkl67xpjYTIP5XEIkIx2f5JUPIsSgcFBJmmwRJIHHDs35hKyG6DF7ReS0W6rko4AfOvfcUb2Wq0wagoltUn6xG+fSDpWRtIGgFuSr8EOslqIAg2u7YFAOCqrSQQqmy7QwOSBQIasrCZ5oLLpAg1MHghkyMpq/m8PFJL6Q5KHlc1YMlDSLIBHAE/RkvqUD3xQPpAyMp99EzMj+3c8AOC9rKxH8szHyll2Z0WtvP5THGa/xa0LOUB+J9kpIyFpHsBzmRyAoHWhPKl3zXtMcq8M2MiJOlY8SlLvANcleVUGPn8vaQHAikO+k5L6qW8xWSnId0lMSM6Kys4e2QmAnQmBqTvNKcldU1Jss1rJ0BrdrtZP3YlDjLcuvTW6LTK++auBkdgHMBNipgg6fgOwCNUH/4ZAhAmjq4zWbYmOPJvgL/+WVk+jHD7aAAAAAElFTkSuQmCC';

export default class index extends Component {

  constructor(props) {
    super(props);
    this.iframeRef = React.createRef();
  }

  state = {
    showToolBar: false,
    iframeKey: 0,
    handlers: {}
  }

  componentDidMount() {
    let eventValue = {};

    const { buffEvent = [{type: 'click'}] } = this.props;
    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (url) => {
            method && method(url, bindedComponents)
          }
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue)
    });
  }

  render() {
    const url = getDataProvider(this.props)[0] || '';
    return (
      <div className={styles['video-root']} style={{ width: '100%', height: '100%', position: 'relative' }}
      onMouseEnter = {() => {
        // console.log("onMouseEnter")
        // this.setState({showToolBar: true})
      }}
      onMouseLeave = {() => {
        // this.setState({showToolBar: false})
      }}>
        <iframe src={url}
          width="100%"
          height="100%"
          frameBorder="0"
          position="relative"
          key = {this.state.iframeKey}
        />
        <div>
        <div className={styles['video-toolbar']} style={{
            position: 'absolute', 
            width: '100%', 
            height: 40, 
            background: '#000000', 
            bottom: 0, 
            // display: 'flex', 
            flexDirection: 'row-reverse',
            alignItems: 'center'}}>
            <div style={{width: 30, height: 30, background: `url(${quanping}) 100% 100%`, backgroundSize: 'cover', marginRight: 10, cursor: 'pointer'}}
              onClick = {() => {
                this.state.handlers.onClick && this.state.handlers.onClick(url);
              }}
              ></div>
            <div style={{width: 30, height: 30, background: `url(${shuaxin}) 100% 100%`, backgroundSize: 'cover', cursor: 'pointer', marginRight: 10}}
            onClick = {() => {
              this.setState({iframeKey: this.state.iframeKey + 1})
            }}></div>
          </div>
         
        </div>
      </div>
    )
  }
}

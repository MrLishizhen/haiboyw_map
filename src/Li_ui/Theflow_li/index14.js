import React, {Component} from 'react';

import styles from './index14.less'

export default class TheFlow extends Component {

    componentDidMount() {

    }
    // <!-- xmlns:xlink="https://www.w3.org/1999/xlink" -->
    // <!-- xmlns="https://www.w3.org/2000/svg" -->
    //<!-- <svg version="1.2" height="148" width="1450" viewport="0 0 1450 1450"> -->

    // <!-- <path id="pulsarRight" stroke="url(#grad1)" fill="none" stroke-width="7" stroke-linejoin="round"
    //                      d="M725,118 L725,118 L660,118 L640,145 L358,145 L335,110 L75,110 L10,5" />
    //                  <path id="pulsarLeft" stroke="url(#grad2)" fill="none" stroke-width="7" stroke-linejoin="round"
    //                      d="M725,118 L725,118 L790,118 L810,145 L1090,145 L1115,110 L1375,110 L1440,5" /> -->
    render() {
        return (
            <div className='loading'>
                <svg version="1.2" height="148" width="1450" viewport="0 0 1450 1450">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{'stop-color':'#fff','stop-opacity':1}}/>
                            <stop offset="40%" style={{'stop-color':'#fff','stop-opacity':0.5}}/>
                            <stop offset="100%" style={{'stop-color':'#fff','stop-opacity':0}}/>
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="grad2">
                            <stop offset="0%" style={{'stop-color':'#fff','stop-opacity':0}}/>
                            <stop offset="40%" style={{'stop-color':'#fff','stop-opacity':0.5}}/>
                            <stop offset="100%" style={{'stop-color':'#fff','stop-opacity':1}}/>
                        </linearGradient>
                    </defs>
                    <path id="pulsarRight" stroke="url(#grad1)" fill="none" stroke-width="4" stroke-linejoin="round"
                          d="M725,118 L725,118 L660,118 L640,145 L358,145 L335,110 L75,110 L10,5" />
                    <path id="pulsarLeft" stroke="url(#grad2)" fill="none" stroke-width="4" stroke-linejoin="round"
                          d="M725,118 L725,118 L790,118 L810,145 L1090,145 L1115,110 L1375,110 L1440,5" />
                </svg>
            </div>
        )

    }
}
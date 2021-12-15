import React, {Component} from 'react';

import styles from './index29.less'

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
                <svg version="1.2" height="296" width="2900" preserveAspectRatio="none meet" viewport="0 0 2900 2900">
                    <defs>
                        <path id="border1" d="M1450,262 L1450,262 L1331,262 L1304,290 L787,290 L744,252 L271,253 L20,10"
                              fill="transparent"></path>
                        <radialGradient id="borderGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
                            <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
                        </radialGradient>
                        <mask id="borderMask">
                            <circle cx="0" cy="0" r="300" fill="url(#borderGradient)">
                                <animateMotion dur="3s" path="M1450,262 L1450,262 L1331,262 L1304,290 L787,290 L744,252 L271,253 L20,10"
                                               rotate="auto" repeatCount="indefinite"></animateMotion>
                            </circle>
                        </mask>
                    </defs>

                    <use stroke-width="10" xlinkHref="#border1" mask="url(#borderMask)" stroke="#fff">
                        <animate attributeName="stroke-dasharray" from="0, 1830" to="1830, 0" dur="3s"
                                 repeatCount="indefinite"></animate>
                    </use>


                    <defs>
                        <path id="border2" d="M1450,262 L1450,262 L1571,262 L1599,290 L2115,290 L2156,252 L2630,253 L2885,10"
                              fill="transparent"></path>
                        <radialGradient id="borderGradientRight" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
                            <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
                        </radialGradient>
                        <mask id="borderMaskRight">
                            <circle cx="0" cy="0" r="300" fill="url(#borderGradientRight)">
                                <animateMotion dur="3s" path="M1450,262 L1450,262 L1571,262 L1599,290 L2115,290 L2156,252 L2630,253 L2885,10"
                                               rotate="auto" repeatCount="indefinite"></animateMotion>
                            </circle>
                        </mask>
                    </defs>
                    <use stroke-width="10" xlinkHref="#border2" mask="url(#borderMaskRight)" stroke="#fff">
                        <animate attributeName="stroke-dasharray" from=" 0,1830" to="1830, 0" dur="3s"
                                 repeatCount="indefinite"></animate>
                    </use>
                </svg>
            </div>
        )

    }
}
import React, {Component} from 'react';
import './index.less'
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
            <div className={'loading'}>
                <svg height="84" width="7708" viewport="0 0 7708 7708">
                    <defs>

                        <path id="border1" d="M2390,4 L2390,4 L2200,9 L2100,10 L2000,10 L1800,10 L1600,10 L1400,10 L1200,10 L1000,10 L800,10 L600,10 L400,10 L200,10 L0,10"
                              fill="transparent"></path>
                        <radialGradient id="borderGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
                            <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
                        </radialGradient>
                        <mask id="borderMask">
                            <circle cx="0" cy="0" r="300" fill="url(#borderGradient)">
                                <animateMotion dur="3s"
                                               path="M2390,4 L2390,4 L2200,9 L2100,10 L2000,10 L1800,10 L1600,10 L1400,10 L1200,10 L1000,10 L800,10 L600,10 L400,10 L200,10 L0,10"
                                               rotate="auto" repeatCount="indefinite"></animateMotion>
                            </circle>
                        </mask>
                    </defs>

                    <use stroke-width="10" xlinkHref="#border1" mask="url(#borderMask)" stroke="#fff">

                    </use>


                    <defs>
                        <path id="border2" d="M5290,4 L5290,4 L5400,9 L5600,10 L5800,10 L6000,10 L6200,10 L6400,10 L6600,10 L6800,10 L7000,10 L7200,10 L7400,10 L7600,10 L7708,10"
                              fill="transparent"></path>
                        <radialGradient id="borderGradientRight" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
                            <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
                        </radialGradient>
                        <mask id="borderMaskRight">
                            <circle cx="0" cy="0" r="300" fill="url(#borderGradientRight)">
                                <animateMotion dur="3s"
                                               path="M5290,4 L5290,4 L5400,9 L5600,10 L5800,10 L6000,10 L6200,10 L6400,10 L6600,10 L6800,10 L7000,10 L7200,10 L7400,10 L7600,10 L7708,10"
                                               rotate="auto" repeatCount="indefinite"></animateMotion>
                            </circle>
                        </mask>
                    </defs>
                    <use stroke-width="10" xlinkHref="#border2" mask="url(#borderMaskRight)" stroke="#fff">

                    </use>
                </svg>
            </div>
        )

    }
}
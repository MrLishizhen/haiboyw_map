import React, {Component} from 'react';

import './index.less'

export default class TheFlow extends Component {


    resize = () => {
        // const canvas = this.refs.canvas;
        // const context = canvas.getContext('2d');
        //

    }

    componentDidMount() {
        this.resize();
    }


    render() {
        return (

            // <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            //     <path fill="none" stroke="lightgrey"
            //           d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
            //
            //     <circle r="5" fill="red">
            //         <animateMotion dur="10s" repeatCount="indefinite"
            //                        path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
            //     </circle>
            // </svg>

            <svg width="100%" height="100%">
                {/*<polyline   points="655,100 595,100 582,117 324,117 305,97 67,97 0,37" style={{fill:'transparent',stroke:'red','stroke-width':4}}>*/}
                {/*    /!*<animate attributeName="stroke-dasharray"  from="655,100" to="0,37" dur="5s" begin="0s" calcMode="spline" keyTimes="0;1" keySplines="0.4,1,0.49,0.98" repeatCount="indefinite"></animate>*!/*/}
                {/*</polyline>*/}

                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{'stop-color':'rgba(255,255,255,0)','stop-opacity':1}} />
                        <stop offset="100%" style={{'stop-color':'rgb(255,255,255)','stop-opacity':1}} />
                    </linearGradient>
                </defs>

                {/*<polyline stroke="url(#grad1)"  points="655,100 717,100 734,117 988,117 1008,97 1246,97 1310,37" style={{fill:'transparent','stroke-width':4}}>*/}
                {/*</polyline>*/}

                <path d="M655,100 L655,100 L717,100 L734,117 L988,117 L1008,97 L1246,97 L1310,37" stroke-width='4' className="flex" fill="transparent" stroke="url(#grad1)"/>
                {/*<defs>*/}
                {/*    <linearGradient id="grad2" >*/}
                {/*        <stop offset="0%" style={{'stop-color':'rgb(255,255,255)','stop-opacity':1}} />*/}
                {/*        <stop offset="100%" style={{'stop-color':'rgba(255,255,255,0)' ,'stop-opacity':1}} />*/}
                {/*    </linearGradient>*/}
                {/*</defs>*/}

                {/*<polyline stroke="url(#grad1)"  points="655,100 717,100 734,117 988,117 1008,97 1246,97 1310,37" style={{fill:'transparent','stroke-width':4}}>*/}
                {/*</polyline>*/}




                <path  d="M0,37 L0,37 L67,97 L305,97 L324,117 L582,117 L595,100 L655,100" stroke-width='4' fill="transparent" stroke="url(#grad2)">
                    {/*<animate attributeName="stroke-dasharray"  from="655,100" to="0,37" dur="5s" begin="0s" calcMode="spline" keyTimes="0;1" keySplines="0" repeatCount="indefinite"></animate>*/}

                </path>
                {/*M655,100 L655,100 L595,100 L582,117 L324,117  L305,97 L67,97  L0,37*/}

            </svg>

        )

    }
}
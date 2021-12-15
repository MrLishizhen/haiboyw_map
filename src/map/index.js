import React, { PureComponent, Fragment } from 'react';
import styles from './index.less';

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            change: false,
            init: false
        }
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ change: true })
        // }, 2000)
    }

    onClick = () => {
        if (!this.state.init) {
            this.setState({ init: true }, () => {
                setTimeout(() => {
                    this.setState({ change: true })
                }, 2000);
            });
        } else {
            const { buffEvent = [] } = this.props;

            if (buffEvent && buffEvent.length > 0) {
                buffEvent.forEach(item => {
                    const { method, bindedComponents } = item;
                    if (typeof method === 'function') {
                        console.log('map onClick')
                        method({}, bindedComponents);
                    }
                });
            }
        }
    }

    render() {
        return (
            <div className={styles.basic_wrapper} onClick={this.onClick}>
                {this.state.init &&
                    <Fragment>
                        <div className={styles.top}>
                            <div className={styles.title_wrapper}>
                                <div className={styles.title}>
                                </div>
                            </div>
                            <div className={[styles.line, this.state.change ? styles.hide : null].join(' ')}></div>
                        </div>
                        <div className={styles.map_wrapper}>
                            <div className={styles.map}>
                                <div>
                                    <div className={[styles.street, styles.animation_linkong].join(' ')} style={{ top: 361, left: 492 }}></div>
                                    <div className={[styles.street, styles.animation_xinjing].join(' ')} style={{ top: 649, left: 829 }}></div>
                                    <div className={[styles.street, styles.animation_beixinjing].join(' ')} style={{ top: 1106, left: 724 }}></div>
                                    <div className={[styles.street, styles.animation_chengjiaqiao].join(' ')} style={{ top: 1471, left: 898 }}></div>
                                    <div className={[styles.street, styles.animation_xianxia].join(' ')} style={{ top: 1212, left: 1574 }}></div>
                                    <div className={[styles.street, styles.animation_zhoujiaqiao].join(' ')} style={{ top: 768, left: 1938 }}></div>
                                    <div className={[styles.street, styles.animation_tianshan].join(' ')} style={{ top: 1078, left: 1988 }}></div>
                                    <div className={[styles.street, styles.animation_hongqiao].join(' ')} style={{ top: 1398, left: 1960 }}></div>
                                    <div className={[styles.street, styles.animation_jiangsulu].join(' ')} style={{ top: 607, left: 2735 }}></div>
                                    <div className={[styles.street, styles.animation_huayangqu].join(' ')} style={{ top: 866, left: 2476 }}></div>
                                    <div className={[styles.street, styles.animation_xinhualu].join(' ')} style={{ top: 1182, left: 2452 }}></div>
                                    <div className={[styles.point, styles.animation].join(' ')} style={{ top: 695, left: 2465 }}></div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        );
    }
}
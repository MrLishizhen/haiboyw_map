import React, { PureComponent } from 'react';
import RcViewer from '@hanyk/rc-viewer'
import { isEqual } from 'lodash';
import styles from './index.less';

/**
 * 1587*2245
 */
class ImageControl extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.viewRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.info(nextProps.dataProvider, this.props.dataProvider);
        if (!_.isEqual(nextProps.dataProvider, this.props.dataProvider)) {
            if (this.viewRef.current) {
                const { viewer } = this.viewRef.current.getViewer();
                console.info(viewer);
                setTimeout(() => {
                    viewer.show();
                }, 500)
            }
        }
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    render() {
        const { dataProvider = [] } = this.props;
        const url = dataProvider && dataProvider[0] ? dataProvider[0] : '';
        const toolbar = {
            zoomIn: 0,
            zoomOut: 0,
            oneToOne: 0,
            reset: 0,
            prev: 0,
            play: 0,
            next: 0,
            rotateLeft: 0,
            rotateRight: 0,
            flipHorizontal: 0,
            flipVertical: 0
        };

        return (
            <RcViewer ref={this.viewRef} options={{ toolbar, title: false }} style={{ width: '100%', height: '100%' }}>
                <img  /*style={{ width: '100%', height: '100%' }}*/ style={{ display: 'none' }} src={url.substring(0, url.lastIndexOf('$'))} alt='' />
            </RcViewer>
        );
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error)
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>widget went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}

export default class Index extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <ImageControl {...this.props} />
            </ErrorBoundary>
        );
    }
}
import React, { Component } from 'react';

export default class Index extends Component {
    render() {
        return (
            <ErrorBoundary>
                <Test />
            </ErrorBoundary>
        );
    }
}

class Test extends React.Component {
    componentDidMount() {
        const a = null;
        console.info(a.info)
    }

    render() {
        return (
            <div>add</div>
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
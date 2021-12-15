import React from 'react'
import PropTypes from 'prop-types';

class BigImg extends React.Component {
    render() {
        return <div style={{position: "fixed", bottom: '0', left: '0', display: 'flex', transform: 'translate(-100%, -100%)'}} onClick={this.props.changeShade}>
                    <img src={this.props.url} style={{margin: 'auto', width: '604px', height: 'auto'}}/>
                </div>
    }
}

BigImg.propTypes = {
    url: PropTypes.string,
    changeShade: PropTypes.func
}

export default BigImg
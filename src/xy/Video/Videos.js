import React from 'react';
import ReactDOM from 'react-dom';
import Video from './Video'

export default class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onClick = (item) => {
        console.info('onClick', item);
        const wrapper = document.getElementById('panel_canvas');
        let scale = 0;
        if (wrapper) {
            scale = Math.min(document.body.clientWidth / wrapper.offsetWidth, document.body.clientHeight / wrapper.offsetHeight);
        }
        const dom = document.createElement('div');
        document.body.appendChild(dom);
        dom.id = 'video_wrapper';
        if (scale > 0) {
            dom.style = `cursor: pointer; position: fixed; top: 0; right: 0; left: 0; height: ${wrapper.offsetHeight * scale}px;  background-color: rgba(0, 0, 0, 0.5); z-index: 1`;
        } else {
            dom.style = 'cursor: pointer; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1';
        }
        dom.onclick = (e) => {
            if (e && e.target && e.target.id === 'video_wrapper') {
                ReactDOM.unmountComponentAtNode(dom);
                document.body.removeChild(dom);
            }
        };

        ReactDOM.render(<Video {...item} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%' }} wrapper={{ height: '100%', backgroundColor: 'rgba(0,0,0,0)' }} video={{ backgroundColor: 'rgba(0,0,0,0)', height: '100%', transform: 'scale(1)' }}> </Video>, dom);
    }

    getVideo = (item) => {
        return (
            <div
                key={item.VIDEOID}
                style={{
                    width: '50%',
                    height: 334
                }}
                onClick={this.onClick.bind(this, item)}
            >
                <Video {...item}> </Video>
            </div>
        )
    }

    render() {
        return (
            <div style={{
                width: '100%',
                height: 668,
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {
                    this.props.defaultData.map(item => this.getVideo(item))
                }
            </div>
        )
    }
}
import React from 'react'
import { getDataProvider } from '../../utils/DataUtils'
import ScrollText from './ScrollText';
import styles from './styles.css'

// _xiangyang_dongdianlingyu_table


// const itembg = 'data:image/png;base64,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';
const itembg = 'data:image/png;base64,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';


const Item = props => {
  const {
    title = '',
    background,
    onClick,
    id
  } = props;
  return (
    <div onClick = {() => {onClick && onClick({title: title, id: id})}} style = {{width: 358, height: 100, background: `url(${background? background: itembg}) no-repeat`, backgroundSize: '100% 100%', marginBottom: 12, cursor: 'pointer', userSelect: 'none'}}>
      <div style = {{width: 258, height: '100%', textAlign: 'center', lineHeight: 100, marginLeft: 100}}>
        <ScrollText content = {title} style = {{fontSize: 36}}/>
      </div>
    </div>
  )
}


export default class index extends React.Component {

  state = {
    handlers: ''
  }

  componentDidMount() {
    const { buffEvent = [{ type: 'click' }] } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
        const eventObj = buffEvent[i];
        const { type, method, bindedComponents } = eventObj;
        if (type === 'click') {
            eventValue = {
                onClick: (data) => {
                    method && method({ ...data }, bindedComponents)
                }
            }
        }
    }

    this.setState({
        handlers: Object.assign({}, eventValue)
    })
}

  render() {

    const list = getDataProvider(this.props);

    return (
      <div className = {styles['table-root']} style = {{width: 840, height: 550, overflowY: 'scroll'}}>
        <div style = {{width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-around'}}>
          {
            list.map((el, i) => {
              const {background, title = '1231231'} = el;
              return <Item title = {title} background = {background} id = {i} onClick = {this.state.handlers.onClick}></Item>
            })
          }
        </div>
       
      </div>
    )
  }
}



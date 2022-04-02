import React, { Component } from 'react';
import styles from './styles/scrollText.less';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

export default class ScrollText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }

    this.root = React.createRef();
    this.t1 = React.createRef();

    this.posx = 0;
    this.posx1 = 0;
  }

  static propTypes = {
    content: PropTypes.string,
    gap: PropTypes.number,
    speed: PropTypes.number
  }

  static defaultProps = {
    content: '',
    gap: 10,
    speed: 1
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.tweenId);
  }

  componentDidUpdate() {
    if (this.update) {
      // this.rect1 = this.root.current.getBoundingClientRect();
      // this.rect2 = this.t1.current.getBoundingClientRect();

      this.rect1 = {width: this.root.current.offsetWidth, height: this.root.current.offsetHeight};
      this.rect2 = {width: this.t1.current.offsetWidth, height: this.t1.current.offsetHeight};

      const { gap } = this.props;

      cancelAnimationFrame(this.tweenId);
      if (this.rect2.width > this.rect1.width) {
        const newStyle = {
          transform: `translateX(${this.rect2.width + gap}px)`
        }
        this.posx1 = this.rect2.width + gap;

        const newItem = this.TextItem(1, newStyle, this.props);
        const newList = [].concat(this.state.list, [newItem]);
        this.setState({ list: newList });
        this.tweenId = requestAnimationFrame(this.tweenPos)
      }
      this.update = false;
    }
  }

  // 更改translateX的位置
  tweenPos = () => {
    const { gap, speed } = this.props;
    if (Math.abs(this.posx) > this.rect2.width + gap) this.posx = this.rect2.width + gap;
    if (Math.abs(this.posx1) > this.rect2.width + gap) this.posx1 = this.rect2.width + gap;
    const newList = this.state.list.map((item, i) => {
      const oldStyle = item.props.style;
      if (i === 0) {
        return React.cloneElement(item, { style: Object.assign({}, oldStyle, { transform: `translate(${this.posx}px, 0)` }) })
      }
      return React.cloneElement(item, { style: Object.assign({}, oldStyle, { transform: `translate(${this.posx1}px, 0)` }) })
    })
    this.setState({ list: [...newList] })

    this.posx -= speed;
    this.posx1 -= speed;

    this.tweenId = requestAnimationFrame(this.tweenPos);
  }

  componentDidMount() {
    const defaultItem = this.TextItem(0, {}, this.props);
    const list = [defaultItem];
    this.setState({ list: [].concat(list) });

    this.update = true;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const defaultItem = this.TextItem(0, {}, nextProps);

      this.setState({ list: [].concat(defaultItem) });
      this.update = true;

      this.posx = 0;
      this.posx1 = 0;
    }
  }

  // 单元格显示
  TextItem = (id, style = {}, props) => {
    const { content = '', style: parentStyle = {} } = props;
    return (
      <span ref={this['t' + (id + 1)]} key={id} className={styles.animate} style={{ ...style, ...parentStyle }}>
        {content}
      </span>
    )
  }

  render() {
    if (this.state.list.length <= 1) {
      return (
        <div ref={this.root} className={styles.root} style = {{justifyContent: 'center'}}>
          {
            this.TextItem(0, {position: 'relative'}, this.props)
          }
        </div>
      )
    }
    return (
      <div ref={this.root} className={styles.root}>
        {
          this.state.list
        }
      </div>
    )
  }
}

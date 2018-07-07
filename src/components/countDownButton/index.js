import {Button} from 'antd';
import React from 'react';

class CountDownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 60,
      disabled_btn: true,
      title: '获取验证码'
    };
    this.stop = this.stop.bind(this);
  }

  handleClick() {
    const status = this.props.handleClick();
    if (status) {
      this.props.dispatch({
        type: 'common/getCode',
        payload: {callback: this.cb.bind(this)}
      });
      this.setState({
        disabled_btn: false
      });
    }
  }

  cb() {
    this.tick();
    this.setState({
      count: this.state.count - 1,
      title: '重新获取'
    });
  }

  tick() {
    this.timer = setTimeout(() => {
      if (this.state.count <= 0) {
        this.setState({
          count: 60,
          title: '获取验证码',
          disabled_btn: true,
        });
        return;
      }
      this.setState({
        count: this.state.count - 1,
      });
      this.tick();
    }, 1000)
  }

  stop() {
    alert(1);
    clearTimeout(this.timer);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Button type='primary' disabled={!this.state.disabled_btn} onClick={() => {
        this.handleClick()
      }}>{this.state.count < 60 ? `${this.state.count}s后${this.state.title}` : this.state.title}</Button>
    )
  }
}

export default CountDownButton;

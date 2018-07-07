import React from 'react';

export const TimeFilter = ComposedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      begin_time: null,
      end_time: null,
      end_open: false
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleReset = this.handleReset.bind(this);
  }

  disabledStartDate(begin_time) {
    const end_time = this.state.end_time;
    if (!begin_time || !end_time) {
      return false;
    }
    return begin_time.valueOf() > end_time.valueOf();
  }

  disabledEndDate(end_time) {
    const begin_time = this.state.begin_time;
    if (!end_time || !begin_time) {
      return false;
    }
    return end_time.valueOf() <= begin_time.valueOf();
  }

  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  }

  onStartChange(value) {
    this.onChange('begin_time', value);
  }

  onEndChange(value) {
    this.onChange('end_time', value);
  }

  handleStartOpenChange(open) {
    if (!open) {
      this.setState({end_open: true});
    }
  }

  handleEndOpenChange(open) {
    this.setState({end_open: open});
  }

  handleClear() {
    this.setState({
      begin_time: null,
      end_time: null
    })
  }

  render() {
    const props = {
      ...this.props,
      handleStartOpenChange: this.handleStartOpenChange.bind(this),
      handleEndOpenChange: this.handleEndOpenChange.bind(this),
      onEndChange: this.onEndChange.bind(this),
      onStartChange: this.onStartChange.bind(this),
      disabledEndDate: this.disabledEndDate.bind(this),
      disabledStartDate: this.disabledStartDate.bind(this),
      handleClear: this.handleClear.bind(this)
    };
    return <ComposedComponent {...props} {...this.state}/>
  }
};

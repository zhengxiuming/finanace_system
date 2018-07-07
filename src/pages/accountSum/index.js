import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {DatePicker, Card, Col, Row, Button, Form} from 'antd';
import {TimeFilter} from '../../components/timeFilter/index';
import Link from 'umi/link';
import styles from '../index.css';
import self from './accountSum.css';

const FormItem = Form.Item;

//修饰器
@TimeFilter
class AccountSum extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.props.form.resetFields();
    //清除时间
    this.props.handleClear();
  }

  handleClick() {
    this.props.dispatch(routerRedux.push({
      pathname: '/recordedDetail'
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let {begin_time, end_time} = values;
      if (begin_time) {
        begin_time = begin_time.format('YYYY-MM-DD');
      }
      if (end_time) {
        end_time = end_time.format('YYYY-MM-DD');
      }
      // console.log('Received values of form: ', begin_time || '', end_time || '');
      this.props.dispatch({
        type: 'accountSum/query',
        payload: {begin_time: begin_time, end_time: end_time}
      })
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    let {begin_time, end_time, end_open} = this.props;
    const {aliData, wxData, uniData} = this.props.accountSum;
    return (
      <div>
        <Card hoverable={true}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem className={styles.formItem}>
              {getFieldDecorator('begin_time', {initialValue: begin_time})(
                <DatePicker
                  disabledDate={this.props.disabledStartDate}
                  showTime
                  format="YYYY-MM-DD"
                  placeholder="开始时间"
                  onChange={this.props.onStartChange}
                  onOpenChange={this.props.handleStartOpenChange}
                />
              )}
            </FormItem>
            <span> ~ </span>
            <FormItem className={styles.formItem}>
              {getFieldDecorator('end_time', {initialValue: end_time})(
                <DatePicker
                  disabledDate={this.props.disabledEndDate}
                  showTime
                  format="YYYY-MM-DD"
                  placeholder="结束时间"
                  onChange={this.props.onEndChange}
                  open={end_open}
                  onOpenChange={this.props.handleEndOpenChange}
                />
              )}
            </FormItem>
            <Button type='primary' className={styles.search} htmlType="submit">搜索</Button>
            <Button onClick={this.handleReset}>重置</Button>
          </Form>
        </Card>
        <Row gutter={16} style={{marginTop: '10px'}}>
          <Col span={8}>
            <Card title='支付宝' hoverable={true} extra={<Link to='/recordedDetail?pay_type=1'>查看明细</Link>}>
              <p className={self.price} onClick={() => {
                this.handleClick()
              }}>￥{aliData}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="微信" hoverable={true} extra={<Link to='/recordedDetail?pay_type=3'>查看明细</Link>}>
              <p className={self.price}>￥{wxData}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="银联" hoverable={true} extra={<Link to='/recordedDetail?pay_type=2'>查看明细</Link>}>
              <p className={self.price}>￥{uniData}</p>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

AccountSum = Form.create()(AccountSum);
export default connect(({accountSum, loading}) => ({accountSum, loading}))(AccountSum);

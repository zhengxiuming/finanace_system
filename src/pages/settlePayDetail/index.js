import React from 'react';
import {connect} from 'dva';
import {DatePicker, Card, Button, Form, Select, Input, Table} from 'antd';
import {TimeFilter} from '../../components/timeFilter/index';
import styles from '../index.css';
import tableData from '../../utils/config';

const FormItem = Form.Item;
const Option = Select.Option;

const columns = tableData.tableColumns.settlePayDetail;
const data = [{
  key: '1',
  order_id: '180702722439',
  trade_num: '201807020337203305',
  product: '海外编码商品2*1*2.00',
  hospital_num: '5597',
  hospital_name: '王鹏六月二十五号测试医院',
  hospital_area: '北京',
  hospital_province: '北京',
  business: "测试_hxn（北京）有限公司",
  business_area: '北京地区',
  price: '212.00',
  pay_price: '212.00',
  rebate_price: '0.02',
  charge: '0.00',
  pay_type: '支付宝',
  add_time: '2018-07-02 15:37:20',
  pay_time: '2018-07-02 15:37:20'
}];

//修饰器
@TimeFilter
class settlePayDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  //重置
  handleReset() {
    this.props.form.resetFields();
    //清除时间
    this.props.handleClear();
  }

  //提交搜索
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
      console.log('Received values of form: ', begin_time || '', end_time || '');
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    let {begin_time, end_time, end_open} = this.props;
    return (
      <div>
        <Card hoverable={true}>
          <Form onSubmit={this.handleSubmit}>
            <div>
              <span>入账时间：</span>
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
            </div>
            <div className={styles.search_item}>
              <span>支付方式：</span>
              <FormItem className={styles.formItem}>
                <Select
                  placeholder="请选择支付方式"
                  onChange={this.handlePayChange}
                  style={{width: '200px'}}
                >
                  <Option value="1">支付宝</Option>
                  <Option value="2">银行卡</Option>
                  <Option value="3">微信</Option>
                  <Option value="4">余额</Option>
                </Select>
              </FormItem>
              <FormItem className={`${styles.formItem} ${styles.formOuter}`}>
                <Select
                  placeholder="请选择区域"
                  onChange={this.handleAreaChange}
                  style={{width: '200px'}}
                >
                  <Option value="1">北京</Option>
                  <Option value="2">天津</Option>
                  <Option value="3">哈哈</Option>
                  <Option value="4">嘿嘿</Option>
                </Select>
              </FormItem>
              <FormItem className={`${styles.formItem} ${styles.formOuter}`}>
                <Input style={{width: '300px'}} placeholder="请输入经销商编号/经销商名称"/>
              </FormItem>
              <Button type='primary' className={styles.search} htmlType="submit">搜索</Button>
              <Button onClick={this.handleReset}>重置</Button>
            </div>
          </Form>
          <div className={styles.table}>
            <Table columns={columns} pagination={{
              showTotal: (total, range) => `共${total}条数据`,
              size: 'small',
              total: 150,
              showSizeChanger: true,
              showQuickJumper: true
            }}
                   dataSource={data} bordered={true} loading={false}/>
          </div>
        </Card>
      </div>
    )
  }
}

settlePayDetail = Form.create()(settlePayDetail);
export default connect(({recordedDetail, loading}) => ({recordedDetail, loading}))(settlePayDetail);

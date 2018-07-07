import React from 'react';
import {connect} from 'dva';
import {DatePicker, Card, Button, Form, Select, Input, Table, Divider, Modal, Row, Col} from 'antd';
import {TimeFilter} from '../../components/timeFilter/index';
import common from '../index.css';
import {DropOption} from '../../components/DropOption/index';

const FormItem = Form.Item;
const Option = Select.Option;

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
class staySettleSum extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      visible_set: false,
      visible_settle: false
    }
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

  handleMenuClick(record, e) {
    if (e.key === '1') {
      this.setState({visible_settle: true});
    }
    if (e.key === '2') {
      this.setState({visible_set: true});
    }
  }

  handleOk(t) {
    if (t == 'set') {
      this.setState({visible_set: false});
    } else {
      this.setState({visible_settle: false});
    }
  }

  handleCancel(t) {
    if (t == 'set') {
      this.setState({visible_set: false});
    } else {
      this.setState({visible_settle: false});
    }
  }

  handleTimeChange() {

  }

  render() {
    const {getFieldDecorator} = this.props.form;
    let {begin_time, end_time, end_open} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {span: 18},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
      },
    };
    const columns = [{
      title: '经销商编号',
      dataIndex: 'business_id',
      key: 'business_id',
      align: 'center'
    }, {
      title: '经销商名称',
      dataIndex: 'business_name',
      key: 'business_name'
    }, {
      title: '区域',
      dataIndex: 'area_name',
      key: 'area_name'
    }, {
      title: '产品总价',
      dataIndex: 'product_price',
      key: 'product_price'
    }, {
      title: '平台技术服务费[元]',
      dataIndex: 'technical_service',
      key: 'technical_service'
    }, {
      title: '预付款赠额',
      dataIndex: 'advance_gift',
      key: 'advance_gift'
    }, {
      title: '平台优惠',
      dataIndex: 'hospital_province',
      key: 'hospital_province'
    }, {
      title: '平台积分',
      dataIndex: 'business',
      key: 'business'
    }, {
      title: '运费',
      dataIndex: 'business_area',
      key: 'business_area'
    }, {
      title: '商家补贴',
      dataIndex: 'price',
      key: 'price'
    }, {
      title: '返点',
      dataIndex: 'pay_price',
      key: 'pay_price'
    }, {
      title: '已支付订单金额',
      dataIndex: 'rebate_price',
      key: 'rebate_price'
    }, {
      title: '实际待付款',
      dataIndex: 'charge',
      key: 'charge'
    }, {
      title: '操作',
      align: 'center',
      key: 'operate',
      render: (text, record) => (
        <span><a href="javascript:;">查看详情</a><Divider type="vertical"/><DropOption
          onMenuClick={e => this.handleMenuClick(record, e)}
          menuOptions={[{key: '1', name: '结算'}, {key: '2', name: ' 设置 '}]}/></span>)
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div>
        <Card hoverable={true}>
          <Form onSubmit={this.handleSubmit}>
            <div>
              <span>入账时间：</span>
              <FormItem className={common.formItem}>
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
              <FormItem className={common.formItem}>
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
            <div className={common.search_item}>
              <span>区<i style={{display: 'inline-block', width: '23px'}}/>域：</span>
              <FormItem className={`${common.formItem}`}>
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
              <FormItem className={`${common.formItem} ${common.formOuter}`}>
                <Input style={{width: '200px'}} placeholder="请输入经销商编号"/>
              </FormItem>
              <Button type='primary' className={common.search} htmlType="submit">搜索</Button>
              <Button onClick={this.handleReset}>重置</Button>
            </div>
          </Form>
          <div className={common.table}>
            <Table columns={columns} simple rowSelection={rowSelection} pagination={{
              showTotal: (total, range) => `共${total}条数据`,
              size: 'small',
              total: 150,
              showSizeChanger: true,
              showQuickJumper: true
            }} dataSource={data} bordered={false} loading={false}/>
          </div>
          <Modal
            title="设置期初待结款"
            width='350px'
            visible={this.state.visible_set}
            onOk={() => {
              this.handleOk('set')
            }}
            onCancel={() => {
              this.handleCancel('set')
            }}
          >
            <span>截止日期：</span><DatePicker onChange={() => {
            this.handleTimeChange()
          }}/>
          </Modal>
          <Modal
            title="结算"
            width='350px'
            visible={this.state.visible_settle}
            onOk={() => {
              this.handleOk('settle')
            }}
            onCancel={() => {
              this.handleCancel('settle')
            }}
          >
            <FormItem label="支付密码：" {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入支付密码',
                }],
              })(
                <Input type="password" placeholder='请输入支付密码'/>
              )}
            </FormItem>
            <FormItem label="验证码：" {...formItemLayout}>
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('code', {
                    rules: [{
                      required: true, message: '请输入支付密码',
                    }],
                  })(
                    <Input type="text" placeholder='请输入验证码'/>
                  )}
                </Col>
                <Col span={12}>
                  <Button>获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
          </Modal>
        </Card>
      </div>
    )
  }
}

staySettleSum = Form.create()(staySettleSum);
export default connect(({recordedDetail, loading}) => ({recordedDetail, loading}))(staySettleSum);

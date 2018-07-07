import React from 'react';
import {connect} from 'dva';
import {Form, Row, Input, Button, Card, Icon} from 'antd';
import styles from './index.css';

const FormItem = Form.Item;

class Login extends React.PureComponent {
  handleOk(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'login/query',
        payload: values
      })
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {global} = this.props.loading;
    return (
      <div className={styles.login_content}>
        <Card title={<span><Icon type="login"></Icon> 联宠商城财务系统</span>} hoverable={true}
              style={{width: '300px', height: '280px'}}>
          <Form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请输入账号'
                  },
                ],
              })(<Input onPressEnter={this.handleOk.bind(this)}
                        placeholder="请输入用户名"/>)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码'
                  },
                ],
              })(<Input type="password" onPressEnter={this.handleOk.bind(this)} placeholder="请输入密码"/>)}
            </FormItem>
            <Row>
              <Button style={{width: '100%'}} type="primary" onClick={this.handleOk.bind(this)} loading={global}>
                登录
              </Button>
            </Row>
          </Form>
        </Card>
      </div>
    )
  }
}

Login = Form.create()(Login);
export default connect(({login, loading}) => ({login, loading}))(Login);

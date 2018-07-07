import {connect} from 'dva';
import {withRouter} from 'dva/router';
import {BackTop, Layout, Menu, Icon, Switch, Modal, Form, Input, Row, Col, Button} from 'antd';
import config from '../utils/config';
import Error from '../pages/404';
import NProgress from 'nprogress';
import React from 'react';
import styles from './BasicLayout.css';
import logo from '../assets/logo-2.png';
import Link from 'umi/link';
// import Loader from '../components/Loader/Loader';
import pathToRegexp from 'path-to-regexp';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const {Content, Footer, Sider, Header} = Layout;
const {SubMenu} = Menu;
const {footerText, openPages, menu} = config;
let lastHref = null;


class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      visible: false,
      confirmDirty: false,
      loading: false,
      count: 60,
      disabled_btn: true,
      title: '获取验证码'
    }
  }

  toggle(c) {
    this.setState({
      collapsed: !c
    })
  }

  handleSmallMenu(e) {
    if (e.key && e.key === 'setPassword') {
      this.setState({
        visible: true
      })
    } else {
      this.showLogout();
    }
  }

  showLogout() {
    let _this = this;
    confirm({
      title: '退出登录',
      content: '您确认要退出登录吗？',
      onOk() {
        _this.props.dispatch({
          type: 'basicLayout/logout'
        })
      },
      onCancel() {

      }
    })
  }

  changeTheme(state) {
    this.props.dispatch({
      type: 'basicLayout/switchTheme',
      payload: state
    })
  }

  handleOk() {
    let {pwd} = this.props.basicLayout;
    this.props.form.validateFields((err, value) => {
      if (err) {
        return new Error('数据出错，请重试');
      }
      let param = {};
      if (pwd > 0) {
        param = {pwd: value.old_password, new_pwd: value.password, vode: value.code}
      } else {
        param = {pwd: value.password, vode: value.code}
      }
      this.props.dispatch({
        type: 'basicLayout/setPayPassword',
        payload: {query: param, callback: this.callback.bind(this)}
      });
    });
  }

  //修改成功后回调
  callback() {
    this.setState({
      visible: false,
      count: 60,
      disabled_btn: true,
      title: '获取验证码'
    });
    this.props.form.resetFields();
    clearTimeout(this.timer);
  }

  handleCancel() {
    this.setState({
      visible: false,
      count: 60,
      disabled_btn: true,
      title: '获取验证码'
    });
    this.props.form.resetFields();
    clearTimeout(this.timer);
  }

  //获取菜单
  getMenus(menu) {
    return menu.map((item) => {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.pathname || '#'}>
            {item.icon && <Icon type={item.icon}/>}
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      )
    })
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };

  //发送验证码
  handleClick() {
    this.props.form.validateFields((err, value) => {
      if (err) {
        return new Error('数据出错，请重试');
      }
      this.setState({loading: true});
      this.props.dispatch({
        type: 'basicLayout/getCode',
        payload: {callback: this.cb.bind(this)}
      });
    });
  }

  //发送验证码回调
  cb() {
    this.tick();
    this.setState({
      count: this.state.count - 1,
      disabled_btn: false,
      title: '重新获取',
      loading: false
    })
  }

  //倒计时
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

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const menuItems = this.getMenus(menu);
    let currentMenu = null;
    let defaultSelectedKeys = '';
    const {location} = this.props;
    for (let item of menu) {
      if (item.pathname && pathToRegexp(item.pathname).exec(location.pathname)) {
        currentMenu = item;
        defaultSelectedKeys = item.key;
      }
    }
    let {darkTheme, user_name, pwd} = this.props.basicLayout;
    let {pathname} = this.props.location;
    const {href} = window.location;
    const {global} = this.props.loading;
    if (lastHref !== href) {
      NProgress.start();
      if (!global) {
        NProgress.done();
        lastHref = href;
      }
    }
    if (openPages && openPages.includes(pathname.toLowerCase())) {
      return (
        <div>
          {/*<Loader fullScreen spinning={global} />*/}
          {this.props.children}
        </div>
      )
    }
    const formItemLayout = {
      labelCol: {
        xs: {span: 18},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
      },
    };
    return (
      <div>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            theme={darkTheme ? 'light' : 'dark'}
          >
            <div className={styles.logo} style={this.state.collapsed ? {margin: '16px auto'} : {}}><img src={logo}
                                                                                                        alt="logo"/>{!this.state.collapsed ?
              <span className={styles.fadeLeftIn}>联宠商城财务系统</span> : ''}
            </div>
            <Menu theme={darkTheme ? 'light' : 'dark'} mode="inline" selectedKeys={[`${defaultSelectedKeys}`]}>
              {menuItems}
            </Menu>
            {!this.state.collapsed ? <div className={styles.switchtheme}>
              <span><Icon type="bulb"/>切换主题</span>
              <Switch onChange={() => {
                this.changeTheme(darkTheme)
              }} defaultChecked={!darkTheme} checkedChildren="Dark"
                      unCheckedChildren="Light"/>
            </div> : ''}
          </Sider>
          <Layout style={{height: '100vh', overflow: 'scroll', position: 'relative'}} id="mainContainer">
            {/*<Loader spinning={global && !this.state.loading}/>*/}
            <BackTop target={() => document.getElementById('mainContainer')}/>
            <Header style={{background: '#fff', padding: 0}}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => {
                  this.toggle(this.state.collapsed)
                }}
              />
              <div className={styles.rightWarpper}>
                <Menu mode="horizontal" onClick={this.handleSmallMenu.bind(this)}>
                  <SubMenu
                    style={{
                      float: 'right',
                      height: '64px',
                      lineHeight: '64px'
                    }}
                    title={<span><Icon type="user"/>{user_name}</span>}
                  >
                    <Menu.Item key="setPassword">
                      修改支付密码
                    </Menu.Item>
                    <Menu.Item key="logout">
                      退出登录
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </Header>
            <Content style={{padding: '15px', position: 'relative'}}>
              {this.props.children || <Error/>}
            </Content>
            <Footer style={{textAlign: 'center'}}>
              {footerText}
            </Footer>
            <Modal
              title="设置支付密码"
              visible={this.state.visible}
              onOk={this.handleOk.bind(this)}
              width='500px'
              onCancel={this.handleCancel.bind(this)}
              maskClosable={false}
            >
              {pwd ? <FormItem label="旧密码：" {...formItemLayout}>
                {getFieldDecorator('old_password', {
                  rules: [{
                    required: true, message: '请输入旧密码', min: 6, max: 20
                  }],
                })(
                  <Input type="text" placeholder='请输入旧密码'/>
                )}
              </FormItem> : ''}
              <FormItem label="新密码：" {...formItemLayout}>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '请输入新密码,6位-20位', min: 6, max: 20
                  }, {
                    validator: this.validateToNextPassword.bind(this),
                  }],
                })(
                  <Input type="password" placeholder='请输入新密码,6位-20位'/>
                )}
              </FormItem>
              <FormItem label="确认密码：" {...formItemLayout}>
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: '请再次输入你的密码', min: 6, max: 20
                  }, {
                    validator: this.compareToFirstPassword.bind(this),
                  }],
                })(
                  <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} placeholder='请输入新密码,6位-20位'/>
                )}
              </FormItem>
              <FormItem label="验证码：" {...formItemLayout}>
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('code', {
                      rules: [{
                        required: true, message: '验证码格式不正确', len: 6
                      }],
                    })(
                      <Input type="text" placeholder='请输入验证码'/>
                    )}
                  </Col>
                  <Col span={12}>
                    <Button type='primary' disabled={!this.state.disabled_btn} onClick={() => {
                      this.handleClick()
                    }}>{this.state.count < 60 ? `${this.state.count}s后${this.state.title}` : this.state.title}</Button>
                  </Col>
                </Row>
              </FormItem>
            </Modal>
          </Layout>
        </Layout>
      </div>
    )
  }
}

BasicLayout = Form.create()(BasicLayout);
export default withRouter(connect(({basicLayout, loading}) => ({basicLayout, loading}))(BasicLayout));

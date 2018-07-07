import * as login from '../services/index';
import {message} from 'antd';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'login',
  state: {},
  reducers: {
    // save(state, {payload: {data: data}}) {
    //   const {info} = data;
    //   return {...state, info}
    // }
  },
  effects: {
    * query({payload}, {call, put}) {
      const {data} = yield call(login.login, payload);
      const {info} = data.data;
      if (data && data.error_no === 0) {
        // yield put({type: 'save', payload: data});
        window.localStorage.setItem('user_name', info.adminname);
        window.localStorage.setItem('pwd', info.yeepay_password ? 1 : 0);
        yield put(routerRedux.push('/accountSum'));
      } else {
        message.error(data.error_msg);
      }
    }
  }
}

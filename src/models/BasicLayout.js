import * as login from "../pages/login/services";
import * as common from '../services/index';
import {message} from 'antd';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'basicLayout',
  state: {
    user: {},
    darkTheme: window.localStorage.getItem('darkTheme') === 'true',
    locationPathname: '',
    locationQuery: {},
    list: []
  },
  reducers: {
    switchTheme(state) {
      window.localStorage.setItem('darkTheme', !state.darkTheme);
      return {...state, darkTheme: !state.darkTheme}
    },
    updateState(state, {payload: {data: data}}) {
      let user_name = window.localStorage.getItem('user_name') || '';
      let pwd = window.localStorage.getItem('pwd') || '';
      return {...state, user_name: user_name, pwd: pwd, ...data}
    }
  },

  effects: {
    * query({payload}, {call, put}) {
      const {data} = yield call(common.get_area);
      yield put({type: 'updateState', payload: data});
    },
    * isLogin({payload}, {call, put}) {
      if (payload && payload.error_no === 9) {
        yield put(routerRedux.push('/login'));
        message.error(payload.error_msg);
      }
    },
    * logout({payload}, {call, put}) {
      const {data} = yield call(login.logout);
      if (data && data.error_no === 0) {
        window.localStorage.removeItem('user_name');
        window.localStorage.removeItem('pwd');
        yield put({type: 'updateState'});
        yield put(routerRedux.push('/login'));
      } else {
        message.error(data.error_msg);
      }
    },
    * setPayPassword({payload: {query, callback}}, {call, put}) {
      const {data} = yield call(common.setPayPassword, query);
      if (data && data.error_no === 1) {
        message.success(data.error_msg);
        callback();
        return;
      }
      message.error(data.error_msg);
      // console.log(data);
    },
    * getCode({payload}, {call, put}) {
      const {callback} = payload;
      const {data} = yield call(common.get_code);
      if (data && data.error_no === 0) {
        callback();
        return;
      }
      message.error(data.error_msg);
    }
  },
  subscriptions: {
    setupHistory({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname != '/accountSum') {
          dispatch({type: 'query'})
        } else {
          dispatch({type: 'updateState', payload: {data: {}}})
        }
      });
    }
  }
}

import * as account from '../services/index';
import {routerRedux} from 'dva/router';
import {message} from 'antd';

export default {
  namespace: 'accountSum',
  state: {
    aliData: '',
    wxData: '',
    uniData: ''
  },
  reducers: {
    save(state, {payload: {data: data}}) {
      return {...state, ...data};
    }
  },
  effects: {
    * query({payload}, {put, call}) {
      const {data} = yield call(account.query, payload);
      //未登录状态
      if (data && data.error_no === 9) {
        yield put(routerRedux.push('/login'));
        message.error(data.error_msg);
        return;
      }
      //成功
      if (data && data.error_no === 0) {
        yield put({type: 'save', payload: data});
      } else {
        message.error('数据获取失败');
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname === '/accountSum') {
          dispatch({
            type: 'query'
          })
        }
      })
    }
  }
}

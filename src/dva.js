import {message} from 'antd';

export function config() {
  return {
    onError(err) {
      message.error(err.message);
      err.preventDefault();
    },
    initialState: {
      global: {
        title: 'this is a joke'
      }
    }
  }
}

import request from '../../../utils/request';
import {objToForm} from '../../../utils/common';

export function login(param) {
  param = objToForm(param);
  return request(`/Admin/Index/doLogin`, {
    method: 'POST',
    body: param
  })
}

export function logout() {
  return request(`/Admin/Index/loginOut`)
}

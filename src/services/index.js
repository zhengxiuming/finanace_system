import {objToForm} from '../utils/common';
import request from '../utils/request';

/*
* 设置支付密码
* @param old_password required
* @param new_password required
* @param confirm_password required
* @param code required
* return status
* */
export function setPayPassword(param) {
  param = objToForm(param);
  return request(`/Admin/Admin/edit_pwd`, {
    method: 'POST',
    body: param
  })
}


/*
* 获取验证码
* @param phone required
* return code
* */
export function get_code(param) {
  param = objToForm(param);
  return request(`/Admin/Admin/get_phone_vode`, {
    method: 'POST',
    body: param
  })
}

export function get_area() {
  return request(`/Admin/Admin/area_list`)
}

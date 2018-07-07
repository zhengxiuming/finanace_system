import request from '../../../utils/request';
import {objToForm} from "../../../utils/common";

export function query(param) {
  param = objToForm(param);
  return request(`/Admin/Portal/accountSum`, {
    method: 'POST',
    body: param
  })
}

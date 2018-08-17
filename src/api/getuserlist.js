import { _get } from './index';

export const getuserlist = (data) => {
  let req = {
    url: 'user/statistic'
  }
  req.data = data;
  return _get(req);
}
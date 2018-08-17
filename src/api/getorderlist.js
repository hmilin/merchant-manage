import { _get } from './index';

export const getorderlist = (data) => {
  let req = {
    url: 'v1/orders'
  }
  req.data = data;
  return _get(req);
}
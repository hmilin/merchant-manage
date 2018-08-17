import { _get } from './index';

export const getstorelist = (data) => {
  let req = {
    url: 'v1/my_restaurant'
  }
  req.data = data;
  return _get(req);
}
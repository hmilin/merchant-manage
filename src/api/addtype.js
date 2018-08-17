import {_post} from './index';

export const addtype = (data) => {
  let req = {
    url: 'v1/category'
  }
  req.data = data;
  return _post(req);
}
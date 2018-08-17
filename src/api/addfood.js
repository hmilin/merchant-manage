import {_post} from './index';

export const addfood = (data) => {
  let req = {
    url: 'v1/foods'
  }
  req.data = data;
  return _post(req);
}
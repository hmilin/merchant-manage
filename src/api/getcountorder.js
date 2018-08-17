import {_get} from './index.js'

export const getcountorder =(data) => {
  let req={
    url:'v1/count/order'
  }
  req.data=data;
  return _get(req);
}
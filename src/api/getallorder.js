import {_get} from './index.js'

export const getallorder =(data) => {
  let req={
    url:'v1/all/order'
  }
  req.data=data;
  return _get(req);
}
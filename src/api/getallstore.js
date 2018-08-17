import {_get} from './index.js'

export const getallstore =(data) => {
  let req={
    url:'v1/count/restaurant'
  }
  req.data=data;
  return _get(req);
}
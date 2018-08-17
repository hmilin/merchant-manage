import {_get} from './index.js'

export const getalluser =(data) => {
  let req={
    url:'v1/all/user'
  }
  req.data=data;
  return _get(req);
}
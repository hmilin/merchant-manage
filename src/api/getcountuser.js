import {_get} from './index.js'

export const getcountuser =(data) => {
  let req={
    url:'v1/count/user'
  }
  req.data=data;
  return _get(req);
}
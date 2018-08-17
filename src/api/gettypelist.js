import {_get} from './index.js'

export const gettypelist =(data,id) => {
  let req={
    url:'v1/category/'+id
  }
  req.data=data;
  return _get(req);
}
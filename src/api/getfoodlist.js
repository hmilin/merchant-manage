import {_get} from './index.js'

export const getfoodlist =(data,id) => {
  let req={
    url:'v1/foods/'+id
  }
  req.data=data;
  return _get(req);
}
import {_delete} from './index.js'

export const deletefood =(data,id) => {
  let req={
    url:'v1/foods/'+id
  }
  req.data=data;
  return _delete(req);
}
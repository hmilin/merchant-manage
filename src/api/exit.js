import {_post} from './index.js';

export const exit=(data) =>{
  let req={
    url:'user/logout'
  }
  req.data=data;
  return _post(req);
}
import {_post} from './index.js';

export const login=(data) =>{
  let req={
    url:'user/admin_login'
  }
  req.data=data;
  return _post(req);
}
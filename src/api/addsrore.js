import {_post} from './index.js';

export const addstore=(data) =>{
  let req={
    url:'v1/restaurant'
  }
  req.data=data;
  return _post(req);
}
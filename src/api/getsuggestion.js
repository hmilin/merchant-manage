import {_get} from './index.js'

export const getsuggestion =(data) => {
  let req={
    url:'v1/suggestion'
  }
  req.data=data;
  return _get(req);
}
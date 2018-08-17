import {_get} from './index.js'

export const uploadtoken =(data) => {
  let req={
  url:'v1/uploadtoken'
}
req.data=data;
return _get(req);
}
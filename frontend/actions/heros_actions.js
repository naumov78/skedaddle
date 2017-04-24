import * as APIUtil from '../utils/marvel_api';

export const RECEIVE_HEROS = 'RECEIVE_HEROS';


export const receiveHeros = (data) => {
  return ({
    type: RECEIVE_HEROS,
    heros: data.results
  })
}

export const fetchAllHeros = (offset) => {
  return (dispatch) => {
    return APIUtil.fetchAllHeros(offset).then((result) => {
      return dispatch(receiveHeros(result.data))
    })
  }
}

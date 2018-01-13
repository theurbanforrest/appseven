
// @flow

import { handleActions } from 'redux-actions'
import {
  SUBMIT_IS_LOADING,
  SUBMIT_HAS_ERRORED,
  SUBMIT_NAME_UPDATE_SUCCESS,

  FETCH_IS_LOADING,
  FETCH_HAS_ERRORED,
  FETCH_NAME_SUCCESS

} from './constants'


type profileState = {
  device_uuid: string,
  user_name: string,
  is_loading: bool
}

const initialState:
  profileState = {
    device_uuid: '',
    user_name: '',
    is_loading: false
  }

export default handleActions(
  {
    [SUBMIT_IS_LOADING]: (state: profileState, action) => {

      return {
        ...state,
        is_loading: true
      }
    },
    [SUBMIT_HAS_ERRORED]: (state: profileState, action) => {

      return {
        ...state,
        is_loading: false
      }
    },
    [SUBMIT_NAME_UPDATE_SUCCESS]: (state: profileState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        device_uuid: data.user_id,
        user_name: data.user_name,
        is_loading: false
      }
    },
    [FETCH_IS_LOADING]: (state: profileState, action) => {

      return {
        ...state,
        is_loading: true
      }
    },
    [FETCH_HAS_ERRORED]: (state: profileState, action) => {

      return {
        ...state,
        is_loading: false
      }
    },
    [FETCH_NAME_SUCCESS]: (state: profileState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        device_uuid: data[0].user_id,
        user_name: data[0].user_name,
        is_loading: false
      }
    },
  },
  initialState
)

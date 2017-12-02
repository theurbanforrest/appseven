
// @flow

import { handleActions } from 'redux-actions'
import { 
  FETCH_SUCCESS,
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,

} from './constants'


type helloFeedState = {
  feed_data: any,
}

const initialState:
  helloFeedState = {
    feed_data: [],
  }

export default handleActions(
  {
    [FETCH_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;
      const { feed_data } = state;

      return {
        ...state,
        feed_data: data
      }
    },
    //add others here
  },
  initialState
)

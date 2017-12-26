
// @flow

import { handleActions } from 'redux-actions'
import { 
  FETCH_SUCCESS,
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,
  SHOW_FILTER_MODAL,
  HIDE_FILTER_MODAL,

} from './constants'


type helloFeedState = {
  feed_data: any,
  filter_includes: any,
  show_filter_modal: bool,
}

const initialState:
  helloFeedState = {
    feed_data: [],
    filter_includes: [],
    show_filter_modal: false,
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
    [SHOW_FILTER_MODAL]: (state: helloFeedState, action) => {
      const { showFilterModal } = state;

      return {
        ...state,
        showFilterModal: true,
      }
    },

    [HIDE_FILTER_MODAL]: (state: helloFeedState, action) => {
      const { showFilterModal } = state;

      return {
        ...state,
        showFilterModal: false
      }
    },
    //add others here
  },
  initialState
)

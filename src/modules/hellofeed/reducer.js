
// @flow

import { handleActions } from 'redux-actions'
import { 
  FETCH_SUCCESS,
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,
  SHOW_FILTER_MODAL,
  HIDE_FILTER_MODAL,

  FETCH_LINE_FEED_SUCCESS,
  SUBMIT_LIKE_SUCCESS,
  FETCH_LIKES_SUCCESS,

} from './constants'


type helloFeedState = {
  feed_data: any,
  filter_includes: any,
  show_filter_modal: bool,
  liked_comments: any,
  comment_events: any,
}

const initialState:
  helloFeedState = {
    feed_data: [],
    filter_includes: [],
    show_filter_modal: false,
    selected_line: 'A',
    liked_comments: {},
    comment_events: [],
  }

export default handleActions(
  {
    [FETCH_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;
      const { feed_data } = state;

      return {
        ...state,
        feed_data: data,
        selected_line: '',
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
    [FETCH_LINE_FEED_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data, selectedLine } } = action;
      const { selected_line, feed_data } = state;

      return {
        ...state,
        feed_data: data,
        selected_line: selectedLine,
      }
    },
    [SUBMIT_LIKE_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        liked_comments: {
          ...state.liked_comments,
          data
        }
      }
    },
    [FETCH_LIKES_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        comment_events: data
      }
    }
    //add others here
  },
  initialState
)

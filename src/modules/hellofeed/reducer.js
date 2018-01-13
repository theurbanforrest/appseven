
// @flow

import { handleActions } from 'redux-actions'
import { 
  FETCH_SUCCESS,
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,
  SHOW_FILTER_MODAL,
  HIDE_FILTER_MODAL,

  FETCH_LINE_FEED_SUCCESS,
  SUBMIT_IS_LOADING,
  SUBMIT_LIKE_SUCCESS,
  SUBMIT_UNLIKE_SUCCESS,
  FETCH_LIKES_SUCCESS,
  FETCH_USER_PROFILE_SUCCESS,

  LIKE_COMMENT,
  UNLIKE_COMMENT,

} from './constants'


type helloFeedState = {
  feed_data: any,
  filter_includes: any,
  show_filter_modal: bool,
  liked_comments: any,
  comment_events: any,
  is_loading: bool,
}

const initialState:
  helloFeedState = {
    feed_data: [],
    filter_includes: [],
    show_filter_modal: false,
    selected_line: 'A',
    liked_comments: [],
    comment_events: [],
    is_loading: false
  }

export default handleActions(
  {
    [FETCH_IS_LOADING]: (state: helloFeedState, action) => {

      return {
        ...state,
        is_loading: true,
      }
    },
    [FETCH_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;
      const { feed_data } = state;

      return {
        ...state,
        feed_data: data,
        selected_line: '',
        is_loading: false
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
        is_loading: false
      }
    },
    [SUBMIT_IS_LOADING]: (state: helloFeedState, action) => {

      return {
        ...state,
        is_loading: true
      }

      //essentially do nothing and let LIKE_COMMENT handle everything

    },
    [SUBMIT_LIKE_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        is_loading: false
      }

      //essentially do nothing and let LIKE_COMMENT handle everything

    },
    [FETCH_LIKES_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        comment_events: data,
        is_loading: false
      }
    },
    [LIKE_COMMENT]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;
      const { liked_comments, feed_data } = state;

      let refreshedFeedData = feed_data;

      return {
        ...state,
        liked_comments: [
          ...state.liked_comments,
          data
        ],
        feed_data: refreshedFeedData
      }
    },
    [UNLIKE_COMMENT]: (state: helloFeedState, action) => {
      const { payload: { theId } } = action;
      const { liked_comments, feed_data } = state;

      let newLikedCommentsArray = liked_comments;
      let refreshedFeedData = feed_data;  //test to see if this forces likes to refresh in render

      //console.log('newLikedCommentsArray is ' + JSON.stringify(newLikedCommentsArray));

      for(i=0;i<newLikedCommentsArray.length;i++){

        if(theId == newLikedCommentsArray[i].id){
          newLikedCommentsArray.splice(i,1);
          //console.log('spliced out ' + newLikedCommentsArray[i].comment_body);
        }
      }

      return {
        ...state,
        liked_comments: newLikedCommentsArray,
        feed_data: refreshedFeedData
      }
    },
    [SUBMIT_UNLIKE_SUCCESS]: (state: helloFeedState, action) => {
      const { payload: { data } } = action;

      return {
        ...state
      }
      //essentially do nothing and let UNLIKE_COMMENT get called
    },
    //add others here
  },
  initialState
)

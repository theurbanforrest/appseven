
// @flow

import { handleActions } from 'redux-actions'
import { 
  FETCH_SUCCESS,
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,
  SHOW_FILTER_MODAL,
  HIDE_FILTER_MODAL,

  FETCH_STATION_FEED_SUCCESS,
  SUBMIT_LIKE_SUCCESS,
  SUBMIT_UNLIKE_SUCCESS,
  FETCH_LIKES_SUCCESS,

  LIKE_COMMENT,
  UNLIKE_COMMENT,

} from './constants'


type stationFeedState = {
  feed_data: any,
  filter_includes: any,
  show_filter_modal: bool,
  liked_comments: any,
  comment_events: any,
}

const initialState:
  stationFeedState = {
    feed_data: [],
    filter_includes: [],
    show_filter_modal: false,
    selected_line: 'A',
    liked_comments: [],
    comment_events: [],
  }

export default handleActions(
  {
    [FETCH_SUCCESS]: (state: stationFeedState, action) => {
      const { payload: { data } } = action;
      const { feed_data } = state;

      return {
        ...state,
        feed_data: data,
        selected_line: '',
      }
    },
    [SHOW_FILTER_MODAL]: (state: stationFeedState, action) => {
      const { showFilterModal } = state;

      return {
        ...state,
        showFilterModal: true,
      }
    },
    [HIDE_FILTER_MODAL]: (state: stationFeedState, action) => {
      const { showFilterModal } = state;

      return {
        ...state,
        showFilterModal: false
      }
    },
    [FETCH_STATION_FEED_SUCCESS]: (state: stationFeedState, action) => {
      const { payload: { data, selectedStationUid } } = action;
      const { selected_stationUid, feed_data } = state;

      return {
        ...state,
        feed_data: data,
        selected_stationUid: selectedStationUid
      }
    },
    [SUBMIT_LIKE_SUCCESS]: (state: stationFeedState, action) => {
      const { payload: { data } } = action;

      /*
      return {
        ...state,
        liked_comments: {
          ...state.liked_comments,
          data
        }
      }
      */

      return {
        ...state,
      }

      //essentially do nothing and let LIKE_COMMENT handle everything

    },
    [FETCH_LIKES_SUCCESS]: (state: stationFeedState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        comment_events: data
      }
    },
    [LIKE_COMMENT]: (state: stationFeedState, action) => {
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
    [UNLIKE_COMMENT]: (state: stationFeedState, action) => {
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
    [SUBMIT_UNLIKE_SUCCESS]: (state: stationFeedState, action) => {
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

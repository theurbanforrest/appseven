// @flow

import { handleActions } from 'redux-actions'
import { REPORT_SELF, LIKE_COMMENT } from './constants'


type stationDetailState = {
  list: Object,
  tagline: string,
}

type likedCommentsState = {
  likedComments: Object
}

const initialState:
  stationDetailState = {
    list: {},
    tagline: 'this is the Station Detail'
  },
  likedCommentsState = {
    likedComments: {}
  }


//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [REPORT_SELF]: (state: stationDetailState, action) => {
      const { mystatus } = state

      return {
        ...state,
        list: {
          report: 'this is the first REPORT_SELF'
        },
        tagline: 'this has been updated!'
      }
    },

    //add others here
    [LIKE_COMMENT]: (state: likedCommentsState, action) => {

      const { payload: { record_id } } = action

      return {
        ...state,
        likedComments: {
          ...state.likedComments,
            record_id: [record_id]
        }
      }
    }
  },
  initialState
)
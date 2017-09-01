// @flow

import { handleActions } from 'redux-actions'
import { REPORT_SELF } from './constants'


type stationFeedState = {
  list: Object,
  tagline: string
}

const initialState:
  stationFeedState = {
    list: {},
    tagline: 'this is the Station Feed'
  }


//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [REPORT_SELF]: (state: stationFeedState, action) => {
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
  },
  initialState
)
// @flow

import { handleActions } from 'redux-actions'
import { REPORT_SELF, LIKE_COMMENT, UNLIKE_COMMENT } from './constants'



type likedCommentsState = {
  idGen: number,
  likedComments: Object
}

    //TODO: remove this and all associated actions, constants, etc - not needed
    type stationDetailState = {
      list: Object,
      tagline: string,
    }

const initialState:
  likedCommentsState = {
    idGen: 0,
    likedComments: {
    }
  },

    //TODO: remove this too
    stationDetailState = {
      list: {},
      tagline: 'this is the Station Detail'
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
      const { idGen, likedComments } = state
      const newId = idGen + 1

      //add record_id to likedComments in state
      return {
        ...state,
        idGen: newId,
        likedComments: {
          ...state.likedComments,
          [newId]: record_id
        }
      }
    },

    [UNLIKE_COMMENT]: (state: likedCommentsState, action) => {
      const { payload: { record_id } } = action
      const { likedComments } = state

      //if record_id exists, remove it
      if(Object.values(likedComments).indexOf(record_id) > -1){
        for(var key in likedComments){
          if(likedComments[key] == record_id) {
            delete likedComments[key];
          }
        }
      }

      //return the state
      return {
        ...state,
        likedComments: {
          ...state.likedComments,
        }
      }
    },
  },
initialState
)

      //borrowed from appfour > ADD_NEW_COUNTER to add new object with value
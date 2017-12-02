// @flow

import { handleActions } from 'redux-actions'
import { START_FLOW, END_FLOW } from './constants'



type checkInFlowState = {
  isComplete: bool,
  stationId: string,
}

const initialState:
  checkInFlowState = {
    isComplete: true,
    stationId: '',
    
  }

//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [START_FLOW]: (state: checkInFlowState, action) => {
      //get info from action and state
        const { payload: {station_id} } = action;
        const { isComplete } = state;

      //set station_id into previewedStation and return state
        return {
          ...state,
          isComplete: false,
          stationId: station_id,
        }
    },

    [END_FLOW]: (state: checkInFlowState, action) => {
      //get info from action and state
        //const { payload: {station_id} } = action;
        const { isComplete } = state;

      //set station_id into previewedStation and return state
        return {
          ...state,
          isComplete: true,
        }
    },

    //add more [DO_ACTIONS] here

  },
initialState
);
// @flow

import { handleActions } from 'redux-actions'
import { GET_PREVIEW } from './constants'



type superMapState = {
  previewedStation: string,
}

const initialState:
  superMapState = {
    previewedStation: '',
  }

//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [GET_PREVIEW]: (state: superMapState, action) => {
      //get info from action and state
        const { payload: {station_id} } = action;
        const { previewedStation } = state;

      //set station_id into previewedStation and return state
        return {
          ...state,
          previewedStation: station_id
        }
    },
    //add other actions here
  },
initialState
);

// @flow

import {
  Alert
} from 'react-native'
import { handleActions } from 'redux-actions'
import { 
  SUBMIT_SUCCESS,
  SUBMIT_HAS_ERRORED,
  SUBMIT_IS_LOADING,
  CHECKIN_START,
  CHECKIN_COMPLETE,

} from './constants'


type checkInState = {
  showCheckIn: bool,
  isCheckInComplete: bool,
  submitInProgress: bool,
  checkin_data: any,
  checkin_count: number,
  stationName: string,
  stationLines: string,

}

const initialState:
  checkInState = {
    showCheckIn: false,
    isCheckInComplete: false,
    submitInProgress: false,
    checkin_data: {},
    checkin_count: 0,
    stationName: '',
    stationLines: ''
  }

export default handleActions(
  {
    [SUBMIT_IS_LOADING]: (state: checkInState, action) => {

      return {
        ...state,
        submitInProgress: true
      }
    },

    [SUBMIT_SUCCESS]: (state: checkInState, action) => {
      const { payload: { data } } = action;
      const { checkin_data, checkin_count } = state;
      const newCount = checkin_count + 1;

      return {
        ...state,
        checkin_count: newCount,
        checkin_data: {
          ...state.checkin_data,
          [newCount]: data,
        },
        submitInProgress: false
        
      }
    },

    [SUBMIT_HAS_ERRORED]: (state: checkInState, action) => {

      return {
        ...state,
        submitInProgress: false
        
      }
    },

    [CHECKIN_START]: (state: checkInState, action) => {
      const { showCheckIn } = state;

      return {
        ...state,
        showCheckIn: true,
        isCheckInComplete: false,
      }
    },

    [CHECKIN_COMPLETE]: (state: checkInState, action) => {
      const { isCheckedIn } = state;

      return {
        ...state,
        showCheckIn: false,
        isCheckInComplete: true,
      }
    },
    //add others here
  },
  initialState
)


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
  isCheckedIn: bool,
  checkin_data: any,
  checkin_count: number,
}

const initialState:
  checkInState = {
    showCheckIn: false,
    isCheckedIn: false,
    checkin_data: {},
    checkin_count: 0,
  }

export default handleActions(
  {
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
        }
      }
    },

    [CHECKIN_START]: (state: checkInState, action) => {
      const { showCheckIn } = state;

      return {
        ...state,
        showCheckIn: true,
      }
    },

    [CHECKIN_COMPLETE]: (state: checkInState, action) => {
      const { isCheckedIn } = state;

      return {
        ...state,
        showCheckIn: false,
        isCheckedIn: true,
      }
    },
    //add others here
  },
  initialState
)

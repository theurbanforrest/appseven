
// @flow

import { handleActions } from 'redux-actions'
import { 
  SHOW_FAUX_LOADING,
  HIDE_FAUX_LOADING

} from './constants'


type appLandingState = {
  show_faux_loading: bool,
  sponsorData: any
}

const initialState:
  appLandingState = {
    show_faux_loading: false,
    sponsorData: {}
  }

export default handleActions(
  {
    [SHOW_FAUX_LOADING]: (state: appLandingState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        show_faux_loading: true,
        sponsorData: data
      }
    },
    [HIDE_FAUX_LOADING]: (state: appLandingState, action) => {
      const { payload: { data } } = action;

      return {
        ...state,
        show_faux_loading: false
      }
    },
    //add others here
  },
  initialState
)

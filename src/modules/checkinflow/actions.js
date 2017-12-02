// @flow

import { START_FLOW, END_FLOW } from './constants'

export type Action = {
  type: string,
  payload?: {
    //define all possible payloads and their types
      is_complete: bool,
      station_id: string,
  }
}

export type ActionAsync = (dispatch: Function, getState: Function) => void

//each action should have the following signature.
//  {
//     type: <type of action>,        type is required
//     payload: <the actual payload>  payload is optional. if you don't
//                                    have anything to send to reducer,
//                                    you don't need the payload. for example
//                                    newCounter action
//  }

export const startFlow = (station_id: string,): Action => {
  return {
    type: START_FLOW,
    payload: {
      station_id
    }
  }
}

export const endFlow = (): Action => {
  return {
    type: END_FLOW,
  }
}
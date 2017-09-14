// @flow

import { GET_PREVIEW, SELECT_LINE } from './constants'

export type Action = {
  type: string,
  payload?: {
    //define all possible payloads and their types
      station_id: string,
      selected_line: string
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

export const getPreview = (station_id: string): Action => {
  return {
    type: GET_PREVIEW,
    payload: {
      station_id
    }
  }
}

export const selectLine = (selected_line: string, selected_stops: any): Action => {
  return {
    type: SELECT_LINE,
    payload: {
      selected_line,
      selected_stops
    }
  }
}
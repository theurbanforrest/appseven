// @flow

import { REPORT_SELF } from './constants'

export type Action = {
  type: string,
  payload?: {
    mystatus: string
  }
}

export type ActionAsync = (dispatch: Function, getState: Function) => void

//each action should have the following signiture.
//  {
//     type: <type of action>,        type is required
//     payload: <the actual payload>  payload is optional. if you don't
//                                    have anything to send to reducer,
//                                    you don't need the payload. for example
//                                    newCounter action
//  }

export const reportSelf = (mystatus: string): Action => {
  return {
    type: REPORT_SELF,
    payload: {
      mystatus
    }
  }
}
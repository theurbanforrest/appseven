// @flow

import { REPORT_SELF, LIKE_COMMENT, UNLIKE_COMMENT } from './constants'

export type Action = {
  type: string,
  payload?: {
    mystatus: string,
    record_id : string,
    posted_by : string,
    posted_at : string,
    minutes_ago : number,
    report : string,
    comments : string
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

export const likeComment = (record_id: string): Action => {
  return {
    type: LIKE_COMMENT,
    payload: {
      record_id
    }
  }
}

export const unlikeComment = (record_id: string): Action => {
  return {
    type: UNLIKE_COMMENT,
    payload: {
      record_id
    }
  }
}
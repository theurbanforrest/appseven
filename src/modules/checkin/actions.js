// @flow

import { 
  SUBMIT_SUCCESS,
  SUBMIT_HAS_ERRORED,
  SUBMIT_IS_LOADING,
  CHECKIN_START,
  CHECKIN_COMPLETE,

} from './constants'

export type Action = {
  type: string,
  payload?: {
    data: any
  }
}

export type ActionAsync = (dispatch: Function, getState: Function) => void


//-- export const for SYNCHRONOUS actions --//

/**
export const printSelf = (myStatus: string): Action => {
  return {
    type: PRINT_SELF,
    payload: {
      myStatus
    }
  }
}
**/

//-- export function for ASYNC actions --//

	//submitAttempt(url) helpers
		export function submitHasErrored(bool) {
		    return {
		        type: SUBMIT_HAS_ERRORED,
		        hasErrored: bool
		    };
		}
		export function submitIsLoading(bool) {
		    return {
		        type: SUBMIT_IS_LOADING,
		        isLoading: bool
		    };
		}
		export function submitSuccess(data) {

		    return {
		        type: SUBMIT_SUCCESS,
		        payload: {
		          data,
		        }
		    };
		}

		export function checkinStart(){

			return {
				type: CHECKIN_START,
			}
		}
		export function checkinComplete(){

			return {
				type: CHECKIN_COMPLETE,
			}
		}

	//submitAttempt(url) itself
		export function submitAttempt(url,theMethod,theHeaders,theBody) {
		  return (dispatch) => {
		        dispatch(submitIsLoading(true));

		        fetch(url, {
		          method: theMethod,
		          headers: theHeaders,
		          body: JSON.stringify(theBody)
		        })
		            .then((response) => {
		                if (!response.ok) {
		                    throw Error(response.statusText);
		                }

		                dispatch(submitIsLoading(false));
		                return response;
		            })
		            .then((response) => response.json())
		            .then((data) => dispatch(submitSuccess(data)))
		            .then(() => dispatch(checkinComplete()))
		            .catch(() => dispatch(submitHasErrored(true)))
		    };
		}

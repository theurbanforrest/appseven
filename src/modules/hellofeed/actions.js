// @flow

import { 
  FETCH_SUCCESS,
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,

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

	//fetchAttempt(url) helpers
		export function fetchHasErrored(bool) {
		    return {
		        type: FETCH_HAS_ERRORED,
		        hasErrored: bool
		    };
		}
		export function fetchIsLoading(bool) {
		    return {
		        type: FETCH_IS_LOADING,
		        isLoading: bool
		    };
		}
		export function fetchSuccess(data) {


		    return {
		        type: FETCH_SUCCESS,
		        payload: {
		          data,
		        }
		    };
		}

	//submitAttempt(url) itself
		export function fetchAttempt(url,theMethod,theHeaders) {
		  return (dispatch) => {
		        dispatch(fetchIsLoading(true));

		        fetch(url, {
		          method: theMethod,
		          headers: theHeaders,
		        })
		            .then((response) => {
		                if (!response.ok) {
		                    throw Error(response.statusText);
		                }

		                dispatch(fetchIsLoading(false));
		                return response;
		            })
		            .then((response) => response.json())
		            .then((data) => dispatch(fetchSuccess(data)))
		            .catch(() => dispatch(fetchHasErrored(true)))
		    };
		}

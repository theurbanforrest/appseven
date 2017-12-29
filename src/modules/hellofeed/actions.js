// @flow

import { 
  FETCH_SUCCESS,
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,

  SHOW_FILTER_MODAL,
  HIDE_FILTER_MODAL,

  FETCH_LINE_FEED_SUCCESS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,

  SUBMIT_IS_LOADING,
  SUBMIT_HAS_ERRORED,
  SUBMIT_LIKE_SUCCESS,

} from './constants'

export type Action = {
  type: string,
  payload?: {
    data: any,
    selectedLine: string,
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

	export function showFilterModal(){
		return {
			type: SHOW_FILTER_MODAL,
		}
	}
	export function hideFilterModal(){
		return {
			type: HIDE_FILTER_MODAL,
		}
	}
	export function likeComment(){
		return {
			type: LIKE_COMMENT,
		}
	}
	export function unlikeComment(){
		return {
			type: UNLIKE_COMMENT,
		}
	}

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

	//get filtered feed

		export function fetchLineFeedSuccess(data,selectedLine) {

		    return {
		        type: FETCH_LINE_FEED_SUCCESS,
		        payload: {
		          data,
		          selectedLine
		        }
		    };
		}

		export function fetchLineFeedAttempt(selectedLine) {

	      let url = 'http://165.227.71.39:3000/api/RiderComments?filter=%7B%22where%22%3A%7B%22comment_on_line%22%3A%22' + selectedLine + '%22%7D%7D'
	      let theMethod = 'GET';
	      let theHeaders = {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json',
	        };

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
	                .then((data) => dispatch(fetchLineFeedSuccess(data,selectedLine)))

	                .catch(() => dispatch(fetchHasErrored(true)))
	        };
	    }


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
		export function submitLikeSuccess(data) {

		    return {
		        type: SUBMIT_LIKE_SUCCESS,
		        payload: {
		          data,
		        }
		    };
		}
		

		export function submitLikeAttempt(theBody) {

		let url = 'http://165.227.71.39:3000/api/CommentEvents';
    	let theMethod = 'POST';
    	let theHeaders = {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json',
      	};

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
		            .then((data) => dispatch(submitLikeSuccess(data)))

		            .catch(() => dispatch(submitHasErrored(true)))
		    };
		}

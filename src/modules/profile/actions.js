// @flow

import {
	SUBMIT_IS_LOADING,
	SUBMIT_HAS_ERRORED,
	SUBMIT_NAME_UPDATE_SUCCESS,

	FETCH_IS_LOADING,
	FETCH_HAS_ERRORED,
	FETCH_NAME_SUCCESS

} from './constants'

export type Action = {
  type: string,
  payload?: {
    data: any,
    selectedLine: string,
  }
}

export type ActionAsync = (dispatch: Function, getState: Function) => void


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
		export function submitNameUpdateSuccess(data) {

		    return {
		        type: SUBMIT_NAME_UPDATE_SUCCESS,
		        payload: {
		          data,
		        }
		    };
		}
		
		export function submitNameUpdateAttempt(theBody) {

		let url = 'http://165.227.71.39:3000/api/UserProfiles';
    	let theMethod = 'PUT';
    	let theHeaders = {
        	'Accept': 'application/json',
        	'Content-Type': 'application/json',
      	};

      	console.log('theBody stringified is ' + JSON.stringify(theBody));

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
		            .then((data) => dispatch(submitNameUpdateSuccess(data)))
		            .catch(() => dispatch(submitHasErrored(true)))
		    };
		}

	//submitAttempt(url) helpers
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
		export function fetchNameSuccess(data) {

		    return {
		        type: FETCH_NAME_SUCCESS,
		        payload: {
		          data,
		        }
		    };
		}

		export function fetchNameAttempt(theUUID) {

		let url = 'http://165.227.71.39:3000/api/UserProfiles?filter=%7B%22where%22%3A%7B%22user_id%22%3A%22'+theUUID+'%22%7D%7D';
    	//url = encodeURI(url);

    	console.log(url);

    	let theMethod = 'GET';
	    let theHeaders = {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	    };

		  return (dispatch) => {
		        dispatch(fetchIsLoading(true));

		        fetch(url, {
		          method: theMethod,
		          headers: theHeaders
		        })
		            .then((response) => {
		                if (!response.ok) {
		                    throw Error(response.statusText);
		                }
		                dispatch(fetchIsLoading(false));
		                return response;
		            })
		            .then((response) => response.json())
		            .then((data) => dispatch(fetchNameSuccess(data)))
		            .catch(() => dispatch(fetchHasErrored(true)))
		    };
		}
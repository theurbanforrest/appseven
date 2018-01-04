// @flow

import { 
  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,

  FETCH_SUCCESS,
  FETCH_STATION_FEED_SUCCESS,
  FETCH_LIKES_SUCCESS,

  SHOW_FILTER_MODAL,
  HIDE_FILTER_MODAL,

  
  LIKE_COMMENT,
  UNLIKE_COMMENT,

  SUBMIT_IS_LOADING,
  SUBMIT_HAS_ERRORED,
  SUBMIT_LIKE_SUCCESS,
  SUBMIT_UNLIKE_SUCCESS,

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
  export function likeComment(data) {
      return {
          type: LIKE_COMMENT,
          payload: {
            data,
          }
      };
  }
  export function unlikeComment (theId) {
      return {
          type: UNLIKE_COMMENT,
          payload: {
            theId,
          }
      };
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

  //get filtered StationFeed

    export function fetchStationFeedSuccess(data,selectedLine) {

        return {
            type: FETCH_STATION_FEED_SUCCESS,
            payload: {
              data,
              selectedLine
            }
        };
    }

    export function fetchStationFeedAttempt(selectedStationUid) {

        let url = 'http://165.227.71.39:3000/api/RiderComments?filter=%7B%22where%22%3A%7B%22station_uid%22%3A%22' + selectedStationUid + '%22%7D%2C%22order%22%3A%22timestamp%20DESC%22%7D'
        console.log(selectedStationUid);
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
                  .then((data) => dispatch(fetchStationFeedSuccess(data,selectedStationUid)))

                  //.then((action) => dispatch(fetchLikesAttempt(action.payload.data)))
                  //for debug:
                  //.then((payload) => console.log('the payload is ' + JSON.stringify(payload)))

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

                .then((theAction) => dispatch(likeComment(theAction.payload.data)))

                .catch(() => dispatch(submitHasErrored(true)))
        };
    }

    export function submitUnlikeSuccess(data) {

        return {
            type: SUBMIT_UNLIKE_SUCCESS,
            payload: {
              data,
            }
        };
    }

    export function submitUnlikeAttempt(theId) {

    let url = 'http://165.227.71.39:3000/api/CommentEvents/' + theId;
      let theMethod = 'DELETE';
      let theHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };

      return (dispatch) => {
            dispatch(submitIsLoading(true));

            fetch(url, {
              method: theMethod,
              headers: theHeaders,
              //no body, id is in url
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(submitIsLoading(false));
                    return response;
                })
                .then((response) => response.json())
                .then((data) => dispatch(submitUnlikeSuccess(data)))
                .then(() => dispatch(unlikeComment(theId)))

                .catch(() => dispatch(submitHasErrored(true)))
        };
    }

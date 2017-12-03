// @flow

import { 
  GET_PREVIEW, 
  CLEAR_PREVIEW, 
  SELECT_LINE, 
  SET_MY_LOCATION, 
  CLEAR_MY_LOCATION,
  START_CHECK_IN,
  END_CHECK_IN,


  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,
  FETCH_SPECIAL_STOPS_SUCCESS
  
} from './constants'

export type Action = {
  type: string,
  payload?: {
    //define all possible payloads and their types
      station_name: string,
      station_uid: string,
      station_lines: string,
      selected_line: string,
      data: any,
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

export const getPreview = (station_name: string, station_lines: string, station_uid: string): Action => {
  return {
    type: GET_PREVIEW,
    payload: {
      station_name,
      station_lines,
      station_uid
    }
  }
}

export const clearPreview = (): Action => {
  return {
    type: CLEAR_PREVIEW
  }
}



/*
export const selectLine = (selected_line: string, selected_stops: any): Action => {
  return {
    type: SELECT_LINE,
    payload: {
      selected_line,
      selected_stops
    }
  }
}
*/

export function selectLine(selected_line,selected_stops) {
        return {
            type: SELECT_LINE,
            payload: {
              selected_line,
              selected_stops
            }
        };
    }


export const setMyLocation = (myLat: string, myLong: string): Action => {
  return {
    type: SET_MY_LOCATION,
    payload: {
      myLat,
      myLong
    }
  }
}

export const clearMyLocation = (): Action => {
  return {
    type: CLEAR_MY_LOCATION
  }
}

export const startCheckIn = (): Action => {
  return {
    type: START_CHECK_IN
  }
}

export const endCheckIn = (): Action => {
  return {
    type: END_CHECK_IN
  }
}

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
    export function fetchSpecialStopsSuccess(data) {

        return {
            type: FETCH_SPECIAL_STOPS_SUCCESS,
            payload: {
              data,
            }
        };
    }

  //fetchSpecialStopsAttempt(url) itself
    //let url = 'http://165.227.71.39:3000/api/RiderComments?filter=%7B%22where%22%3A%7B%22status%22%3A%7B%22regexp%22%3A%22%5BA-Za-z0-9%5D%7B1%2C%7D%22%7D%2C%22comment_on_line%22%3A%7B%22regexp%22%20%3A%20%22%2FA%2F%22%7D%7D%7D';
      //?filter={"where":{"status":{"regexp":"[A-Za-z0-9]{1,}"},"comment_on_line":{"regexp" : "/R/"}}}
      //get all where status is a string > 1 char AND contains 'R'
      //Change 'A' for different lines

    let theMethod = 'GET';
    let theHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

    export function fetchSpecialStopsAttempt(selectedLine) {

      let url = 'http://165.227.71.39:3000/api/RiderComments?filter=%7B%22where%22%3A%7B%22status%22%3A%7B%22regexp%22%3A%22%5BA-Za-z0-9%5D%7B1%2C%7D%22%7D%2C%22comment_on_line%22%3A%7B%22regexp%22%20%3A%20%22%2F' + selectedLine + '%2F%22%7D%7D%7D';     

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
                .then((data) => dispatch(fetchSpecialStopsSuccess(data)))
                //.then(() => dispatch(selectLine(selectedLine)))
                .catch(() => dispatch(fetchHasErrored(true)))
        };
    }


    export function getStopsAndAddColor(selectedLine,selectedStops){

      return (dispatch) => { 
        fetchSpecialStopsAttempt(selectedLine);
        selectLine(selectedLine,selectedStops);
        //dispatch(selectLine(selectedLine,selectedStops));
        
      }

    }



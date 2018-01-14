// @flow

import { 
  GET_PREVIEW, 
  CLEAR_PREVIEW, 
  SELECT_LINE, 
  SET_MY_LOCATION, 
  CLEAR_MY_LOCATION,
  START_CHECK_IN,
  END_CHECK_IN,

  HELLO_WORLD,

  FETCH_HAS_ERRORED,
  FETCH_IS_LOADING,
  FETCH_SPECIAL_STOPS_SUCCESS,

  GET_ALL_STOPS,
  CLEAR_ALL_STOPS,
  GET_SPECIAL_STOPS,
  ADD_PIN_COLORS,

  GET_FEATURED_COMMENT,

  SUBMIT_IS_LOADING,
  SUBMIT_HAS_ERRORED,
  SUBMIT_SUCCESS,

  CHECKIN_START,
  CHECKIN_COMPLETE,
  
} from './constants'

import { Alert, NetInfo } from 'react-native'
import { superMapData, lineList } from './data'

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

export const getPreview = (
  station_name: string,
  station_lines: string,
  station_uid: string,
  station_pin_color: string,
  station_status: string,
  ): Action => {
  return {
    type: GET_PREVIEW,
    payload: {
      station_name,
      station_lines,
      station_uid,
      station_pin_color,
      station_status,
    }
  }
}

export const clearPreview = (): Action => {
  return {
    type: CLEAR_PREVIEW
  }
}

export const helloWorld = (): Action => {
  return {
    type: HELLO_WORLD
  }
}


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

  //fetchAttempt(url) helpers
    export function fetchHasErrored(bool) {

          function getErrorText(netInfoData){
            console.log(netInfoData.type);

            switch(true) {
              case(netInfoData.type=='none'):
                return "Please check your phone connectivity and try again.";
                break;
              default:
                return 'Something went wrong. Please try again.';
                break;
            }
          }

          function getErrorTitle(netInfoData){
            console.log(netInfoData.type);

            switch(true) {
              case(netInfoData.type=='none'):
                return "No Internet Connection";
              default:
                return 'Oops!';
                break;
            }
          }

          function fireAlert(netInfoData){

            Alert.alert(
              getErrorTitle(netInfoData),
              getErrorText(netInfoData),
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            );

          }

          NetInfo.getConnectionInfo().
          then((data)=> fireAlert(data))
          .catch(() => console.log('getConnectionInfo() errored out'));
          
      //dispatch to reducer
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


/** ------------------ **/


    export function getAllStops(theLine,specialStops){

      let selected_line = theLine;
      let defaultPinColor = 'gainsboro';
      let stops_to_display = [];
      
      //1. Get the default pin color
        for(i=0;i<lineList.length;i++){
          if(lineList[i].id == theLine){
            defaultPinColor = lineList[i].bg;
          }
        }

      //2a. Go through all the stations and check if this belongs to theLine
        for(i=0;i<superMapData.length;i++){

          let superMapDataStationUid = superMapData[i][0];
          if(superMapData[i][12].indexOf(theLine) > -1){
            
            let x = /Express/.exec(superMapData[i][12]);
            if(theLine=='E' && x ){
              //do nothing
            }
            else{

              //2b. If it does belong, do we use the special color?

                let stationAlreadySet = false;

                for(k=0;k<specialStops.length;k++){

                  if(superMapDataStationUid == specialStops[k].station_uid && !stationAlreadySet){
                    stops_to_display.push(
                      [
                        superMapData[i][10],
                        superMapData[i][11],
                        superMapData[i][12],
                        superMapData[i][0],
                        'magenta'
                      ]
                    );
                    stationAlreadySet = true;
                  }
                }
              //2c. If not, it should be the default color
                
              if(!stationAlreadySet){
                stops_to_display.push(
                  [
                    superMapData[i][10],
                    superMapData[i][11],
                    superMapData[i][12],
                    superMapData[i][0],
                    defaultPinColor
                  ]
                );

                stationAlreadySet = true;
              }
            }
          }
          //else i++
        }

      //3. Emit action to Redux
        return {
          type: GET_ALL_STOPS,
          payload: {
            selected_line,
            stops_to_display
          }
        }
      //end
    }

    export function clearAllStops() {

        return {
            type: CLEAR_ALL_STOPS
        };
    }


    export function fetchSpecialStopsAttempt(selectedLine,allStops,specialStops) {

      /*let filter = {
        "where": {
          "status":{
            "regexp":"[A-Za-z0-9]{1,}"
          },
          "comment_body":{
            "regexp":"[A-Za-z0-9]{1,}"
          },
          "comment_on_line":"W"
        },
        "order":"timestamp DESC"
      }

      filter = encodeURI(filter);

      let url = 'http://165.227.71.39:3000/api/RiderComments?filter=' + filter;*/

      let url = 'http://165.227.71.39:3000/api/RiderComments?filter=%7B%22where%22%3A%7B%22status%22%3A%7B%22regexp%22%3A%22%5BA-Za-z0-9%5D%7B1%2C%7D%22%7D%2C%22comment_on_line%22%3A%22' + selectedLine + '%22%7D%2C%22order%22%3A%22timestamp%20DESC%22%7D';
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
                .then((data) => dispatch(fetchSpecialStopsSuccess(data)))

                .then((theAction)=> dispatch(selectLine(selectedLine,theAction.payload.data)))
                .then((theAction)=> dispatch(getAllStops(theAction.payload.selected_line,theAction.payload.selected_stops)))
                .then(() => dispatch(checkinComplete()))

                //.then(() => dispatch(clearAllStops()))
                //.then(() => dispatch(getAllStops(selectedLine,specialStops)))
                //.then(() => dispatch(selectLine(selectedLine,allStops)))

                .catch(() => dispatch(fetchHasErrored(true)))
        };
    }

  /* -- SUBMIT --*/

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
    let url = 'http://165.227.71.39:3000/api/RiderComments';
      let theMethod = 'POST';
      let theHeaders = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        };

    export function submitAttempt(theBody,selectedLine,allStops,specialStops) {
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
                .then(() => dispatch(fetchSpecialStopsAttempt(selectedLine,allStops,specialStops)))
                
                //.then(() => dispatch(checkinComplete()))
                .catch(() => dispatch(submitHasErrored(true)))
        };
    }








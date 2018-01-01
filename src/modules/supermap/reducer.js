// @flow

import { handleActions } from 'redux-actions'
import { 
  GET_PREVIEW, 
  SELECT_LINE, 
  CLEAR_PREVIEW, 
  SET_MY_LOCATION, 
  CLEAR_MY_LOCATION,
  START_CHECK_IN,
  END_CHECK_IN,

  FETCH_IS_LOADING,
  FETCH_HAS_ERRORED,
  FETCH_SPECIAL_STOPS_SUCCESS,

  GET_ALL_STOPS,
  CLEAR_ALL_STOPS,

} from './constants'


type superMapState = {
  checkInIsComplete: bool,
  previewedStation: string,
  previewedStationLines: any,
  previewedStationPinColor: string,
  selectedLine: string,
  selectedStops: any,
  specialStops: any,
  myLocation: any,
  stopsToDisplay: any,
}

const initialState:
  superMapState = {
    checkInIsComplete: true,
    forrestFetchsData: {},
    previewedStation: '',
    previewedStationLines: [],
    previewedStationPinColor: 'black',
    selectedLine: 'A',
    specialStops: [],
    selectedStops:
      [
        [
          'Astor Pl',
          'POINT (-73.99106999861966 40.73005400028978)',
          '4-6-6 Express'
        ]
      ],
    myLocation: {
      lat: 40.73005400028978,
      long: -73.99106999861966
    },
    stopsToDisplay: [
      [
        "Astor Pl",
        "POINT (-73.99106999861966 40.73005400028978)",
        "4-6-6 Express",
        "row-hqqp-jv95~d248"
      ]
    ],
  }

//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [GET_PREVIEW]: (state: superMapState, action) => {
      //get info from action and state
        const { payload: {station_name,station_lines,station_uid,station_pin_color} } = action;
        const { previewedStation, previewedStationLines } = state;

      //set station_name into previewedStation and return state
        return {
          ...state,
          previewedStation: station_name,
          previewedStationUid: station_uid,
          previewedStationLines: station_lines,
          previewedStationPinColor: station_pin_color
        }
    },
    //add other reducers here
    [CLEAR_PREVIEW]: (state: superMapState, action) => {
      //get info from action and state
        //const {} = action;
        const { previewedStation, previewedStationLines } = state;

      //set station_name into previewedStation and return state
        return {
          ...state,
          previewedStation: null,
          previewedStationLines: null,
        }
    },
    [SELECT_LINE]: (state: superMapState, action) => {
      //get info from action and state
        const { payload: {selected_line,selected_stops} } = action;
        const { selectedLine, selectedStops } = state;

      //set station_name into previewedStation and return state
        return {
          ...state,
          selectedLine: selected_line,
          selectedStops: selected_stops
        }
    },
    [SET_MY_LOCATION]: (state: superMapState, action) => {
      //get info from action and state
        const { payload: {myLat,myLong} } = action;
        const { myLocation } = state;

      //set station_name into previewedStation and return state
        return {
          ...state,
          myLocation: {
            lat: myLat,
            long: myLong
          }
        }
    },
    [CLEAR_MY_LOCATION]: (state: superMapState, action) => {

        const { myLocation } = state;

      //return current state with myLocation as blank
        return {
          ...state,
          myLocation: {
          }
        }
    },
    [START_CHECK_IN]: (state: superMapState, action) => {

        //const { myLocation } = state;

      //return current state with myLocation as blank
        return {
          ...state,
          checkInIsComplete: false,
        }
    },
    [END_CHECK_IN]: (state: superMapState, action) => {

        //const { myLocation } = state;

      //return current state with myLocation as blank
        return {
          ...state,
          checkInIsComplete: true,
        }
    },

    [FETCH_IS_LOADING]: (state: superMapState, action) => {

      return {
        ...state,
        fetchInProgress: true
      }
    },

    [FETCH_HAS_ERRORED]: (state: superMapState, action) => {

      return {
        ...state,
        fetchInProgress: false
        
      }
    },

    [FETCH_SPECIAL_STOPS_SUCCESS]: (state: superMapState, action) => {
      const { payload: { data } } = action;
      const { specialStops, fetchInProgress, stopsToDisplay, selectedLine } = state;

      return {
        ...state,
        specialStops: data,
        fetchInProgress: false,
        stopsToDisplay: [],
        selectedLine: '',
      }
    },
    [GET_ALL_STOPS]: (state: superMapState, action) => {
      //get info from action and state
        const { payload: {selected_line, stops_to_display} } = action;
        const { stopsToDisplay, selectedLine } = state;

      //set station_name into previewedStation and return state
        return {
          ...state,
          selectedLine: selected_line,
          stopsToDisplay: stops_to_display,
        }
    },
    [CLEAR_ALL_STOPS]: (state: superMapState, action) => {

        const { selectedLine, stopsToDisplay } = state;

        return {
          ...state,
          selectedLine: '',
          stopsToDisplay: [],
        }
    },

  },
initialState
);
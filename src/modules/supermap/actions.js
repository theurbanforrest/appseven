// @flow

import { 
  GET_PREVIEW, 
  CLEAR_PREVIEW, 
  SELECT_LINE, 
  SET_MY_LOCATION, 
  CLEAR_MY_LOCATION,
  START_CHECK_IN,
  END_CHECK_IN,
  TEST_FORREST_FETCH 
} from './constants'

export type Action = {
  type: string,
  payload?: {
    //define all possible payloads and their types
      station_id: string,
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

export const getPreview = (station_id: string, station_lines: string): Action => {
  return {
    type: GET_PREVIEW,
    payload: {
      station_id,
      station_lines
    }
  }
}

export const clearPreview = (): Action => {
  return {
    type: CLEAR_PREVIEW
  }
}



export const selectLine = (selected_line: string, selected_stops: any): Action => {
  return {
    type: SELECT_LINE,
    payload: {
      selected_line,
      selected_stops
    }
  }
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


/**
testing out fetch below.  The console.log() works and prints as expected. but we get this error:
>> cannot read property 'type of undefined'.  looks like it happens in the reducer.

also the action below  cannot do a return{...} - tried to do it in the then() chain
but got an unexpected token error so i guess you can't do it like that

In SuperMap, testing this out by firing on clearStationPreview()

warrants further investigation  -fc

**/


/*** NONE OF THIS WORKS - check out HelloWorld *****/


//export const testForrestFetch = (): Action => {

  export function testForrestFetch() {
  /* static data, no fetch, this works
  let data = {
    "lineList" : [
      {
        "id":"A","bg":"blue","text":"white"
      },
      {
        "id":"C","bg":"blue","text":"white"
      }
    ]
  }

  return {
    type: TEST_FORREST_FETCH,
    payload: {
      data
    }
  }
  */

  console.log('before i fetch');

  return fetch(`https://facebook.github.io/react-native/movies.json`)
    .then((response) => response.json())
    .then((data) => {
      return dispatch({
        type: TEST_FORREST_FETCH,
        payload: {
          data
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });

  console.log('after i fetch');



/*
export const testForrestFetch = (): Action => {
  
  //connection works

  /*
    return {
      type: TEST_FORREST_FETCH, 
    }
    

    let stuff = {"hello" : "world"}

    return {
      type: TEST_FORREST_FETCH,
      payload: {
        stuff
      }
    }
  */

  /*
  console.log('before fetch');

  //do the fetch
  fetch(`https://forrestching.com/appten/test.json`)
    //.then((printy) => console.log('this is .then() for printy'))
    //.then((response) => response.json())
    //.then((responsy) => console.log('responsy is '+ responsy))
    

    .then((the_data) => { 

      return {
        type: TEST_FORREST_FETCH,
        payload: {
          the_data
        }
      }
    }
      //type: TEST_FORREST_FETCH,
      //data
      // -- console.log(final)    //logging final.lineList[0].id also works, returns 'A'
    )
    .done();

  console.log('after fetch');
*/
}


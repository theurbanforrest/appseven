// @flow

import { 
  PRINT_SELF,
  TEST_FETCHY,
  ITEMS_FETCH_DATA_SUCCESS,
  ITEMS_IS_LOADING,
  ITEMS_HAS_ERRORED,

} from './constants'

export type Action = {
  type: string,
  payload?: {
    myStatus: string,
    myData: any,
    items: any,
  }
}


//helper functions


export type ActionAsync = (dispatch: Function, getState: Function) => void

//each action should have the following signiture.
//  {
//     type: <type of action>,        type is required
//     payload: <the actual payload>  payload is optional. if you don't
//                                    have anything to send to reducer,
//                                    you don't need the payload. for example
//                                    newCounter action
//  }


export const printSelf = (myStatus: string): Action => {
  return {
    type: PRINT_SELF,
    payload: {
      myStatus
    }
  }
}


//--- EXPORT FOR DUMMIES EXPERIMENT --//

export function itemsHasErrored(bool) {
    return {
        type: ITEMS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
        isLoading: bool
    };
}


export function itemsFetchDataSuccess(items) {

    console.log('itemsFetchDataSuccess(items) got called');

    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        payload: {
          items
        }
    };
}


/** this works!
export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
**/

export function itemsFetchData(url) {
  return (dispatch) => {
        dispatch(itemsIsLoading(true));


        fetch(url, {    //'https://mywebsite.com/endpoint/'
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: 'A6',
            comment_body: 'this is a test from HelloWorld',
          })
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
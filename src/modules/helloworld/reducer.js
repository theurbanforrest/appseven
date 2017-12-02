
// @flow

import { handleActions } from 'redux-actions'
import { 
  PRINT_SELF,
  TEST_FETCHY,
  ITEMS_FETCH_DATA_SUCCESS,
  ITEMS_HAS_ERRORED,
  ITEMS_IS_LOADING,
} from './constants'


type helloWorldState = {
  checkInIsComplete: bool,
  previewedStation: string,
  previewedStationLines: any,
  selectedLine: string,
  selectedStops: any,
  myLocation: any
}

const initialState:
  helloWorldState = {
    my_status: '',
    my_data: {},
    my_items: {},
  }

export default handleActions(
  {
    [PRINT_SELF]: (state: helloWorldState, action) => {
      const { payload: { myStatus } } = action;
      const { my_status } = state

      return {
        ...state,
        my_status: myStatus
      }
    },
    [ITEMS_FETCH_DATA_SUCCESS]: (state: helloWorldState, action) => {
      const { payload: { items } } = action;
      const { my_items } = state

      console.log('ITEMS_FETCH_DATA_SUCCESS reducer called');

      return {
        ...state,
        my_items: items
      }
    },
    //add others here
  },
  initialState
)

/*
export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}


export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        default:
            return state;
    }
}
*/
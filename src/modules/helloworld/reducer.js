// @flow

import { handleActions } from 'redux-actions'
import { PRINT_SELF } from './constants'

/*
type CounterState = {
  idGen: number,
  counters: Object,
}
*/

type ForrestState = {
  age: number,
  places: Object
}

const initialState:
  ForrestState = {
    age: 28,
    places: {
      1: 'kailua',
      2: 'portland',
      3: 'seattle',
      4: 'new york'
    },
  }


//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [PRINT_SELF]: (state: ForrestState, action) => {
      const { mystatus } = state

      console.log('hi there');
      return {
        ...state,
        mystatus: 'hello'
      }
    },

    //add others here
  },
  initialState
)
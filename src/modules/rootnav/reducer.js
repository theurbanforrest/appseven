// @flow

import { handleActions } from 'redux-actions'
import { PRINT_SELF } from './constants'


type RootNavState = {
  screen: string
}

const initialState:
  
  RootNavState = {
    screen: 'initial state screen'
  }

//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [PRINT_SELF]: (state: RootNavState, action) => {
      const { screen } = state;

      console.log(state);
      return {
        ...state,
        screen: 'this is PRINT_SELF'
      }
    }
    /*
      [PRINT_STATUS]: (state: ForrestState, action) => {
      const { age } = state

      console.log('hi there');
      return {
        ...state,
        age: 21
      }
    },
    */

    //add others here
  },
  initialState
)
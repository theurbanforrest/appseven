// @flow

//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'helloworld'

//action types
//export const INCREMENT = `${NAME}/INCREMENT`
//export const DECREMENT = `${NAME}/DECREMENT`
//export const ADD_NEW_COUNTER = `${NAME}/NEW`

//as you can see above, each action is namespaced with module's name.


//added by forrest
export const PRINT_SELF = `${NAME}/PRINT_SELF`;
export const TEST_FETCHY = `${NAME}/TEST_FETCHY`;
export const ITEMS_FETCH_DATA_SUCCESS = `${NAME}/ITEMS_FETCH_DATA_SUCCESS`;
export const ITEMS_HAS_ERRORED = `${NAME}/ITEMS_HAS_ERRORED`;
export const ITEMS_IS_LOADING = `${NAME}/ITEMS_IS_LOADING`;

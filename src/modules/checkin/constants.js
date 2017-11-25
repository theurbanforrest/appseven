// @flow

//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'checkin'

//action types
//export const INCREMENT = `${NAME}/INCREMENT`
//export const DECREMENT = `${NAME}/DECREMENT`
//export const ADD_NEW_COUNTER = `${NAME}/NEW`

//as you can see above, each action is namespaced with module's name.


	//added by forrest
	export const SUBMIT_SUCCESS = `${NAME}/SUBMIT_SUCCESS`;
	export const SUBMIT_HAS_ERRORED = `${NAME}/SUBMIT_HAS_ERRORED`;
	export const SUBMIT_IS_LOADING = `${NAME}/SUBMIT_IS_LOADING`;
	export const CHECKIN_START = `${NAME}/CHECKIN_START`;
	export const CHECKIN_COMPLETE = `${NAME}/CHECKIN_COMPLETE`;
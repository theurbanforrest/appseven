// @flow

//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'supermap'

//action types
//export const INCREMENT = `${NAME}/INCREMENT`
//export const DECREMENT = `${NAME}/DECREMENT`
//export const ADD_NEW_COUNTER = `${NAME}/NEW`

//as you can see above, each action is namespaced with module's name.


	//added by forrest
	export const GET_PREVIEW = `${NAME}/GET_PREVIEW`;
	export const SELECT_LINE = `${NAME}/SELECT_LINE`;
	export const CLEAR_PREVIEW = `${NAME}/CLEAR_PREVIEW`;
	export const SET_MY_LOCATION = `${NAME}/GET_MY_LOCATION`;
	export const CLEAR_MY_LOCATION = `${NAME}/CLEAR_MY_LOCATION`;
	export const START_CHECK_IN = `${NAME}/START_CHECK_IN`;
	export const END_CHECK_IN = `${NAME}/END_CHECK_IN`;

	export const FETCH_IS_LOADING = `${NAME}/FETCH_IS_LOADING`;
	export const FETCH_HAS_ERRORED = `${NAME}/FETCH_HAS_ERRORED`;
	export const FETCH_SPECIAL_STOPS_SUCCESS = `${NAME}/FETCH_SPECIAL_STOPS_SUCCESS`;
	
	export const GET_ALL_STOPS = `${NAME}/GET_ALL_STOPS`;
	export const CLEAR_ALL_STOPS = `${NAME}/CLEAR_ALL_STOPS`;
	export const GET_SPECIAL_STOPS = `${NAME}/GET_SPECIAL_STOPS`;
	export const ADD_PIN_COLORS = `${NAME}/ADD_PIN_COLORS`;

	export const HELLO_WORLD = `${NAME}/HELLO_WORLD`;

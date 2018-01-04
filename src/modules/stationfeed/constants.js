// @flow

//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'stationfeed'

//action types
//export const INCREMENT = `${NAME}/INCREMENT`
//export const DECREMENT = `${NAME}/DECREMENT`
//export const ADD_NEW_COUNTER = `${NAME}/NEW`

//as you can see above, each action is namespaced with module's name.


	//added by forrest
	export const FETCH_SUCCESS = `${NAME}/FETCH_SUCCESS`;
	export const FETCH_HAS_ERRORED = `${NAME}/FETCH_HAS_ERRORED`;
	export const FETCH_IS_LOADING = `${NAME}/FETCH_IS_LOADING`;
	export const SHOW_FILTER_MODAL = `${NAME}/SHOW_FILTER_MODAL`;
	export const HIDE_FILTER_MODAL = `${NAME}/HIDE_FILTER_MODAL`;
	export const FETCH_STATION_FEED_SUCCESS = `${NAME}/FETCH_LINE_FEED_SUCCESS`;
	export const FETCH_LIKES_SUCCESS = `${NAME}/FETCH_LIKES_SUCCESS`;
	export const LIKE_COMMENT = `${NAME}/LIKE_COMMENT`;
	export const UNLIKE_COMMENT = `${NAME}/UNLIKE_COMMENT`;

	export const SUBMIT_LIKE_SUCCESS = `${NAME}/SUBMIT_LIKE_SUCCESS`;
	export const SUBMIT_UNLIKE_SUCCESS = `${NAME}/SUBMIT_UNLIKE_SUCCESS`;
	export const SUBMIT_HAS_ERRORED = `${NAME}/SUBMIT_HAS_ERRORED`;
	export const SUBMIT_IS_LOADING = `${NAME}/SUBMIT_IS_LOADING`;

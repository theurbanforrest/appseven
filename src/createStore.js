// @flow

import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'

//added by forrest for debug logging
	import { compose } from 'redux'
	import { createLogger } from 'redux-logger'

//make sure to import all the modules
	import { rootnav } from './modules'
	import { helloworld } from './modules'
	import { stationfeed } from './modules'
	import { stationdetail } from './modules'
	import { supermap } from './modules'


	//added by forrest for debug logging
	const loggerMiddleware = createLogger( { predicate: (getState, action) => __DEV__ });
	const middleware = applyMiddleware(
		thunk,
		loggerMiddleware	//added by forrest
	)

export default (data: Object = {}) => {
  const rootReducer = combineReducers({

    //make sure to add all the reducers
    [rootnav.NAME]: rootnav.reducer,
    [helloworld.NAME]: helloworld.reducer,
    [stationfeed.NAME]: stationfeed.reducer,
    [stationdetail.NAME]: stationdetail.reducer,
    [supermap.NAME]: supermap.reducer
  })

  return createStore(rootReducer, data, middleware)
}
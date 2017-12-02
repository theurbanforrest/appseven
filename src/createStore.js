// @flow

import { createStore, applyMiddleware, combineReducers } from 'redux'

//thunk is for doing async calls (e.g. API fetches) sent as redux actions
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
	//import { checkinflow } from './modules'
	import { checkin } from './modules'
	import { hellofeed } from './modules'


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
    [supermap.NAME]: supermap.reducer,
    //[checkinflow.NAME]: checkinflow.reducer,
    [checkin.NAME]: checkin.reducer,
    [hellofeed.NAME]: hellofeed.reducer,
  })

  return createStore(rootReducer, data, middleware)
}
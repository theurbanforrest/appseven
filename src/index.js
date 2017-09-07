// @flow

import React from 'react'
import { Provider } from 'react-redux'
import createStore from './createStore'

//added by forrest
	import RootNav from './modules/rootnav/RootNav'

const store = createStore();

const Main = () => {
  return (
    <Provider store={store}>
      	<RootNav />
    </Provider>
  )
}
export default Main;


    //this was the default ^^
    //for some reason, if you put this commented out in return(),
    //the compiler throws an error

//For some reason, putting any comments in the Provider tags throws an error
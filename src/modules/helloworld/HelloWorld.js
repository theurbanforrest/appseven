import React, { PropTypes, Component } from 'react'
import { View, 
  Text, 
  TouchableHighlight,
  TextInput
} from 'react-native'
import { 
  Button,
  FormLabel,
  FormInput, } from 'react-native-elements'
import { connect } from 'react-redux'


//import { Counters, Counter } from './../../components'
import * as actions from './actions'
import { styles } from './styles'




const HelloWorld = props => {

  const { printSelf } = props;
  this.state = { text: 'Useless Placeholder' };

  return (
    <View style={styles.container}>
      <FormLabel>Hello World</FormLabel>
      <FormInput/>

      <Button
        medium
        color='#294'
        icon={{name: 'rocket', type: 'font-awesome'}}
        title='LARGE WITH RIGHT ICON'
        onPress={() => {printSelf('this is printSelf')} }
      />
    </View>
  )
}

HelloWorld.displayName = 'Hello World'

//it is a good practice to always indicate what type of props does your component
//receive. This is really good for documenting and prevent you from a lot of bug during
//development mode. Remember, all of these will be ignored once you set it to production.
HelloWorld.propTypes = {
  //age: PropTypes.number.isRequired,
}

//Here's the most complex part of our app. connect is a function which selects,
//which part of our state tree you need to pass to your component. also, since
//my App component is pure function, i am injecting addNewCounter, increment and
//decrement functions wrapped with dispatch. I think this is the best and cleanest
//way to seperate your connect and your pure function.
export default connect(
  state => ({
    //age: state.app.age,
      //counters: state.app.counters
  }),
  dispatch => ({
    printSelf: string => dispatch(actions.printSelf(string)),
      //addNewCounter: () => dispatch(actions.newCounter()),
      //increment: id => dispatch(actions.increment(id)),
      //decrement: id => dispatch(actions.decrement(id)),
      //incrementWithDelay: id => dispatch(actions.incrementWithDelay(id))
  })
)(HelloWorld)
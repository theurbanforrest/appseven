/*------ IMPORTS -----*/

  //packages
    import React, { PropTypes, Component } from 'react'
    import {
      View,
      Text,
    } from 'react-native'
    import { 
      Button
    } from 'react-native-elements'

  //components and styles 
    import { styles } from './styles'
    import { superMapData } from '../supermap/data'

  //redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
      import * as Actions from './actions'

const HelloWorld = props => {

  function hello(){
    let gps = superMapData[0][11];
    let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(gps);

    let long = myRegex[2];
    let lat = myRegex[3];

    console.log(long);
    console.log(lat);
  }

  //this is an example of a pure function, not a component
  //const { printSelf } = props;
  //this.state = { text: 'Useless Placeholder' };

  //Fooling around with react-native-maps MapView
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>
        Sup ma baddah?
      </Text>
      <Button
        title='Pretty g, pretty g'
        onPress={() => console.log('pretty g pretty g')}
      />
    </View>
  )
}

/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {
          //previewedStation: state.supermap.previewedStation
        }
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        //actions: bindActionCreators(Actions, dispatch)
      }),
  )(HelloWorld);
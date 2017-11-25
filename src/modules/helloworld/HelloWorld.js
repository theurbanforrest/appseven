
import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import { Button } from 'react-native-elements';

//redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
      import * as Actions from './actions'

class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  hello() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.props.actions.printSelf('bro');
  }


  render() {
    return (
      <View style={{ 
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          <Button
            title='Get em boo'
            onPress={() => this.hello() }
          />
        </View>
        <View>
          
          <Button
            title='Test Fetchy'
            onPress={() => this.props.actions.itemsFetchData('http://localhost:3000/api/Comments') }
            //onPress={() => this.props.actions.itemsFetchData('https://forrestching.com/appten/test.json') }
          />
        </View>

      </View>
    );
  } //end render
}//end component

/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {
          mystatus: state.helloworld.mystatus,
          data: state.helloworld.data
        } 
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(HelloWorld);
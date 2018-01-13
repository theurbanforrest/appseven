
import React, { Component } from 'react';
import { View, Text, Modal, Alert, NetInfo } from 'react-native';
import { Button } from 'react-native-elements';
//import {} from 'react-xml-parser';

//redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
      import * as Actions from './actions'
      import * as SuperMapActions from '../supermap/actions'

class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  tryMe() {
    var hey = fetch('http://web.mta.info/status/ServiceStatusSubway.xml');
    console.log(hey);
  }

  alerty(netInfoData){
    console.log('Initial, type: ' + netInfoData.type + ', effectiveType: ' + netInfoData.effectiveType);
    
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
    return netInfoData;
  }

  checkConnectAndAlert() {

    function alerty(netInfoData){
      console.log('Initial, type: ' + netInfoData.type + ', effectiveType: ' + netInfoData.effectiveType);
      
      Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      return netInfoData;
    }

    NetInfo.getConnectionInfo().
    then((data)=> alerty(data))

    .catch(() => console.log('checkConnectAndAlert() errored out'));

    /*
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });
    */

    /*
    NetInfo.getConnectionInfo().
    then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });
    */
    
  }

  superMapHelloWorld(){
    this.props.superMapActions.helloWorld();
  }

  parsey(response) {

//    var XMLParser = require('react-xml-parser');
    var xml = new XMLParser().parseFromString(response);    // Assume xmlText contains the example XML
    console.log(xml);
    console.log(xml.getElementsByTagName('Name'));
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
            //onPress={() => this.props.actions.itemsFetchData('http://localhost:3000/api/Comments') }
            onPress={() => this.props.actions.itemsFetchData('https://forrestching.com/appten/test.json') }
          />

          <Button
            title='Test XML fetcher'
            onPress={() => this.props.actions.itemsFetchData('https://forrestching.com/appten/text.xml') }
          />

          <Button
            title='Test alert'
            onPress={() => this.checkConnectAndAlert()}
          />

          <Button
            title='Test SuperMap Hello World()'
            onPress={() => this.props.superMapActions.helloWorld()}
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
        actions: bindActionCreators(Actions, dispatch),
        superMapActions: bindActionCreators(SuperMapActions, dispatch)
      }),
  )(HelloWorld);
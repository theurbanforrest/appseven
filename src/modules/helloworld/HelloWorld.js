import React, { PropTypes, Component } from 'react'
import { View, 
  Text, 
  TouchableHighlight,
  TextInput
} from 'react-native'
import { 
  Button,
  FormLabel,
  FormInput,
  Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'


//import { Counters, Counter } from './../../components'
import * as actions from './actions'
import { styles } from './styles'


const HelloWorld = props => {

  const { printSelf } = props;
  this.state = { text: 'Useless Placeholder' };

  //Fooling around with react-native-maps MapView
  return (
    <View style={styles.container}>
      <MapView
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: 'absolute'
        }}
        initialRegion={{
          latitude: 40.7590,      //specific point (N/E is positive, S/W is negative)
          longitude: -73.9845,    //this is Times Square i.e.
          latitudeDelta: 0.3,     //wideness of view (smaller is more precise)
          longitudeDelta: 0.3,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 40.6924,
            longitude: -73.9872
          }}
          pinColor='violet'
        />
        <MapView.Marker
          coordinate={{
            latitude: 40.8110,
            longitude: -73.9522
          }}
        >
          <MapView.Callout
            tooltip={false}
          >
            <View style={{
              flex: 8,
              flexDirection: 'column',
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon
                size={30}
                name='meh-o'
                type='font-awesome'
                color='orange'
              />
              <Text style={{color: 'orange'}}>
                Mood: Meh
              </Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    </View>
  )
}

HelloWorld.displayName = 'Hello World'

export default connect(
    //this is mapStateToProps verbosely
    (state) => {
      return {
        //idGen: state.stationdetail.idGen,
        //likedComments: state.stationdetail.likedComments
      }
    },
    //this is mapDispatchToProps verbosely
    (dispatch) => ({
      //actions: bindActionCreators(Actions, dispatch)
    }),
  )(HelloWorld);
/*------ IMPORTS -----*/

  //packages
    import React, { PropTypes, Component } from 'react'
    import {
      View,
      ScrollView,
      Text,
      StyleSheet,
      TouchableHighlight

    } from 'react-native'
    import { 
      Card,
      List,
      ListItem,
      Icon,
      FormLabel,
      FormInput,
      Button
    } from 'react-native-elements'

  //components and styles 
    import { styles } from './styles'
    import MapView from 'react-native-maps'
    import { superMapData } from './data'

  //redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
      import * as Actions from './actions'

/*----- THE COMPONENT -----*/


class SuperMap extends Component {
  //constructor
  //need this for Components instead of pure functions
  constructor(props) {
    super(props);
  }

  //functions
  //add them here to call them as 'this.' in render
    getLat(stationdata) {
      //let gps = superMapData[0].[11]
      console.log(stationdata);
      console.log(superMapData);

      let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(stationdata);
      return Number(myRegex[3]);
    }

    getLong(stationdata) {
      //let gps = superMapData[0].[11]
      let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(stationdata);
      return Number(myRegex[2]);
    }
  
  //render()
  render() {

    //const from the navigator
      //const { id, shortName, longName, area, lines, colors } = this.props.navigation.state.params;

    //functions
      //add them here to call in render only

    //the view
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
          {superMapData.map( (stationdata) => (
            <MapView.Marker
              coordinate={{
                latitude: this.getLat(stationdata[11]),
                longitude: this.getLong(stationdata[11])
              }}
            >
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    )
/*
        <MapView.Marker
          coordinate={{
            latitude: 40.8110,
            longitude: -73.9522
          }}
        >
          
          <Icon
            name='smile-o'
            type='font-awesome'
          />
          
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
        <MapView.Marker
          coordinate={{
            latitude: 40.7456,
            longitude: -73.9029
          }}
        >
        </MapView.Marker>
      </MapView>
    </View>
    )
*/
  }//end render
}
//end component


/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {
          previewedStation: state.supermap.previewedStation
        }
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(SuperMap);

/*----- APPENDIX -----*/

/*
  // regex to get lat and long is " ^(\bPOINT\b)..([^\s]+)\s([^\s]+). "  
  // yes include that final period
  // use $2 and $3

  // let gps = superMapData[0].[11]
  // let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(gps)
  // var long = myRegex[2]
  // var lat = myRegex[3]


*/

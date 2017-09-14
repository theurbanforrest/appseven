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
    getLat(myStr) {

      let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(myStr);
      return Number(myRegex[3]);
    }

    getLong(myStr) {

      let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(myStr);
      return Number(myRegex[2]);
    }

    displayOrNot(myStr,targetLine){

      let myRegex = targetLine.exec(myStr)
      if(!myRegex){
        return false;
      }
      else {
        return true;
      }
    }

    getLineStops(targetLine){
      //superMapData[i][11] is the string of the lat/long that needs to be regex'd
      //superMapData[i][12] is the string of lines e.g. 'A-C-F' 

      let stopsToDisplay = [];

      //loop - if the line of strings contains the target
      //then add the lat/long string to the array
      //which will later be parsed

      for(i=0;i<superMapData.length;i++){

        if(superMapData[i][12].indexOf(targetLine) > -1){

          stopsToDisplay.push(
            [
              superMapData[i][10],
              superMapData[i][11],
              superMapData[i][12]
            ]
            
          );

        }
        //else i++
      }

      //return to redux
      this.props.actions.selectLine(targetLine, stopsToDisplay);

      //return the array
      //console.log(stopsToDisplay);
      return stopsToDisplay;
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
        {
          this.props.selectedStops.map( (theStop) => (
            <MapView.Marker
              coordinate={{
                latitude: this.getLat(theStop[1]),
                longitude: this.getLong(theStop[1])
              }}
            >
              <MapView.Callout
                tooltip={false}
              >
                <Text style={{color: 'gray'}}>
                  {theStop[0]}
                </Text>
                <Text style={{color: 'blue'}}>
                  {theStop[2]}
                </Text>
              </MapView.Callout>
              
            </MapView.Marker>
          ))
        }
        </MapView>
        <View>
          <Button
            title='A'
            onPress={() => this.getLineStops('A') }
          />
          <Button
            title='F'
            onPress={() => this.getLineStops('F') }
          />
          <Button
            title='R'
            onPress={() => this.getLineStops('R') }
          />
          <Button
            title='2'
            onPress={() => this.getLineStops('2') }
          />
          <Button
            title='7'
            onPress={() => this.getLineStops('7') }
          />
        </View>

      </View>
    )
  }//end render
}
//end component


/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {
          previewedStation: state.supermap.previewedStation,
          selectedLine: state.supermap.selectedLine,
          selectedStops: state.supermap.selectedStops
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

  /*
    This works 
          {
            superMapData.map( (stationData) => (
                  <MapView.Marker
                  coordinate={{
                    latitude: this.getLat(stationData[11]),
                    longitude: this.getLong(stationData[11])
                  }}
                >
                  <MapView.Callout
                    tooltip={false}
                  >
                    <Text style={{color: 'gray'}}>
                      {stationData[10]}
                    </Text>
                    <Text style={{color: 'blue'}}>
                      {stationData[12]}
                    </Text>
                  </MapView.Callout>
                </MapView.Marker>
            ))
          }
    */

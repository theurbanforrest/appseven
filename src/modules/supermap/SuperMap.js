/*------ IMPORTS -----*/

  //packages
    import React, { PropTypes, Component } from 'react'
    import {
      View,
      ScrollView,
      Text,
      StyleSheet,
      TouchableHighlight,
      StatusBar,
      Image,
    } from 'react-native'
    import { 
      Card,
      List,
      ListItem,
      Icon,
      Badge,
      FormLabel,
      FormInput,
      Button
    } from 'react-native-elements'

  //components and styles 
    import { styles } from './styles'
    import { superMapData, lineList } from './data'
    import MapView from 'react-native-maps'
    import StationPreview from  '../../components/StationPreview'
    import LocationStatusButton from '../../components/LocationStatusButton'
    import AppHeader from '../../components/AppHeader'
    import LinePreview from '../../components/LinePreview'
    import LoadingOverlay from '../../components/LoadingOverlay'

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

    clearStationPreview(){
      //send to redux
      this.props.actions.clearPreview();

    }

    getStationLines(linesString){

      let badgesToDisplay = [];
      let myArr = linesString.split('-');

      for(i=0;i<myArr.length;i++){

        badgesToDisplay.push(
          [
            myArr[i]
          ]
        );
      }

      return badgesToDisplay;
    }

    getBackgroundColor(targetLine,defaultColorsArray,stationUid,specialStopsArray){

      //Loop thru the lineList to find what the targetLine default color should be
       for(i=0;i<defaultColorsArray.length;i++){

        if(targetLine == defaultColorsArray[i].id){
          //we found a match! now let's check if this pin should be the 
          //normal color or special color

          for(i<0;i<specialStopsArray.length;i++){

            if(stationUid == specialStopsArray[i].station_uid){

              //this is a special stop!
              //let's give it the special color

              return 'pink';
            }
            //else i++
          }
          //we checked all the special stop and this doesn't match
          //let's give it the default color
          return defaultColorsArray[i].bg;
        }
        //else i++
       }
       //catch any errors by just returning a generic color
       return 'gainsboro';
    }

    showStationPreview(previewedStationLines,selectedLine){

      if(!previewedStationLines){

        //this.clearStationPreview();
        return false;
      }

      for(i=0;i<previewedStationLines.length;i++){
        if(previewedStationLines[i] == selectedLine){
          return true;
        }
      }

      //this.clearStationPreview();
      return false;
    }

    getTextColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].text;
        }
        //else i++
       }
       //if no match
       return 'white';
    }

    componentWillMount() {
      //if coming from HelloFeed, set as that line.  Else A by default

      console.log('componentWillMount called');
      console.log('this.props.helloFeedLine is ' + this.props.helloFeedLine);

      let x;

      switch (true) {
        case (this.props.helloFeedLine):
          x = this.props.helloFeedLine;
          break;
        default:
          x = 'A';  //default line is A
          break;
      }

      this.props.actions.fetchSpecialStopsAttempt(x,this.props.selectedStops,this.props.specialStops);
      
    }

    componentDidUpdate(){

      console.log('SuperMap componentDidUpdate')
    }

    toggleCheckInStatus() {

      if(this.props.checkInIsComplete){

        this.props.actions.startCheckIn();
      }
      else this.props.actions.endCheckIn();
    }

    getFirstPreviewedComment(specialStopsArray,stationUid){

      for(i=0;i<specialStopsArray.length;i++){

        if(specialStopsArray[i].station_uid == stationUid) {

          return specialStopsArray[i];
        }
      }

      return false;
    }

    getLineCheckInsCount(specialStopsArray){

      return (!specialStopsArray) ? 0 : specialStopsArray.length;


      /* -- Decided not to get distincts to make the platform look bigger --
      let unique = {};
      let distinct = [];
      for( var i in specialStopsArray ){
       if( typeof(unique[specialStopsArray[i].station_uid]) == "undefined"){
        distinct.push(specialStopsArray[i].station_uid);
       }
       unique[specialStopsArray[i].station_uid] = 0;
      }

      console.log('distinct.length is ' + distinct.length);
      return distinct.length;
      */
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
        <StatusBar
          barStyle="light-content"
        />
        <MapView
          style={styles.mapview}
          initialRegion={{
            latitude: 40.7590,      //specific point (N/E is positive, S/W is negative)
            longitude: -73.9845,    //this is Times Square i.e.
            latitudeDelta: 0.05,     //wideness of view (smaller is more precise)
            longitudeDelta: 0.05,
          }}
        >

          {
            this.props.stopsToDisplay.map( (theStop) => (
              <MapView.Marker
                key={theStop}
                coordinate={{
                  latitude: this.getLat(theStop[1]),
                  longitude: this.getLong(theStop[1])
                }}
                pinColor={theStop[4]}
                onPress={ this.props.previewedStation ? ()=>this.props.actions.getPreview(theStop[0],this.getStationLines(theStop[2]),theStop[3],theStop[4]) : null} //this.getStationLines(theStop[0])) : null }
              >

                <MapView.Callout
                  tooltip={false}
                  onPress={()=>this.props.actions.getPreview(theStop[0],this.getStationLines(theStop[2]),theStop[3],theStop[4],this.getFirstPreviewedComment(this.props.specialStops,this.props.previewedStationUid).status)} //this.getStationLines(theStop[0]))}
                  style={{
                    //width: 150
                  }}
                >
                  <View>
                    <Text style={{
                      color: 'black'}}
                    >
                      {theStop[0]} >
                    </Text>
                    <Text style={{
                      color: 'gray'
                    }}>
                      {theStop[2]}
                    </Text>
                    <Text style={{
                      color: 'gray'
                    }}>
                      Click for details
                    </Text>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ))
          }
          
          <MapView.Marker
            coordinate={{
              latitude: this.props.myLocation.lat,
              longitude: this.props.myLocation.long
            }}
            pinColor='black'
          />
        </MapView>
        <LinePreview
          visible={true}
          lines={ [this.props.selectedLine] }
          onLinePress={()=> this.props.navigation.navigate('HelloFeed',{
            shortName: 'The Feed'
          })}
          reportsOnLine={ this.getLineCheckInsCount(this.props.specialStops) }
          tagLineColor={ this.props.specialStops.length > 0 ? 'magenta' : '#97ACB3'  }
        />
        <StationPreview
            isSpecial={this.props.previewedStationPinColor == 'magenta' ? true : false}
            visible={ this.showStationPreview(this.props.previewedStationLines,this.props.selectedLine)}//{this.props.previewedStation ? true : false}
            stationName={ this.props.previewedStation }
            lines={ this.props.previewedStationLines }//['BB','green','white'] }//this.props.previewedStationLines }
            selectedLine = { this.props.selectedLine }
            onClearPress={()=>this.clearStationPreview()}
            onLinePress = {()=> this.props.navigation.navigate('SettingsStack',{
                'previewedStation': this.props.previewedStation,
                'previewedStationLines' : this.props.previewedStationLines
              }
            )}
            onFeedPress = {()=> this.props.navigation.navigate('LineFeed',{
                shortName: 'The Feed'
                //area: 'Queens',
                //colors: 'blue,orange,purple',
                //id: 4,
                //lines: 'E,F,7',
                //longName: 'Long Name',
              })}
            onCheckInPress = {()=> this.props.navigation.navigate('SettingsStack',{
                'previewedStation': this.props.previewedStation,
                'previewedStationLines' : this.props.previewedStationLines,
                'initialStatus' : this.getFirstPreviewedComment(this.props.specialStops,this.props.previewedStationUid).status
              }
            )}
            onStationPress = {()=> this.props.navigation.navigate('StationFeed',{
                shortName: this.props.previewedStation
              })}
            onDismiss = {() => this.props.navigation.navigate('SuperMap')}
            comment = { this.getFirstPreviewedComment(this.props.specialStops,this.props.previewedStationUid) }
        />
        <View style={{
          bottom: 0,
          flexDirection: 'column-reverse',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: '3%',
          paddingLeft: '3%',
          paddingRight: '3%',
        }}>
          <Text style={{
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.0)',
            color: 'gray',
            fontSize: 14,
          }}>
            Presented by StreetEasy
          </Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}>
            {
              lineList.map( (line) => (
                  <Badge
                    key={line.id}
                    value={line.id}
                    containerStyle={{
                      backgroundColor: this.props.selectedLine == line.id ? line.bg : 'gainsboro'
                    }}
                    textStyle={{
                      color: this.props.selectedLine == line.id ? line.text : 'white'
                    }}
                    onPress={() => this.props.actions.fetchSpecialStopsAttempt(line.id,this.props.selectedStops,this.props.specialStops )}
                  />
                )
              )
            }
          </View>
        </View>
        <LoadingOverlay
          isVisible={this.props.fetchInProgress}
        />
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
          previewedStationLines: state.supermap.previewedStationLines,
          previewedStationUid: state.supermap.previewedStationUid,
          previewedStationPinColor: state.supermap.previewedStationPinColor,
          fetchInProgress: state.supermap.fetchInProgress,

          selectedLine: state.supermap.selectedLine,
          helloFeedLine: state.hellofeed.selected_line,

          selectedStops: state.supermap.selectedStops,
          myLocation: state.supermap.myLocation,
          checkInIsComplete: state.supermap.checkInIsComplete,
          specialStops: state.supermap.specialStops,
          stopsToDisplay: state.supermap.stopsToDisplay,

          checkInData: state.supermap.checkin_data
          //tagline: state.stationfeed.targetLine   //this works, able to get ANYTHING from redux state
        } 
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(SuperMap);

/*----- APPENDIX -----*/

/** Hosted images

  <View>
    <Image
      style={{
        height: 38,
        width: 30
      }}
      source={{
        uri: 'https://forrestching.com/appten/meh.png'
      }}
    />
  </View>


**/


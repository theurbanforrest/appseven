
import React, { Component } from 'react';
import { 
  View,
  Text,
  TextInput,
} from 'react-native'
import { 
  Badge,
  Button,
  ButtonGroup,
  Avatar, 
  Icon,
  FormLabel,
  FormInput,

} from 'react-native-elements'
import {
  NavigationActions
} from 'react-navigation'
import DeviceInfo from 'react-native-device-info'
import { lineList } from '../supermap/data'
import Togglecon from '../../components/Togglecon'

//redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
    import * as Actions from './actions'

class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {

      comment: '',
      modalVisible: false,
      status: 'OK',

      activity: false,
      longWait: false,
      crowded: false,
      ok: false,
    }
  }

  componentWillMount() {

    this.props.actions.checkinStart();

    switch(this.getFirstPreviewedComment(this.props.specialStops,this.props.previewedStationUid).status){

      case 'Activity':
        this.setState({
          activity: true
        });
        break;
      case 'Long Wait':
        this.setState({
          longWait: true
        });
        break;
      case 'Crowded':
        this.setState({
          crowded: true
        });
        break;
      case 'OK':
        this.setState({
          ok: true
        });
        break;
      default:
        this.setState({
          ok: true
        })
        break;
    };

  console.log('this.state.ok is ' + this.state.ok)

  }

  componentDidUpdate() {
    if(this.props.showCheckIn == false){
      this.props.navigation.dispatch(NavigationActions.back())
    }
  }

  toggleSelection(theIcon){
    switch(theIcon){
      case 'activity':
        let x = !this.state.activity;

        this.setState({
          activity: x,
          longWait: false,
          crowded: false,
          ok: !x,
          status: x ? 'Activity' : ''
        });
        break;

      case 'longWait':
        let y = !this.state.longWait;

        this.setState({
          activity: false,
          longWait: y,
          crowded: false,
          ok: !y,
          status: y ? 'Long Wait' : ''
        });
        break;

      case 'crowded':
        let z = !this.state.crowded;

        this.setState({
          activity: false,
          longWait: false,
          crowded: z,
          ok: !z,
          status: z ? 'Crowded' : ''
        });
        break;

      case 'ok':
        let aa = !this.state.ok;

        this.setState({
          activity: false,
          longWait: false,
          crowded: false,
          ok: aa,
          status: 'OK'
        });
    }
  }

  getUUID(){

    let x = DeviceInfo.getUniqueID();
    return x;
  }

  getTimeStamp(){
    return Date.now();
  }

  getBackgroundColor(targetLine,data){
   for(i=0;i<data.length;i++){
    if(targetLine == data[i].id){
      return data[i].bg;
    }
    //else i++
   }
   //if no match
   return 'gainsboro';
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

  getFirstPreviewedComment(specialStopsArray,stationUid){

      for(i=0;i<specialStopsArray.length;i++){

        console.log('the current id is ' + specialStopsArray[i].station_uid);

        if(specialStopsArray[i].station_uid == stationUid) {

          console.log(JSON.stringify(specialStopsArray[i]));

          return specialStopsArray[i];
        }
      }

      return false;
    }

  render() {

    return (
      <View style={{
        paddingTop: '8%',
        paddingLeft: '3%',
        paddingRight: '3%',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1F252A',
      }}>
        <View style={{
          flex: 6,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <Text style={{
            color: '#97ACB3',
            fontSize: 18,
            fontWeight: 'bold',
          }}
          >
            {this.props.previewedStation}
          </Text>  
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
          }}>
            {
              this.props.previewedStationLines.map( (line) => (
                  <Badge
                    key= {line}
                    value= {line}
                    containerStyle={{
                      backgroundColor: this.getBackgroundColor(line,lineList) //keeping static, not connected to selectedLine
                    }}
                    textStyle={{
                      color: this.getTextColor(line,lineList), //keeping static, not connected to selectedLine
                      fontSize: 14,
                    }}
                  />
                ))
            }
          </View>
          <Avatar
            large
            rounded
            source={{uri: 'https://randomuser.me/api/portraits/men/49.jpg' }}
            //onPress={onMenuPress}
          />
          <Text style={{
            color: '#97ACB3',
            fontSize: 18,
            textAlign: 'center'
          }}>
          Just Now • {this.props.profileUserName}
          </Text>
        </View>
        <View style={{
          flex: 6,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <Togglecon
            isSelected={this.state.ok}
            likeCount={0}
            title={'Okay'}
            onIconPress={() => this.toggleSelection('ok') }
            theIcon={'thumbs-o-up'}
            selectedColor={'lime'}
            altColor={'gray'}
          />
          <Togglecon
            isSelected={this.state.activity}
            likeCount={0}
            title={'Activity'}
            onIconPress={() => this.toggleSelection('activity') }
            theIcon={'exclamation-triangle'}
            selectedColor={'magenta'}
            altColor={'gray'}
          />
          <Togglecon
            isSelected={this.state.longWait}
            likeCount={0}
            title={'Long Wait'}
            onIconPress={() => this.toggleSelection('longWait') }
            theIcon={'clock-o'}
            selectedColor={'magenta'}
            altColor={'gray'}
          />
          <Togglecon
            isSelected={this.state.crowded}
            likeCount={0}
            title={'Crowded'}
            onIconPress={() => this.toggleSelection('crowded') }
            theIcon={'meh-o'}
            selectedColor={'magenta'}
            altColor={'gray'}
          />
        </View>
        <View style={{
          flex: 12,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'white',
            width: '100%',
            height: '30%'
          }}>
            <TextInput
              onChangeText={comment => this.setState({comment})}
              editable = {true}
              maxLength = {140}
              autoGrow = {true}
              returnKeyType = 'done'
              maxHeight = {600}
              style={{
                fontSize: 18,
                color: '#97ACB3',
                backgroundColor: 'white',
                padding: '3%'
              }}
            />
          </View>
          <Badge
            value='+ Update'
            containerStyle={{
              backgroundColor: '#1F252A',
              borderColor: 'orange',
              borderWidth: 1,
            }}
            textStyle={{
              color: 'orange',
              fontSize: 24,
            }}
            onPress={() => {this.props.actions.submitAttempt(
            {
              "user_id" : this.getUUID(),
              "user_name" : this.props.profileUserName,
              "comment_body" : this.state.comment,
              "comment_on_line" : this.props.selectedLine,
              "station_name" : this.props.previewedStation,
              "station_uid" : this.props.previewedStationUid,
              "station_lines" : this.props.previewedStationLines,
              "status" : this.state.status,
              "timestamp" : this.getTimeStamp()
            }
            )}}
          />
          <Text
            style={{
              color: '#97ACB3'
            }}
            onPress={()=> this.props.navigation.dispatch(NavigationActions.back()) }
          >
            No, Thanks
          </Text>
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
          isCheckedIn: state.checkin.isCheckedIn,
          showCheckIn: state.checkin.showCheckIn,
          submitInProgress: state.checkin.submitInProgress,
          checkin_data: state.checkin.checkin_data,
          checkin_count: state.checkin.checkin_count,
          profileUserName: state.profile.user_name,

          previewedStation: state.supermap.previewedStation,
          previewedStationUid: state.supermap.previewedStationUid,
          previewedStationLines: state.supermap.previewedStationLines,
          selectedLine: state.supermap.selectedLine,
          specialStops: state.supermap.specialStops,
        } 
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(CheckIn);

/** Appendix

<Text style={{
              fontSize: 24,
              color: 'white'
            }}>
              How's the ride going?
            </Text>

**/

/** Submit button

<Button 
              large
              disabled={this.props.submitInProgress}
              icon={{name: 'commenting-o', type: 'font-awesome'}}
              backgroundColor='magenta'
              title='SUBMIT'
              onPress={() => {this.props.actions.submitAttempt(
                {
                  "user_id" : this.getUUID(),
                  "user_name" : "fochin82",
                  "comment_body" : this.state.comment,
                  "comment_on_line" : this.props.selectedLine,
                  "station_name" : this.props.previewedStation,
                  "station_uid" : this.props.previewedStationUid,
                  "station_lines" : this.props.previewedStationLines,
                  "status" : this.state.status,
                  "timestamp" : this.getTimeStamp()
                }
            )} }
            />
**/

/** Comment Box

<FormInput
            containerStyle={{
              backgroundColor: 'white',
              height: 100,
            }}
            //multiline={true}
            //numberOfLines={4}
            onChangeText={comment => this.setState({comment})}
          />

**/
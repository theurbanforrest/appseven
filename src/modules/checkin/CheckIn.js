
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
      status: '',

      trainStuck: false,
      longWait: false,
      packedAF: false
    }
  }

  componentWillMount() {
    this.props.actions.checkinStart();
  }

  componentDidUpdate() {
    if(this.props.showCheckIn == false){
      this.props.navigation.dispatch(NavigationActions.back())
    }
  }

  toggleSelection(theIcon){
    switch(theIcon){
      case 'trainStuck':
        let x = !this.state.trainStuck;

        this.setState({
          trainStuck: x,
          longWait: false,
          packedAF: false,
          status: x ? 'Train Stuck' : ''
        });
        break;

      case 'longWait':
        let y = !this.state.longWait;

        this.setState({
          trainStuck: false,
          longWait: y,
          packedAF: false,
          status: y ? 'Long Wait' : ''
        });
        break;

      case 'packedAF':
        let z = !this.state.packedAF;

        this.setState({
          trainStuck: false,
          longWait: false,
          packedAF: z,
          status: z ? 'Packed AF' : ''
        });
        break;
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

  render() {

    return (
            <View style={{
        //position: 'absolute',
        //top: '75%',
        //right: '0%',
        //width: '100%',
        paddingTop: '5%',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      }}> 

        <View style={{
          flex: 12,
          flexDirection: 'column',
          //backgroundColor: 'powderblue',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '5%'
        }}>
          <View style={{
            flex: 4,
            flexDirection: 'column',
            //backgroundColor: 'blue',
          }}>
          </View>
          <View style={{
            flex: 12,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <Avatar
              large
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/men/49.jpg' }}
              //onPress={onMenuPress}
            />
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
            
          </View>
          <View style={{
            flex: 8,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 8,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Togglecon
                  isSelected={this.state.trainStuck}
                  likeCount={0}
                  title={'Train Stuck'}
                  onIconPress={() => this.toggleSelection('trainStuck') }
                  theIcon={'hand-paper-o'}
                  selectedColor={'purple'}
                  altColor={'gray'}
                />
              </View>
              <View style={{
                flex: 8,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Togglecon
                  isSelected={this.state.longWait}
                  likeCount={0}
                  title={'Long Wait'}
                  onIconPress={() => this.toggleSelection('longWait') }
                  theIcon={'meh-o'}
                  selectedColor={'purple'}
                  altColor={'gray'}
                />
              </View>
              <View style={{
                flex: 8,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Togglecon
                  isSelected={this.state.packedAF}
                  likeCount={0}
                  title={'Packed AF'}
                  onIconPress={() => this.toggleSelection('packedAF') }
                  theIcon={'meh-o'}
                  selectedColor={'purple'}
                  altColor={'gray'}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{
          flex: 12,
          flexDirection: 'column',
          paddingLeft: '3%',
          paddingRight: '3%',
        }}>
          <FormLabel>Add a comment</FormLabel>
          <FormInput
            containerStyle={{
              backgroundColor: 'white',
              height: 100,
            }}
            //multiline={true}
            //qnumberOfLines={4}
            onChangeText={comment => this.setState({comment})}
          />
          <View style={{
            paddingTop: '3%',
          }}>
            <Button 
              large
              disabled={this.props.submitInProgress}
              icon={{name: 'commenting-o', type: 'font-awesome'}}
              backgroundColor='purple'
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
            <Button
              small
              icon={{name: 'meh-o', type: 'font-awesome'}}
              backgroundColor='orange'
              title='No, thanks'
              onPress={()=> this.props.navigation.dispatch(NavigationActions.back()) }
            />
          </View>
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


          previewedStation: state.supermap.previewedStation,
          previewedStationUid: state.supermap.previewedStationUid,
          previewedStationLines: state.supermap.previewedStationLines,
          selectedLine: state.supermap.selectedLine
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
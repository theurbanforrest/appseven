import React, { PropTypes, Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image

} from 'react-native';
import {
  Avatar,
  Icon,
  Badge,
} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info'
import PhotoUpload from 'react-native-photo-upload'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { styles } from './styles'

import EditableName from '../../components/EditableName'
import LoadingOverlay from '../../components/LoadingOverlay'

    //need this for Components instead of pure functions
    import * as Actions from './actions'

class Profile extends Component {

  //need this for Components instead of pure functions
  constructor(props) {
    super(props);

    this.state = {
      theName: this.props.user_name
    }

  }

  getUUID(){

    let x = DeviceInfo.getUniqueID();
    return x;
  }

  getTimeStamp(){
    return Date.now();
  }

  updateName(newName,tableId){

    let x = this.getUUID();

    console.log('newName is ' + newName);
    console.log('getUUID is ' + x );
    console.log('id is ' + tableId);

    this.props.actions.submitNameUpdateAttempt({
      "user_id": x,
      "user_name": newName,
      "id": tableId
    });

    return true;
  }

  getDefaultPic(theUuid){

    let baseUrl = 'http://165.227.71.39:3000/api/UserPictures/picture/download/';

    return  baseUrl + theUuid + '.jpeg'
  }

  componentWillMount(){
    let x = this.getUUID();
    this.props.actions.fetchNameAttempt(x);
  }

  componentWillReceiveProps(){

  }

  render() {
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <View style={{
          paddingTop: '10%',
          paddingBottom: '3%',
          paddingLeft: '3%',
          paddingRight: '3%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#1F252A'
        }}>
          <View style={{
            paddingRight: '3%'
          }}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={{uri: 'http://104.236.3.128/img/prayfam.png'}}
            />
          </View>
          <Text style={{
            fontFamily: 'Menlo',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#97ACB3',
          }}>
            undercrowd
          </Text>
        </View>
        <ScrollView style={{
          flex: 1,
          flexDirection: 'column',
          paddingTop: '10%',
          paddingLeft: '3%',
          paddingRight: '3%',
          backgroundColor: 'black'
        }}>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: '3%',
          }}>
            <PhotoUpload
               onPhotoSelect={avatar => {

                 console.log('base64 string is ' + avatar);
                 
                 avatar ? this.props.actions.submitProfilePictureAttempt(avatar,this.getUUID(),this.getTimeStamp()) : console.log('avatar does not exist')
                 
               }}
             >
               <Image
                 style={{
                   paddingVertical: 30,
                   width: 150,
                   height: 150,
                   borderRadius: 75
                 }}
                 resizeMode='cover'
                 source={{
                  uri: this.getDefaultPic(this.props.device_uuid)
                 }}
               />
             </PhotoUpload>
            <View style={{
              paddingTop: '3%',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '90%'
            }}>
              <TextInput
                editable={true} 
                maxLength={21}
                returnKeyType='done'
                defaultValue={this.props.user_name}
                onChangeText={(theName) => this.setState({theName})}
                autoCapitalize='none'
                onEndEditing={() => this.updateName(this.state.theName,this.props.table_id)}
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#97ACB3',
                  fontFamily: 'Menlo',
                  width: '100%',
                  textAlign: 'center'
              }}>
              </TextInput>
              <Badge
                color='orange'
                value='Edit'
              />
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            paddingTop: '3%',
            paddingBottom: '3%',
          }}>
            <View style={{
              flex: 3,
              flexDirection: 'row',
            }}>
              <Icon 
                type='font-awesome'
                name='bell-o'
                size={24}
                color='#97ACB3'
              />
            </View>
            <View style={{
              flex: 17,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 18,
                color: '#97ACB3'
              }}>
                Push Notifications
              </Text>
            </View>
            <View style={{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Icon
                type='font-awesome'
                name='toggle-off'
                size={48}
                color='#97ACB3'
              />
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            paddingTop: '3%',
            paddingBottom: '3%',
          }}>
            <View style={{
              flex: 3,
              flexDirection: 'row',
            }}>
              <Icon 
                type='font-awesome'
                name='twitter'
                size={24}
                color='#97ACB3'
              />
            </View>
            <View style={{
              flex: 17,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 18,
                color: '#97ACB3'
              }}>
                Connect To Twitter
              </Text>
            </View>
            <View style={{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
              <Icon
                type='font-awesome'
                name='toggle-on'
                size={48}
                color='orange'
              />
            </View>
          </View>
        </ScrollView>
        <LoadingOverlay
          isVisible={this.props.is_loading}
          onCancelPress={() => this.props.actions.fetchHasErrored()}
        />
      </View>

    )
  }
}

/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {

          device_uuid: state.profile.device_uuid,
          user_name: state.profile.user_name,
          is_loading: state.profile.is_loading,
          table_id: state.profile.table_id
        }
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(Profile);


/*----- APPENDIX -----*/
<Avatar
              xlarge
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/men/49.jpg' }}
              //onPress={onMenuPress}
            />

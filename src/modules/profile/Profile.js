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
  Icon
} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info'

//import { stationdetails }  from './data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { styles } from './styles'

import RiderComment from '../../components/RiderComment'

    //need this for Components instead of pure functions
    import * as Actions from './actions'

class Profile extends Component {

  //need this for Components instead of pure functions
  constructor(props) {
    super(props);


  }

  render() {
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <View style={{
          paddingTop: '8%',
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
          paddingTop: '3%',
          paddingLeft: '3%',
          paddingRight: '3%',
          backgroundColor: 'black'
        }}>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingBottom: '3%'
          }}>
            <Avatar
              xlarge
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/men/49.jpg' }}
              //onPress={onMenuPress}
            />
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#97ACB3'
            }}>
              fochin82
            </Text>
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
          //feedData: state.hellofeed.feed_data,  //get via this.props.feed_data
          //likedComments: state.hellofeed.liked_comments,

        }
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(Profile);


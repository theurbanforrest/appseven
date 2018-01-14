import React,{ Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'
import {
  Badge
} from 'react-native-elements'
import {
  NavigationActions
} from 'react-navigation'
import PropTypes from 'prop-types'
import DeviceInfo from 'react-native-device-info'



/** -- FOR COMPONENT --**/
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'

    import * as Actions from './actions'
    import * as ProfileActions from '../profile/actions'
    import * as HelloFeedActions from '../hellofeed/actions'

class AppLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'http://165.227.71.39:3000/api/RiderComments?filter=%7B%22where%22%3A%7B%22status%22%3A%7B%22regexp%22%3A%22%5BA-Za-z0-9%5D%7B1%2C%7D%22%7D%2C%22comment_body%22%3A%7B%22regexp%22%3A%22%5BA-Za-z0-9%5D%7B1%2C%7D%22%7D%7D%2C%22order%22%3A%22timestamp%20DESC%22%7D',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  componentWillMount(){
    this.props.profileActions.fetchNameAttempt(this.getUUID());
    this.props.actions.showFauxLoading(
      {
        sponsorName: 'Casper',
        imageURI: 'http://casper.com'
      }
    );
  } 

  getUUID(){

    let x = DeviceInfo.getUniqueID();
    return x;
  }

  render(){
    return(
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          backgroundColor: '#1F252A'
        }}>
          <View style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '60%'
          }}>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={{uri: 'http://104.236.3.128/img/prayfam.png'}}
            />
            <Text style={{
              fontFamily: 'Menlo',
              fontSize: 36,
              fontWeight: 'bold',
              color: '#97ACB3',
            }}>
              undercrowd
            </Text>
            <Text style={{
              fontSize: 24,
              color: '#97ACB3',
            }}>
              The People's Subway App
            </Text>
            <Text style={{
              fontSize: 18,
              color: '#97ACB3',
            }}>
              Welcome {this.props.profilesUserName}!
            </Text>
            <Badge
              value='+ Start'
              containerStyle={{
                backgroundColor: '#1F252A',
                borderColor: 'orange',
                borderWidth: 1,
              }}
              textStyle={{
                color: 'orange',
                fontSize: 24,
              }}
              onPress={() => this.props.navigation.dispatch(NavigationActions.navigate({
                routeName: 'Tabs'
              }))}
            />
            <Text style={{
              fontSize: 18,
              color: '#97ACB3',
            }}>
              @theurbanforrest • 2018
            </Text>
          </View>
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
          profilesUserName: state.profile.user_name,
        }
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch),
        profileActions: bindActionCreators(ProfileActions, dispatch),
        helloFeedActions: bindActionCreators(HelloFeedActions, dispatch)
      }),
  )(AppLanding);
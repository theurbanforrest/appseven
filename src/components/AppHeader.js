import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'
import {
  Avatar,
  Icon,
} from 'react-native-elements'
import LocationStatusButton from './LocationStatusButton'

/*-- THE COMPONENT --*/
const AppHeader = (props: AppHeaderProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {

      onMenuPress,
      isLocationSet

    } = props;

  //do functions

    return(
        <TouchableHighlight onPress={onMenuPress} style={{
          width: '100%',
        }}>
        <View style={{
          //position: 'absolute',
          //top: '88%',
          //right: '0%',
          width: '100%',
          //paddingTop: '5%',
          //paddingBottom: '2%',
          //paddingLeft: '3%',
          //height: '12%',
          backgroundColor: 'black', 
          flexDirection: 'row',
          //justifyContent: 'center',
          alignItems: 'center',
        }}>
          
              <View style={{
                flex: 3,
              }}>
                <Avatar
                  small
                  rounded
                  source={{uri: 'https://randomuser.me/api/portraits/men/49.jpg' }}
                  //onPress={onMenuPress}
                />
              </View>
              <View style={{
                flex: 18
              }}>
                <Text
                  style={{
                    color: 'white',
                    //fontFamily: 'serif',
                    fontSize: 18
                  }}
                >
                  fochin82
                </Text>
                <Text
                  style={{
                    color: 'white',
                    //fontFamily: 'serif',
                    fontSize: 14
                  }}
                >
                  Level 3 - 23/50 - 27 pts to lvl 4
                </Text>
              </View>
              <View style={{
                flex: 3
              }}>
                <Icon
                  name='ellipsis-v'
                  type='font-awesome'
                  //onPress={onMenuPress}
                  color='white'
                />
              </View>
        </View>
        </TouchableHighlight>
    );
}

  //Enter the default values of the props
    AppHeader.defaultProps = {
      //enter the default values here

        //onMenuPress: not setting func by default
        //isLocationSet: not setting bool by default
    };

  //Define the props here
    AppHeader.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        onMenuPress: PropTypes.func,
        isLocationSet: PropTypes.bool,

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here

    });


export default AppHeader;
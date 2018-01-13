import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

/*-- THE COMPONENT --*/
const LoadingOverlay = (props: LoadingOverlayProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      isVisible

    } = props;

  //do functions
    //insert some functions here

  if(isVisible){
    return(
      <View style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Icon
          size={48}
          name='hand-peace-o'
          type='font-awesome'
          color='#97ACB3'
        />

        <Text style={{
          color: '#97ACB3',
          fontFamily: 'Menlo',
          fontSize: 24
        }}>
        Loading...
        </Text>

      </View>
    )
  } else return null;
    
}

  //Enter the default values of the props
    LoadingOverlay.defaultProps = {

        isVisible: false
    };

  //Define the props here
    LoadingOverlay.propTypes = {

        isVisible: PropTypes.bool
    };


export default LoadingOverlay;
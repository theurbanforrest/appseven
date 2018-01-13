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
        top: 0,
        right: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>

        <Icon
          size={48}
          name='spinner'
          type='font-awesome'
          color='#97ACB3'
        />

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
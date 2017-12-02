// @flow

/*
LocationStatusButton: a clickable button that is either on or off
*/

import React, {  } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

/*-- THE COMPONENT --*/
const LocationStatusButton = (props: LocationStatusButtonProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    
    const {
      isSelected,
      onIconPress
    } = props;

  //do functions
    let whichIcon;

    if(isSelected==true){
      whichIcon = 'user-plus'
    } else {
      whichIcon = 'user-plus'
    }
  
    return(
      <View>
          <Icon
            reverse={true}
            size={30}
            //raised={isSelected}
            name={whichIcon}
            color='goldenrod'
            type='font-awesome'
            onPress={onIconPress}
          />
      </View>

    )
}

  //Enter the default values of the props
    LocationStatusButton.defaultProps = {
      //enter the default values here

        isSelected: false,
        //onIconPress: not setting func by default
    };

  //Define the props here
    LocationStatusButton.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])


        isSelected: PropTypes.bool,
        onIconPress: PropTypes.func

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here
    });

export default LocationStatusButton;
// @flow

/*
HeartButton: a heart button that displays a counter
Use with smart component to increment/decrement and fill/unfill
Similar to Twitter like button
*/

import React, { PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { Button, Icon } from 'react-native-elements'


/*-- THE COMPONENT --*/
const HeartButton = (props: HeartButtonProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    
    const {
      isSelected,
      likeCount,
      onIconPress
    } = props;

  //do functions
  let whichIcon = 'heart';

    if(!isSelected){
      whichIcon = 'heart-o';
    }

    return(
        <View style={styles.container}>
          <Icon 
            name={whichIcon}
            color='purple'
            type='font-awesome'
            onPress={onIconPress}
            style={{flex: 1}}
          />
          <Text style={{flex: 1}}>
            {likeCount}
          </Text>
        </View>

    )
}

  //Enter the default values of the props
    HeartButton.defaultProps = {
      //enter the default values here

        isSelected: false,
        likeCount: 0,
        //onIconPress left undefined by default
    };

  //Define the props here
    HeartButton.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])


        isSelected: PropTypes.bool,
        likeCount: PropTypes.number,
        onIconPress: PropTypes.func

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here
        heartSize: 40,
        container: {
          flex: 1,                    //1 flex unit
          flexDirection: 'row',       //Order left to right
          justifyContent: 'center',   //Align the group center
          alignSelf: 'flex-start',    //Align the group top
          alignItems: 'center',       //Align items to each other center
          //padding: 5
        },
    });

export default HeartButton;
// @flow

/*
HeartButtonVertical: a heart button that displays a counter
Use with smart component to increment/decrement and fill/unfill
Similar to Twitter like button
*/

import React, {  } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

/*-- THE COMPONENT --*/
const HeartButtonVertical = (props: HeartButtonVerticalProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    
    const {
      iconPrimary,
      iconAlt,
      isSelected,
      likeCount,
      onIconPress,
      isDisabled,
    } = props;

  //do functions
  let whichIcon = iconPrimary;
  let whichColor = 'purple';
  let whichType = 'font-awesome';
  let whichFontColor = 'white';
  let likesToDisplay = likeCount;

  if(isSelected){
    whichIcon = iconAlt;;
    whichType = 'font-awesome';
    likesToDisplay = likesToDisplay + 1;
  }

  if(isDisabled){
    whichColor = '#97ACB3';
    whichFontColor = 'black';
  }

  if(likeCount == 99999){
    whichColor = 'purple';
    whichFontColor = 'black';
  }

    return(
      <View style={{
        //flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <Icon 
          name={whichIcon}
          size={36}
          color={whichColor}
          type={whichType}
          onPress={ isDisabled ? '' : onIconPress }
        />
        <Text style={{
          color: whichFontColor,
          fontSize: 18
        }}>
          {likesToDisplay}
        </Text>
      </View>

    )
}

  //Enter the default values of the props
    HeartButtonVertical.defaultProps = {
      //enter the default values here

        isSelected: false,
        likeCount: 0,
        onIconPress: console.log('onIconPress executed'),
        iconPrimary: 'thumbs-o-up',
        iconAlt: 'thumbs-up',
        isDisabled: 'false',
        //onIconPress left undefined by default
    };

  //Define the props here
    HeartButtonVertical.propTypes = {

        isSelected: PropTypes.bool,
        likeCount: PropTypes.number,
        onIconPress: PropTypes.func,
        iconPrimary: PropTypes.string,
        iconAlt: PropTypes.string,
        isDisabled: PropTypes.bool

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here
        heartSize: 40,
        container: {
          flex: 1,                    //1 flex unit
          flexDirection: 'row',       //Order left to right
          justifyContent: 'space-between',   //Align the group center
          alignSelf: 'flex-start',    //Align the group top
          alignItems: 'center',       //Align items to each other center
          //padding: 5
        },
    });

export default HeartButtonVertical;
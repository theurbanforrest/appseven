/*
  Togglecon: a heart button that displays a counter
  Use with smart component to increment/decrement and fill/unfill
  Similar to Twitter like button
*/

import React, {  } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

/*-- THE COMPONENT --*/
const Togglecon = (props: ToggleconProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    
    const {
      theIcon,
      isSelected,
      selectedColor,
      altColor,
      likeCount,
      onIconPress,
      title,
    } = props;

  //do functions
  let whichIcon = theIcon;
  let whichColor = selectedColor;
  let whichType = 'font-awesome';
  let whichFontColor = '#FFFFFF';


  let bRadius = 4;
  let bWidth = 0.5;
  let bColor: '#d6d7da';

    if(!isSelected){
      whichIcon = theIcon;
      whichColor = altColor;
      whichType = 'font-awesome';
      whichFontColor = altColor;

      bRadius = 0;
      bWidth = 0;
      bColor = '#000000';
    }

    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        //borderRadius: bRadius,
        //borderWidth: bWidth,
        //borderColor: bColor,
      }}>
        <Icon
          reverse={false}
          //raised={isSelected}
          name={whichIcon}
          color={whichColor}
          type={whichType}
          onPress={onIconPress}
          size={60}
        />
        <Text style={{
          color: whichFontColor
        }}>
          {title}
        </Text>
      </View>

    )
}

  //Enter the default values of the props
    Togglecon.defaultProps = {
      //enter the default values here

        isSelected: false,
        likeCount: 0,
        title: 'TheTitle',
        //onIconPress left undefined by default

        theIcon: 'meh-o',
        isSelected: false,
        selectedColor: 'purple',
        altColor: 'blue',
        likeCount: 0,
        //onIconPress,
    };

  //Define the props here
    Togglecon.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        isSelected: PropTypes.bool,
        likeCount: PropTypes.number,
        title: PropTypes.string,

        onIconPress: PropTypes.func,
        theIcon: PropTypes.string,
        isSelected: PropTypes.bool,
        selectedColor: PropTypes.string,
        altColor: PropTypes.string,
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

export default Togglecon;
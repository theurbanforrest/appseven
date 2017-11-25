import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import {
  Button,
  Icon,
  Badge
} from 'react-native-elements';

/*-- THE COMPONENT --*/
const CheckInThree = (props: CheckInThreeProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {

      visible,

    } = props;

  //do functions

    function howzit(braddah){

      console.log(braddah);
      return true;
    }

  //if visible is false, return nothing
  if(visible){
    return(
        <View style={{
          position: 'absolute',
          top: '12%',
          right: '0%',
          width: '100%',
          padding: '3%',
          height: '63%',
          backgroundColor: '#00000080',
        }}>

          <Text>Hello World</Text>

        </View>
    )
  } else return false;
    
}

  //Enter the default values of the props
    CheckInThree.defaultProps = {
      //enter the default values here
        visible: true,
    };

  //Define the props here
    CheckInThree.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        visible: PropTypes.bool,

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here

    });


export default CheckInThree;


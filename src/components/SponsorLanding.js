import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import {
  Avatar,
  Icon
} from 'react-native-elements';

/*-- PURE FUNCTION --*/
const SponsorLanding = (props: SponsorLandingProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      isVisible,
      sponsor,
      sponsorImageUri,
      sponsorImageHeight,
      sponsorImageWidth

    } = props;

  //do functions
    //insert some functions here

  //return stuff
    if(isVisible){
      return(
      <View style={{
        //flex: 1,
        //backgroundColor: 'powderblue'
      }}>
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
          }}
          source={{
            uri: sponsorImageUri
          }}
          resizeMode='contain'
          aspectRatio={0.5}
        >
        </Image>
      </View>
    )
  }
  else return(
    <View style={{
    }}>
      <Text style={{
        fontSize: 24,
        color: '#97ACB3',
      }}>
        The People's Subway App
      </Text>
      <Text style={{
        fontSize: 14,
        color: '#546165',
        textAlign: 'center'
      }}>
        Crowdsourced alerts from your fellow, grouchy New Yorkers
      </Text>
    </View>
  );
}

  //Enter the default values of the props
    SponsorLanding.defaultProps = {
      //enter the default values here
        sponsor: 'Casper',                               
        sponsorImageUri: 'http://104.236.3.128/img/testsponsor-landscape.png',
        sponsorImageHeight: 100,
        sponsorImageWidth: 300,
        isVisible: false
    };

  //Define the props here
    SponsorLanding.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        sponsor: PropTypes.string,
        sponsorImageUri: PropTypes.string,
        sponsorImageHeight: PropTypes.number,
        sponsorImageWidth: PropTypes.number,
        isVisible: PropTypes.bool
    };

  //Define styles
    const styles = StyleSheet.create({
    });


export default SponsorLanding;
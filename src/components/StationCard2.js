import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';
import {
  Card,
  Avatar,
  Icon
} from 'react-native-elements';

/*-- THE COMPONENT --*/
const StationCard = (props: StationCardProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      title,
      lineColor,
      lineNames,
      mood,
      crowd,
      onMoodPress,
      onCrowdPress,
    } = props;

  //do functions
    //insert some functions here

  //return stuff
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <View style={{flex: 16, backgroundColor: 'gray'}}>
          <Text style={{
            color: 'orange',
            fontSize: 48
          }}
          >
            {title}
          </Text>
        </View>
        <View style={{flex: 8, flexDirection: 'row'}}>
          <View style={{
            flex: 8,
            flexDirection: 'column',
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: 'white',
              fontSize: 24
            }}>
              15m ago
            </Text>
            <Text style={{
              color: 'white'
            }}>
              Last checkin
            </Text>
          </View>
          <View style={{
            flex: 8,
            flexDirection: 'column',
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon
              size={30}
              name='meh-o'
              type='font-awesome'
              color='orange'
            />
            <Text style={{color: 'orange'}}>
              Mood: Meh
            </Text>
          </View>
          <View style={{
            flex: 8,
            flexDirection: 'column',
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon
              size={30}
              name='pencil-square-o'
              type='font-awesome'
              color='white'
            />
            <Text style={{color: 'white'}}>
              Check-In
            </Text>
          </View>
        </View>
      </View>
    )
}

  //Enter the default values of the props
    StationCard.defaultProps = {
      //enter the default values here
      title: 'title default',
      lineColor: 'lineColor default',
      lineNames: { 'lineNames' : 'default' },
      mood: 'mood default',
      crowd: 'crowd default',
      //onMoodPress not set by default,
      //onCrowdPress not set by default,
    };

  //Define the props here
    StationCard.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])
      title: PropTypes.string,
      lineColor: PropTypes.string,
      lineNames: PropTypes.any,
      mood: PropTypes.string,
      crowd: PropTypes.string,
      onMoodPress: PropTypes.func,
      onCrowdPress: PropTypes.func
    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here
        container: {
          flex: 1,
          flexDirection: 'column'
        },
        card: {
          flex: 5,
          backgroundColor: 'powderblue'
        },
        interactors: {
          flex: 1,
          flexDirection: 'row',             //align the group top
          justifyContent: 'center',  //align the group center
          alignItems: 'center',             //align items to each other center
          padding: '5%',
          backgroundColor: 'violet'

        },
        heartButton: {
          flex: 1,
        }

    });


export default StationCard;
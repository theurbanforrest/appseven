import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableHighlight,
  Text,
  Alert
} from 'react-native';
import {
  Badge,
  Card,
  Avatar,
  Icon
} from 'react-native-elements';
import HeartButton from './HeartButton';
import { lineList } from '../modules/supermap/data'

/*-- THE COMPONENT --*/
const RiderComment = (props: RiderCommentProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      userName,
      status,
      imageSrc,
      height,
      stationName,
      stationLines,

      comment,
      commentOnLine,
      isLiked,
      timestamp,

      likeCount,
      onLikePress,
      onRemovePress,
      lineBackground,


    } = props;

  //do functions
    function getBackgroundColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].bg;
        }
        //else i++
       }
       //if no match
       return 'gainsboro';
    }

    function getTextColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].text;
        }
        //else i++
       }
       //if no match
       return '#97ACB3';
    }

    function isHighlighted(partial,highlightColor,defaultColor){

      if(partial!=''){
        return highlightColor;
      }
      else return defaultColor;
    }

    function showDismissButton(partial,theFunc){
      if(partial!=''){
        return (
          <Icon
            name='times'
            type='font-awesome'
            color='purple'
            onPress={() => theFunc}
          />
        )
      }
      else return false;
    }

    function getFriendlyTime(x){

      let inMins = Math.round( (Date.now()-x) / 1000 / 60 );
      let inHrs = Math.round( inMins / 60 );
      let inDays = Math.round( inHrs / 24 );
      let inWeeks = Math.round( inDays / 7 );

      switch (true) {
          case (inMins == 0):
            return '1m';
            break;
          case (inMins < 60):
            return inMins + 'm';
            break;
          case (inMins >= 60 && inMins < 1440):
            return inHrs + 'h';
            break;
          case (inMins >= 1440):
            return inDays + 'd';
            break;
          case (inDays >= 7):
            return inWeeks + 'd';
            break;
          default:
            return '1h';
            break;
      }
    }

    function toggleIcon(){
      
    }

  //return stuff
    return(
      <View style={{
        flex: 1,
        flexDirection: 'column', 
        paddingTop: '3%', 
        paddingBottom: '3%', 
        justifyContent: 'space-between', 
        backgroundColor: 'black'
      }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <Avatar
              medium
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/women/' + likeCount + '.jpg' }}
            />
          </View>
          <View style={{flex: 18, flexDirection: 'column'}}>
            <View style={{flex: 4}}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: isHighlighted(status,'#97ACB3','#97ACB3'),
              }}>
                {stationName}
              </Text>
              <Text style={{
                fontSize: 14,
                color: isHighlighted(status,'#97ACB3','#97ACB3'),
                //fontStyle: 'italic'
              }}>
                { getFriendlyTime(timestamp) } ago • {userName}
                </Text>
                <Text/>
            </View>
            <View style={{
              flex: 20
            }}>
              
              <Text style={{
                color: isHighlighted(status,'#97ACB3','#97ACB3'),
                fontSize: 18,
              }}>
                {comment}
              </Text>
            </View>
          </View>
          <View style={{ flex: 4,
            flexDirection: 'column',
          }}>
            <View style={{
            }}>
              <Badge
                value= {commentOnLine}
                containerStyle={{
                  backgroundColor: getBackgroundColor(commentOnLine,lineList), //keeping static, not connected to selectedLine
                  width: '100%',
                }}
                textStyle={{
                  color: getTextColor(commentOnLine,lineList), //keeping static, not connected to selectedLine
                  fontSize: 18,
                }}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: '5%',
            }}>
              <Text style={{
                color: 'orange',
                textAlign: 'center'
              }}>
                {status}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 4, flexDirection: 'row', paddingTop: '3%'}}>
          <View style={{flex: 4}}>
          </View>
          <View style={{flex: 4}}>
            <HeartButton
              isSelected={isLiked}
              likeCount={likeCount}
              onIconPress={onLikePress}
              style={styles.heartButton}
            />
          </View>
          <View style={{flex: 4}}>
            { showDismissButton(status,()=>console.log('clicked Dismiss')) }
          </View>
          <View style={{flex: 11}}>
          </View>
        </View>
      </View>
    )
}

  //Enter the default values of the props
    RiderComment.defaultProps = {
      //enter the default values here

        //title: '',
        imageSrc: 'https://randomuser.me/api/portraits/women/32.jpg',                               
        height: 150,
        isLiked: false,
        likeCount: 0,
        lineBackground: 'blue',
        comment: '',
        onLikePress: console.log('onLikePress called'),
        onRemovePress: console.log('onRemovePress called'),
    };

  //Define the props here
    RiderComment.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        userName: PropTypes.string,
        imageSrc: PropTypes.string,
        height: PropTypes.number,
        isLiked: PropTypes.bool,
        likeCount: PropTypes.number,
        comment: PropTypes.string,
        commentOnLine: PropTypes.string,
        timestamp: PropTypes.number,
        onLikePress: PropTypes.func,
        onRemovePress: PropTypes.func,
        lineBackground: PropTypes.string,
        status: PropTypes.string
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


export default RiderComment;

/**

<Text style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold'
              }}>
                {status}
              </Text>

**/
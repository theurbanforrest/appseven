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
  Icon,
  Badge
} from 'react-native-elements';
import HeartButton from './HeartButton';
import HeartButtonVertical from './HeartButtonVertical';
import ToggleconMini from './ToggleconMini';

/*-- THE COMPONENT --*/
const FeaturedComment = (props: FeaturedCommentProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      hasReport,
      title,
      imageSrc,
      height,
      comment,
      isLiked,
      likeCount,
      onLikePress,
      onCommentPress,
      onUpdatePress,

    } = props;

  //do functions
    //insert some functions here

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

  function getStartingText(commentBody){
    let x = commentBody;

    if(x == ''){
      return x;
    }
    else if (x.length < 20){
      return ': "' + x +'"';
    }

    else x = ': "'+ x.substr(0,20) + '...';

    console.log(x);
    return x;
  }

  function getFriendlyUserName(rawUserName){
    return ' @' + rawUserName;
  }

  if(!hasReport){
    return(
      
        <View style={{
          paddingTop: '2%',
          flex: 1,
          flexDirection: 'column',
        }}>
          <TouchableHighlight
            onPress={onUpdatePress}
          >
            <View style={{
              height: '100%',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              //backgroundColor: 'goldenrod',
            }}>
              <Text style={{
                color: '#97ACB3',
                fontSize: 18,
                fontStyle: 'italic',
              }}>
                No reports.  Click to
              </Text>
              <View style={{
                paddingLeft: '3%'
              }}>
                <Badge
                  value='+ Update'
                  containerStyle={{
                    backgroundColor: '#1F252A',
                    borderColor: 'orange',
                    borderWidth: 1
                  }}
                  textStyle={{
                    color: 'orange'
                  }}
                  onPress={onUpdatePress}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>
      
      
    );
  }
  
  else return(
     <View style={{
      flex: 24,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#1F252A',
      width: '100%'
    }}>
      <View style={{
        flex: 17,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
      }}>
        <Avatar
          medium
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/women/19.jpg' }}
        />
        <Text
          style={{
            color: 'magenta',
            fontSize: 24,
            fontWeight: 'bold'
          }}
        >
          {comment.status}
          <Text style={{
            color: '#546165',
            fontSize: 16,
            fontWeight: 'normal'
          }}>
            {getFriendlyUserName(comment.user_name)}
          </Text>
        </Text>
        
        <Text
          style={{
            color: '#97ACB3',
            fontSize: 16,
            fontStyle: 'normal'
          }}
        >
           {getFriendlyTime(comment.timestamp)} ago{getStartingText(comment.comment_body)}
        </Text>
      </View>
      <View style={{
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          width: '100%'
        }}>
          <HeartButtonVertical
            iconPrimary='thumbs-o-up'
            iconAlt='thumbs-up'
            isSelected={false}
            likeCount={likeCount}
            onIconPress={onLikePress}
            isDisabled={false} //{ hasReport ? false : true }
          />
          <HeartButtonVertical
            iconPrimary='commenting-o'
            iconAlt='commenting-o'
            isSelected={false}
            likeCount={2}
            onIconPress={onCommentPress}
            isDisabled={false} //{ hasReport ? false : true }
          />
        </View>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Badge
            value='+ Update'
            containerStyle={{
              backgroundColor: '#1F252A',
              borderColor: 'orange',
              borderWidth: 1
            }}
            textStyle={{
              color: 'orange'
            }}
            onPress={onUpdatePress}
          />
        </View> 
      </View>
    </View>
    )
  }

  //Enter the default values of the props
    FeaturedComment.defaultProps = {
      //enter the default values here

        hasReport: 'false',
        title: '',
        imageSrc: 'https://randomuser.me/api/portraits/women/32.jpg',                               
        height: 150,
        isLiked: false,
        likeCount: 0,
        comment: 'no comment',
        onLikePress: console.log('did onLikePress()'),
        onCommentPress: console.log('did onCommentPress()'),
    };

  //Define the props here
    FeaturedComment.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        hasReport: PropTypes.bool,
        title: PropTypes.string,
        imageSrc: PropTypes.string,
        height: PropTypes.number,
        isLiked: PropTypes.bool,
        likeCount: PropTypes.number,
        comment: PropTypes.any,
        onLikePress: PropTypes.func,
        onCommentPress: PropTypes.func,
        onUpdatePress: PropTypes.func,
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
          //padding: '5%',
          backgroundColor: 'violet'

        },
        heartButton: {
          flex: 1,
        }
    });

export default FeaturedComment;

/** Long Wait giant icon

<View style={{
        flex: 5,
        flexDirection: 'column',
        //height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        //backgroundColor: 'powderblue'
      }}>
        <Icon
          //reverse
          name='clock-o'
          type='font-awesome'
          color='magenta'
        />
      </View>

**/

/** No Reports view

if(!hasReport){
    return(
      <View style={{
        paddingTop: '1%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //backgroundColor: 'goldenrod',
      }}>
        <Text style={{
          color: '#97ACB3',
          fontSize: 18,
          fontStyle: 'italic',
        }}>
          No reports.  Click to add...
        </Text>
      </View>
    );
  }

**/
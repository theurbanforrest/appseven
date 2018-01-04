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
                  onPress={onLikePress}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>
      
      
    );
  }
  
  else return(
      <View style={{
        paddingTop: '1%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: 'goldenrod',
      }}>

          <View style={{
            flex: 17,
            height: '100%',
            flexDirection: 'column',
            //backgroundColor: 'orange'
          }}> 
            <Text style={{
              color: hasReport ? 'magenta' : '#97ACB3',
              fontSize: 18,
            }}
            >
              { hasReport ? 'Long Wait' : ''}
            </Text>
            <Text style={{
              color: '#97ACB3',
              fontSize: 14,
              fontWeight: 'bold',
            }}
            >
              { hasReport ? '10m ago • fochin82' : 'No reports'}
            </Text>
            <Text style={{
              color: '#97ACB3',
              fontSize: 18,
              fontStyle: hasReport ? 'normal' : 'italic',
            }}
            >
              { hasReport ? comment : 'Click to Update...'}
            </Text>
          </View>
          <View style={{
            flex: 7,
            flexDirection: 'column',
            justifyContent: 'space-between',
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
                likeCount={17}
                onIconPress={onLikePress}
                isDisabled={ hasReport ? false : true }
              />
              <HeartButtonVertical
                iconPrimary='commenting-o'
                iconAlt='commenting-o'
                isSelected={false}
                likeCount={2}
                onIconPress={onCommentPress}
                isDisabled={ hasReport ? false : true }
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
        comment: PropTypes.string,
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
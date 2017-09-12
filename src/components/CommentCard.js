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
import HeartButton from './HeartButton';

/*-- THE COMPONENT --*/
const CommentCard = (props: CommentCardProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      title,
      imageSrc,
      height,
      comment,
      isLiked,
      likeCount,
      onLikePress

    } = props;

  //do functions
    //insert some functions here

  //return stuff
    return(
      <View style={{flex: 1, flexDirection: 'column', paddingTop: '3%', paddingBottom: '3%', justifyContent: 'space-between', backgroundColor: 'black'}}>
        <View style={{flex: 20, flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <Avatar
              medium
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/women/' + likeCount + '.jpg' }}
            />
          </View>
          <View style={{flex: 18, flexDirection: 'column'}}>
            <View style={{flex: 4}}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                {title}
              </Text>
            </View>
            <View style={{flex: 20}}>
              <Text style={{color: 'white'}}>
                {comment}
              </Text>
            </View>
          </View>
          <View style={{flex: 2}}>
            <Icon
              name='angle-down'
              type='font-awesome'
              color='purple'
            />
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
            <Icon
              name='commenting-o'
              type='font-awesome'
              color='purple'
            />
          </View>
          <View style={{flex: 11}}>
          </View>
        </View>
      </View>
    )
}

  //Enter the default values of the props
    CommentCard.defaultProps = {
      //enter the default values here

        //title: '',
        imageSrc: 'https://randomuser.me/api/portraits/women/32.jpg',                               
        height: 150,
        isLiked: false,
        likeCount: 0,
        //comment not setting by default
        //onLikePress not setting by default
    };

  //Define the props here
    CommentCard.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        title: PropTypes.string,
        imageSrc: PropTypes.string,
        height: PropTypes.number,
        isLiked: PropTypes.bool,
        likeCount: PropTypes.number,
        comment: PropTypes.string,
        onLikePress: PropTypes.func
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


export default CommentCard;

  /*

  <View style={{flex: 1, flexDirection: 'column'}}> //container

          //
            <View
              style={{
                flex: 10,
                backgroundColor:'magenta'
              }}
            >
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                backgroundColor: 'violet',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{flex: 3}}>
                <HeartButton
                isSelected={isLiked}
                likeCount={likeCount}
                onIconPress={onLikePress}
                style={styles.heartButton}
                />
              </View>
              <View style={{flex: 21}} />
            </View>
        </View>
  */

  /*

   <View style={{flex: 1, flexDirection: 'row', paddingTop: '3%', paddingBottom: '3%' }}> 
          <View style={{flex: 4}}>  
            <Avatar
              medium
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/women/8.jpg'}}
            />
          </View>

          <View style={{flex: 20}}>  

            <View style={{flex: 6, backgroundColor: 'powderblue'}}>
              <Text style={{fontWeight: 'bold'}}>
                {title}
              </Text> 
            </View>
            <View style={{flex: 16, backgroundColor: 'skyblue'}}>
              <Text>
                {comment}
              </Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row', backgroundColor: 'violet'}}>
              <View style={{flex: 4}}>
                <HeartButton
                  isSelected={isLiked}
                  likeCount={likeCount}
                  onIconPress={onLikePress}
                  style={styles.heartButton}
                />
              </View>
              <View style={{flex: 20}}>
              </View>
            </View>
          </View>

        </View>

  */
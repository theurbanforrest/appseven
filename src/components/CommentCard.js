import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';
import {
  Card,
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


  //return stuff
    return( 
      <View style={styles.container}>
        <Card
          title={title}
          height={130}
          style={styles.card}
        >
            <Text>
              {comment}
            </Text>
        </Card>
        <HeartButton
          isSelected={isLiked}
          likeCount={likeCount}
          onIconPress={onLikePress}
          style={styles.heartButton}
        />
      </View>
    )
}

  //Enter the default values of the props
    CommentCard.defaultProps = {
      //enter the default values here

        title: 'Forrest Ave',
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
          flexDirection: 'row',
          padding: 10,
        },
        card: {
          flex: 5,
          marginRight: 10,
          backgroundColor: 'gray'
        },
        heartButton: {
          flex: 1,
          padding: 10,
          backgroundColor: 'green'
        }

    });

export default CommentCard;
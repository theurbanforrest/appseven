import React, { PropTypes, Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {
  Badge,
  Card,
  List,
  ListItem,
  Icon,
  FormLabel,
  FormInput,
  Button,
  SearchBar,
  Avatar,
} from 'react-native-elements';

import DeviceInfo from 'react-native-device-info'
import HeartButton from '../../components/HeartButton'
import HeartButtonVertical from '../../components/HeartButtonVertical'
import CommentCard from '../../components/CommentCard'
import RiderComment from '../../components/RiderComment'
import StationPreview from '../../components/StationPreview'
import AppHeader from '../../components/AppHeader'
import { lineList } from '../supermap/data'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { styles } from './styles'
import * as Actions from './actions'

class StationFeed extends Component {

  //need this for Components instead of pure functions
  constructor(props) {
    super(props);

    this.state = {
      url: 'http://165.227.71.39:3000/api/RiderComments?filter=%7B%22order%22%20%3A%20%22id%20DESC%22%2C%22limit%22%20%3A%2020%7D', //?filter={"order" : "id DESC","limit" : 20}
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
      },
      //body: {
      //  "user_id" : "forrests-macbook-air",
      //  "comment_body" : "testing debug"
      //}
    };

  }

  hasRecord(obj,val){

    switch (true) {
      case (!obj):
        //console.log('obj is undefined, return false');
        return false;
        break;
      case (Object.values(obj).indexOf(val) > -1):
        //console.log('indexOf is ' + Object.values(obj).indexOf(val) > -1 + ' so return true' );
        return true;
        break;
      default:
        //console.log('default, return false');
        return false;
        break;
    }
  }

  existsInLikedComments(match,arr){
    for(i=0;i<arr.length;i++){
      if(arr[i].comment_id == match){
        return true;
      }
    }
    return false;
  }


  likeOrUnlike(theComment,likedComments){

    console.log('theComment.id is ' + theComment.id);
    console.log('theComment is  ' + JSON.stringify(theComment));
    console.log('likedComments is ' + JSON.stringify(likedComments));

    for(i=0;i<likedComments.length;i++){

      if(theComment.id == likedComments[i].comment_id){

        this.props.actions.submitUnlikeAttempt(likedComments[i].id);
        return true;
      }
    }
   
    this.props.actions.submitLikeAttempt({
      'comment_id': theComment.id,
      'comment_user_id': theComment.user_id,
      'event_name': 'like',
      'event_user_id': this.getUUID(),
      'event_body' : '',
      'timestamp' : this.getTimeStamp(),
    });

    return true;


    /*if record already exists, unlike it
    if( this.hasRecord(likedComments,theComment.id) ) {

      this.props.actions.unlikeComment(theComment);
    }
    //else like it
    else 

      this.props.actions.likeComment(theComment);
  
    return true;
    */
  }

  getCommentLikeCount(commentId,commentEvents){

    let count = 0;

    for(i=0;i<commentEvents.length;i++){

      if(commentId == commentEvents[i].comment_id){
        count++;
      }
    }

    return count;
  }

  getUUID(){

    let x = DeviceInfo.getUniqueID();
    return x;
  }

  getTimeStamp(){
    return Date.now();
  }

  noCommentsToShow(arrLength){
    if(arrLength == 0){
      return(
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'black',
          //height: '100%'
        }}>
          <Text style={{
            fontSize: 18,
            color: '#97ACB3'
          }}>
            No comments on the {this.props.superMapsLine} line.
          </Text>
          <Text style={{
            fontSize: 18,
            color: '#97ACB3'
          }}>
            Go to Stations to add a report.
          </Text>
        </View>
      );
    }
  }

    onBadgeLineClick(line){
    //selectedLine = line;
    onLinePress(line);

      return true;
    } 

    getBackgroundColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].bg;
        }
        //else i++
       }
       //if no match
       return 'gainsboro';
    }

    getTextColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].text;
        }
        //else i++
       }
       //if no match
       return 'white';
    }


  componentWillUpdate() {

  }

  componentWillMount() {
    //initially load with same line as SuperMap
    //this is the key to making sure StationFeed loads with the
    //same station as SuperMap has loaded as StationPreview

    this.props.actions.fetchStationFeedAttempt(this.props.superMapsPreviewedStationUid);
  }

  render() {

    let zeroResultsView = this.noCommentsToShow(this.props.feedData.length);

    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        
        <View style={{
          flex: 5,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: '#1F252A',
          paddingLeft:'3%',
          paddingRight: '3%',
          width: '100%'
        }}>
          <View style={{
            flex: 17,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '100%'
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
              Long Wait.
            </Text>
            
            <Text
              style={{
                color: '#97ACB3',
                fontSize: 18,
                fontStyle: 'normal'
              }}
            >
              32m ago • @theurbanforrest
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
                likeCount={17}
                //onIconPress={onLikePress}
                isDisabled={false} //{ hasReport ? false : true }
              />
              <HeartButtonVertical
                iconPrimary='commenting-o'
                iconAlt='commenting-o'
                isSelected={false}
                likeCount={2}
                //onIconPress={onCommentPress}
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
                onPress={()=> this.props.navigation.navigate('SettingsStack',{
                'previewedStation': this.props.superMapsPreviewedStation,
                'previewedStationLines' : this.props.superMapsPreviewedStationLines
              })}
              />
            </View> 
          </View>
        </View>
        <View style={{
          flex: 19,
        }}>
          <ScrollView style={{
            flex: 1, 
            flexDirection: 'column', 
            padding:'3%', 
            backgroundColor: 'black'
          }}>
            <List
              containerStyle={styles.fcList}
            >
              {this.props.feedData.map( (comment,i) => (
                <RiderComment
                  key={i}
                  status={comment.status}
                  userName={comment.user_name}
                  stationName={comment.station_name}
                  stationLines={comment.station_lines}
                  imageSrc={'https://randomuser.me/api/portraits/men/5.jpg'}
                  comment={comment.comment_body}
                  commentOnLine={comment.comment_on_line}
                  timestamp={comment.timestamp}
                  isLiked={ this.existsInLikedComments(comment.id, this.props.likedComments) ? true : false}  //isLiked={this.hasRecord(this.props.likedComments,checkin.record_id)}
                  likeCount={ this.getCommentLikeCount(comment.id, this.props.commentEvents) }  //likeCount={this.hasRecord(this.props.likedComments,checkin.record_id) ? checkin.likes + 1 : checkin.likes}
                  onLikePress={() => this.likeOrUnlike(comment, this.props.likedComments)}
                  />
              )
            )}
            </List>
          </ScrollView>

          {zeroResultsView}          

        </View>
      </View>

    )
  }
}

/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {
          feedData: state.stationfeed.feed_data,  //get via this.props.feed_data
          likedComments: state.stationfeed.liked_comments,
          filterIncludes: state.stationfeed.filter_includes,
          selectedLine: state.stationfeed.selected_line,
          commentEvents: state.stationfeed.comment_events,

          superMapsLine: state.supermap.selectedLine,
          superMapsPreviewedStation: state.supermap.previewedStation,
          superMapsPreviewedStationUid: state.supermap.previewedStationUid,
          superMapsPreviewedStationLines: state.supermap.previewedStationLines

        }
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(StationFeed);

/** stationName

<Text style={{
            color: '#97ACB3',
            fontSize: 18,
            fontWeight: 'bold',
          }}
          >
            {this.props.superMapsPreviewedStation}
          </Text>

**/

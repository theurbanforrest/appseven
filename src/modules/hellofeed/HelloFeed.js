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
} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info'

//import { stationdetails }  from './data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { styles } from './styles'
import HeartButton from '../../components/HeartButton'
import CommentCard from '../../components/CommentCard'
import RiderComment from '../../components/RiderComment'
import StationCard from '../../components/StationCard'
import { lineList } from '../supermap/data'



    //need this for Components instead of pure functions
    import * as Actions from './actions'

class HelloFeed extends Component {

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


  componentWillUpdate() {

  }

  componentWillMount() {
    //initially load with same line as SuperMap
    this.props.actions.fetchLineFeedAttempt(this.props.superMapsLine);
  }

  render() {

    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <View style={{flex: 24}}>
          <TouchableHighlight
            onPress={()=> this.props.navigation.navigate('FilterModalStack')}
          >
            <View>
              <SearchBar
                round
                placeholder='Search...'
                editable={false}
                pointerEvents='none'
              />
            </View>
          </TouchableHighlight>
          <ScrollView style={{flex: 1, flexDirection: 'column', padding:'3%', backgroundColor: 'black'}}>
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
          <View style={{
            //position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            height: '20%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '3%',
          }}>
            <View style={{
              flex: 2,
              //backgroundColor: 'yellow',  //for debug
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: '3%',
            }}>
              {
                lineList.map( (line) => (
                    <Badge
                      key={line.id}
                      value={line.id}
                      containerStyle={{
                        backgroundColor: this.props.selectedLine == line.id ? line.bg : 'gainsboro'
                      }}
                      textStyle={{
                        color: this.props.selectedLine == line.id ? line.text : 'white'
                      }}
                      onPress={() => this.props.selectedLine == line.id ? this.props.actions.fetchAttempt(this.state.url,this.state.method,this.state.headers) : this.props.actions.fetchLineFeedAttempt(line.id)} //this.props.actions.getAllStops(line.id,[])}
                    />
                  )
                )
              }
            </View>
            <Text style={{
              textAlign: 'center',
              color: 'gray',
              fontSize: 14,
            }}>
              Presented by StreetEasy
            </Text>
          </View>
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
          feedData: state.hellofeed.feed_data,  //get via this.props.feed_data
          likedComments: state.hellofeed.liked_comments,
          filterIncludes: state.hellofeed.filter_includes,
          selectedLine: state.hellofeed.selected_line,
          commentEvents: state.hellofeed.comment_events,

          superMapsLine: state.supermap.selectedLine,

        }
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(HelloFeed);


/** APPENDIX

//This is the touchable search bar which opens FilterModalStack

  <TouchableHighlight
    onPress={()=> this.props.navigation.navigate('FilterModalStack')}
  >
    <View>
      <SearchBar
        round
        placeholder='Search...'
        editable={false}
        pointerEvents='none'
      />
    </View>
  </TouchableHighlight>

//This submits successfully
  onLikePress={()=> this.props.actions.submitLikeAttempt(
    {
      'comment_id': comment.id,
      'comment_user_id': comment.user_id,
      'event_name': 'like',
      'event_user_id': this.getUUID(),
      'event_body' : '',
      'timestamp' : this.getTimeStamp(),
    }
  )}

**/

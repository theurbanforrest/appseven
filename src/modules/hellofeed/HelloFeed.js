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

    //if record already exists, set true
    if(Object.values(obj).indexOf(val) > -1) {

        return true;
      }
      //else false
      else return false;

  }

  likeOrUnlike(likedComments,record_id){

      //if record already exists, unlike it
      if( this.hasRecord(likedComments,record_id) ) {

        this.props.actions.unlikeComment(record_id);
      }
      //else like it
      else this.props.actions.likeComment(record_id);

      return true;
    }

  getUUID(){

    let x = DeviceInfo.getUniqueID();
    return x;
  }

  getTimeStamp(){
    return Date.now();
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
                  isLiked={true}  //isLiked={this.hasRecord(this.props.likedComments,checkin.record_id)}
                  likeCount={17}  //likeCount={this.hasRecord(this.props.likedComments,checkin.record_id) ? checkin.likes + 1 : checkin.likes}
                  onLikePress={()=> this.props.actions.submitLikeAttempt(
                    {
                      'comment_id': comment.id,
                      'comment_user_id': comment.user_id,
                      'event_name': 'like',
                      'event_user_id': this.getUUID(),
                      'event_body' : '',
                      'timestamp' : this.getTimeStamp(),
                    }
                  )}//onLikePress={() => this.likeOrUnlike(this.props.likedComments,checkin.record_id) }
                />
              )
            )}
            </List>
          </ScrollView>
          <View style={{
            position: 'absolute',
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
          likedComments: state.hellofeed.likedComments,
          filterIncludes: state.hellofeed.filter_includes,
          selectedLine: state.hellofeed.selected_line,
          superMapsLine: state.supermap.selectedLine
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


**/

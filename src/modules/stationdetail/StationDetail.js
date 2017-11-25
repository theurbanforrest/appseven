import React, { PropTypes, Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight

} from 'react-native';
import { 
  Card,
  List,
  ListItem,
  Icon,
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements';
import { stationdetails }  from './data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { styles } from './styles'
import HeartButton from '../../components/HeartButton'
import CommentCard from '../../components/CommentCard'
import StationCard from '../../components/StationCard'

    //need this for Components instead of pure functions
    import * as Actions from './actions'

class StationDetail extends Component {

  //need this for Components instead of pure functions
  constructor(props) {
    super(props);
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

  render() {
    const { id, shortName, longName, area, lines, colors } = this.props.navigation.state.params;

      //need this for Components instead of pure functions
      //const { state, actions } = this.props;

    //const { likeComment } = props;

    //const id = 1;
    //const longName = 'some long name';

    function checkMe(things){
      return (Object.values(things).indexOf('CT0008') > -1) ? 'blue' : 'red'
    }

    function checkMeBool(things){
      return (Object.values(things).indexOf('CT0008') > -1) ? true : false
    }

    return ( 
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 24}}>
          <ScrollView style={{flex: 1, flexDirection: 'column', padding:'3%', backgroundColor: 'black'}}>
            
            <StationCard />
            <List
              containerStyle={styles.fcList}
            >
              {stationdetails[id-1].items.map( (checkin) => (
                <CommentCard
                  title={checkin.posted_by}
                  //imageSrc={'https://randomuser.me/api/portraits/women/18.jpg'}
                  comment={checkin.comments}
                  isLiked={this.hasRecord(this.props.likedComments,checkin.record_id)}
                  likeCount={this.hasRecord(this.props.likedComments,checkin.record_id) ? checkin.likes + 1 : checkin.likes}
                  onLikePress={() => this.likeOrUnlike(this.props.likedComments,checkin.record_id) }
                />
              )
            )}
            </List>
          </ScrollView>
        </View>
      </View>
  )}
}

  export default connect(
    //this is mapStateToProps verbosely
    (state) => {
      return {
        idGen: state.stationdetail.idGen,
        likedComments: state.stationdetail.likedComments
      }
    },
    //this is mapDispatchToProps verbosely
    (dispatch) => ({
      actions: bindActionCreators(Actions, dispatch)
    }),
  )(StationDetail);






/* from https://github.com/reactjs/redux/issues/1159

  // Which part of the Redux global state does our component want to receive as props?
  function mapStateToProps(state) {
    return {
      date: state.date
    }
  }

  // Which action creators does it want to receive by props?
  function mapDispatchToProps(dispatch) {
    return {
      handlePrev: (date) => dispatch(prevWeek(date)),
      handleNext: (date) => dispatch(nextWeek(date)),
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WeekBar)
*/

/* these things work when used in render() 

  <Button 
    medium
    color='#CCC'
    icon={{name: 'gears', type: 'font-awesome'}}
    title='Print idGen to console'
    onPress={() => console.log(this.props.idGen)}
  />

  <Button 
    medium
    backgroundColor= {checkMe(this.props.likedComments)}  //checkMe() works in redux too!  yay!
      //this works: {(Object.values(this.props.likedComments).indexOf('CT0008') > -1) ? 'blue' : 'red'}
      //this also works: { (this.props.idGen==1) ? 'blue' : 'red'}
    icon={{name: 'gears', type: 'font-awesome'}}
    title='check it out'
    onPress={() => console.log(this.props.idGen)}
  />

<Text>
  {this.props.idGen}
</Text>
*/

/* these things work in render()'s ListItem

  onPress={() => (Object.values(this.props.likedComments).indexOf(checkin.record_id) > -1) ? 
      this.props.actions.likeComment(checkin.record_id)
      : this.props.actions.unlikeComment(checkin.record_id)
  }

  onPress={() => this.props.actions.likeComment(checkin.record_id)}
*/

/* these things work in render()'s HeartButton

  //onPress={() => console.log('I was pressed!') }
*/

/* listItem that works
  <ListItem
              key={checkin.posted_by}
              title={checkin.posted_by}
              //subtitle={checkin.comments}
              leftIcon= {this.hasRecord(this.props.likedComments,checkin.record_id) ? {name: 'heart', type: 'font-awesome', color:'purple'} : {name: 'heart-o', type: 'font-awesome'} }
              //rightIcon= { {name: 'rocket', type: 'font-awesome' } }
              avatar={'https://randomuser.me/api/portraits/women/31.jpg'}
              roundAvatar={true}

              //containerStyle={this.hasRecord(this.props.likedComments,checkin.record_id) ? styles.fcLiked : styles.fcNotLiked }
              leftIconOnPress={() => this.likeOrUnlike(this.props.likedComments,checkin.record_id)}
              hideChevron
              rightTitle= { this.hasRecord(this.props.likedComments,checkin.record_id) ? checkin.likes + 1 : checkin.likes }
              />
*/

/* listItem that also works
  <View>
              <ListItem
                key={checkin.posted_by}
                title={checkin.posted_by}
                subtitle={
                  <HeartButton
                    isSelected={this.hasRecord(this.props.likedComments,checkin.record_id)}
                    likeCount={this.hasRecord(this.props.likedComments,checkin.record_id) ? checkin.likes + 1 : checkin.likes }
                  />
                }
                //leftIcon= {this.hasRecord(this.props.likedComments,checkin.record_id) ? {name: 'heart', type: 'font-awesome', color:'purple'} : {name: 'heart-o', type: 'font-awesome'} }
                //rightIcon= { {name: 'rocket', type: 'font-awesome' } }
                avatar={'https://randomuser.me/api/portraits/women/31.jpg'}
                roundAvatar={true}

                //containerStyle={this.hasRecord(this.props.likedComments,checkin.record_id) ? styles.fcLiked : styles.fcNotLiked }
                onPress={() => this.likeOrUnlike(this.props.likedComments,checkin.record_id)}
                //hideChevron
                //rightTitle= { this.hasRecord(this.props.likedComments,checkin.record_id) ? checkin.likes + 1 : checkin.likes }
              />
            </View>
*/

/* Old Station Card

<Card
              title={longName}
              imageSrc={'https://randomuser.me/api/portraits/men/2.jpg'}
              //height={240}
              >
            </Card>

*/

/* StationCard removed

<View style={{flex: 8}}>
          <StationCard
          />
        </View>

*/

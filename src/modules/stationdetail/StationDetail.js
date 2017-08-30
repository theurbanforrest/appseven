import React, { PropTypes, Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,

} from 'react-native';
import { 
  Card,
  List,
  ListItem,
  Icon,
  FormLabel,
  FormInput,
} from 'react-native-elements';
import { stationdetails }  from './data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

    //need this for Components instead of pure functions
    import * as Actions from './actions'

class StationDetail extends Component {

    //need this for Components instead of pure functions
    constructor(props) {
      super(props);
    }


  clickedThisItem(record_id) {

    console.log('this is clickedThisItem');
    console.log(record_id);

      //need this for Components instead of pure functions
      this.props.actions.likeComment(record_id);
  }

  render() {
    const { id, shortName, longName, area, lines, colors } = this.props.navigation.state.params;

      //need this for Components instead of pure functions
      const { state, actions } = this.props;

    //const { likeComment } = props;

    //const id = 1;
    //const longName = 'some long name';

    return <ScrollView>
        <Card
          title={longName}
          imageSrc={'https://randomuser.me/api/portraits/men/2.jpg'}
          height={180}
          >
          <Text>
            //Grid stuff went here, moved for debugging
          </Text>
        </Card>
        <FormLabel>Name</FormLabel>
        <FormInput />
        
        <List>
          {stationdetails[id-1].items.map((checkin) => (
            <ListItem
            key={checkin.posted_by}
            title={checkin.posted_by}
            subtitle={checkin.comments}
            onPress={() => this.clickedThisItem(checkin.record_id)}
            />
          ))}
        </List>
      </ScrollView>
  }
}

  //need this for Components instead of pure functions
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({},
      Actions
      ), dispatch);
  }
  export default connect(state => ({
      state: state.counter
    }),
    (dispatch) => ({
      actions: bindActionCreators(Actions, dispatch)
    })
  )(StationDetail);




/*
Stuff below
*/

/*

      
StationDetail.displayName = 'Station Detail'

//Define propTypes reqs for debugging in dev
  StationDetail.propTypes = {
    list: PropTypes.object.isRequired,
    tagline: PropTypes.string.isRequired
  }

//Here's the most complex part of our app. connect is a function which selects,
//which part of our state tree you need to pass to your component. also, since
//my App component is pure function, i am injecting addNewCounter, increment and
//decrement functions wrapped with dispatch. I think this is the best and cleanest
//way to seperate your connect and your pure function.
export default connect(
  state => ({
      //likedComments: state.app.likedComments,
  }),
  dispatch => ({
      reportSelf: mystatus => dispatch(actions.stationfeed.reportSelf(mystatus) ),
      likeComment: record_id => dispatch(action.stationdetail.likeComment(record_id) ),

        //addNewCounter: () => dispatch(actions.newCounter()),
        //increment: id => dispatch(actions.increment(id)),
        //decrement: id => dispatch(actions.decrement(id)),
        //incrementWithDelay: id => dispatch(actions.incrementWithDelay(id))
  })
)(StationDetail)

/*

<FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
        */



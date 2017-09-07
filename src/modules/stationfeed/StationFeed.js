import React, { PropTypes, Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native'
import { List, ListItem, Card } from 'react-native-elements'
import { stations } from './data'

import * as actions from './actions'
import { styles } from './styles'
import { connect } from 'react-redux'

class StationFeed extends Component {
  fetchPressed() {
    console.log('fetch pressed');
    return true
  }


//NEED TO FIGURE OUT HOW TO NAVIGATE WITH THIS

  onLearnMore = (station) => {
    //this.props.goToStationDetail( station.id ); 
    this.props.navigation.navigate('StationDetail', { ...station });
  };

  render() {
    return (
      <ScrollView>
        <List>
          {stations.map((station) => (
            <ListItem
            key={station.id}
            title={station.longName}
            subtitle={`${station.area} - ${station.lines}`}
            onPress={() => this.onLearnMore(station)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }

  componentDidMount() {
    //send info to redux
    
  }

}

StationFeed.displayName = 'Station Feed'

//Define propTypes reqs for debugging in dev
  StationFeed.propTypes = {
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
      list: state.stationfeed.list,
      tagline: state.stationfeed.tagline
  }),
  dispatch => ({
      reportSelf: mystatus => dispatch(actions.stationfeed.reportSelf(mystatus) ),
        //addNewCounter: () => dispatch(actions.newCounter()),
        //increment: id => dispatch(actions.increment(id)),
        //decrement: id => dispatch(actions.decrement(id)),
        //incrementWithDelay: id => dispatch(actions.incrementWithDelay(id))
  })
)(StationFeed)
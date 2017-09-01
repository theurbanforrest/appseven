import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

  //define the screens
  import HelloWorld from '../helloworld/HelloWorld'
  import StationFeed from '../stationfeed/StationFeed'
  import StationDetail from '../stationdetail/StationDetail'

  /*-- StationFeed Stack --*/
  export const StationFeedStack = StackNavigator({
    StationFeed: {
      screen: StationFeed,
      navigationOptions: {
        title: 'StationFeed'
      },
    },
    StationDetail: {
      screen: StationDetail,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.shortName}`
      }),
    },
  });

  /*-- Tabs --*/
  export const Tabs = TabNavigator({
  HelloWorld: {
    screen: HelloWorld,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
  StationsFeed: {
    screen: StationFeedStack,
    navigationOptions: {
      tabBarLabel: 'All Stations',
      tabBarIcon: ({ tintColor }) => <Icon name="subway" size={35} color={tintColor} />
    }
  },
});

  /*-- RootNav --*/
  export const RootNav = StackNavigator(
  	{
  		Tabs: {
  			screen: Tabs,
  		},
  	}, 
  	{
  		mode: 'modal',
  		headerMode: 'none',
  	}
  );

  /*-- Connect --*/
  export default connect(
    state => ({
      //age: state.helloworld.age

    }),
    dispatch => ({
      /*addNewCounter: () => dispatch(actions.newCounter()),
      increment: id => dispatch(actions.increment(id)),
      decrement: id => dispatch(actions.decrement(id)),
      incrementWithDelay: id => dispatch(actions.incrementWithDelay(id))*/
    })
  )(RootNav)
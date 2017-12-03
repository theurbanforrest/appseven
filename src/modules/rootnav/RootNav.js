import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

  //define the screens
  import HelloWorld from '../helloworld/HelloWorld'
  import StationFeed from '../stationfeed/StationFeed'
  import StationDetail from '../stationdetail/StationDetail'
  import SuperMap from '../supermap/SuperMap'
  import CheckIn from '../checkin/CheckIn'
  import HelloFeed from '../hellofeed/HelloFeed'

  //test component
  import CheckInOne from '../../components/CheckInOne'
  import CheckInTwo from '../../components/CheckInTwo'

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

  /*-- MapStack --*/

  export const MapStack = StackNavigator({
    TheMap: {
      screen: SuperMap,
      navigationOptions: {
        header: false,
      }
    },
    LineFeed: {
      screen: HelloFeed,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.shortName}`,
        headerStyle: {
          backgroundColor: 'black'
        },
        headerTitleStyle: {
          color: '#97ACB3'
        },
      }),
    },
  });

  /*-- Tabs --*/
  export const Tabs = DrawerNavigator({

  /*-- commenting out
  SuperMap: {
    screen: SuperMap,
    navigationOptions: {
      drawerLabel: 'Super Map',
      drawerIcon: ({ tintColor }) => <Icon name='street-view' type='font-awesome' size={25} color={tintColor} /> ,
    }
  },
  StationsFeed: {
    screen: StationFeedStack,
    navigationOptions: {
      drawerLabel: 'All Stations',
      drawerIcon: ({ tintColor }) => <Icon name='subway' type='font-awesome' size={25} color={tintColor} /> ,
    }
  },
  SocialFeed: {
    screen: StationDetail,
    navigationOptions: {
      drawerLabel: 'Social Feed',
      drawerIcon: ({ tintColor }) => <Icon name='comments-o' type='font-awesome' size={25} color={tintColor} /> ,
    }
  },
  --*/

  MapStack: {
    screen: MapStack,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({tintColor}) => <Icon name='home' type='font-awesome' size={25} color={tintColor} /> ,
    }
  },
  HelloWorld: {
    screen: HelloWorld,
    navigationOptions: {
      drawerLabel: 'Hello World',
      drawerIcon: ({ tintColor }) => <Icon name='smile-o' type='font-awesome' size={25} color={tintColor} />,

    },
  },
  HelloFeed: {
    screen: HelloFeed,
    navigationOptions: {
      drawerLabel: 'HelloFeed',
      drawerIcon: ({ tintColor }) => <Icon name='shower' type='font-awesome' size={25} color={tintColor} />,
    },
  },
  CheckIn: {
    screen: CheckIn,
    navigationOptions: {
      drawerLabel: 'Check In',
      drawerIcon: ({ tintColor }) => <Icon name='map-o' type='font-awesome' size={25} color={tintColor} />,

    },
  },
  StationsFeed: {
    screen: StationFeedStack,
    navigationOptions: {
      drawerLabel: 'All Stations',
      drawerIcon: ({ tintColor }) => <Icon name='subway' type='font-awesome' size={25} color={tintColor} /> ,
    }
  },
},
{
  headerMode: 'screen'
}
);

  /**-- SettingsStack --**/

  export const SettingsStack = StackNavigator({
    CheckIn: {
      screen: CheckIn,
    },
  },
  {
    headerMode: 'none'
  },
);



  /*-- RootNav --*/
  export const RootNav = StackNavigator(
  	{
  		Tabs: {
  			screen: Tabs,
  		},
      SettingsStack: {
        screen: SettingsStack
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
      //not needed

    }),
    dispatch => ({
      //not needed
    })
  )(RootNav)
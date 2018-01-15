import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

  //define the screens
  import HelloWorld from '../helloworld/HelloWorld'
  import StationFeed from '../stationfeed/StationFeed'
  import StationDetail from '../stationdetail/StationDetail'
  import SuperMap from '../supermap/SuperMap'
  import CheckIn from '../checkin/CheckIn'
  import HelloFeed from '../hellofeed/HelloFeed'
  import FilterModal from '../hellofeed/FilterModal'
  import Profile from '../profile/Profile'
  import AppLanding from '../applanding/AppLanding'

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
      },
      navigatorStyle:{
        navBarBackgroundColor: 'pink'
      }
    },
    LineFeed: {
      screen: HelloFeed,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.shortName}`,
        headerStyle: {
          backgroundColor: '#1F252A'
        },
        headerTitleStyle: {
          color: '#97ACB3'
        },
      }),
    },
    StationFeed: {
      screen: StationFeed,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.shortName}`,
        headerStyle: {
          backgroundColor: '#1F252A'
        },
        headerTitleStyle: {
          color: '#97ACB3'
        },
      }),
    },
  });

  /*-- Tabs --*/


  //export const Tabs = DrawerNavigator({
  export const Tabs = TabNavigator(
    {
      HelloFeed: {
        screen: HelloFeed,
        navigationOptions: {
          tabBarLabel: 'Feed',
          tabBarIcon: ({ tintColor }) => <Icon name='home' type='font-awesome' size={25} color={tintColor} />,
        },
      },
      MapStack: {
        screen: MapStack,
        navigationOptions: {
          tabBarLabel: 'Map',
          tabBarIcon: ({tintColor}) => 
            <Icon name='map-pin' type='font-awesome' size={25} color={tintColor} /> ,
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) => <Icon name='user-circle-o' type='font-awesome' size={25} color={tintColor} />,
        },
      },
      Settings: {
        screen: HelloWorld,
        navigationOptions: {
          tabBarLabel: 'Settings',
          tabBarIcon: ({ tintColor }) => <Icon name='cog' type='font-awesome' size={25} color={tintColor} />,

        },
      },
    },
    {
      headerMode: 'screen',
      tabBarOptions : {
        style: {
          backgroundColor: '#1F252A',
        }
      }
    },
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

  /**-- FilterModalStack --**/

  export const FilterModalStack = StackNavigator({
    FilterModal: {
      screen: FilterModal,
      },
    },
    {
      headerMode: 'none'
    },
  );

  /**-- AppLandingStack --*/

  export const AppLandingStack = StackNavigator({
    AppLanding: {
      screen: AppLanding,
      },
    },
    {
      headerMode: 'none'
    },
  );


  /*-- RootNav --*/
  export const RootNav = StackNavigator(
  	{
      AppLandingStack: {
        screen: AppLandingStack
      },
      Tabs: {
  			screen: Tabs
  		},
      SettingsStack: {
        screen: SettingsStack
      },
  	},
  	{
  		mode: 'card',//'modal',
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
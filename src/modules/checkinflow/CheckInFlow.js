/*------ IMPORTS -----*/

  //packages
    import React, { Component } from 'react'
    import {
      View,
      Text,
    } from 'react-native'
    import { 
      Button,
      Avatar,
      Icon
    } from 'react-native-elements'
    import PropTypes from 'prop-types'

  //components and styles 
    import { styles } from './styles'

  //redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
      import * as Actions from './actions'

/*----- THE COMPONENT -----*/


class CheckInFlow extends Component {
  //constructor
  //need this for Components instead of pure functions
  constructor(props) {
    super(props);
  }

  //functions
  //add them here to call them as 'this.' in render
    

  //render()
  render() {

    //define props
    const {
      visible

    } = this.props;

    if(visible){

      //tell redux to start the flow
      //this.props.actions.startFlow('test_station_id_123');

      //then return
      return (

      <View style={{
        position: 'absolute',
        top: '25%',
        right: '0%',
        width: '100%',
        padding: '3%',
        height: '63%',
        backgroundColor: '#00000099',
      }}>
        <View style = {{
          flex: 4
        }}>
        </View>
        <View style={{
          flex: 20,
          flexDirection: 'column',
          //backgroundColor: 'powderblue',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '5%'
        }}>
          <View style={{
            flex: 12,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <Avatar
              large
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/women/29.jpg' }}
              //onPress={onMenuPress}
            />
            <Text style={{
              fontSize: 24,
              color: 'white'
            }}>
              Check-In!
            </Text>
            <Text style={{
              color: 'white'
            }}>
              What's good homeslice?
            </Text>
          </View>
          <View style={{
            flex: 8,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flex: 8,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Icon
                  reverse={true}
                  //raised={isSelected}
                  name='thumbs-up'
                  color='green'
                  type='font-awesome'
                  //onPress={onIconPress}
                />
                <Text style={{
                  color: 'white'
                }}>
                  Just got here
                </Text>
              </View>
              <View style={{
                flex: 8,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Icon
                  reverse={true}
                  //raised={isSelected}
                  name='train'
                  color='orange'
                  type='font-awesome'
                  //onPress={onIconPress}
                />
                <Text style={{
                  color: 'white'
                }}>
                  Announcement
                </Text>
              </View>
              <View style={{
                flex: 8,
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Icon
                  reverse={true}
                  //raised={isSelected}
                  name='meh-o'
                  color='red'
                  type='font-awesome'
                  //onPress={onIconPress}
                />
                <Text style={{
                  color: 'white'
                }}>
                  Waiting awhile
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      )
    } else {

      //tell redux to end the flow
      //this.props.actions.endFlow();

      //then return
      return false;
    }
    
  }//end render

}
//end component

CheckInFlow.propTypes = {
  visible: PropTypes.bool,
  onExitPress: PropTypes.func,
}

CheckInFlow.defaultProps = {
  visible: false,
  //onExitPress: not setting by default
}


/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {
          isComplete: state.checkinflow.isComplete,
          stationId: state.checkinflow.stationId,
        } 
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(CheckInFlow);

/*----- APPENDIX -----*/


import React, { Component } from 'react'
import { 
  View,
  Text,
  TextInput,
} from 'react-native'
import { 
  Button,
  Avatar, 
  Icon,
  FormLabel,
  FormInput,
} from 'react-native-elements'
import {
  NavigationActions
} from 'react-navigation'

class CheckInOne extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render() {
    return (
      <View style={{
        //position: 'absolute',
        //top: '75%',
        //right: '0%',
        //width: '100%',
        paddingTop: '5%',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      }}>   
        <View style={{
          flex: 12,
          flexDirection: 'column',
          //backgroundColor: 'powderblue',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '5%'
        }}>
          <View style={{
            flex: 4,
            flexDirection: 'column',
            //backgroundColor: 'blue',
          }}>
          </View>
          <View style={{
            flex: 12,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <Avatar
              large
              rounded
              source={{uri: 'https://randomuser.me/api/portraits/men/49.jpg' }}
              //onPress={onMenuPress}
            />
            <Text style={{
              fontSize: 24,
              color: 'white'
            }}>
              Check In
            </Text>
            <Text style={{
              color: 'white'
            }}>
              How's your commute going?
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
                  color='purple'
                  type='font-awesome'
                  //onPress={onIconPress}
                />
                <Text style={{
                  color: 'white'
                }}>
                  Okay
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
                  color='purple'
                  type='font-awesome'
                  //onPress={onIconPress}
                />
                <Text style={{
                  color: 'white'
                }}>
                  Waiting awhile
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
                  name='users'
                  color='purple'
                  type='font-awesome'
                  //onPress={onIconPress}
                />
                <Text style={{
                  color: 'white'
                }}>
                  Too crowded
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{
          flex: 12,
          flexDirection: 'column',
          paddingLeft: '3%',
          paddingRight: '3%',
        }}>
          <FormLabel>Add a comment</FormLabel>
          <FormInput
            containerStyle={{
              backgroundColor: 'white',
              height: 100
            }}
          />
          <View style={{
            paddingTop: '3%',
          }}>
            <Button 
              large
              icon={{name: 'commenting-o', type: 'font-awesome'}}
              backgroundColor='purple'
              title='SUBMIT'
              onPress={()=> this.props.navigation.dispatch(NavigationActions.back()) }
            />
          </View>
        </View>
      </View>
    );
  }
}

export default CheckInOne;

/**
  <TextInput
            editable={true}
            multiline={true}
            numberOfLines={4}
            maxLength={140}
            style={{
              height: 100,
              backgroundColor: 'white',
            }}
          />
**/
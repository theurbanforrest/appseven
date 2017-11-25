import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Avatar, Icon } from 'react-native-elements'

class CheckInTwo extends Component {

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
        backgroundColor: '#00000080',
      }}>   
        <View style={{
          flex: 12,
          flexDirection: 'row',
        }}>
        </View>
        <View style={{
          flex: 12,
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
                  color='purple'
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
                  color='purple'
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
            </View>
          </View>
          <View style={{
            flex: 4,
            flexDirection: 'column',
            //backgroundColor: 'blue',
          }}>
            <Text>
              Bottom tier
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default CheckInTwo;
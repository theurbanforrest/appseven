import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native'
import {
  Button,
  Icon,
  Badge,
  Avatar
} from 'react-native-elements'

import FeaturedComment from './FeaturedComment'
import HeartButton from './HeartButton'
import { lineList } from '../modules/supermap/data'

/*-- THE COMPONENT --*/
const LinePreview = (props: LinePreviewProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      stationName,
      lines,
      selectedLine,
      visible,
      onClearPress,
      onLinePress,
      onFeedPress,
      onCheckInPress,
      onDismiss,

      reportsOnLine,

    } = props;

  //do functions

    function onBadgeLineClick(line){
      //selectedLine = line;
      onLinePress(line);

      return true;
    } 

    function getBackgroundColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].bg;
        }
        //else i++
       }
       //if no match
       return 'gainsboro';
    }

    function getTextColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].text;
        }
        //else i++
       }
       //if no match
       return 'white';
    }

    function getLinePreviewText(reportsOnLine){

      switch(true){
        case(reportsOnLine==0):

          tagLineColor = '#97ACB3';
          tagLineHeadline = 'No reports';
          tagLineDescription = 'Click station on map to add a report';

          break;

        case(reportsOnLine>0):

          tagLineColor = 'magenta';
          tagLineHeadline = reportsOnLine + ' reports';
          tagLineDescription = 'Click station on map for details';

          break;
      }
      return true;
    }

  //if visible is false, return nothing
  if(visible){

    getLinePreviewText(reportsOnLine);

    return(

      <View style={{
        position: 'absolute',
        top: '0%',
        width: '100%'
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1F252A',
          paddingTop: '8%',
          paddingLeft: '3%',
          paddingRight: '3%',
          paddingBottom: '3%',
        }}>
          <TouchableHighlight
            onPress = {onFeedPress}
          >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
            //backgroundColor: 'powderblue'
          }}>
            <View style={{
              paddingRight: '1%'
            }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={{uri: 'http://104.236.3.128/img/prayfam.png'}}
              />
            </View>
            <View style={{
              flex: 20,
              //backgroundColor: 'powderblue',
            }}>
              <Text style={{
                color: '#97ACB3',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
              >
                Last 1h:
              </Text>
              <Text style={{
                color: tagLineColor,
                fontSize: 18,
                textAlign: 'center'
              }}
              >
                {tagLineHeadline}
              </Text>
              <Text style={{
                color: '#97ACB3',
                fontSize: 14,
                fontStyle: 'italic',
                textAlign: 'center'
                //fontWeight: 'bold',
              }}
              >
                {tagLineDescription}
              </Text>
            </View>
            <View style={{
              flex: 4,
              justifyContent: 'flex-start'
            }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
              }}>
                {
                  lines.map( (line) => (
                      <Badge
                        key= {line}
                        value= {line}
                        containerStyle={{
                          backgroundColor: getBackgroundColor(line,lineList) //keeping static, not connected to selectedLine
                        }}
                        textStyle={{
                          color: getTextColor(line,lineList), //keeping static, not connected to selectedLine
                          fontSize: 32,
                        }}
                        onPress={()=> onBadgeLineClick(line)}//console.log('this should be some action from redux')}
                      />
                    ))
                }
              </View>
            </View>
          </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  } else return false;
    
}

  //Enter the default values of the props
    LinePreview.defaultProps = {
      //enter the default values here

        stationName: 'Howzit braddah',
        visible: true,
        //onClearPress: not setting func by default
        //lines: not setting array by default
        //onLinePress: not setting func by default
        //selectedLine: not setting string by default
        //onFeedPress: not setting func by default
        //onDismiss: not setting func by default
    };

  //Define the props here
    LinePreview.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        stationName: PropTypes.string,
        visible: PropTypes.bool,
        onClearPress: PropTypes.func,
        onLinePress: PropTypes.func,
        lines: PropTypes.any,
        selectedLine: PropTypes.string,
        onFeedPress: PropTypes.func,
        onCheckInPress: PropTypes.func,
        onDismiss: PropTypes.func,

        reportsOnLine: PropTypes.number,

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here

    });

export default LinePreview;

/** APPENDIX - these things work

<Text style={{
                color: '#97ACB3',
                fontSize: 18,
                fontWeight: 'bold',
              }}
              >
                {stationName}
              </Text>

**/

/**
<View style={{
            flexDirection: 'row',
          }}>
              <FeaturedComment
                title={'10m ago • fochin82'}
                imageSrc={'https://randomuser.me/api/portraits/men/18.jpg'}
                comment={'omg this is like the second day that this gawdam train has been >15 mins late...'}
                isLiked={false}
                likeCount={12}
                onLikePress={onLinePress}
                onCommentPress={onFeedPress}
              />

              <Icon 
                name='angle-double-up'
                color='white'
                type='font-awesome'
                onPress={onClearPress}
              />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            //backgroundColor: 'pink'
          }}>
            <View style={{
              flex: 4
            }}>
              <HeartButton
                isSelected={false}
                likeCount={12}
                onIconPress={onLinePress}
                style={styles.heartButton}
              />
            </View>
            <View style={{
              flex: 4
            }}>
              <Icon
                name='commenting-o'
                type='font-awesome'
                color='purple'
                onPress={onFeedPress}
              />
            </View>
            <View style={{
              flex: 8
            }}>
              <Badge
                value='+ Add Status'
                containerStyle={{
                  backgroundColor: 'black',
                  borderColor: 'orange',
                  borderWidth: 1
                }}
                textStyle={{
                  color: 'orange'
                }}
                onPress={onLinePress}
              />
            </View>
            <View style={{
              flex: 6
            }}>
            </View>
          </View>
        </View>
**/
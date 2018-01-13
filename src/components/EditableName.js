import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableHighlight,
  Text,
  TextInput,
} from 'react-native'
import {
  Card,
  Avatar,
  Icon,
  Badge
} from 'react-native-elements'
import HeartButton from './HeartButton'
import HeartButtonVertical from './HeartButtonVertical'
import ToggleconMini from './ToggleconMini'
import PropTypes from 'prop-types'
/*-- THE COMPONENT --*/

/*class EditableName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.nameValue
    }
  }

  getNameAndSubmit(name){
    this.props.onSubmit(name);
  }

  componentWillReceiveProps(){
    this.setState({
      text: this.props.nameValue
    });
  }

  render(){

    return(
    <View style={{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: '3%',
    }}>
      <Avatar
        xlarge
        rounded
        source={{uri: 'https://randomuser.me/api/portraits/men/49.jpg' }}
        //onPress={onMenuPress}
      />
      <View style={{
        paddingTop: '3%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%'
      }}>
        <TextInput
          editable={true} 
          maxLength={21}
          returnKeyType='done'
          //defaultValue={this.props.nameValue}
          onChangeText={text => this.setState({text})}
          autoCapitalize='none'
          value={this.state.text}
          onEndEditing={() => this.getNameAndSubmit(this.state.text)}
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#97ACB3',
            fontFamily: 'Menlo',
            width: '100%',
            textAlign: 'center'
        }}>
        </TextInput>
        <Badge
          color='orange'
          value='Edit'
        />
      </View>
    </View>
  )

  }
  
  
}
*/

/*-- AS PURE FUNC --- */


const EditableName = (props: EditableNameProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      inEditingMode,
      nameValue,
      onSubmit,
      onEditableNameTextChange

    } = props;

  //do functions
    //insert some functions here
    return(
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: '3%',
      }}>
        <Avatar
          xlarge
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/49.jpg' }}
          //onPress={onMenuPress}
        />
        <View style={{
          paddingTop: '3%',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '90%'
        }}>
          <TextInput
            editable={true} 
            maxLength={21}
            returnKeyType='done'
            defaultValue={nameValue}
            onChangeText={onEditableNameTextChange}
            autoCapitalize='none'
            onEndEditing={() => this.getNameAndSubmit(this.state.text)}
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#97ACB3',
              fontFamily: 'Menlo',
              width: '100%',
              textAlign: 'center'
          }}>
          </TextInput>
          <Badge
            color='orange'
            value='Edit'
          />
        </View>
      </View>
    )  
  }

  //Enter the default values of the props
    EditableName.defaultProps = {
      //enter the default values here
        inEditingMode: false,
        nameValue: '',
        onSubmit: console.log('onSubmit'),
        onEditableNameTextChange: console.log('onEditableNameTextChange')
    };

  //Define the props here
    EditableName.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])
        inEditingMode: PropTypes.bool,
        nameValue: PropTypes.string,
        onSubmit: PropTypes.func,
        onEditableNameTextChange: PropTypes.func
    };

export default EditableName;

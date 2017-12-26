
import React, { Component } from 'react';
import { 
  View,
  Text,
  TextInput,
} from 'react-native'
import { 
  Button,
  ButtonGroup,
  Avatar, 
  Icon,
  FormLabel,
  FormInput,
} from 'react-native-elements'
import {
  NavigationActions
} from 'react-navigation'
import Togglecon from '../../components/Togglecon'

//redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
    import * as Actions from './actions' 

class FilterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {

      comment: '',
      modalVisible: false,
      status: '',
    }
  }

  componentWillMount() {
    this.props.actions.showFilterModal();
  }

  componentDidUpdate() {
    if(this.props.showFilterModal == false){
      this.props.navigation.dispatch(NavigationActions.back())
    }
  }


  render() {

    return (
      <View style={{
        paddingTop: '5%',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      }}> 
        <Text
          style = {{
            color: 'white'
          }}
        >
          Hello World.  This is the FilterModal
        </Text>
      </View>
    );
  } //end render
}//end component

/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {
          showFilterModal: state.hellofeed.showFilterModal,
        } 
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(FilterModal);
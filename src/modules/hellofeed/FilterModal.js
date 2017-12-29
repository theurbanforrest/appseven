
import React, { Component } from 'react';
import { 
  View,
  Text,
  TextInput,
} from 'react-native'
import { 
  Badge,
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
import { lineList } from '../supermap/data'

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
        <View style={{
          bottom: 0,
          height: '25%',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}>
          <View style={{
            flex: 2,
            //backgroundColor: 'yellow',  //for debug
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: '3%',
          }}>
            {
              lineList.map( (line) => (
                  <Badge
                    key={line.id}
                    value={line.id}
                    containerStyle={{
                      backgroundColor: this.props.selectedLine == line.id ? line.bg : 'gainsboro'
                    }}
                    textStyle={{
                      color: this.props.selectedLine == line.id ? line.text : 'white'
                    }}
                    onPress={() => this.props.actions.fetchSpecialStopsAttempt(line.id,this.props.selectedStops,this.props.specialStops )} //this.props.actions.getAllStops(line.id,[])}
                  />
                )
              )
            }
          </View>
        </View>
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
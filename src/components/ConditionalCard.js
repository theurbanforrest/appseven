import React, { PropTypes, Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import { 
  Card,
  List,
  ListItem,
  Icon,
  FormLabel,
  FormInput,
} from 'react-native-elements';
import { stationdetails }  from './data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

    //need this for Components instead of pure functions
    import * as Actions from './actions'

class ConditionalView extends Component {
        function renderIf(condition, content) {
        if (condition) {
            return content;
        } else {
            return null;
        }
    }
    //need this for Components instead of pure functions
    constructor(props) {
      super(props);
    }
    //need this for Components instead of pure functions
    const { state, actions } = this.props;


    render() {
        return (
            <View>
                {renderIf(this.state.isUserLoggedIn, 
                    <LogOutButton />
                )}
                
                {renderIf(!this.state.isUserLoggedIn,
                    <LogInButton />
                )}
            </View>
        )
    }
}
import React, { PropTypes, Component } from 'react';
import {
  ScrollView,
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
  Button
} from 'react-native-elements';
import { stationdetails }  from './data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { styles } from './styles'

    //need this for Components instead of pure functions
    import * as Actions from './actions'

class StationDetail extends Component {

    //need this for Components instead of pure functions
    constructor(props) {
      super(props);
    }

  render() {
    const { id, shortName, longName, area, lines, colors } = this.props.navigation.state.params;

      //need this for Components instead of pure functions
      //const { state, actions } = this.props;

    //const { likeComment } = props;

    //const id = 1;
    //const longName = 'some long name';

    return <ScrollView>
        <Card
          title={longName}
          imageSrc={'https://randomuser.me/api/portraits/men/2.jpg'}
          height={180}
          >
        </Card>
        <List
          containerStyle={styles.fcList}
        >
          {stationdetails[id-1].items.map((checkin) => (
            <ListItem
            key={checkin.posted_by}
            title={checkin.posted_by}
            subtitle={checkin.comments}

            avatar={'https://randomuser.me/api/portraits/women/12.jpg'}
            roundAvatar={true}

            underlayColor={'blue'}
            onPress={() => this.props.actions.likeComment(checkin.record_id)}
            />
          ))}
        </List>

        <Button 
          text='hi there'
          onPress={() => console.log(this.props.idGen)}
        />

        <Text>
          {this.props.idGen}
        </Text>
      </ScrollView>
  }
}

  export default connect(
    //this is mapStateToProps verbosely
    (state) => {
      return {
        idGen: state.stationdetail.idGen,
        likedComments: state.stationdetail.likedComments
      }
    },
    //this is mapDispatchToProps verbosely
    (dispatch) => ({
      actions: bindActionCreators(Actions, dispatch)
    }),
  )(StationDetail);

/* from https://github.com/reactjs/redux/issues/1159

  // Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    date: state.date
  }
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    handlePrev: (date) => dispatch(prevWeek(date)),
    handleNext: (date) => dispatch(nextWeek(date)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekBar)
*/

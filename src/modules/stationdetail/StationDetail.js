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


  clickedThisItem(record_id) {
      //need this for Components instead of pure functions
      this.props.actions.likeComment(record_id);
  }

  render() {
    const { id, shortName, longName, area, lines, colors } = this.props.navigation.state.params;

      //need this for Components instead of pure functions
      const { state, actions } = this.props;

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
            onPress={() => this.clickedThisItem(checkin.record_id)}
            />
          ))}
        </List>
      </ScrollView>
  }
}

  //need this for Components instead of pure functions
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({},
      Actions
      ), dispatch);
  }
  export default connect(state => ({
      state: state.likedComments
    }),
    (dispatch) => ({
      actions: bindActionCreators(Actions, dispatch)
    })
  )(StationDetail);



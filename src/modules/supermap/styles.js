import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  lineandmenucontainer: {
    //position: 'absolute',
    bottom: 0,
    height: '25%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    //top: '80%'
    //backgroundColor: 'violet', //for debug
  },

  lineselector: {
    flex: 2,
    //backgroundColor: 'yellow',  //for debug
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '3%',
  },

  appheader: {
    flex: 1,
  	backgroundColor: 'black', // 'green',	//for debug
    padding: '3%',
  },

  mapview: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    //flex: 18,
  },

  checkinbutton: {

  },

  stationpreview: {
    position: 'absolute',
          top: '0%',
          height: '30%',
          right: '0%',
          width: '100%',
  },

})
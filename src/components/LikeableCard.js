// @flow

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { Button } from './Button'

  //define styles
  const styles = StyleSheet.create({
    fCard: {

    }
  })

  //declare functions
  type CounterProps = {
    likeIt: () => void,
    //decrementFn: () => void,
    //children: () => void,
    //incrementFn: () => void,
    //incrementWithDelayFn: () => void
  }


/*-- LikeableCard --*/
export const LikeableCard = (props: LikeableCardProps) => {
  const { likeIt } = props


// GET BACK TO WORK HERE !!

  return (<Card style={styles.fCard}
          title={longName}
          imageSrc={'https://randomuser.me/api/portraits/men/2.jpg'}
          height={180}
          >
        </Card>
        <FormLabel>Name</FormLabel>
        <FormInput />
  )
}

/*
<View style={styles.container}>
      <Button onClick={likeIt}>-</Button>
      <Text style={styles.label}>{children}</Text>
      <Button onClick={incrementFn}>+</Button>
      <Button onClick={incrementWithDelayFn}>+ with delay</Button>
    </View>
*/
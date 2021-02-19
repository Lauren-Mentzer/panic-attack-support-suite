import React from 'react';
import { View, StyleSheet } from 'react-native';

import Shadow from '../../constants/shadow';

const Card = (props) => {
  const { children, style } = props;
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    ...Shadow,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
});

export default Card;

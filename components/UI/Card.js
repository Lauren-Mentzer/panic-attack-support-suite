import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import Shadow from '../../constants/shadow';

const Card = (props) => {
  const { children, style } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    card: {
      ...Shadow,
      backgroundColor: colorMode === 'Dark' ? colors.primary : 'white',
      borderRadius: 10,
      padding: 20,
    },
  });
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export default Card;

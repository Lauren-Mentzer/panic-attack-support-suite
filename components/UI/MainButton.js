import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import TouchableComponent from './TouchableComponent';

const MainButton = (props) => {
  const { children, color, style, onPress, containerStyle, disabled } = props;
  const isNewAndroid = Platform.OS === 'android' && Platform.Version >= 21;

  return (
    <View style={{ ...style, ...{ backgroundColor: isNewAndroid ? color : '' } }}>
      <TouchableComponent
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.5}
        style={{
          ...styles.container,
          ...containerStyle,
          ...{ backgroundColor: isNewAndroid ? '' : color },
        }}
      >
        <View style={styles.container}>{children}</View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainButton;

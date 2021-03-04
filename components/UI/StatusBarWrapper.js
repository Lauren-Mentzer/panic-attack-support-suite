import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StatusBar, Platform } from 'react-native';

const StatusBarWrapper = (props) => {
  const { children } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [barStyle, setBarStyle] = useState();
  const [barColor, setBarColor] = useState();

  useEffect(() => {
    let style = colorMode === 'Dark' ? 'light-content' : 'dark-content';
    let color = null;
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      color = colors.primary;
      style = 'light-content';
    }
    setBarStyle(style);
    setBarColor(color);
  }, [colors]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={barColor} barStyle={barStyle} />
      {children}
    </View>
  );
};

export default StatusBarWrapper;

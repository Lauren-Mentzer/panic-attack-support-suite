import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Platform, Switch } from 'react-native';
import { color } from 'd3-color';

const Toggle = (props) => {
  const { toggleValue, toggleHandler } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [trackColor, setTrackColor] = useState({});
  const [thumbColor, setThumbColor] = useState();
  const [iosBg, setIosBg] = useState();

  useEffect(() => {
    let fadedColor = color(colors.shade2);
    fadedColor.opacity = 0.3;
    const fadedPrimary = color(colors.primary);
    fadedPrimary.opacity = 0.3;
    let androidActive = colors.shade2;
    let androidInactiveTrack = 'gray';
    let ios = 'lightgray';
    if (colorMode === 'Dark') {
      ios = colors.shade3;
      fadedColor = color(colors.accent);
      fadedColor.opacity = 0.3;
      androidActive = colors.accent;
      const fadedGray = color('lightgray');
      fadedGray.opacity = 0.2;
      androidInactiveTrack = fadedGray.toString();
    }
    const iosTrack = colorMode === 'Dark' ? colors.accent : colors.shade3;
    const androidThumb = toggleValue ? androidActive : 'lightgray';

    setTrackColor({
      false: androidInactiveTrack,
      true: Platform.OS === 'ios' ? iosTrack : fadedColor.toString(),
    });
    setThumbColor(androidThumb);
    setIosBg(ios);
  }, [colors, toggleValue]);

  return (
    <Switch
      value={toggleValue}
      onValueChange={toggleHandler}
      ios_backgroundColor={iosBg}
      trackColor={trackColor}
      thumbColor={Platform.select({ android: thumbColor, ios: undefined })}
    />
  );
};

export default Toggle;

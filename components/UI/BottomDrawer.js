import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableWithoutFeedback, Modal, SafeAreaView, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import TouchableComponent from './TouchableComponent';

const getStyles = (colors, colorMode) => {
  return {
    modalBg: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'flex-end',
    },
    closeBg: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    childrenContainer: {
      paddingVertical: 10,
    },
    safeArea: {
      backgroundColor: colorMode === 'Dark' ? colors.primary : colors.light,
    },
    drawerItem: {
      backgroundColor: Platform.select({
        android: colorMode === 'Dark' ? colors.shade1 : colors.primary,
        ios: colorMode === 'Dark' ? colors.primary : colors.light,
      }),
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 60,
      borderTopWidth: Platform.OS === 'android' ? 0 : 1,
      borderTopColor: '#ccc',
    },
    drawerTitle: {
      fontFamily: 'OpenSans_600SemiBold',
      fontSize: 15,
      color: Platform.select({ android: 'white', ios: colors.text }),
    },
  };
};

const BottomDrawer = (props) => {
  const { drawerOpen, setDrawerOpen, children } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles, setStyles] = useState(getStyles(colors));

  useEffect(() => {
    setStyles(getStyles(colors, colorMode));
  }, [colors]);

  return (
    <Modal visible={drawerOpen} animationType="fade" transparent>
      <View style={styles.modalBg}>
        <TouchableWithoutFeedback onPress={() => setDrawerOpen(false)}>
          <View style={styles.closeBg} />
        </TouchableWithoutFeedback>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.childrenContainer}>{children}</View>
          <TouchableComponent activeOpacity={0.5} onPress={() => setDrawerOpen(false)}>
            <View style={styles.drawerItem}>
              <Text style={styles.drawerTitle}>Close</Text>
              <Ionicons name="close" size={25} color={Platform.select({ android: 'white', ios: colors.text })} />
            </View>
          </TouchableComponent>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default BottomDrawer;

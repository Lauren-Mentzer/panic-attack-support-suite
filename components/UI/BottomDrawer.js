import React from 'react';
import { View, TouchableWithoutFeedback, Modal, StyleSheet, SafeAreaView, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';
import TouchableComponent from './TouchableComponent';

const BottomDrawer = (props) => {
  const { drawerOpen, setDrawerOpen, children } = props;
  return (
    <Modal visible={drawerOpen} animationType="slide" transparent>
      <View style={styles.modalBg}>
        <TouchableWithoutFeedback onPress={() => setDrawerOpen(false)}>
          <View style={styles.closeBg} />
        </TouchableWithoutFeedback>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.childrenContainer}>{children}</View>
          <TouchableComponent activeOpacity={0.5} onPress={() => setDrawerOpen(false)}>
            <View style={styles.drawerItem}>
              <Text style={styles.drawerTitle}>Close</Text>
              <Ionicons name="close" size={25} color={Platform.OS === 'android' ? 'white' : 'black'} />
            </View>
          </TouchableComponent>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.light,
  },
  drawerItem: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.light,
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
    color: Platform.OS === 'android' ? 'white' : 'black',
  },
});

export default BottomDrawer;

import React from 'react';
import { StyleSheet, Modal, View } from 'react-native';

import Card from './Card';

const CardModal = (props) => {
  const { visible, animated, children } = props;
  return (
    <Modal visible={visible} presentationStyle="overFullScreen" transparent animationType={animated ? 'fade' : 'none'}>
      <View style={styles.modal}>
        <Card style={styles.modalContent}>{children}</Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
  },
});

export default CardModal;

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, Platform, Alert, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Input from '../../components/UI/Input';
import { saveInfo } from '../../store/actions/medInfo';
import HeaderButton from '../../components/UI/HeaderButton';
import HelpButton from '../../components/HelpButton';
import WalkthroughModal from '../../components/WalkthroughModal';

const MODAL_TEXT = [
  'Here you can input as much information as you are comfortable sharing in case of an emergency. No field is required, so only fill it out to your comfort level. Be sure to hit the save button in the top right corner before leaving the page.',
];

const InfoSettingsScreen = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    screen: {
      flex: 1,
      backgroundColor: colors.light,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    contents: {
      paddingBottom: 20,
    },
    inputWrapper: {
      marginVertical: 10,
    },
    headerLabel: {
      fontFamily: 'OpenSans_600SemiBold',
      fontSize: 16,
      color: colors.title,
    },
    headerRow: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    description: {
      marginBottom: 10,
      fontFamily: 'OpenSans_400Regular',
      color: colors.text,
    },
  });

  const storeName = useSelector((state) => state.medInfo.name);
  const storeBirthday = useSelector((state) => state.medInfo.birthday);
  const storeAddress = useSelector((state) => state.medInfo.address);
  const storeMedications = useSelector((state) => state.medInfo.medications);
  const storeMedNotes = useSelector((state) => state.medInfo.medNotes);
  const storeAllergies = useSelector((state) => state.medInfo.allergies);
  const [name, setName] = useState(storeName);
  const [birthday, setBirthday] = useState(storeBirthday);
  const [address, setAddress] = useState(storeAddress);
  const [medications, setMedications] = useState(storeMedications);
  const [medNotes, setMedNotes] = useState(storeMedNotes);
  const [allergies, setAllergies] = useState(storeAllergies);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const save = useCallback(() => {
    const newName = name && name.trim().length ? name.trim() : null;
    const newBirthday = birthday && birthday.trim().length ? birthday.trim() : null;
    const newAddress = address && address.trim().length ? address.trim() : null;
    const newMedications = medications && medications.trim().length ? medications.trim() : null;
    const newMedNotes = medNotes && medNotes.trim().length ? medNotes.trim() : null;
    const newAllergies = allergies && allergies.trim().length ? allergies.trim() : null;
    dispatch(saveInfo(newName, newBirthday, newAddress, newMedications, newMedNotes, newAllergies));
  }, [name, birthday, address, medications, medNotes, allergies]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Settings"
            iconName={Platform.OS === 'ios' ? 'save-sharp' : 'save'}
            onPress={save}
            buttonStyle={{
              color: Platform.select({
                ios: colorMode === 'Dark' ? 'white' : colors.primary,
                android: 'white',
              }),
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [save]);

  useEffect(() => {
    const hasChanges =
      name !== storeName ||
      birthday !== storeBirthday ||
      address !== storeAddress ||
      medications !== storeMedications ||
      medNotes !== storeMedNotes ||
      allergies !== storeAllergies;
    setHasUnsavedChanges(hasChanges);
  }, [
    name,
    birthday,
    address,
    medications,
    medNotes,
    allergies,
    storeName,
    storeBirthday,
    storeAddress,
    storeMedications,
    storeMedNotes,
    storeAllergies,
  ]);

  useEffect(() => {
    const leaveListener = (e) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      Alert.alert('Discard changes?', 'You have unsaved changes. Are you sure to discard them and leave the screen?', [
        { text: "Don't leave", style: 'default' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    };
    navigation.addListener('beforeRemove', leaveListener);
    return () => {
      navigation.removeListener('beforeRemove', leaveListener);
    };
  }, [navigation, hasUnsavedChanges]);

  return (
    <ScrollView style={styles.screen}>
      <WalkthroughModal name="emergencySettings" textArray={MODAL_TEXT} />
      <View style={styles.contents}>
        <View style={styles.headerRow}>
          <Text style={styles.headerLabel}>EMERGENCY INFORMATION</Text>
          <HelpButton>
            <View>
              <Text style={styles.description}>
                This information, accessed via the star icon in the top of the Home screen, can be useful for easily
                showing others vital health and safety information in the event of a medical emergency.
              </Text>
              <Text style={styles.description}>
                None of these fields are mandatory - only fill them out to your comfort and safety level.
              </Text>
            </View>
          </HelpButton>
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Full Name"
            id="name"
            autoCapitalize="words"
            returnKeyType="next"
            editable
            onInputChange={(_, value) => setName(value)}
            initialValue={name}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Date of Birth"
            id="birthday"
            returnKeyType="next"
            editable
            onInputChange={(_, value) => setBirthday(value)}
            initialValue={birthday}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Address"
            id="address"
            autoCapitalize="words"
            returnKeyType="next"
            editable
            onInputChange={(_, value) => setAddress(value)}
            initialValue={address}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Medications"
            id="medications"
            autoCapitalize="words"
            returnKeyType="next"
            editable
            onInputChange={(_, value) => setMedications(value)}
            initialValue={medications}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Medical Notes"
            id="medical-notes"
            returnKeyType="next"
            editable
            multiline
            onInputChange={(_, value) => setMedNotes(value)}
            initialValue={medNotes}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Allergies"
            id="allergies"
            returnKeyType="done"
            editable
            onInputChange={(_, value) => setAllergies(value)}
            initialValue={allergies}
            initiallyValid
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default InfoSettingsScreen;

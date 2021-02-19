import React, { useCallback, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  Switch,
  KeyboardAvoidingView,
  Button,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { color } from 'd3-color';

import Colors from '../../constants/colors';
import Shadow from '../../constants/shadow';
import TouchableComponent from '../../components/UI/TouchableComponent';
import MessageCard from '../../components/MessageCard';
import BottomDrawer from '../../components/UI/BottomDrawer';
import HelpButton from '../../components/HelpButton';
import Card from '../../components/UI/Card';
import {
  setPositiveAffirmations,
  POSITIVE_AFFIRMATIONS,
  enableAffirmation,
  editReminder,
  removeReminder,
  addReminder,
} from '../../store/actions/reminders';
import MainButton from '../../components/UI/MainButton';

const ReminderSettingsScreen = (props) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const remindersList = useSelector((state) => state.reminders.list);
  const enablePositiveAffirmations = useSelector((state) => state.reminders.enablePositiveAffirmations);
  const affirmationsEnabled = useSelector((state) => state.reminders.affirmations);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [inputText, setInputText] = useState('');
  const fadedColor = color(Colors.shade2);
  fadedColor.opacity = 0.3;

  const togglePositiveAffirmations = () => {
    dispatch(setPositiveAffirmations(!enablePositiveAffirmations));
  };

  const enableAffirmationHandler = useCallback(
    (index) => {
      dispatch(enableAffirmation(index, !affirmationsEnabled[index]));
    },
    [affirmationsEnabled],
  );

  const addCardHandler = () => {
    if (!inputText.trim().length) return;
    dispatch(addReminder(inputText.trim()));
    setIsAdding(false);
    setInputText('');
    // Timeout to wait for next render cycle so new card will be present
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true });
      }
    });
  };

  const deleteAddCardHandler = () => {
    setInputText('');
    setIsAdding(false);
  };

  const startAddCardHandler = () => {
    setIsAdding(true);
    // Timeout to wait for next render cycle so new input will be present
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true });
      }
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.screen} ref={scrollRef}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>POSITIVE AFFIRMATIONS</Text>
            <HelpButton>
              <View>
                <Text style={styles.helpDescription}>
                  In the midst of a panic attack, it can often be difficult to remember that things will be ok. By
                  repeating some of these simple positive affirmations to yourself, ground yourself in the reality that
                  this feeling will pass.
                </Text>
                <Text style={styles.helpDescription}>
                  If these affirmations are not helpful to you, feel free to turn them off, or enable only certain
                  statements from our list.
                </Text>
              </View>
            </HelpButton>
          </View>
          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.title}>Include Positive Affirmations</Text>
              <Text style={styles.description}>Remember some of these uplifting statements</Text>
            </View>
            <Switch
              value={enablePositiveAffirmations}
              onValueChange={togglePositiveAffirmations}
              ios_backgroundColor="lightgray"
              trackColor={{
                false: 'gray',
                true: Platform.OS === 'android' ? fadedColor : Colors.shade3,
              }}
              thumbColor={
                Platform.OS === 'android' ? (enablePositiveAffirmations ? Colors.shade2 : 'lightgray') : undefined
              }
            />
          </View>
          {enablePositiveAffirmations && (
            <TouchableComponent activeOpacity={0.5} onPress={() => setDrawerOpen(true)}>
              <View style={styles.subItem}>
                <Text style={styles.title}>Choose Affirmations</Text>
                <Ionicons name="chevron-forward" size={25} />
              </View>
            </TouchableComponent>
          )}
          <View style={styles.divider} />
          <View style={styles.headerRow}>
            <Text style={styles.header}>REMINDERS</Text>
            <HelpButton>
              <View>
                <Text style={styles.helpDescription}>
                  Below are a few examples of reminders that could be helpful for you in the midst of a panic attack.
                  Personalize these reminders to fit your needs and tendencies.
                </Text>
              </View>
            </HelpButton>
          </View>

          {remindersList.map((reminder, index) => (
            <MessageCard
              message={reminder}
              index={index}
              key={index}
              editHandler={editReminder}
              deleteHandler={removeReminder}
            />
          ))}

          {isAdding && (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <Card style={styles.card}>
                <TextInput
                  style={styles.input}
                  multiline
                  value={inputText}
                  onChangeText={(text) => setInputText(text)}
                />
                <View style={styles.buttonRow}>
                  <MainButton
                    style={styles.cardButton}
                    containerStyle={styles.smallButtonContainer}
                    color={Colors.danger}
                    onPress={deleteAddCardHandler}
                  >
                    <Text style={styles.cardButtonText}>Discard</Text>
                  </MainButton>
                  <MainButton
                    style={styles.cardButton}
                    containerStyle={styles.smallButtonContainer}
                    color={Colors.shade3}
                    onPress={addCardHandler}
                  >
                    <Text style={styles.cardButtonText}>Save</Text>
                  </MainButton>
                </View>
              </Card>
            </KeyboardAvoidingView>
          )}

          <MainButton
            style={styles.button}
            containerStyle={styles.buttonContainer}
            color={Colors.shade2}
            onPress={startAddCardHandler}
          >
            <Text style={styles.buttonText}>Add Reminder</Text>
          </MainButton>
        </View>
      </ScrollView>
      <BottomDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
        {POSITIVE_AFFIRMATIONS.map((text, index) => {
          return (
            <View style={styles.drawerItem} key={text}>
              <CheckBox
                containerStyle={styles.checkbox}
                checkedColor={Colors.shade3}
                checked={affirmationsEnabled[index]}
                onPress={() => enableAffirmationHandler(index)}
              />
              <Text style={styles.drawerText}>{text}</Text>
            </View>
          );
        })}
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  container: {
    width: '80%',
    marginHorizontal: '10%',
    paddingBottom: 40,
  },
  label: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 16,
    color: '#777',
    marginTop: 30,
  },
  switchItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  itemLeft: {
    width: '80%',
  },
  title: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 15,
  },
  description: {
    fontFamily: 'OpenSans_400Regular',
    color: '#777',
    fontSize: 15,
  },
  subItem: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  divider: {
    height: 1,
    width: '140%',
    marginLeft: '-20%',
    backgroundColor: '#ccc',
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  header: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 16,
    color: '#777',
  },
  helpDescription: {
    marginBottom: 10,
    fontFamily: 'OpenSans_400Regular',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    width: '100%',
    paddingVertical: 5,
  },
  drawerText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14,
    maxWidth: '80%',
  },
  checkbox: {
    padding: 0,
    paddingHorizontal: 5,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    paddingTop: 15,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    height: 45,
    width: '98%',
    marginHorizontal: '1%',
    marginVertical: 10,
    borderRadius: 10,
    ...Shadow,
  },
  buttonContainer: {
    borderRadius: 10,
  },
  smallButtonContainer: {
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Spartan_400Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardButton: {
    marginLeft: 10,
    width: 80,
    height: 35,
    borderRadius: 5,
  },
  cardButtonText: {
    fontFamily: 'Spartan_400Regular',
    color: 'white',
    fontSize: 14,
  },
});

export default ReminderSettingsScreen;
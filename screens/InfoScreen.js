import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';

import colors from '../constants/colors';

const InfoScreen = (props) => {
  const [styles, setStyles] = useState({});
  const colors = useSelector((state) => state.settings.colors);
  const name = useSelector((state) => state.medInfo.name);
  const birthday = useSelector((state) => state.medInfo.birthday);
  const address = useSelector((state) => state.medInfo.address);
  const medications = useSelector((state) => state.medInfo.medications);
  const medNotes = useSelector((state) => state.medInfo.medNotes);
  const allergies = useSelector((state) => state.medInfo.allergies);

  useEffect(() => {
    setStyles({
      screen: {
        flex: 1,
        backgroundColor: colors.light,
        paddingVertical: 10,
      },
      contents: {
        paddingBottom: 20,
      },
      listItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      label: {
        fontFamily: 'OpenSans_600SemiBold',
        fontSize: 15,
        marginBottom: 8,
      },
      description: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 15,
        color: '#777',
      },
      divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 10,
      },
      default: {
        width: '50%',
        marginLeft: '25%',
        marginTop: 100,
      },
      defaultMessage: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 15,
        textAlign: 'center',
      },
    });
  }, []);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.contents}>
        {name && (
          <View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.description}>{name}</Text>
            </View>

            <View style={styles.divider} />
          </View>
        )}
        {birthday && (
          <View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Date of Birth:</Text>
              <Text style={styles.description}>{birthday}</Text>
            </View>

            <View style={styles.divider} />
          </View>
        )}
        {address && (
          <View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.description}>{address}</Text>
            </View>
            <View style={styles.divider} />
          </View>
        )}
        {medications && (
          <View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Medications:</Text>
              <Text style={styles.description}>{medications}</Text>
            </View>
            <View style={styles.divider} />
          </View>
        )}
        {medNotes && (
          <View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Medical Notes:</Text>
              <Text style={styles.description}>{medNotes}</Text>
            </View>
            <View style={styles.divider} />
          </View>
        )}
        {allergies && (
          <View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Allergies:</Text>
              <Text style={styles.description}>{allergies}</Text>
            </View>
            <View style={styles.divider} />
          </View>
        )}
        {!name && !birthday && !address && !medications && !medNotes && !allergies && (
          <View style={styles.default}>
            <Text style={styles.defaultMessage}>The user has not inputted their information yet</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default InfoScreen;

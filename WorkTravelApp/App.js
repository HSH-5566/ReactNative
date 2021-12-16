import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ColorPropType } from 'react-native';
import { color } from './color';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.work}>
            WORK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.work}>
            TRAVEL
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput style={styles.text}>
        </TextInput>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bg,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  work: {
    fontSize: 30,
    color: color.white,
  },
  text: {
    backgroundColor: color.white,
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
});

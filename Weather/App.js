import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
const {width: DEVICE_WIDTH} = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Kyonggi</Text>
      </View>
      <ScrollView
         horizontal pagingEnabled showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>20º</Text>
          <Text style={styles.description}>Cloud</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>20º</Text>
          <Text style={styles.description}>Cloud</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>20º</Text>
          <Text style={styles.description}>Cloud</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>20º</Text>
          <Text style={styles.description}>Cloud</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>20º</Text>
          <Text style={styles.description}>Cloud</Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  city: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  weather: {
  },
  day: {
    flex: 1,
    width: DEVICE_WIDTH,
    alignItems: 'center',
  },
  temp: {
    fontSize: 140,
    fontWeight: '800',
  },
  description: {
    marginTop: -30,
    fontSize: 40,
  },
});

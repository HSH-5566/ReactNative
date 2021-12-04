import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const {width: DEVICE_WIDTH} = Dimensions.get('window');
const API_KEY = 'API_KEY';

export default function App() {

  const [city, setCity] = useState('Loading...');
  const [country, setCountry] = useState('Loading...');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  async function searchWeather() {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
      console.log("Error");
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude},{useGoogleMaps:false});
    setCity(location[0].city +" "+ location[0].district);
    setCountry(location[0].country + " "+ location[0].region);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
  }

  useEffect(() => {
    searchWeather();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.countryName}>{country}</Text>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
         horizontal pagingEnabled showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.weather}>
        {days.length === 0 ? 
          (<View style={styles.day}>
            <ActivityIndicator color="white"/>
          </View>) : 
          (days.map((day, idx) => (
            <View key={idx} style={styles.day}>
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
            </View>
          )))
        }
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
  countryName: {
    fontSize: 30,
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

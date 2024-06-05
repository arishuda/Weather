import React, { useState } from "react";
import axios from 'axios';
import { BASE_URL, API_KEY } from "./src/constant";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import WeatherSearch from './src/components/weatherSearch';
import WeatherInfo from './src/components/weatherInfo';

const HomeScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState("");

  const renderComponent = () => {
    switch (status) {
      case "loading":
        return <ActivityIndicator size="large" />;
      case "success":
        return <WeatherInfo weatherData={weatherData} />;
      case "error":
        return (
          <Text style={styles.errorText}>
            Something went wrong. Please try again with a correct city name.
          </Text>
        );
      default:
        return null;
    }
  };

  const searchWeather = (location) => {
    setStatus("loading");
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000; // convert to kilometers
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // convert from Kelvin to Celsius
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      
      <View style={styles.marginTop20}>{renderComponent()}</View>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Weather App' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // flex: 1,
    justifyContent: 'center',
  },
  marginTop20: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default App;

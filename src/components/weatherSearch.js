import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';

const WeatherSearch = ({ searchWeather }) => {
  const [location, setLocation] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search the weather of your city"
        numberOfLines={1}
        value={location}
        onChangeText={setLocation}
      />
      <View style={styles.buttonWrapper}>
        <Button
          title="Search"
          onPress={() => searchWeather(location)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonWrapper: {
    marginTop: 10,
  },
});

export default WeatherSearch;

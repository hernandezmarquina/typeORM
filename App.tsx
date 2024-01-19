import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {AppDataSource} from './src/database';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/screens';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDatabase();
  }, []);

  const initDatabase = async () => {
    AppDataSource.initialize().finally(() => {
      setLoading(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} />
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import {AppDataSource} from './src/database';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/screens';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error during Data Source initialization', err);
      });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
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

export default App;

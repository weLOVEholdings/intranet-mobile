import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header/Header';
import Login from './Login';
//import AsyncStorage from '@react-native-community/async-storage';
import {_retrieveData} from '../utils/storage';

function HomeScreen() {
  let token = _retrieveData('token');
  console.log('token: ' + token);

  if (token) {
    let user = _retrieveData('user');
    console.warn(user);
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Header />
              <View style={styles.sectionContainer}>
                <Text>Home</Text>
                <Text>Hi! {user.name}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  } else {
    return <Login />;
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

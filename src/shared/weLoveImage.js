import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

export default function HeaderImage() {
  return (
    <View>
      <TouchableOpacity>
        <Image
          style={styles.image}
          source={require('../assets/images/welove.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 162,
    height: 80,
    resizeMode: 'contain',
  },
});

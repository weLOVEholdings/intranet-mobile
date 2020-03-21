import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import IconButtonWithText from '../IconButtonWithText/IconButtonWithText';
import styles from './styles';
function Header({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo_icon}
        source={require('../../assets/images/welove.png')}
      />
      <ScrollView horizontal={true}>
        <IconButtonWithText
          navigationItemIcon="home"
          navigationItemTitle="Home"
        />
        <IconButtonWithText
          navigationItemIcon="newspaper"
          navigationItemTitle="Timeline"
        />
        <IconButtonWithText
          navigationItemIcon="file"
          navigationItemTitle="Report"
        />
        <IconButtonWithText
          navigationItemIcon="brain"
          navigationItemTitle="Intelligence"
        />
        <IconButtonWithText
          navigationItemIcon="bullseye"
          navigationItemTitle="Objective"
        />
        <IconButtonWithText
          navigationItemIcon="building"
          navigationItemTitle="Company"
        />
        <IconButtonWithText
          navigationItemIcon="shopping-cart"
          navigationItemTitle="Sale"
        />
      </ScrollView>
    </View>
  );
}

export default Header;

import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import IconButtonWithText from '../IconButtonWithText/IconButtonWithText';
import styles from './styles';
function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo_icon}
          source={require('../../assets/images/welove.png')}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
            navigationItemTitle="Reports"
          />
          <IconButtonWithText
            navigationItemIcon="brain"
            navigationItemTitle="Intelligence"
          />
          <IconButtonWithText
            navigationItemIcon="bullseye"
            navigationItemTitle="Objectives"
          />
          <IconButtonWithText
            navigationItemIcon="building"
            navigationItemTitle="Companies"
          />
          <IconButtonWithText
            navigationItemIcon="shopping-cart"
            navigationItemTitle="Sales"
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default Header;

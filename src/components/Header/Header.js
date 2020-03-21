import React, {Component} from 'react';
import {View, Image, ScrollView} from 'react-native';
import IconButtonWithText from '../IconButtonWithText/IconButtonWithText';
import styles from './styles';
export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo_icon}
          source={require('../../assets/images/welove.png')}
        />
        <ScrollView horizontal={true}>
          <IconButtonWithText
            navigationItemIcon="home"
            navigationItemTitle="home"
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
}

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import iconButtonWithTextStyles from './styles';

export default function IconButtonWithText({
  navigationItemIcon,
  navigationItemTitle,
}) {
  const Capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const navigation = useNavigation();
  return (
    <View style={iconButtonWithTextStyles.navigationItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationItemTitle)}>
        <View style={iconButtonWithTextStyles.navigationButton}>
          <View style={iconButtonWithTextStyles.grayCircle}>
            <FontAwesome5 name={navigationItemIcon} size={25} color="#6d6d6d" />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={iconButtonWithTextStyles.navigationButtonText}>
        {Capitalize(navigationItemTitle)}
      </Text>
    </View>
  );
}

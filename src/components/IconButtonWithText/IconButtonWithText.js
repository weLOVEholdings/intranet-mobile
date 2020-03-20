import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import iconButtonWithTextStyles from './styles';

export class IconButtonWithText extends Component {
  _onPressButton() {
    // eslint-disable-next-line no-alert
    alert('You tapped the button');
  }
  render() {
    return (
      <View style={iconButtonWithTextStyles.navigationItem}>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={iconButtonWithTextStyles.navigationButton}>
            <View style={iconButtonWithTextStyles.grayCircle}>
              <FontAwesome5
                name={this.props.navigationItemIcon}
                size={25}
                color="#6d6d6d"
              />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={iconButtonWithTextStyles.navigationButtonText}>
          {this.Capitalize(this.props.navigationItemTitle)}
        </Text>
      </View>
    );
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

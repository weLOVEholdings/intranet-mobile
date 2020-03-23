import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  grayCircle: {
    borderRadius: 100,
    backgroundColor: '#e6e6e6',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigationButton: {
    flex: 1,
    flexDirection: 'row',
  },

  navigationButtonText: {
    width: 75,
    fontWeight: 'bold',
    color: '#6d6d6d',
    textAlign: 'center',
  },

  navigationItem: {
    marginRight: 10,
  },
});
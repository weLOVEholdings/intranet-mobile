import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  grayCircle: {
    borderRadius: 100,
    backgroundColor: '#e6e6e6',
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigationButton: {
    flex: 1,
    flexDirection: 'row',
  },

  navigationButtonText: {
    width: 65,
    textAlign: 'center',
  },

  navigationItem: {
    marginRight: 10,
  },
});

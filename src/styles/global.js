import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    color: 'white',
  },
  card: {
    minHeight: 200,
  },
  titleContainer: {
    width: '100%',
    marginBottom: 30,
    color: '#fff',
    backgroundColor: '#b45f06',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyTitle: {
    color: 'white',
  },
  image: {
    width: 162,
    height: 80,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  formItemContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    lineHeight: 28,
    padding: 6,
    marginTop: 12,
    height: 32,
    paddingHorizontal: 8,
  },
  inputLabel: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
  },
});

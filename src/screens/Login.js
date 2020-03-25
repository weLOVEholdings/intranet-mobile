import React, {useState} from 'react';
import {
  ActivityIndicator,
  //AsyncStorage,
  Alert,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import HeaderImage from '../shared/weLoveImage';
import FlatButton from '../shared/button';
import {_storeData} from '../utils/storage';
import {globalStyles} from '../styles/global';

const loginSchema = yup.object({
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required(),
});

export default function Login({navigation}) {
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  const LoginSubmit = ({email, password}) => {
    const apiUrl = 'https://welove-intranet-backend.herokuapp.com/contas/login';
    let data = {
      email: email,
      password: password,
    };

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    setLoading(true);

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => {
        let status = response.status;
        if (status !== 200) {
          setLoading(false);
          Alert.alert('Invalid email or password.');
          return;
        }
        return response.json();
      })
      .then(responseData => {
        setLoading(false);
        _storeData('user', responseData.data);
        _storeData('token', responseData.token);
        Alert.alert('Hi! ' + responseData.data.name);
        nav.navigate('Home');
      });
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <HeaderImage />
        <ActivityIndicator size="large" color="#e6e6e6" animating />
      </View>
    );
  } else {
    return (
      <View style={globalStyles.container}>
        <HeaderImage />
        <View style={globalStyles.formContainer}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={values => LoginSubmit(values)}>
            {props => (
              <View>
                <View>
                  <Text style={globalStyles.inputLabel}>Email</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.email && props.errors.email}
                  </Text>
                </View>
                <View style={globalStyles.formItemContainer}>
                  <Text style={globalStyles.inputLabel}>Password</Text>
                  <TextInput
                    style={globalStyles.input}
                    secureTextEntry={true}
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.password && props.errors.password}
                  </Text>
                </View>
                <View style={globalStyles.formItemContainer}>
                  <FlatButton onPress={props.handleSubmit} text="Login" />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}

import React, {useState} from 'react';
import {View, Text, TextInput, Alert, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import HeaderImage from '../shared/weLoveImage';
import FlatButton from '../shared/button';
import {globalStyles} from '../styles/global';

const registerSchema = yup.object({
  name: yup
    .string()
    .required(),
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required(),
  phone: yup
    .string()
    .required(),
});

export default function Register() {
  const [loading, setLoading] = useState(false);

  const registerSubmit = ({email, password, name, phone}) => {
    const apiUrl = 'https://welove-intranet-backend.herokuapp.com/contas/criar';
    let data = {
      email: email,
      password: password,
      name: name,
      phone: phone,
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
        Alert.alert('Account successfully created');
      });
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <HeaderImage />
        <ActivityIndicator size="large" color="#0000ff" animating />
      </View>
    );
  } else {
    return (
      <View style={globalStyles.container}>
        <HeaderImage />
        <View style={globalStyles.formContainer}>
          <Formik
            initialValues={{name: '', email: '', password: '', phone: ''}}
            validationSchema={registerSchema}
            onSubmit={values => registerSubmit(values)}
          >
            {props => (
              <View>
                <View>
                  <Text style={globalStyles.inputLabel}>Name</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={props.handleChange('name')}
                    onBlur={props.handleBlur('name')}
                    value={props.values.name}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.name && props.errors.name}
                  </Text>
                </View>
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
                <View>
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
                <View>
                  <Text style={globalStyles.inputLabel}>Phone</Text>
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={props.handleChange('phone')}
                    onBlur={props.handleBlur('phone')}
                    value={props.values.phone}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.phone && props.errors.phone}
                  </Text>
                </View>
                <View>
                  <FlatButton onPress={props.handleSubmit} text="Register" />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}

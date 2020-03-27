import React from 'react';
import {
  Alert,
  View,
  Platform,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ProgressBar from '@kcodev/react-native-progress-bar';
import HTML from 'react-native-render-html';
import Header from '../components/Header/Header';
import {globalStyles} from '../styles/global';
import {_retrieveData} from '../utils/storage';
import {_startWeek, _endWeek} from '../utils/dateSetter';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class Objectives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: '',
      weeklyObjectives: [],
      title: '',
      progress: '',
    };
  }

  componentDidMount() {
    _retrieveData('user').then(user => this.setState({user: user}));
    _retrieveData('token').then(token => this.setState({token: token}));
    _retrieveData('weeklyObjectives').then(weeklyObjectives =>
      this.setState({weeklyObjectives: JSON.parse(weeklyObjectives)}),
    );
  }

  createObjective() {
    const apiUrl =
      'https://welove-intranet-backend.herokuapp.com/objectives/weekly';
    let data = {
      title: this.state.title,
    };

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        if (responseData.success) {
          this.setState({title: ''});
          Alert.alert('Objective created');
        }
      });
  }

  updateObjective(id) {
    const apiUrl =
      'https://welove-intranet-backend.herokuapp.com/objectives/id/' +
      id +
      '/progress';
    let data = {
      progress: this.state.progress,
    };

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        if (responseData.success) {
          this.setState({progress: ''});
          Alert.alert('Progress updated');
        }
      });
  }

  onChangeTextarea = text => {
    this.setState({title: text});
  };

  onChangeProgress = progress => {
    this.setState({progress: progress});
  };

  render() {
    console.log(this.state.weeklyObjectives);
    return (
      <View
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <StatusBar
          hidden={false}
          backgroundColor="#d53622"
          translucent={true}
        />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Header />
              <View style={styles.sectionContainer}>
                <Text style={styles.pageTitle}>Weekly objectives</Text>
                <Text style={styles.weekdate}>
                  {_startWeek()} to {_endWeek()}
                </Text>
                <View style={styles.objectivesList}>
                  <View style={styles.createObjectiveWidget}>
                    <View style={styles.borderWidget}>
                      <Textarea
                        onChangeText={this.onChangeTextarea}
                        defaultValue={this.state.title}
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        maxLength={120}
                        placeholder={'Write Objective Here'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                      />
                    </View>
                    <View style={styles.alignLeft}>
                      <TouchableOpacity
                        style={styles.createProgressButton}
                        onPress={() => {
                          this.createObjective();
                        }}>
                        <FontAwesome5
                          name="plus-circle"
                          size={16}
                          color="green"
                          style={{marginRight: 3}}
                        />
                        <Text
                          // eslint-disable-next-line react-native/no-inline-styles
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#737373',
                          }}>
                          Create objective
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {this.state.weeklyObjectives.length > 0 &&
                    this.state.weeklyObjectives.map(obj => {
                      return (
                        <View style={styles.progressStatus} key={obj.id}>
                          <View style={styles.objectiveProgress}>
                            <View style={styles.objectiveProgressDescription}>
                              <HTML
                                html={obj.title}
                                style={[
                                  globalStyles.customFont,
                                  {color: '#4c4c4c', fontWeight: 'bold'},
                                ]}
                              />
                            </View>
                          </View>
                          <View style={styles.progressBar}>
                            <Text
                              style={
                                (globalStyles.objectiveFont,
                                [styles.progressBarStatus])
                              }>
                              Progress: {obj.progress}%
                            </Text>
                            <ProgressBar
                              value={obj.progress}
                              maxValue={100}
                              backgroundColorOnComplete="#123123"
                              backgroundColor="#8ab4f8"
                              borderRadius={0}
                            />
                          </View>
                          <View
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                              marginTop: 10,
                              flexDirection: 'row',
                              width: '100%',
                            }}>
                            <TextInput
                              style={styles.percentInput}
                              maxLength={2}
                              onChangeText={value =>
                                this.onChangeProgress(value)
                              }
                              keyboardType="numeric"
                            />
                            <Text style={{marginTop: 5, marginLeft: 3}}>%</Text>
                            <TouchableOpacity
                              style={styles.updateProgressButton}
                              onPress={() => {
                                this.updateObjective(obj.id);
                              }}>
                              <FontAwesome5
                                name="plus-circle"
                                size={16}
                                color="green"
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{marginRight: 3, marginTop: 5}}
                              />
                              <Text
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  color: '#737373',
                                }}>
                                Update Objective
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    marginBottom: 42,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  objectivesList: {
    marginTop: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStatus: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectiveProgress: {
    marginTop: 5,
    width: '100%',
  },
  objectiveProgressTitle: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 5,
  },
  objectiveProgressDescription: {
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 2,
  },
  progressBar: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  progressBarStatus: {
    marginBottom: 10,
  },
  pageTitle: {
    //marginTop: 12,
    color: '#212529',
    fontSize: 28,
    fontWeight: 'bold',
  },
  weekdate: {
    color: '#757575',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createObjectiveWidget: {
    marginTop: 5,
    width: '100%',
  },
  inputWidget: {
    borderWidth: 1,
    borderColor: '#cdcdcd',
    padding: 0,
  },
  borderWidget: {
    borderWidth: 1,
    borderColor: '#ababab',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textarea: {
    fontSize: 14,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    height: 70,
    padding: 0,
    marginBottom: 10,
  },
  textareaContainer: {
    height: 70,
  },
  // createObjectiveWidget: {
  //   width: '85%',
  // },
  createProgressButton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  percentInput: {
    borderWidth: 1,
    borderColor: '#cdcdcd',
    padding: 4,
    lineHeight: 28,
    height: 30,
    width: 50,
  },
  updateProgressButton: {
    marginLeft: 15,
    marginTop: 3,
    flexDirection: 'row',
  },
  alignLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
});

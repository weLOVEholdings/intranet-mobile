import React from 'react';
import {
  Alert,
  View,
  PlatForm,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ProgressBar from '@kcodev/react-native-progress-bar';
import HTML from 'react-native-render-html';
import Header from '../components/Header/Header';
import {globalStyles} from '../styles/global';
import {_retrieveData} from '../utils/storage';
import {_startWeek, _endWeek} from '../utils/dateSetter';

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
    const apiUrl = 'https://welove-intranet-backend.herokuapp.com/objectives/weekly';
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
          Alert.alert('Objective created');
        }
      });
  }

  updateObjective(id, progress) {
    const apiUrl = 'https://welove-intranet-backend.herokuapp.com/objectives/id/' + id + '/progress';
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
          Alert.alert('Progress updated');
        }
      });
  }

  render() {
    console.log(this.state.weeklyObjectives);
    return (
      <View style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
        <StatusBar hidden = {false} backgroundColor = "#d53622" translucent = {true}/>
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
                  {this.state.weeklyObjectives.length > 0 && this.state.weeklyObjectives.map(obj => {
                    return (
                      <View style={styles.progressStatus} key={obj.id}>
                        <View style={styles.objectiveProgress}>
                          <Text style={[globalStyles.customFont, styles.objectiveProgressTitle]}>
                            OBJECTIVE
                          </Text>
                          <View style={styles.objectiveProgressDescription}>
                            <HTML html={obj.title} style={[globalStyles.customFont, {color: '#4c4c4c', fontWeight: 'bold'}]}/>
                          </View>
                        </View>
                        <View style={styles.progressBar}>
                          <Text style={globalStyles.customFont, [styles.progressBarStatus]}>
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
                      </View>);
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStatus: {
    marginTop: 20,
    width: '85%',
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
    marginTop: 12,
    color: '#212529',
    fontSize: 28,
    fontWeight: 'bold',
  },
  weekdate: {
    color: '#757575',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

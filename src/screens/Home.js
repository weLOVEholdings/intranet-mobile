/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Moment from 'moment';
import Header from '../components/Header/Header';
import Login from './Login';
import {_retrieveData} from '../utils/storage';
import ProgressBar from '@kcodev/react-native-progress-bar';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: _retrieveData('token'),
      dayplan: [],
      eodplan: [],
      weeklyObjectives: [],
      dayreports: [],
    };
  }

  // expandView(type){
  // }

  componentDidMount() {
    let baseUrl = 'https://welove-intranet-backend.herokuapp.com';
    let userUrl = baseUrl + '/contas/id/';
    let reportUrl = baseUrl + '/reports/id/';
    let objectivesUrl = baseUrl + '/objectives/weekNumber/';
    let userId;
    let weekNumber = Moment().isoWeek();
    _retrieveData('user').then(user => this.setState({user: user}));
    _retrieveData('token').then(token => {
      this.setState({token: token});
      fetch(objectivesUrl + weekNumber, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token,
          Authorization: 'Bearer ' + token,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          //console.log(JSON.stringify(responseJson.data));
          this.setState(prevState => ({
            weeklyObjectives: [
              ...prevState.weeklyObjectives,
              responseJson.data,
            ],
          }));
        });
    });

    let now = Moment();
    let year = now.get('year');
    let month = now.get('month') + 1;
    let day = now.get('date');

    fetch(baseUrl + '/reportsteam/year/' + year + '/month/' + month + '/day/' + day)
      .then(response => response.json())
      .then(responseJson => {
        let dayreports = responseJson.data;
        dayreports.map(report => {
          let url = '/reports/reportsteam/id/' + report._id;
          fetch(baseUrl + url)
            .then(response => response.json())
            .then(responseReportJson => {
              let reports = responseReportJson.data.sort(function(a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
              reports.map(r => {
                fetch(userUrl + r.userId)
                  .then(response => response.json())
                  .then(responseJsonUser => {
                    if (responseJsonUser.success === true) {
                      let user = responseJsonUser.data;

                      let reportItem = {
                        userpic: user.picture,
                        username: user.name,
                        type: r.type,
                        id: r._id,
                        createdAt: r.createdAt,
                      };
                      if (r.type === 'dayplan') {
                        this.setState(prevState => ({
                          dayplan: [...prevState.dayplan, reportItem],
                        }));
                      } else {
                        this.setState(prevState => ({
                          eodplan: [...prevState.eodplan, reportItem],
                        }));
                      }
                    }
                  });
              });
            });
        });
      });
  }

  render() {
    if (this.state.token) {
      return (
        <View style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
          <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "transparent" translucent = {true}/>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={styles.body}>
                <Header />
                <View style={styles.sectionContainer}>
                  <View style={styles.main}>
                    <Text style={{fontSize: 18}}>Day OverView</Text>
                    <View style={styles.userpart}>
                      <Text style={{fontSize: 28}}>Hello, {this.state.user.name}</Text>
                    </View>
                    <View style={styles.context}>
                      <TouchableOpacity onPress={()=>{
                        this.expandView("weekly")
                      }}>
                        <View style={styles.weeklyPart}>
                          <Text style={{fontSize: 17, borderBottomWidth: 1, borderColor: '#00000032' }}>Weekly Goals</Text>
                          <View style={styles.progressStatus}>
                            <View style={styles.objectiveProgress}>
                              <Text style={styles.objectiveProgressTitle}>OBJECTIVE</Text>
                              <View style={styles.objectiveProgressDescription}>
                                <Text style={styles.objectiveProgressDescriptionContext}>Complete INTRANET mobile application Start Work on courses module Start work on timeline module</Text>
                              </View>
                            </View>
                            <View style={styles.progressBar}>
                              <Text style={styles.progressBarStatus}>Progress: 70%</Text>
                              <ProgressBar value={70} maxValue={100} backgroundColorOnComplete="#123123" backgroundColor="#987987" />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        this.expandView("dop")
                      }}>
                        <View style={styles.dayPart}>
                          <Text style={{fontSize: 17}}>Day Plans</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        this.expandView("eod")
                      }}>
                        <View style={styles.eodPart}>
                          <Text style={{fontSize: 17}}>End of the day</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      );
    } else {
      return <Login />;
    }
  }
}

export default HomeScreen;

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
  context: {
    marginTop: 20,
  },
  weeklyPart: {
    marginBottom: 30,
  },
  dayPart: {
    marginBottom: 30,
  },
  eodPart: {
    marginBottom: 30,
  },
  progressStatus: {
    marginTop: 20,
  },
  objectiveProgress: {
    marginTop: 5,
  },
  objectiveProgressDescription: {
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#cdcdcd',
  },
  progressBar: {
    marginTop: 10,
  },
  progressBarStatus: {
    marginBottom: 10,
  },
});

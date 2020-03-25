import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Moment from 'moment';
import Header from '../components/Header/Header';
import Login from './Login';
import {_retrieveData} from '../utils/storage';
import ProgressBar from '@kcodev/react-native-progress-bar';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: '',
      dayplan: [],
      eodplan: [],
      weeklyObljectives: [],
    };
  }

  expandView(type){

  }

  componentDidMount() {
    let baseUrl = 'https://welove-intranet-backend.herokuapp.com';
    let userUrl = baseUrl + '/contas/id/';
    let reportUrl = baseUrl + '/reports/id/';
    let userId;
    _retrieveData('user').then(user => this.setState({user: user}));
    _retrieveData('token').then(token => this.setState({token: token}));

    fetch(baseUrl + '/timelineentry/all')
      .then(response => response.json())
      .then(responseJson => {
        let day = [];
        let eod = [];

        day = responseJson.data.filter(
          a => Moment(a.createdAt).startOf('day') - Moment().startOf('day') === 0 && a.type === 'dayplan'
        );

        eod = responseJson.data.filter(
          a => Moment(a.createdAt).startOf('day') - Moment().startOf('day') === 0 && a.type === 'eod',
        );

        console.log('day: ' + JSON.stringify(day));
        console.log('eod: ' + JSON.stringify(eod));


        day.map(report => {
          fetch(userUrl + report.userId)
            .then(response => response.json())
            .then(responseJsonUser => {
              if (responseJsonUser.success === true) {
                let user = responseJsonUser.data;
                userId = user._id;

                fetch(reportUrl + report.modelId, {
                  headers: {
                    'x-access-token': this.state.token,
                  },
                })
                  .then(response => response.json())
                  .then(responseJsonReport => {
                    if (responseJsonReport.success === true) {
                      let reportItem = {
                        user: responseJsonUser.data,
                        report: responseJsonReport.data,
                        date: report.createdAt,
                        id: report._id,
                      };
                      this.setState(prevState => ({
                        dayplan: [...prevState.dayplan, reportItem],
                      }));
                    }
                  })
                  .catch(error => {
                    console.error(error);
                  });
              }
            });
        });

        eod.map(report => {
          fetch(userUrl + report.userId)
            .then(response => response.json())
            .then(responseJsonUser => {
              if (responseJsonUser.success === true) {
                let user = responseJsonUser.data;
                userId = user._id;

                fetch(reportUrl + report.modelId, {
                  headers: {
                    'x-access-token': this.state.token,
                  },
                })
                  .then(response => response.json())
                  .then(responseJsonReport => {
                    if (responseJsonReport.success === true) {
                      let reportItem = {
                        user: responseJsonUser.data,
                        report: responseJsonReport.data,
                        date: report.createdAt,
                        id: report._id,
                      };
                      this.setState(prevState => ({
                        eodplan: [...prevState.eodplan, reportItem],
                      }));
                    }
                  })
                  .catch(error => {
                    console.error(error);
                  });
              }
            });
        });
      });
  }

  render() {
    if (this.state.token) {
      return (
        <>
          <StatusBar backgroundColor="transparent" />
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
                      <Collapse>
                        <CollapseHeader>
                          <Separator bordered>
                            <Text>Weekly Report</Text>
                          </Separator>
                        </CollapseHeader>
                        <CollapseBody>
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
                        </CollapseBody>
                      </Collapse>

                      <Collapse>
                        <CollapseHeader>
                          <Separator bordered>
                            <Text>Day Of Plan</Text>
                          </Separator>
                        </CollapseHeader>
                        <CollapseBody>
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
                        </CollapseBody>
                      </Collapse>

                      <Collapse>
                        <CollapseHeader>
                          <Separator bordered>
                            <Text>End of day</Text>
                          </Separator>
                        </CollapseHeader>
                        <CollapseBody>
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
                        </CollapseBody>
                      </Collapse>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
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
    marginTop: 32,
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

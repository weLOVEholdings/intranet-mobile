import React from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import HTML from 'react-native-render-html';
import ProgressBar from '@kcodev/react-native-progress-bar';
import Header from '../components/Header/Header';
import {_retrieveData} from '../utils/storage';
import {_reportDate} from '../utils/dateSetter';
import {globalStyles} from '../styles/global';

export default class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      reports: [],
      token: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    let baseUrl = 'https://welove-intranet-backend.herokuapp.com';
    let timelineUrl = '/timelineentry/all';
    let userUrl = baseUrl + '/contas/id/';
    let reportUrl = baseUrl + '/reports/id/';
    let objectivesUrl = baseUrl + '/objectives/id/';
    let userId;

    _retrieveData('token').then(token =>
      this.setState({token: token, isLoading: true}),
    );
    fetch(baseUrl + timelineUrl)
      .then(response => response.json())
      .then(responseJson => {
        let reports = responseJson.data.sort(function(a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        // let sortedReports = reports.sort(function(a, b) {
        //   return new Date(b.date) - new Date(a.date);
        // });
        reports.map(report => {
          fetch(userUrl + report.userId)
            .then(response => response.json())
            .then(responseJsonUser => {
              if (responseJsonUser.success === true) {
                let user = responseJsonUser.data;
                userId = user._id;
                if (this.state.users.length > 0 && this.state.users.filter(function(e) { return e._id === userId; }).length === 0) {
                  this.setState(prevState => ({
                    users: [...prevState.users, {user_id: userId, details: user}],
                  }));
                }

                if (report.type === 'dayplan' || report.type === 'eod') {
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
                          reports: [...prevState.reports, reportItem],
                          isLoading: false,
                        }));
                      }
                    })
                    .catch(error => {
                      console.error(error);
                    });
                } else {
                  fetch(objectivesUrl + report.modelId, {
                    headers: {
                      'x-access-token': this.state.token,
                    },
                  })
                    .then(response => response.json())
                    .then(responseJsonObjective => {
                      if (responseJsonObjective.success === true) {
                        let reportItem = {
                          user: responseJsonUser.data,
                          report: responseJsonObjective.data,
                          date: report.createdAt,
                          id: report._id,
                        };
                        this.setState(prevState => ({
                          reports: [...prevState.reports, reportItem],
                          isLoading: false,
                        }));
                      }
                    })
                    .catch(error => {
                      console.error(error);
                    });
                }
              }
            });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  typeFormatter = type => {
    if (type === 'dayplan') {
      return 'DAY PLAN';
    } else if (type === 'eod') {
      return 'END OF THE DAY';
    } else if (type === 'report') {
      return 'REPORT';
    } else {
      return 'OBJECTIVE';
    }
  };

  render() {
    let {reports} = this.state;
    return (
      <View style={{
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
            style={globalStyles.scrollView}>
            <View style={globalStyles.body}>
              <Header />
              <View style={globalStyles.sectionContainer}>
                {this.state.isLoading ? (
                  <View style={globalStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#e6e6e6" animating />
                    <Text style={globalStyles.greyText}>
                      Loading timeline...
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={reports}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <View style={globalStyles.bottomMargin}>
                        <View style={globalStyles.timelineHeaderContainer}>
                          <View style={globalStyles.timelineItemImg}>
                            {item.user.picture ? (
                              <Image
                                style={globalStyles.imageRound}
                                source={{
                                  uri: item.user.picture,
                                }}
                              />
                            ) : (
                              <Image
                                style={globalStyles.imageRound}
                                source={require('../assets/images/unknown.jpg')}
                              />
                            )}
                          </View>
                          <View style={globalStyles.timelineUserDetails}>
                            <View style={globalStyles.timelineHeaderContainer}>
                              <View style={globalStyles.timelineTwoColumn}>
                                <Text style={[globalStyles.boldText, {fontSize: 16, marginBottom: 0, paddingBottom: 0}]}>
                                  {item.user.name}
                                </Text>
                              </View>
                              <View style={globalStyles.reportTypeContainer}>
                                <Text style={[globalStyles.boldText, {fontSize: 16, marginBottom: 0, paddingBottom: 0}]}>
                                  {item.report
                                    ? this.typeFormatter(item.report.type)
                                    : null}
                                </Text>
                              </View>
                            </View>
                            <View style={globalStyles.timelineHeaderContainer}>
                              <Text style={[globalStyles.boldText, {fontSize: 12, marginTop: 0, paddingTop: 0}]}>
                                {_reportDate(item.date)}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={globalStyles.timelineCard}>
                          {item.report && item.report.type === 'updateweeklyobjective' ? (
                            <Text style={globalStyles.bottomMargin}>
                              <Text style={{fontWeight: 'bold'}}>{item.user.name} </Text>
                              just updated weekly objective progress to: {item.report.progress}%
                            </Text>
                          ) : null}
                          {item.report && item.report.type === 'weeklyobjective' ? (
                            <Text style={globalStyles.bottomMargin}>
                              <Text style={{fontWeight: 'bold'}}>{item.user.name} </Text>
                              just created a new weekly objective
                            </Text>
                          ) : null}
                          {item.report ? (
                            <HTML
                              html={
                                item.report.type === 'dayplan' ||
                                item.report.type === 'eod'
                                  ? item.report.text
                                  : item.report.title
                              }
                            />
                          ) : null}
                          {item.report && item.report.type !== 'dayplan' &&
                          item.report.type !== 'eod' ? (
                            <View style={styles.progressBar}>
                              <Text style={styles.progressBarStatus}>
                                Progress: {item.report.progress}%
                              </Text>
                              <ProgressBar
                                value={item.report.progress}
                                maxValue={100}
                                backgroundColorOnComplete="#123123"
                                backgroundColor="#8ab4f8"
                                borderRadius={0}
                              />
                            </View>
                          ) : null}
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  progressBarStatus: {
    marginBottom: 10,
  },
});

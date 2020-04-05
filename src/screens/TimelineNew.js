import React from 'react';
import {
  ActivityIndicator,
  View,
  Dimensions,
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
import {_retrieveData, _storeData} from '../utils/storage';
import {_reportDate} from '../utils/dateSetter';
import {globalStyles} from '../styles/global';

const {height, width} = Dimensions.get('window');
const pad = width * 0.075;
export default class TimeLineNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline: [],
      users: [],
      reports: [],
      token: '',
      isLoading: false,
      lazyLoading: false,
      refreshing: false,
      limit: 15,
      lastVisible: 0,
    };
  }

  componentDidMount() {
    let baseUrl = 'https://welove-intranet-backend.herokuapp.com';
    let timelineUrl = '/timelineentry/all';

    _retrieveData('token').then(token =>
      this.setState({token: token, isLoading: true}),
    );
    fetch(baseUrl + timelineUrl)
      .then(response => response.json())
      .then(responseJson => {
        let reports = responseJson.data.sort(function(a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        this.setState({timelineReports: reports}, this.retrieveData);
        // store reports to storage
        _storeData('timelineReports', JSON.stringify(this.state.reports));
      })
      .catch(error => {
        console.error(error);
      });
  }

  getReportDetails = reports => {
    let baseUrl = 'https://welove-intranet-backend.herokuapp.com';
    let userUrl = baseUrl + '/contas/id/';
    let reportUrl = baseUrl + '/reports/id/';
    let objectivesUrl = baseUrl + '/objectives/id/';
    let userId;

    reports.map(report => {
      fetch(userUrl + report.userId)
        .then(response => response.json())
        .then(responseJsonUser => {
          if (responseJsonUser.success === true) {
            let user = responseJsonUser.data;
            userId = user._id;
            if (
              this.state.users.length > 0 &&
              this.state.users.filter(function(e) {
                return e._id === userId;
              }).length === 0
            ) {
              this.setState(prevState => ({
                users: [...prevState.users, {user_id: userId, details: user}],
              }));
            } else {
              this.setState(prevState => ({
                users: [...prevState.users, {user_id: userId, details: user}],
              }));
            }

            if (
              report.type === 'dayplan' ||
              report.type === 'eod' ||
              report.type === 'report' ||
              report.type === 'status'
            ) {
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

                    if (
                      this.state.reports.length > 0 &&
                      this.state.reports.filter(function(e) {
                        return e.id === report._id;
                      }).length === 0
                    ) {
                      this.setState(prevState => ({
                        reports: [...prevState.reports, reportItem],
                        isLoading: false,
                      }));
                    } else {
                      this.setState(prevState => ({
                        reports: [...prevState.reports, reportItem],
                        isLoading: false,
                      }));
                    }
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
                    if (
                      this.state.reports.length > 0 &&
                      this.state.reports.filter(function(e) {
                        return e.id === report._id;
                      }).length === 0
                    ) {
                      this.setState(prevState => ({
                        reports: [...prevState.reports, reportItem],
                        isLoading: false,
                      }));
                    } else {
                      this.setState(prevState => ({
                        reports: [...prevState.reports, reportItem],
                        isLoading: false,
                      }));
                    }
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            }
          }
        });
    });
  };

  retrieveData = async () => {
    console.log('retrieving first sets of data');
    try {
      this.setState({
        lazyLoading: true,
      });

      let start = this.state.lastVisible;
      let end = this.state.lastVisible + this.state.limit;
      let firstReports = this.state.timelineReports.slice(start, end);

      console.log('firstReports: ' + firstReports);

      this.getReportDetails(firstReports);

      this.setState({
        lastVisible: end,
      });
    } catch (error) {
      console.log(error);
    }
  };

  retrieveMore = async () => {
    console.log('retrieving more timeline data');
    try {
      this.setState({
        lazyLoading: true,
      });

      let start = this.state.lastVisible;
      let end = this.state.lastVisible + this.state.limit;
      let firstReports = this.state.timelineReports.slice(start, end);

      this.getReportDetails(firstReports);

      this.setState({
        lastVisible: end,
      });
    } catch (error) {
      console.log(error);
    }
  };

  typeFormatter = type => {
    if (type === 'dayplan') {
      return 'DAY PLAN';
    } else if (type === 'eod') {
      return 'END OF THE DAY';
    } else if (type === 'report') {
      return 'REPORT';
    } else if (type === 'status') {
      return 'STATUS';
    } else {
      return 'OBJECTIVE';
    }
  };

  renderFooter = () => {
    try {
      if (this.state.lazyLoading) {
        return <ActivityIndicator size="large" color="#e6e6e6" animating />;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderHeader = () => {
    return (
      <ScrollView style={{marginBottom: 48}}>
        <Header />
      </ScrollView>
    );
  };

  render() {
    let {reports} = this.state;

    return (
      <SafeAreaView styles={styles.container}>
        <View style={globalStyles.body}>
          <View style={styles.sectionContainer}>
            {this.state.isLoading ? (
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                contentInsetAdjustmentBehavior="automatic"
                style={globalStyles.scrollViewTL}>
                <Header />
                <View style={globalStyles.loadingContainer}>
                  <ActivityIndicator size="large" color="#e6e6e6" animating />
                  <Text style={globalStyles.greyText}>Loading timeline...</Text>
                </View>
              </ScrollView>
            ) : (
              <FlatList
                data={reports}
                keyExtractor={item => item.id}
                ListHeaderComponent={this.renderHeader}
                //stickyHeaderIndices={[0]}
                renderItem={({item}) => (
                  <View style={[globalStyles.bottomMargin, {paddingHorizontal: pad}]}>
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
                            <Text style={[globalStyles.boldText, {fontSize: 13, marginBottom: 0, paddingBottom: 0}]}>
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
                            item.report.type === 'eod' ||
                            item.report.type === 'report' ||
                            item.report.type === 'status'
                              ? item.report.text
                              : item.report.title
                          }
                        />
                      ) : null}
                      {item.report &&
                      item.report.type !== 'dayplan' &&
                      item.report.type !== 'eod' &&
                      item.report.type !== 'report' &&
                      item.report.type !== 'status' ? (
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
                ListFooterComponent={this.renderFooter}
                onEndReached={() => this.retrieveMore()}
                onEndReachedThreshold={0.2}
                refreshing={this.state.refreshing}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  progressBar: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  progressBarStatus: {
    marginBottom: 10,
  },
  sectionContainer: {
    marginTop: 24,
  },
});

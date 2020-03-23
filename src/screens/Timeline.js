import React from 'react';
import {
  View,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import Moment from 'moment';
import HTML from 'react-native-render-html';
import Header from '../components/Header/Header';
import {_retrieveData} from '../utils/storage';
import {globalStyles} from '../styles/global';

export default class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      reports: [],
      token: '',
    };
  }

  componentDidMount() {
    let baseUrl = 'https://welove-intranet-backend.herokuapp.com';
    let timelineUrl = '/timelineentry/all';
    let userUrl = baseUrl + '/contas/id/';
    let reportUrl = baseUrl + '/reports/id/';
    let userId;

    _retrieveData('token').then(token => this.setState({token: token}));
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
                      }));
                    }
                  })
                  .catch(error => {
                    console.error(error);
                  });
              }
            });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  dateFormatter = date => {
    let mdy = Moment(date).format('MM/DD/YYYY');
    let tme = Moment(date).format('h:mm A');
    return mdy + ' @ ' + tme;
  };

  typeFormatter = type => {
    if (type === 'dayplan') {
      return 'DAY PLAN';
    } else if (type === 'eod') {
      return 'END OF THE DAY';
    } else {
      return 'OBJECTIVE';
    }
  };

  render() {
    let {reports} = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={globalStyles.scrollView}>
            <View style={globalStyles.body}>
              <Header />
              <View style={globalStyles.sectionContainer}>
                <FlatList
                  data={reports}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <View>
                      <View style={globalStyles.timelineHeaderContainer}>
                        <View style={globalStyles.timelineItemImg}>
                          <Image
                            style={globalStyles.imageRound}
                            source={{
                              uri: item.user.picture,
                            }}
                          />
                        </View>
                        <View style={globalStyles.timelineUserDetails}>
                          <View style={globalStyles.timelineHeaderContainer}>
                            <View style={globalStyles.timelineTwoColumn}>
                              <Text style={globalStyles.boldText}>
                                {item.user.name}
                              </Text>
                            </View>
                            <View style={globalStyles.reportTypeContainer}>
                              <Text style={globalStyles.boldText}>
                                {item.report ? this.typeFormatter(item.report.type) : null}
                              </Text>
                            </View>
                          </View>
                          <View style={globalStyles.timelineHeaderContainer}>
                            <Text style={globalStyles.boldText}>
                              {this.dateFormatter(item.date)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={globalStyles.timelineCard}>
                        {item.report ? <HTML html={item.report.text} /> : null}
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

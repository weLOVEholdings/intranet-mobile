import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import HTML from 'react-native-render-html';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Moment from 'moment';
import Header from '../components/Header/Header';
import Login from './Login';
import {_retrieveData} from '../utils/storage';
import ProgressBar from '@kcodev/react-native-progress-bar';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import {_reportDate} from '../utils/dateSetter';
import {globalStyles} from '../styles/global';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{},
      token: '',
      dayplan: [],
      eodplan: [],
      weeklyObjectives: [],
      dayreports: [],
    };
  }

  expandView(type){

  }

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
          responseJson.data.map(object => {
            let obj = {
              title: object.title,
              progress: object.progress,
              id: object._id,
            };
            this.setState(prevState => ({
              weeklyObjectives: [...prevState.weeklyObjectives, obj],
            }));
          });
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
                        text: r.text,
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
            style={styles.scrollView}>
            <View style={styles.body}>
              <Header />
              <View style={styles.sectionContainer}>
                <View style={styles.main}>
                  <Text style={[globalStyles.customFont, {fontSize: 23, fontWeight: '500'}]}>Day overview</Text>
                  <View style={styles.userpart}>
                    <Text style={[globalStyles.customFont, {fontSize: 28, fontWeight: 'bold', color: '#212529', marginBottom: 50,}]}>
                      Hello, {this.state.user ? this.state.user.name : null}
                    </Text>
                  </View>
                  <View style={styles.context}>
                    <Collapse isCollapsed={this.state.weeklyObjectives.length > 0 ? true : false} style={styles.collapseContainer}>
                      <CollapseHeader style={styles.collapseHeader}>
                        <View style={styles.separator}>
                          <Text style={[globalStyles.customFont, styles.collapseTitle]}>Weekly goals</Text>
                        </View>
                      </CollapseHeader>
                      <CollapseBody style={styles.collapseBody}>
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
                      </CollapseBody>
                    </Collapse>

                    <Collapse isCollapsed={this.state.dayplan.length > 0 ? true : false} style={styles.collapseContainer}>
                      <CollapseHeader style={styles.collapseHeader}>
                        <View style={styles.separator}>
                          <Text style={globalStyles.customFont, [styles.collapseTitle]}>Day Plans</Text>
                        </View>
                      </CollapseHeader>
                      <CollapseBody style={{marginTop: 24}}>
                        {this.state.dayplan && this.state.dayplan.map(item => {
                          return (
                            <View style={globalStyles.bottomMargin} key={item.id}>
                              <View style={globalStyles.timelineHeaderContainer}>
                                <View style={globalStyles.timelineItemImg}>
                                  {item.userpic ? (
                                    <Image
                                      style={globalStyles.imageRound}
                                      source={{
                                        uri: item.userpic,
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
                                      <Text style={[globalStyles.customFont, globalStyles.boldText]}>
                                        {item.username}
                                      </Text>
                                    </View>
                                    <View style={globalStyles.reportTypeContainer}>
                                      <Text style={[globalStyles.customFont, globalStyles.boldText]}>
                                        {item.type
                                          ? this.typeFormatter(item.type)
                                          : null}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={globalStyles.timelineHeaderContainer}>
                                    <Text style={[globalStyles.customFont, globalStyles.boldText]}>
                                      {_reportDate(item.createdAt)}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={globalStyles.timelineCard}>
                                {item.text ? (
                                  <HTML html={item.text} style={[globalStyles.customFont, {color: '#4c4c4c', fontWeight: 'bold'}]}/>
                                ) : null}
                              </View>
                            </View>
                          )
                        })}
                      </CollapseBody>
                    </Collapse>

                    <Collapse isCollapsed={this.state.eodplan.length > 0 ? true : false}  style={[styles.collapseContainer, {marginBottom: 40}]}>
                      <CollapseHeader style={styles.collapseHeader}>
                        <View style={styles.separator}>
                          <Text style={[globalStyles.customFont, styles.collapseTitle]}>End of the day</Text>
                        </View>
                      </CollapseHeader>
                      <CollapseBody>
                      {this.state.eodplan && this.state.eodplan.map(item => {
                        return (
                          <View style={[globalStyles.bottomMargin]} key={item.id}>
                            <View style={globalStyles.timelineHeaderContainer}>
                              <View style={globalStyles.timelineItemImg}>
                                {item.userpic ? (
                                  <Image
                                    style={globalStyles.imageRound}
                                    source={{
                                      uri: item.userpic,
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
                                    <Text style={[globalStyles.customFont, globalStyles.boldText]}>
                                      {item.username}
                                    </Text>
                                  </View>
                                  <View style={globalStyles.reportTypeContainer}>
                                    <Text style={[globalStyles.customFont, globalStyles.boldText]}>
                                      {item.type
                                        ? this.typeFormatter(item.type)
                                        : null}
                                    </Text>
                                  </View>
                                </View>
                                <View style={globalStyles.timelineHeaderContainer}>
                                  <Text style={[globalStyles.customFont, globalStyles.boldText]}>
                                    {_reportDate(item.createdAt)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={globalStyles.timelineCard}>
                              {item.text ? (
                                <HTML html={item.text} style={[globalStyles.customFont, {color: '#4c4c4c', fontWeight: 'bold'}]}/>
                              ) : null}
                            </View>
                          </View>
                        )
                      })}
                      </CollapseBody>
                    </Collapse>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
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
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectiveProgress: {
    marginTop: 5,
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
  separator: {
    backgroundColor: '#fff',
    borderBottomColor: '#00000020',
    borderBottomWidth: 1,
    padding: 0,
    marginLeft: 0,
  },
  collapseContainer: {
    marginBottom: 15,
  },
  collapseHeader: {
    padding: 0,
    margin: 0,
  },
  collapseTitle: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: 4,
    marginLeft: 0,
  },
  collapseBody: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

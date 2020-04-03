/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Picker,
} from 'react-native';
import Modal from 'react-native-modal';
import Moment from 'moment';
//import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {_retrieveData} from '../utils/storage';
import {_currentDate} from '../utils/dateSetter';
import Dayplan from '../components/Modals/Dayplan';
import Eod from '../components/Modals/Eod';
import Status from '../components/Modals/Status';
import Weekly from '../components/Modals/Weekly';
import {globalStyles} from '../styles/global';

export default class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportTeamDialog: false,
      reportDialog: false,
      user: {},
      token: '',
      openModalDayplan: false,
      openModalEod: false,
      openModalStatus: false,
      openModalWeekly: false,
      dayreports: [],
      ctrDay: '',
      ctrMonth: '',
      ctrYear: '',
      ctrType: '',
    };
  }

  getReports = () => {
    //console.log('getting reports');
    let baseUrl = 'https://welove-intranet-backend.herokuapp.com';
    let userUrl = baseUrl + '/contas/id/';

    let now = Moment();
    let year = now.get('year');
    let month = now.get('month') + 1;
    let day = now.get('date');
    //let reportsArray = [];

    fetch(
      baseUrl + '/reportsteam/year/' + year + '/month/' + month + '/day/' + day,
    )
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
                      //reportsArray.push(reportItem);
                      //console.log('report array inside map: ' + JSON.stringify(reportsArray));
                      if (this.state.dayreports.length > 0) {
                        if (this.state.dayreports.filter(e => e.id === r._id).length > 0) {
                          console.log('already in the array');
                        } else {
                          this.setState(prevState => ({
                            dayreports: [...prevState.dayreports, reportItem],
                          }));
                        }
                      } else {
                        this.setState(prevState => ({
                          dayreports: [...prevState.dayreports, reportItem],
                        }));
                      }
                    }
                  });
              });

              // Promise.all(mapreports).then(res => {
              //   console.log('reports array: ' + res);
              //   this.setState({dayreports: res});
              // });
            });
        });
      });
  };

  componentDidMount() {
    _retrieveData('user').then(user => this.setState({user: user}));
    _retrieveData('token').then(token => this.setState({token: token}));

    this.getReports();
  }

  reportTeamDialogShow = visible => {
    this.setState({reportTeamDialog: visible});
  };

  reportDialogShow = visible => {
    this.setState({reportDialog: visible});
  };

  setModalDayplan = open => {
    this.setState({openModalDayplan: open});
  };

  setModalEod = open => {
    this.setState({openModalEod: open});
  };

  setModalStatus = open => {
    this.setState({openModalStatus: open});
  };

  setModalWeekly = open => {
    this.setState({openModalWeekly: open});
  };

  createTeamReport = () => {
    var apiUrl = 'https://welove-intranet-backend.herokuapp.com';
    let report = {
      day: this.state.ctrDay,
      month: this.state.ctrMonth,
      year: this.state.ctrYear,
      type: this.state.ctrType,
    };

    this.reportTeamDialogShow(false);
    fetch(apiUrl + '/reportsteam/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.token,
      },
      body: JSON.stringify(report),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.reportTeamDialogShow(false);
      });
    this.setState({
      ctrDay: '',
      ctrMonth: '',
      ctrYear: '',
      ctrType: '',
    });
  };

  render() {
    const navigation = this.props.navigation;
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
            contentContainerStyle={{flexGrow: 1}}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Weekly
              openModal={this.state.openModalWeekly}
              closeModal={this.setModalWeekly}
              reportDialogShow={this.reportDialogShow}
              getReports={this.getReports}
            />

            <Eod
              openModal={this.state.openModalEod}
              closeModal={this.setModalEod}
              reportDialogShow={this.reportDialogShow}
              getReports={this.getReports}
            />

            <Status
              openModal={this.state.openModalStatus}
              closeModal={this.setModalStatus}
              reportDialogShow={this.reportDialogShow}
              getReports={this.getReports}
            />

            <Dayplan
              openModal={this.state.openModalDayplan}
              closeModal={this.setModalDayplan}
              reportDialogShow={this.reportDialogShow}
              getReports={this.getReports}
            />

            <View style={styles.body}>
              <Header />
              <View style={styles.sectionContainer}>
                <View style={styles.username}>
                  <Text style={styles.usernameText}>
                    User: {this.state.user.name}
                  </Text>
                </View>
                <View style={styles.main}>
                  <View style={styles.currentdate}>
                    <FontAwesome5
                      name="calendar-alt"
                      size={25}
                      color="#6d6d6d"
                      style={styles.dateIcon}
                    />
                    <Text
                      style={{
                        fontSize: 22,
                        color: '#777777',
                        fontWeight: 'bold',
                      }}>
                      {_currentDate()}
                    </Text>
                  </View>
                  <View style={styles.createReport}>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={styles.userTitle}>Users</Text>
                    </View>
                    <View style={styles.reportButtons}>
                      <TouchableOpacity
                        style={styles.greenButtonWidget}
                        onPress={() => {
                          this.reportDialogShow(true);
                        }}>
                        <Text style={styles.greenButton}>Create Report</Text>
                      </TouchableOpacity>

                      <Modal
                        isVisible={this.state.reportDialog}
                        onRequestClose={() => {
                          this.reportDialogShow(!this.state.reportDialog);
                        }}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            padding: 8,
                          }}>
                          <View style={styles.dialogContainer}>
                            <View style={globalStyles.dialogHeader}>
                              <View style={styles.nav}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.reportDialogShow(false);
                                  }}>
                                  <Text style={globalStyles.boldText}>
                                    <AntDesign name="arrowleft" size={18} />
                                    Voltar
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={styles.reportDialogContent}>
                              <View style={{marginTop: 10, marginBottom: 10}}>
                                <Text style={{fontSize: 22}}>
                                  Create a Report
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  this.reportDialogShow(false);
                                  this.setModalWeekly(true);
                                }}
                                style={styles.reportTypeCon}>
                                <View style={styles.cardView}>
                                  <Text style={{fontSize: 18}}>Report</Text>
                                  <Text style={{fontSize: 10}}>
                                    Weekly Report
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  this.setModalEod(true);
                                  this.reportDialogShow(false);
                                }}
                                style={styles.reportTypeCon}>
                                <View style={styles.cardView}>
                                  <Text style={{fontSize: 18}}>EOD</Text>
                                  <Text style={{fontSize: 10}}>
                                    End of the day
                                  </Text>
                                </View>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  this.setModalStatus(true);
                                  this.reportDialogShow(false);
                                }}
                                style={styles.reportTypeCon}>
                                <View style={styles.cardView}>
                                  <Text style={{fontSize: 18}}>Status</Text>
                                  <Text style={{fontSize: 10}}>
                                    Progress Update
                                  </Text>
                                </View>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  this.setModalDayplan(true);
                                  this.reportDialogShow(false);
                                }}
                                style={styles.reportTypeCon}>
                                <View style={styles.cardView}>
                                  <Text style={{fontSize: 18}}>Day Plan</Text>
                                  <Text style={{fontSize: 10}}>
                                    Plano do dia
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Modal>
                      <TouchableOpacity
                        style={styles.greenButtonWidget}
                        onPress={() => {
                          this.reportTeamDialogShow(true);
                        }}>
                        <Text style={styles.greenButton}>
                          Create Report Team
                        </Text>
                      </TouchableOpacity>
                      <Modal
                        isVisible={this.state.reportTeamDialog}
                        onRequestClose={() => {
                          this.reportTeamDialogShow(
                            !this.state.reportTeamDialog,
                          );
                        }}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View style={styles.dialogContainer}>
                            <View style={globalStyles.dialogHeader}>
                              <View style={styles.nav}>
                                <TouchableOpacity
                                  onPress={() => {
                                    this.reportTeamDialogShow(false);
                                  }}>
                                  <Text style={globalStyles.boldText}>
                                    <AntDesign name="arrowleft" size={18} />
                                    Voltar
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={styles.dialogContent}>
                              <Text style={globalStyles.dialogTitle}>
                                Create An Entry
                              </Text>
                              <View style={styles.dataEntryView}>
                                <Text>Day :</Text>
                                <TextInput
                                  value={this.state.ctrDay}
                                  onChangeText={text =>
                                    this.setState({ctrDay: text})
                                  }
                                  style={styles.dataEntryInputView}
                                  keyboardType={'numeric'}
                                />
                              </View>
                              <View style={styles.dataEntryView}>
                                <Text>Month :</Text>
                                <TextInput
                                  value={this.state.ctrMonth}
                                  onChangeText={text =>
                                    this.setState({ctrMonth: text})
                                  }
                                  style={styles.dataEntryInputView}
                                  keyboardType={'numeric'}
                                />
                              </View>
                              <View style={styles.dataEntryView}>
                                <Text>Year :</Text>
                                <TextInput
                                  value={this.state.ctrYear}
                                  onChangeText={text =>
                                    this.setState({ctrYear: text})
                                  }
                                  style={styles.dataEntryInputView}
                                  keyboardType={'numeric'}
                                />
                              </View>
                              <View style={styles.dataEntryView}>
                                <Text>Type: </Text>
                                <View
                                  style={{
                                    borderWidth: 1,
                                    borderColor: '#808080',
                                    height: 32,
                                    marginTop: 10,
                                  }}>
                                  <Picker
                                    selectedValue={this.state.ctrType}
                                    onValueChange={(itemValue, itemIndex) =>
                                      this.setState({ctrType: itemValue})
                                    }
                                    style={styles.pickerEntryType}>
                                    <Picker.Item
                                      label=""
                                      value=""
                                      style={{
                                        borderWidth: 1,
                                        borderColor: '#808080',
                                        backgroundColor: 'white',
                                      }}
                                    />
                                    <Picker.Item
                                      label="Report"
                                      value="report"
                                      style={{
                                        borderWidth: 1,
                                        borderColor: '#808080',
                                        backgroundColor: 'white',
                                      }}
                                    />
                                    <Picker.Item
                                      label="Status"
                                      value="status"
                                      style={{
                                        borderWidth: 1,
                                        borderColor: '#808080',
                                      }}
                                    />
                                    <Picker.Item
                                      label="EOD"
                                      value="eod"
                                      style={{
                                        borderWidth: 1,
                                        borderColor: '#808080',
                                      }}
                                    />
                                    <Picker.Item
                                      label="Dayplan"
                                      value="dayplan"
                                    />
                                  </Picker>
                                </View>
                              </View>
                              <View style={styles.confirmButton}>
                                <TouchableOpacity
                                  style={styles.greenButtonWidget}
                                  onPress={() => this.createTeamReport()}>
                                  <Text style={styles.greenButton}>
                                    Create Entry
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    </View>
                  </View>
                  <View>
                    {this.state.dayreports &&
                      this.state.dayreports.map(report => {
                        return (
                          <View style={styles.usersContainer} key={report.id}>
                            {report.userpic ? (
                              <Image
                                style={globalStyles.imageRound}
                                source={{
                                  uri: report.userpic,
                                }}
                              />
                            ) : (
                              <Image
                                style={globalStyles.imageRound}
                                source={require('../assets/images/unknown.jpg')}
                              />
                            )}
                            <Text
                              style={{color: '#6d6d6d', fontWeight: 'bold'}}>
                              {report.username}
                            </Text>
                            <Text>{report.type}</Text>
                            <TouchableOpacity
                              onPress={() => navigation.navigate('Timeline')}>
                              <Text style={styles.linkText}>View</Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </View>
                </View>
              </View>
              <View style={{minHeight: '100%'}} />
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
    height: '100%',
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
  username: {
    flex: 1,
    flexDirection: 'row-reverse',
    marginBottom: 24,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentdate: {
    flex: 1,
    flexDirection: 'row',
  },
  dateIcon: {
    marginRight: 10,
  },
  createReport: {
    flex: 1,
    flexDirection: 'row',
  },
  reportButtons: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingTop: 10,
    paddingBottom: 10,
  },
  userTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  greenButtonWidget: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenButton: {
    fontSize: 12,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'green',
    padding: 10,
    borderColor: 'white',
    color: 'white',
    marginRight: 3,
  },
  reportDialogView: {
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    width: '90%',
  },
  dialogClose: {
    flexDirection: 'row-reverse',
  },

  MainAlertView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1769aa',
    height: 200,
    width: '90%',
    borderColor: '#fff',
  },
  AlertTitle: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    height: '28%',
  },
  AlertMessage: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    height: '40%',
  },
  buttonStyle: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    marginTop: -5,
  },

  dialogContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },

  dialogTitle: {
    backgroundColor: '#912',
  },

  dialogContent: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
  },

  dataEntryView: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  dataEntryInputView: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#808080',
    backgroundColor: 'white',
    padding: 4,
  },
  pickerEntryType: {
    borderColor: '#808080',
    borderWidth: 1,
    padding: 4,
    margin: 0,
    height: 32,
  },
  confirmButton: {
    flexDirection: 'row-reverse',
    backgroundColor: '#fff',
  },
  reportDialogContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  reportTypeCon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  cardView: {
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  usersContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12,
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
});

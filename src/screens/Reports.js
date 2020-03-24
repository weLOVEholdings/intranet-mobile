/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Picker,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {_retrieveData} from '../utils/storage';
import {_currentDate} from '../utils/dateSetter';

export default class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportTeamDialog: false,
      reportDialog: false,
      user: {},
      token: '',
    };
  }

  componentDidMount() {
    _retrieveData('user').then(user => this.setState({user: user}));
    _retrieveData('token').then(token => this.setState({token: token}));
  }

  reportTeamDialogShow = visible => {
    this.setState({reportTeamDialog: visible});
  };

  reportDialogShow = visible => {
    this.setState({reportDialog: visible});
  };

  // currentDateSetter = () => {
  //   let mdy = Moment(date).format('MM/DD/YYYY');
  //   let tme = Moment(date).format('h:mm A');
  //   return mdy + ' @ ' + tme;
  // };

  render() {
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
                <View style={styles.username}>
                  <Text>Username: {this.state.user.name}</Text>
                </View>
                <View style={styles.main}>
                  <View style={styles.currentdate}>
                    <FontAwesome5
                      name="calendar-alt"
                      size={25}
                      color="#6d6d6d"
                      style={styles.dateIcon}
                    />
                    <Text style={{fontSize: 22}}>{_currentDate()}</Text>
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
                        visible={this.state.reportDialog}
                        onRequestClose={() => {
                          this.reportDialogShow(!this.state.reportDialog);
                        }}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            transparent: 'true',
                          }}>
                          <View style={styles.dialogContainer}>
                            <View style={styles.dialogClose}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.reportDialogShow(false);
                                }}>
                                <AntDesign name="close" size={18} />
                              </TouchableOpacity>
                            </View>
                            <View style={styles.reportDialogContent}>
                              <View style={{marginTop: 10, marginBottom: 10}}>
                                <Text style={{fontSize: 22}}>
                                  Create a Report
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => this.reportDialogShow(true)}>
                                <View style={styles.cardView}>
                                  <Text style={{fontSize: 18}}>Report</Text>
                                  <Text style={{fontSize: 10}}>
                                    Weekly Report
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity>
                                <View style={styles.cardView}>
                                  <Text style={{fontSize: 18}}>EOD</Text>
                                  <Text style={{fontSize: 10}}>
                                    End of the day
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity>
                                <View style={styles.cardView}>
                                  <Text style={{fontSize: 18}}>Status</Text>
                                  <Text style={{fontSize: 10}}>
                                    Progress Update
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity>
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
                        visible={this.state.reportTeamDialog}
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
                            transparent: 'true',
                          }}>
                          <View style={styles.dialogContainer}>
                            <View style={styles.dialogClose}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.reportTeamDialogShow(false);
                                }}>
                                <AntDesign name="close" size={18} />
                              </TouchableOpacity>
                            </View>
                            <View style={styles.dialogContent}>
                              <View style={styles.dataEntryView}>
                                <Text>Day :</Text>
                                <TextInput
                                  value={this.props.entry_input_day}
                                  style={styles.dataEntryInputView}
                                />
                              </View>
                              <View style={styles.dataEntryView}>
                                <Text>Month :</Text>
                                <TextInput
                                  value={this.props.entry_input_month}
                                  style={styles.dataEntryInputView}
                                />
                              </View>
                              <View style={styles.dataEntryView}>
                                <Text>Year :</Text>
                                <TextInput
                                  value={this.props.entry_input_year}
                                  style={styles.dataEntryInputView}
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
                                    selectedValue={this.state.user}
                                    onValueChange={this.updateUser}
                                    style={styles.pickerEntryType}>
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
                                  onPress={() => {}}>
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
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
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
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  username: {
    flex: 1,
    flexDirection: 'row-reverse',
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
    fontSize: 16,
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
    width: '90%',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },

  dialogTitle: {
    backgroundColor: '#912',
  },

  dialogContent: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 50,
    backgroundColor: '#f0f0f0',
  },

  dataEntryView: {
    marginTop: 10,
    marginBottom: 10,
  },
  dataEntryInputView: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#808080',
    backgroundColor: 'white',
    padding: 0,
  },
  pickerEntryType: {
    borderColor: '#808080',
    borderWidth: 1,
    padding: 0,
    margin: 0,
    height: 32,
  },
  confirmButton: {
    flexDirection: 'row-reverse',
    backgroundColor: '#f0f0f0',
  },
  reportDialogContent: {
    alignItems: 'center',
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
});

/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {actions as RichEditorActions} from 'react-native-pell-rich-editor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CreateReport} from './Actions';
import {_retrieveData} from '../../utils/storage';
import {globalStyles} from '../../styles/global';

const initHTML = '';

export default function Eod({openModal, closeModal, reportDialogShow}) {
  const [selectedDateId, setSelectedDateId] = useState();
  const [selected, setSelected] = useState(false);
  const [dates, setDates] = useState([]);

  var apiUrl =
    'https://welove-intranet-backend.herokuapp.com/reportsteam/type/eod';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        console.log('dates: ' + res.data);
        setDates(res.data);
      })
      .catch(err => console.log(err));
  }, [apiUrl]);

  const save = async () => {
    let text = await this.richText.getContentHtml();
    let user = await _retrieveData('user');
    let userId = user._id;
    let type = 'eod';
    let status = null;
    let reportsTeamId = selectedDateId;

    let report = {
      text: text,
      userId: userId,
      teamId: reportsTeamId,
      status: status,
      type: type,
    };
    console.log('report: ' + JSON.stringify(report));
    Alert.alert(JSON.stringify(report));
    CreateReport(report);
  };

  const that = this;
  return (
    <Modal
      visible={openModal}
      onRequestClose={() => {
        closeModal(!openModal);
      }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              transparent: 'true',
            }}>
            <View style={styles.dialogContainer}>
              <View style={globalStyles.dialogHeader}>
                <View style={styles.nav}>
                  <TouchableOpacity
                    onPress={() => {
                      closeModal(false);
                    }}>
                    <Text style={globalStyles.boldText}>
                      <AntDesign name="arrowleft" size={18} />
                      Voltar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      reportDialogShow(false);
                    }}>
                    <AntDesign name="close" size={18} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={globalStyles.dialogtitleContainer}>
                <Text style={globalStyles.dialogTitle}>EOD</Text>
                <View style={styles.dateContainer}>
                  {dates &&
                    dates.map(date => {
                      return (
                        <TouchableOpacity
                          style={
                            selected && date._id === selectedDateId
                              ? styles.buttonPress
                              : styles.dates
                          }
                          key={date._id}
                          onPress={() => {
                            setSelectedDateId(date._id);
                            setSelected(true);
                          }}>
                          <Text>
                            {date.day}/{date.month}/{date.year}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>

                <View>
                  <ScrollView style={styles.scroll}>
                    <RichEditor
                      ref={rf => (that.richText = rf)}
                      initialContentHTML={initHTML}
                      style={styles.rich}
                    />
                  </ScrollView>
                  <KeyboardAvoidingView
                    behavior={'position'}
                    enabled
                    keyboardVerticalOffset={140}>
                    <RichToolbar
                      style={styles.richBar}
                      getEditor={() => that.richText}
                      iconTint={'#000033'}
                      selectedIconTint={'#2095F2'}
                      selectedButtonStyle={{backgroundColor: 'transparent'}}
                      actions={[
                        RichEditorActions.setBold,
                        RichEditorActions.setItalic,
                        RichEditorActions.insertBulletsList,
                        RichEditorActions.insertOrderedList,
                        RichEditorActions.insertLink,
                      ]}
                    />
                  </KeyboardAvoidingView>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.greenButtonWidget}
                      onPress={() => save()}>
                      <Text style={styles.greenButton}>Create Report</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  iconWithText: {
    paddingLeft: 8,
    //width: 100,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconWithTextItem: {
    width: '50%',
  },
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
    justifyContent: 'flex-end',
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
  rich: {
    maxHeight: 120,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 24,
  },
  dates: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginRight: 5,
    width: '30%',
  },
  buttonPress: {
    padding: 5,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginRight: 5,
    width: '30%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 12,
  },
});

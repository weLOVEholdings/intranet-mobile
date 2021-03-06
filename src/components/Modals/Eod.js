/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {actions as RichEditorActions} from 'react-native-pell-rich-editor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CreateReport} from './Actions';
import {_retrieveData} from '../../utils/storage';
import {globalStyles} from '../../styles/global';
import {styles} from './styles';

const initHTML = '';

export default function Eod({
  openModal,
  closeModal,
  reportDialogShow,
  getReports,
}) {
  const [selectedDateId, setSelectedDateId] = useState();
  const [selected, setSelected] = useState(false);
  const [dates, setDates] = useState([]);

  var apiUrl =
    'https://welove-intranet-backend.herokuapp.com/reportsteam/type/eod';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        setDates(res.data.slice(-3));
      })
      .catch(err => console.log(err));
  }, [apiUrl]);

  const save = async () => {
    let token = await _retrieveData('token');
    let text = await this.richText.getContentHtml();
    let user = await _retrieveData('user');
    let userId = user._id;
    let type = 'eod';
    let status = null;
    let reportsTeamId = selectedDateId;

    let report = {
      token: token,
      text: text,
      userId: userId,
      teamId: reportsTeamId,
      status: status,
      type: type,
    };
    //console.log('report: ' + JSON.stringify(report));
    //Alert.alert(JSON.stringify(report));
    CreateReport(report, getReports);
    closeModal(!openModal);
    reportDialogShow(false);
  };

  const that = this;
  return (
    <Modal
      animationType="slide"
      isVisible={openModal}
      onRequestClose={() => {
        closeModal(!openModal);
      }}>
      <SafeAreaView style={styles.container}>
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
                    closeModal(false);
                    reportDialogShow(true);
                  }}>
                  <Text style={globalStyles.boldText}>
                    <AntDesign name="arrowleft" size={18} />
                    Voltar
                  </Text>
                </TouchableOpacity>
                {/*<TouchableOpacity
                  onPress={() => {
                    reportDialogShow(false);
                  }}>
                  <AntDesign name="close" size={18} />
                </TouchableOpacity>*/}
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
                        <Text style={styles.dateText}>
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
                  keyboardVerticalOffset={60}>
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
      </SafeAreaView>
    </Modal>
  );
}

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

export default function DayPlan({
  openModal,
  closeModal,
  reportDialogShow,
  getReports,
}) {
  //const [reportDates, setreportDates] = useState('');
  const [selectedDateId, setSelectedDateId] = useState();
  const [selected, setSelected] = useState(false);
  const [dates, setDates] = useState([]);

  var apiUrl =
    'https://welove-intranet-backend.herokuapp.com/reportsteam/type/dayplan';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        setDates(res.data.slice(-3));
      })
      .catch(err => console.log(err));
  }, [apiUrl]);

  const save = async () => {
    let text = await this.richText.getContentHtml();
    let token = await _retrieveData('token');
    let user = await _retrieveData('user');
    let userId = user._id;
    let type = 'dayplan';
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

  // const onPressAddImage = () => {
  //   this.richText.insertImage(
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
  //   );
  //   this.richText.blurContentEditor();
  // };

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
            transparent: 'true',
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
              </View>
            </View>
            <View style={globalStyles.dialogtitleContainer}>
              <Text style={globalStyles.dialogTitle}>Day Plan</Text>

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
                    contentInset={920}
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
                    onLayout={this.onLayout}
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

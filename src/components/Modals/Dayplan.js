/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {globalStyles} from '../../styles/global';

export default function DayPlan({openModal, closeModal, reportDialogShow}) {
  const [reportDetails, setreportDetails] = useState('');

  const save = async () => {
    // Get the data here and call the interface to save the data
    let html = await this.richText.getContentHtml();
    // console.log(html);
    Alert.alert(html);
  };

  const onPressAddImage = () => {
    // insert URL
    this.richText.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
    );
    // insert base64
    // this.richText.insertImage(`data:${image.mime};base64,${image.data}`);
    this.richText.blurContentEditor();
  };

  // const onHome = () => {
  //   this.props.navigation.push('index');
  // };

  return (
    <Modal
      visible={openModal}
      onRequestClose={() => {
        closeModal(!openModal);
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          transparent: 'true',
        }}>
        <View style={styles.dialogContainer}>
          <View style={globalStyles.dialogHeader}>
            <TouchableOpacity
              onPress={() => {
                closeModal(false);
              }}>
              <AntDesign name="arrowleft" size={18} />
              <Text style={globalStyles.boldText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                reportDialogShow(false);
              }}>
              <AntDesign name="close" size={18} />
            </TouchableOpacity>
          </View>
          <View style={globalStyles.dialogtitleContainer}>
            <Text style={globalStyles.dialogTitle}>Day Plan</Text>
          </View>
          <View style={globalStyles.dialogFormContainer}>
            <ScrollView style={styles.scroll}>
              <RichEditor
                ref={rf => that.richText = rf}
                initialContentHTML={initHTML}
                style={styles.rich}
              />
            </ScrollView>
            <KeyboardAvoidingView behavior={'padding'} >
              <RichToolbar
                style={styles.richBar}
                getEditor={() => that.richText}
                iconTint={'#000033'}
                selectedIconTint={'#2095F2'}
                selectedButtonStyle={{backgroundColor: "transparent"}}
                onPressAddImage={that.onPressAddImage}
              />
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  iconWithText: {
    paddingLeft: 8,
    width: 100,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

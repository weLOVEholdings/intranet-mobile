import React from 'react';
import {
  
}

export default function CreateReportTeam(){
	return(
		<View style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
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
	);
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
    width: '90%',
    backgroundColor: '#f0f0f0',
    //padding: 10,
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
    backgroundColor: '#f0f0f0',
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
});

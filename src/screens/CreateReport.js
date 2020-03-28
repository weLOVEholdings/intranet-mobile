import React from 'react';
import {
  
}

export default function CreateReport(){
	return(
		<View style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
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
								width: '100%',
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
										onPress={() => this.setModalWeekly(true)}
										style={styles.reportTypeCon}>
										<View style={styles.cardView}>
											<Text style={{fontSize: 18}}>Report</Text>
											<Text style={{fontSize: 10}}>
												Weekly Report
											</Text>
										</View>
									</TouchableOpacity>
									<Weekly
										openModal={this.state.openModalWeekly}
										closeModal={this.setModalWeekly}
										reportDialogShow={this.reportDialogShow}
									/>
									<TouchableOpacity
										onPress={() => this.setModalEod(true)}
										style={styles.reportTypeCon}>
										<View style={styles.cardView}>
											<Text style={{fontSize: 18}}>EOD</Text>
											<Text style={{fontSize: 10}}>
												End of the day
											</Text>
										</View>
									</TouchableOpacity>
									<Eod
										openModal={this.state.openModalEod}
										closeModal={this.setModalEod}
										reportDialogShow={this.reportDialogShow}
									/>
									<TouchableOpacity
										onPress={() => this.setModalStatus(true)}
										style={styles.reportTypeCon}>
										<View style={styles.cardView}>
											<Text style={{fontSize: 18}}>Status</Text>
											<Text style={{fontSize: 10}}>
												Progress Update
											</Text>
										</View>
									</TouchableOpacity>
									<Status
										openModal={this.state.openModalStatus}
										closeModal={this.setModalStatus}
										reportDialogShow={this.reportDialogShow}
									/>
									<TouchableOpacity
										onPress={() => this.setModalDayplan(true)}
										style={styles.reportTypeCon}>
										<View style={styles.cardView}>
											<Text style={{fontSize: 18}}>Day Plan</Text>
											<Text style={{fontSize: 10}}>
												Plano do dia
											</Text>
										</View>
									</TouchableOpacity>
									<Dayplan
										openModal={this.state.openModalDayplan}
										closeModal={this.setModalDayplan}
										reportDialogShow={this.reportDialogShow}
									/>
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

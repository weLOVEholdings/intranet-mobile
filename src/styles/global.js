import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    color: 'white',
    minHeight: 400,
  },
  card: {
    minHeight: 200,
  },
  titleContainer: {
    width: '100%',
    marginBottom: 30,
    color: '#fff',
    backgroundColor: '#b45f06',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyTitle: {
    color: 'white',
  },
  image: {
    width: 162,
    height: 80,
    resizeMode: 'contain',
  },
  imageRound: {
    width: 60,
    height: 60,
    //resizeMode: 'contain',
    borderRadius: 30,
  },
  formContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  formItemContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    lineHeight: 28,
    padding: 6,
    marginTop: 12,
    height: 32,
    paddingHorizontal: 8,
  },
  inputLabel: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
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
    marginTop: 64,
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
  timelineHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  timelineCard: {
    marginTop: 10,
    marginBottom: 15,
    padding: 15,
    //minHeight: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.125)',
    borderRadius: 8,
  },
  timelineItemImg: {
    width: '25%',
  },
  timelineTwoColumn: {
    width: '50%',
  },
  timelineUserDetails: {
    width: '75%',
    justifyContent: 'center',
  },
  timelineReportType: {
    width: '40%',
  },
  reportTypeContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  greyText: {
    color: '#6d6d6d',
    fontWeight: 'bold',
  },
  dialogTitle: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  bottomMargin: {
    marginBottom: 24,
  },
});

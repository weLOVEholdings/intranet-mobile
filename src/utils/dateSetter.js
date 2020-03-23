import Moment from 'moment';

export const _currentDate = () => {
  let mdy = Moment().format('MM/DD/YYYY');
  return mdy;
};

export const _reportDate = date => {
  let mdy = Moment(date).format('MM/DD/YYYY');
  let tme = Moment(date).format('h:mm A');
  return mdy + ' @ ' + tme;
};

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

export const _startWeek = () => {
  const today = Moment();
  const start = today.startOf('isoWeek');
  console.log('start: ' + Moment(start).format('MM/DD/YYYY'));
  return Moment(start).format('MM/DD/YYYY');
};

export const _endWeek = () => {
  const today = Moment();
  const end = today.endOf('isoWeek');
  console.log('end: ' + Moment(end).format('MM/DD/YYYY'));
  return Moment(end).format('MM/DD/YYYY');
};

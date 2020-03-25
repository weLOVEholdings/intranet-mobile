import React, {useState, useEffect} from 'react';

export const CreateReport = report => {
  console.log('Creating report');
  const apiUrl = 'https://welove-intranet-backend.herokuapp.com/reports/create';
  let reportDetails = {
    status: report.status,
    createdAt: new Date(),
    type: report.type,
    text: report.text,
    userId: report.userId,
    reportsTeamId: report.teamId,
  };

  console.log('reportDetails: ' + JSON.stringify(reportDetails));

  // fetch(apiUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-access-token': report.token,
  //   },
  //   body: reportDetails,
  // })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(responseData => {
  //     report.closeFormModal(false);
  //   });
};

export const getReportDates = type => {
  const [dates, setDates] = useState([]);
  var apiUrl = 'https://welove-intranet-backend.herokuapp.com/timelineentry/all';

  useEffect(() =>
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => setDates(dates))
      .catch((err) => console.log(err))
  );

  return dates;
};

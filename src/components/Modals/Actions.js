import React, { useState, useEffect } from "react";

export const Dayplan = report => {
  const apiUrl = 'https://welove-intranet-backend.herokuapp.com/reports/create';
  let reportDetails = {
    status: report.status,
    createdAt: new Date(),
    type: report.type,
    text: report.text,
    userId: report.userId,
    reportsTeamId: report.TeamId,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': report.token,
    },
    body: reportDetails,
  })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      report.closeFormModal(false);
    });
};

// export function getReportDates(type) {
//   console.log('getting report dates: ' + type);
//   var apiUrl = 'https://welove-intranet-backend.herokuapp.com/timelineentry/all';
//   console.log(apiUrl);
//   fetch(apiUrl)
//     .then(response => {
//       console.log('response');
//       console.log(response);
//       response.json();
//     })
//     .then(responseJson => {
//       console.log('responseJson');
//       console.log(responseJson);
//       return responseJson.data;
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

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

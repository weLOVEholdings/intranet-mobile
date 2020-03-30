import React from 'react';

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
    token: report.token,
  };

  console.log('reportDetails: ' + JSON.stringify(reportDetails));
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': report.token,
    },
    body: JSON.stringify(reportDetails),
  })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      console.log('==========> Successfully created report');
      //report.closeFormModal(false);
    });
};

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
  };

  console.log('reportDetails: ' + JSON.stringify(reportDetails));
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
      console.log('==========> Successfully created report');
      //report.closeFormModal(false);
    });
};

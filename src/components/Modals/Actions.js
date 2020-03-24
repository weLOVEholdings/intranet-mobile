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

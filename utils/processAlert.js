const DuplicateSuppressionCheck = require("./duplicateSuppression");

const processAlert = async (incomingAlert) => {
  //Maintenance Window Suppression

  

  // Duplicate SUppression Check

  const DuplicateStatusCheck = await DuplicateSuppressionCheck(incomingAlert);

  if (DuplicateStatusCheck) {
    incomingAlert.status = DuplicateStatusCheck;
  } else {
    incomingAlert.status = "PROCESSING";
  }
  return incomingAlert;
};

module.exports = processAlert;

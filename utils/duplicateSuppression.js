const Alerts = require("../Schema/alertSchema");

const duplicateSuppressontimeWindow = 10; //In Seconds

const DuplicateSuppressionCheck = async (incomingAlert) => {

    let AlertStatus = ''

    const fetchActiveAlert = await Alerts.find({
        createdAt: {
          $gte: new Date(
            new Date().getTime() - duplicateSuppressontimeWindow * 1000
          ).toISOString(),
        },
        status:'MANUAL',
        entityName : incomingAlert.entityName,
        faultName : incomingAlert.faultName
      });
     
      if(fetchActiveAlert.length > 0){
    
        AlertStatus = "SUPPRESSED-DUPLICATE";
      }else{
        AlertStatus = 'MANUAL'
      }

      return AlertStatus
}

module.exports = DuplicateSuppressionCheck



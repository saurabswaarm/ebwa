var AWS = require("aws-sdk");

export function init() {
  AWS.config.getCredentials(function (err: Error) {
    if (err) console.log(err.stack);
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
      console.log('Region', AWS.config.region);
    }
  });
  AWS.config.logger = console;


}

let sequenceToken: String = 'something';

export default async function (log: string) {


  console.log('logger ran');
  let logAttempts = 0;

  async function attemptLogging() {

    let ourPromise = new Promise((resolve, reject) => {
      let cwl = new AWS.CloudWatchLogs();

      cwl.putLogEvents({
        logEvents: [{ timestamp: Date.now(), message: log }],
        logGroupName: 'Ebwa_Server_Error_log_group',
        logStreamName: 'main_log_stream',
        sequenceToken: sequenceToken
      }, (err: Error, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    })

    try {
      let data: any = await ourPromise;
      console.log(data);
      sequenceToken = data.nextSequenceToken;
    } catch (err) {
      if (err.code == 'InvalidSequenceTokenException') {
        let errorMessage = err.message;
        let arrayOfWords: Array<String> = errorMessage.split(' ');
        let sequenceTokenderived = arrayOfWords[arrayOfWords.length - 1];
        sequenceToken = sequenceTokenderived;
        console.log(sequenceTokenderived);
        if(logAttempts <= 3){
          attemptLogging();
          logAttempts++;
        }
      } else {
        console.log(err);
      }
    }
  }

  attemptLogging();






}
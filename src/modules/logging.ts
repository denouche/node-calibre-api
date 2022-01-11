const AWS = require('aws-sdk');

async function describeLogStreams() {
  const cloudWatchLogs = new AWS.CloudWatchLogs({ region: process.env.AWS_CW_REGION });
  const params = { logGroupName: process.env.AWS_CW_GROUP };
  return cloudWatchLogs.describeLogStreams(params).promise();
}

let nextSequenceToken: any = null;
async function createLog(message: string) {
  if (!nextSequenceToken) {
    const res = await describeLogStreams();
    nextSequenceToken = res.logStreams[0].uploadSequenceToken;
  }

  const cloudWatchLogs = new AWS.CloudWatchLogs({ region: process.env.AWS_CW_REGION });
  const params = {
    logEvents: [{ message, timestamp: new Date().getTime() }],
    logGroupName: process.env.AWS_CW_GROUP,
    logStreamName: process.env.AWS_CW_STREAM,
    sequenceToken: nextSequenceToken,
  };
  const response = await cloudWatchLogs.putLogEvents(params).promise();
  nextSequenceToken = response.nextSequenceToken;
  return response;
}

export { createLog };

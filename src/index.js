import {Cron} from 'croner';
import {getSpeedTestResult, openLink} from './helpers.js';

// Configuration
const config = {
  // X (formerly Twitter) handles of your ISP to tag in the complaint post
  xHandles: ['@airtelindia', '@Airtel_Presence'],
  // Internet speed guaranteed by your ISP in Mbps
  promisedSpeed: 100,
  // Minimum acceptable speed ratio (e.g., 0.8 for 80% of promised speed)
  speedThreshold: 0.8,
  // Cron expression for scheduling speed tests (see https://crontab.guru/)
  cronExpression: '0 * * * *', // Runs every hour
  // Whether to run the script as a cron job (true) or immediately (false)
  runAsCronJob: false,
  // Complaint message template
  complaintMessage:
    "[ISP_HANDLES], I'm experiencing very slow internet speeds ([DOWNLOAD_SPEED] down/[UPLOAD_SPEED] up) compared to the [PROMISED_SPEED]Mbps I'm paying for. Please investigate. Proof: [SPEEDTEST_URL]",
  // Hashtags to include in the complaint post without # symbol
  hashtags: [
    'InternetSpeedComplaint',
    'BadInternet',
    'AirtelAirFiber',
    'AirFiber',
    'Airtel',
    'Fiber',
    'AirtelIndia',
  ],
};

async function checkAndPostSpeedComplaint(result) {
  const {download: downloadSpeed} = result;
  const acceptableDownloadSpeed = config.promisedSpeed * config.speedThreshold;
  if (downloadSpeed >= acceptableDownloadSpeed) {
    console.log('Speed is within acceptable range. No need to post.');
    return;
  }

  const handles = config.xHandles.join(' ');
  const hashtags = config.hashtags.join();

  // Populate the message template
  let post = config.complaintMessage.replace('[ISP_HANDLES]', handles);
  post = post.replace('[DOWNLOAD_SPEED]', result.download);
  post = post.replace('[UPLOAD_SPEED]', result.upload);
  post = post.replace('[PROMISED_SPEED]', config.promisedSpeed.toString());
  post = post.replace('[SPEEDTEST_URL]', result.speedTestUrl);

  const text = encodeURI(post);
  const url = `https://x.com/intent/post?text=${text}&hashtags=${hashtags}`;
  console.log(url);
  await openLink(url);
}

async function main() {
  try {
    console.log('Running speed test...');
    const result = await getSpeedTestResult();
    // console.table(result);
    await checkAndPostSpeedComplaint(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(error);
  }
}

// Run as cron job or immediately
if (config.runAsCronJob) {
  new Cron(config.cronExpression, () => {
    main().catch((error) => {
      console.error(error);
    });
  });
} else {
  main().catch((error) => {
    console.error(error);
  });
}

import {exec} from 'child_process';
import speedTest from 'speedtest-net';

export const runCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      if (stderr) {
        return reject(new Error(stderr));
      }
      resolve(stdout);
    });
  });
};

export const openLink = (url) => {
  let cmd = '';
  switch (process.platform) {
    case 'darwin':
      cmd = `open -u "${url}"`;
      break;
    case 'win32':
      cmd = `start "${url}"`;
      break;
    default:
      cmd = `xdg-open "${url}"`;
  }
  return runCommand(cmd);
};

export const getSpeedTestResult = async () => {
  const result = await speedTest({acceptLicense: true});
  console.log(result);

  // Convert bandwidth to Mbps
  const downloadSpeed = (result.download.bandwidth / 125000).toFixed(2);
  const uploadSpeed = (result.upload.bandwidth / 125000).toFixed(2);
  // Ping in ms
  const ping = Math.floor(result.ping.latency);

  const readableResult = {
    download: +downloadSpeed,
    upload: +uploadSpeed,
    ping: +ping,
    serverLocation: result.server.location,
    isp: result.isp,
    speedTestUrl: result.result.url,
  };
  return readableResult;
};

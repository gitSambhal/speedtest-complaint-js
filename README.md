
## speedtest-complaint-js 📢

speedtest-complaint-js is a Node.js script that automatically checks your internet speed and posts a complaint on X (formerly Twitter) to your ISP if it's below an acceptable threshold.


**Tired of slow internet and unresponsive ISPs?** speedtest-complaint-js is here to help you hold your internet provider accountable!


### How it Works

1.  **Speed Test:** speedtest-complaint-js uses the `speedtest-net` library to measure your current download and upload speeds.

2.  **Threshold Check:** It compares your download speed to a configurable threshold (default: 80% of your promised speed).

3.  **Complaint on X:** If the speed is below the threshold, it automatically opens a pre-filled post in your browser, tagging your ISP's X handles and including the speed test results.
  

### Features

-  **Automated Speed Checks:** Schedule regular speed tests using cron expressions directly within the script. No need for external crontab configuration!

-  **Customizable Threshold:** Set the minimum acceptable speed ratio to match your plan.

-  **Pre-filled Complaint Post:** Saves you time and effort by generating an X post with all the relevant information.

-  **Cross-Platform:** Works on macOS, Windows, and Linux.

  
### Installation

 -  **Clone the repository:**
```bash
git clone https://github.com/gitSambhal/speedtest-complaint-js.git
```

 -  **Install dependencies:**
```bash
cd speedtest-complaint-js
npm install
```
 -  **Configure:**
		Configure the following in the `index.js` file
	  - ISP's X handles (`xHandles`)
	  - Promised internet speed (`promisedSpeed`  in Mbps)
	  - Desired speed threshold (`speedThreshold`)
	  - Cron expression for scheduling (`cronExpression`)
	  - Should run as cron job (`runAsCronJob`)
	  - Message template (`complaintMessage`)

### Usage
Run the script:
```bash
node index.js
```
The script will automatically run speed tests based on the configuration. 

### Disclaimer
This script is provided "as is" without warranty of any kind. Use it responsibly and be mindful of your ISP's terms of service. The author is not responsible for any consequences resulting from the use of this script.

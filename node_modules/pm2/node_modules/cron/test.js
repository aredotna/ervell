var CronJob = require('./lib/cron').CronJob;

// WORK
//var job1 = new CronJob('0 * * * * *',
		//function executeTick() {
			//console.log('job1', new Date());
		//},
		//function executeComplete() {
			//console.log('done...', new Date());
		//},
		//false
		//);
//job1.start();

var pattern = '00 12 32 * *';

function run() {
	    console.log('run at ' + new Date());
};

var job = new CronJob(pattern, run);
job.start();

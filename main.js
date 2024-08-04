const {
  Worker,
} = require('node:worker_threads');
const workers = require('./workers');


const runOnce = (command) => { 
   return new Promise((resolve, reject) => { 

    const worker = new Worker('./workerRunner.js');
    worker.on('message', resolve);
    worker.on('error', reject);

    worker.postMessage(command);
   });
}


const promises = ['plus', 'minus', 'mul']?.map(w => runOnce(w));

Promise.all(promises).then((r) => { 
    console.log('All tasks completed.', r);
})


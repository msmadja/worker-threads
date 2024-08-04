const {
    parentPort,
  } = require('node:worker_threads');

const workers = require('./workers');


  parentPort.on('message', (m) => { 
    const method = workers[m] ? workers[m]?.run : null;
    parentPort.postMessage({status: 'ok', value: method ? method() : null});
  });
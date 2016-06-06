const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

function run() {
  console.log('Start...');
  console.time('process');
  console.time('read file');
  fs.readFileAsync('test-data.csv').then(buffer => {
    console.timeEnd('read file');
    return bufferToText(buffer);
  }).then(textToCsv).then(csv => {
    // change a cell
    csv[1][1] = 'new value';
    // add a new row
    csv.push(['new row-col1', 'new row-col2', 'new row-col3']);

    return csvToBuffer(csv);
  }).then(buffer => {
    console.time('write file');
    return fs.writeFileAsync('test-data-bluebird.csv', buffer);
  }).then(() => {
    console.log('Save complete.');
    console.timeEnd('write file');
    console.timeEnd('process');
  }).catch(err => console.error(err));
};

function bufferToText(buf) {
  return new Promise((resolve, reject) => {
    try {
      console.time('buffer to text');
      let text = '';
      for (let c of buf) {
        text += String.fromCharCode(c);
      }
      console.timeEnd('buffer to text');
      resolve(text);
    } catch (err) {
      reject(err);
    }
  });
}

function textToCsv(text) {
  return new Promise((resolve, reject) => {
    try {
      console.time('text to csv');
      const lines = text.split('\n'),
        csv = [];

      for (let line of lines) {
        csv.push(line.split(','));
      }

      console.timeEnd('text to csv');
      resolve(csv);
    } catch (err) {
      reject(err);
    }
  });
}

function csvToBuffer(csvData) {
  return new Promise((resolve, reject) => {
    try {
      console.time('csv to buffer');

      let text = '';
      for (let line of csvData) {
        text += `${line.join(',')}\n`;
      }

      console.timeEnd('csv to buffer');
      resolve(Buffer.from(text));
    } catch (err) {
      reject(err);
    }
  });
}

run();

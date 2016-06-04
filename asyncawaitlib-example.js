const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs')),
      async = require('asyncawait/async'),
      await = require('asyncawait/await');

const run = async (() => {
    console.log('Start...');

    console.time('process');
    console.time('read file');
    var buffer = await (fs.readFileAsync('test-data.csv'));
    var text = await (bufferToText(buffer));
    var csv = await (textToCsv(text));

    // change a cell
    csv[1][1] = 'new value';
    // add a new row
    csv.push(['new row-col1','new row-col2','new row-col3']);

    buffer = await (csvToBuffer(csv));

    console.time('write file');
    await (fs.writeFileAsync('results/test-data-asyncawaitlib.csv', buffer));
    console.log("Save complete.");
    console.timeEnd('write file');
    console.timeEnd('process');
});

const bufferToText = async (buf => {
    console.time('buffer to text');
    let text = '';
    for(let c of buf) {
        text+= String.fromCharCode(c);
    }
    console.timeEnd('buffer to text');
    return text;
});

const textToCsv = async ((text) => {
    console.time('text to csv');
    const lines = text.split('\n'),
        csv = [];

    for(let line of lines) {
        csv.push(line.split(','));
    }

    console.timeEnd('text to csv');
    return csv;
});

const csvToBuffer = async ((csvData) => {
    console.time('csv to buffer');

    let text = '';
    for(let line of csvData) {
        text += `${line.join(',')}\n`;
    }

    console.timeEnd('csv to buffer');
    return text;
});

run();

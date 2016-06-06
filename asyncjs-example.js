const async = require('async'),
      fs = require('fs');

function run() {
    console.log('Start...');
    console.time('process');

    async.waterfall([
        readFile,
        bufferToText,
        textToCsv,
        modifyCsv,
        csvToBuffer,
        writeFile],
        // done
        function (err, result) {
            if(err) console.error(err);
            console.timeEnd('process');
            console.log('Done');
        });
}

function readFile(callback) {
    console.time('read file');
    fs.readFile('test-data.csv', (err, contents) => {
        console.timeEnd('read file');
        if (err) {
            callback(err);
        } else {
            callback(null, contents);
        }
    });
}

function bufferToText(buf, callback) {
    console.time('buffer to text')

    let text = '';
    for (let c of buf) {
        text += String.fromCharCode(c);
    }

    console.timeEnd('buffer to text');
    callback(null, text);

}

function textToCsv(text, callback) {
    console.time('text to csv');
    const lines = text.split('\n'),
        csv = [];

    for (let line of lines) {
        csv.push(line.split(','));
    }

    console.timeEnd('text to csv');
    callback(null, csv);
}

function modifyCsv(csv, callback) {
    // change a cell
    csv[1][1] = 'new value';
    // add a new row
    csv.push(['new row-col1', 'new row-col2', 'new row-col3']);

    callback(null, csv);
}

function csvToBuffer(csvData, callback) {
    console.time('csv to buffer');

    let text = '';
    for (let line of csvData) {
        text += `${line.join(',')}\n`;
    }

    console.timeEnd('csv to buffer');
    callback(null, Buffer.from(text));
}

function writeFile(buf, callback) {
    console.time('write file');
    fs.writeFile('test-data-asyncjs.csv', buf, (err) => {
        console.timeEnd('write file');
        if(err) {
            callback(err);
        } else {
            console.log('Save Complete.');

            callback(null);
        }
    });
}

run();

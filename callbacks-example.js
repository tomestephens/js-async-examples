const fs = require('fs');

function run() {
  console.log('Start...');
  console.time('process');
  console.time('read file');
  fs.readFile('test-data.csv', (err, contents) => {
    if (err) throw err;
    console.timeEnd('read file');

    bufferToText(contents, (err, text) => {
      if (err) throw err;
      textToCsv(text, function(err, csv) {
        // change a cell
        csv[1][1] = 'new value';
        // add a new row
        csv.push(['new row-col1', 'new row-col2', 'new row-col3']);

        csvToBuffer(csv, (err, buf) => {
          if (err) throw err;
          console.time('write file');
          fs.writeFile('test-data-callbacks.csv', buf, (err) => {
            if (err) throw err;
            console.log("Save complete.");
            console.timeEnd('write file');
            console.timeEnd('process');
          });
        });
      });
    });
  });
};

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

function csvToBuffer(csvData, callback) {
  console.time('csv to buffer');

  let text = '';
  for (let line of csvData) {
    text += `${line.join(',')}\n`;
  }

  console.timeEnd('csv to buffer');
  callback(null, Buffer.from(text));
}

run();

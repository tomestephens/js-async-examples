const fs = require('fs');

async function run() {
    console.log('Start...');
    console.time('process');

    var buffer = await readFile('test-data.csv');
    var text = await bufferToText(buffer);
    var csv = await textToCsv(text);

    // change a cell
    csv[1][1] = 'new value';
    // add a new row
    csv.push(['new row-col1','new row-col2','new row-col3']);

    buffer = await csvToBuffer(csv);
    await writeFile('test-data-es7.csv', buffer);

    console.timeEnd('process');
}

async function readFile(fileName) {
    console.time('read file');
    var data = fs.readFileSync(fileName);
    console.timeEnd('read file');
    return data;
}

async function writeFile(fileName, buf) {
    console.time('write file');
    fs.writeFileSync(fileName, buf);
    console.timeEnd('write file');
    console.log("Save complete.");
    return true;
}

async function bufferToText(buf) {
    console.time('buffer to text')

    let text = '';
    for (let c of buf) {
        text += String.fromCharCode(c);
    }

    console.timeEnd('buffer to text');
    return text;
}

async function textToCsv(text) {
    console.time('text to csv');
    const lines = text.split('\n'),
        csv = [];

    for (let line of lines) {
        csv.push(line.split(','));
    }

    console.timeEnd('text to csv');
    return csv;
}

async function csvToBuffer(csvData) {
    console.time('csv to buffer');

    let text = '';
    for (let line of csvData) {
        text += `${line.join(',')}\n`;
    }

    console.timeEnd('csv to buffer');
    return Buffer.from(text);
}

run();

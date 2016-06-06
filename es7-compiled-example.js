let run = (() => {
    var ref = _asyncToGenerator(function* () {
        console.log('Start...');
        console.time('process');

        var buffer = yield readFile('test-data.csv');
        var text = yield bufferToText(buffer);
        var csv = yield textToCsv(text);

        // change a cell
        csv[1][1] = 'new value';
        // add a new row
        csv.push(['new row-col1', 'new row-col2', 'new row-col3']);

        buffer = yield csvToBuffer(csv);
        yield writeFile('test-data-es7.csv', buffer);

        console.timeEnd('process');
    });

    return function run() {
        return ref.apply(this, arguments);
    };
})();

let readFile = (() => {
    var ref = _asyncToGenerator(function* (fileName) {
        console.time('read file');
        var data = fs.readFileSync(fileName);
        console.timeEnd('read file');
        return data;
    });

    return function readFile(_x) {
        return ref.apply(this, arguments);
    };
})();

let writeFile = (() => {
    var ref = _asyncToGenerator(function* (fileName, buf) {
        console.time('write file');
        fs.writeFileSync(fileName, buf);
        console.timeEnd('write file');
        console.log("Save complete.");
        return true;
    });

    return function writeFile(_x2, _x3) {
        return ref.apply(this, arguments);
    };
})();

let bufferToText = (() => {
    var ref = _asyncToGenerator(function* (buf) {
        console.time('buffer to text');

        let text = '';
        for (let c of buf) {
            text += String.fromCharCode(c);
        }

        console.timeEnd('buffer to text');
        return text;
    });

    return function bufferToText(_x4) {
        return ref.apply(this, arguments);
    };
})();

let textToCsv = (() => {
    var ref = _asyncToGenerator(function* (text) {
        console.time('text to csv');
        const lines = text.split('\n'),
              csv = [];

        for (let line of lines) {
            csv.push(line.split(','));
        }

        console.timeEnd('text to csv');
        return csv;
    });

    return function textToCsv(_x5) {
        return ref.apply(this, arguments);
    };
})();

let csvToBuffer = (() => {
    var ref = _asyncToGenerator(function* (csvData) {
        console.time('csv to buffer');

        let text = '';
        for (let line of csvData) {
            text += `${ line.join(',') }\n`;
        }

        console.timeEnd('csv to buffer');
        return Buffer.from(text);
    });

    return function csvToBuffer(_x6) {
        return ref.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const fs = require('fs');

run();

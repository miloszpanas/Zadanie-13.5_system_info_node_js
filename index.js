var os = require('os');
var EventEmitter = require('events').EventEmitter;
var OSinfo = require('./modules/OSinfo');


var emitter = new EventEmitter();

emitter.on('beforeCommand', function(instruction) {
    console.log('You wrote: ' + instruction + ' trying to run command')
});
emitter.on('afterCommand', function() {
    console.log('Finished command');
});

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
    var input = process.stdin.read();
    if(input !== null) {
        var instruction = input.toString().trim();
        // odpalenie zdarzenie beforeCommand (z paramterem)
        emitter.emit('beforeCommand', instruction);
        switch (instruction) {
            case '/exit':
                process.stdout.write('quitting app!\n');
                process.exit();
                break;
            case '/showinfo':
                process.stdout.write(process.versions.node + '\n');
                process.stdout.write(process.env.LANG);
                break;
            case '/getOSinfo':
                OSinfo.print();
                break;
            default:
                process.stderr.write('wrong instruction \n');
        };
        // emitowanie zdarzenia afterCommand (bez parametru)
        emitter.emit('afterCommand');
    }
});


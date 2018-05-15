var os = require('os');
var OSinfo = require('./modules/OSinfo');

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
    var input = process.stdin.read();
    if(input !== null) {
        var instruction = input.toString().trim();
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
        }
        
        
    }
});


var fs = require('fs');
var readLine = require('readline-sync');
var drawdown = require('./drawdown');
const { resolve } = require('path');
const { exit } = require('process');
function rmElem(elem,arr) {
    for( var i = 0; i < arr.length; i++){ 
        if ( arr[i] === elem) { 
            arr.splice(i, 1); 
        }
    }
}
// find published & draft directories
var adds = fs.readdirSync('./add');
var rms = fs.readdirSync('./remove');
var a = 490;
// find blog info file
var info = JSON.parse(fs.readFileSync('./blogs.json'));
// log files in add and remove folders
console.log('DRAFTS: ' + adds);
console.log('POSTS: ' + rms);
// filter out files present in both directories
var addReview = new Promise((resolve,reject) => {
    for(const element of adds) {
        let q = element.replace('.md','.html');
        if(rms.includes(q)) {
            rmElem(q,rms);
            rmElem(element,adds);
            console.log('OK: ' + element + ' | ' + q)
        } else {
            console.log('ADD: ' + q)
        }
    }
    resolve('DONE');
});
addReview.then((value) => {
    // summary
    console.log('REVIEW DONE');
    console.log(
    `
        
    > > > SUMMARY v
    to DELETE: ` + rms + `
    to CONVERT: ` + adds + `
        
    `
    );
    var conf = readLine.question('Would you like to proceed? [Y/n] => ');
    if(conf.toLowerCase() == 'n') {
        console.log('QUITTING');
        exit()
    } else {
        console.log('OK')
        // delete all files in queue
        var len = rms.length;
        var iter = 1
        if(len != 0) {
            for(const element of rms) {
                console.log('DELETING ' + element + ' [' + iter + '/' + len + ']')
                fs.rmSync('./remove/' + element);
                iter = iter + 1
            }
        }
        // convert all files in queue
        len = adds.length;
        iter = 1
        if(len != 0) {
            for(const element of adds) {
                console.log('CONVERTING ' + element + ' [' + iter + '/' + len + ']')
                fs.writeFileSync('./remove/' + element.replace('.md','.html'),drawdown.markdown(fs.readFileSync('./add/' + element, 'utf-8')));
                iter = iter + 1
            }
        }
        // write time, date, and folder contents to info file
        console.log('WRITING INFO')
        var time = new Date();
        info.update.time = time.getTime();
        info.update.date = time.getDate();
        info.files = []
        for(const element of fs.readdirSync('./remove')) {
            info.files.push(element);
        }
        fs.writeFileSync('./blogs.json', JSON.stringify(info))
        console.log('COMPLETE');
        console.log('FINISHED');
        console.log(info);
        
    }
})
document.getElementById('start').addEventListener('click', simpleExec);


function simpleExec () {
    console.log('Execution starts');
    console.log('Still going....');
    console.log('End');
}

function theBigFatOne () {
    console.log('Execution starts');
    var a = 0;
    for (var i = 0; i < 1000000000; i++) {
        a++;
    }
    console.log('End', a);
}

var promise = new Promise(function(resolve, reject) {
    resolve("I got data");
});


function thePromise () {
    console.log('Execution starts');
    
    promise.then(function(data) {
        console.log(data);
    });

    var a = 0;
    for (var i = 0; i < 100000; i++) {
        a++;
    }
    console.log('End', a);
}

function theSmartPromise () {
    console.log('Execution starts');
    
    promise.then(function(data) {
        console.log(data);
    });

    var a = 0;
    console.log('Loop starting....');
    for (var i = 0; i <= 100000; i++) {
        (function(ind) {
            setTimeout(function() {
                if (ind == 100000) {
                    console.log('Loop ended.', ind);
                }
            }, 0);
        })(i);
    }
    console.log('End', a);
}
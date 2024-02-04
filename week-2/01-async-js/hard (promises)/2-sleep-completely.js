/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    while(currentTime-startTime!=milliseconds){
        currentTime = new Date().getTime();
    }
    return new Promise((resolve)=>{
        resolve();
    })
}

module.exports = sleep;

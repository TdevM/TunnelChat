/**
 * Created by Tridev on 27-01-2017.
 */

/* Time Stamp and the Epoch
   Gets counted from January 1 1970 00:00:00 am UTC

   So, 1000 Means January 1 1970 00:00:01 am UTC
   10,000 Means January 1 1970 00:00:10 am UTC

*/
const moment = require('moment');


//var date = new Date();
// console.log(date.getMonth());
// console.log(date.getDate());
// console.log(date.getDay());


var timeStamp = moment().valueOf();
console.log('This should return a timestamp:',timeStamp);
//console.log(date.format('MMM Do, YYYY '));
//console.log(date.format('h:mm a'));
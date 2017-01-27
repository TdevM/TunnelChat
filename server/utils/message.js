/**
 * Created by Tridev on 26-01-2017.
 */
const moment = require('moment');

var generateMessage = function (from,text) {
    return{
        from,
        text,
        timeStamp: moment().valueOf()
    };
};

var sendLocationMessage = function (from,latitude,longitude) {
    return{
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        timeStamp: moment().valueOf()
    };
};

module.exports = {generateMessage,sendLocationMessage};

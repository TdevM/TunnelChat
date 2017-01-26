/**
 * Created by Tridev on 26-01-2017.
 */

var generateMessage = function (from,text) {
    return{
        from,
        text,
        timeStamp: new Date().getTime()
    }
};

module.exports = {generateMessage};
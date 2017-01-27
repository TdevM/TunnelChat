/**
 * Created by Tridev on 26-01-2017.
 */

var expect = require('expect');

var {generateMessage,sendLocationMessage} = require('./message');

describe('generateMessage',()=>{
    "use strict";
    it('Should Generate the correct Message Object',()=>{

        var from = 'Jen';
        var text = 'Max';
        var message = generateMessage(from,text);
        expect(message.timeStamp).toBeA('number');
        expect(message).toInclude({
          from,text
        });

    });

});

describe('generateLocationMessage',()=>{

    it('Should Generate the Approx Location of the User');

    var from = 'Admin';
    var latitude = 15;
    var longitude = 19;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    var message = sendLocationMessage(from,latitude,longitude);

    expect(message.timeStamp).toBeA('number');
    expect(message).toInclude({
        from,url
    });


});

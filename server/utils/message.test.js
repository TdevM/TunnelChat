/**
 * Created by Tridev on 26-01-2017.
 */

var expect = require('expect');

var {generateMessage} = require('./message');
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
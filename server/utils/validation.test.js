/**
 * Created by Tridev on 27-01-2017.
 */

const expect = require('expect');
const {isRealString} = require('./validation');

describe('is Real String',()=>{
    "use strict";
    it('Should Reject Non-String Values', ()=>{

        var res = isRealString(98);
        expect(res).toBe(false);
    });
    it('Should Reject String only with spaces', ()=>{

        var res = isRealString(' ');
        expect(res).toBe(false);
    });

    it('Should Allow String with non space characters', ()=>{

        var res = isRealString('  TRidev  ');
        expect(res).toBe(true);
    });
});

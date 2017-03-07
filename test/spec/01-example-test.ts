import "mocha";
import assert = require("power-assert");
//require('babel-polyfill')

describe("section", ()=>{
    it("test case",  async ()=>{
        assert.equal(3 ,3)

        await new Promise(r => setTimeout(r , 2000))
        assert.equal(9 ,19)

    });
});

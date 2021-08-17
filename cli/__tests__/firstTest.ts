import { assert } from 'sinon';

describe("just a silly test", () => {
    it("checks a sum", () => {
      assert.match( 2+ 2, 4);
    });
});
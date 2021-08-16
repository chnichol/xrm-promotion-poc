const referee = require("@sinonjs/referee")
const assert = referee.assert;

describe("just a silly test", function() {
    it("checks a sum", function() {
      assert.equal(2 + 2, 4);
    });
  });
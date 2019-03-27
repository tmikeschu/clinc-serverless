const test = require("tape");
const changeDetails = require("./changeDetails");
const requestStart = require("./example-data/request_start.json");

test("timing test", function(t) {
  t.plan(1);

  const actual = changeDetails.resolve(requestStart);

  const expected = {
    _DETAIL_TYPE_: {
      type: "string",
      values: [
        {
          resolved: 1,
          tokens: "email",
          detail_type_dest: "email",
          value: "email"
        }
      ]
    }
  };

  t.same(actual.slots, expected);
});

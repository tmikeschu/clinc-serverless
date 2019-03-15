const resolveGetBalance = require("./getBalance");

module.exports = {
  run(event, context) {
    console.log("REQUEST DATA", event.body);
    const data = JSON.parse(event.body);

    if (data.state === "get_balance") {
      const processed = resolveGetBalance(data);

      console.log("RESPONSE DATA", processed);
      return Promise.resolve({
        statusCode: 200,
        body: JSON.stringify(processed)
      });
    }
    return Promise.resolve({
      statusCode: 501,
      body: JSON.stringify({
        message: "not implemented"
      })
    });
  }
};

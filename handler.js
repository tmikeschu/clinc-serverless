const { log } = require("./utils");
const resolveGetBalance = require("./getBalance");

module.exports = {
  run(event, context) {
    log("request", event.body);
    const data = JSON.parse(event.body);

    if (data.state === "get_balance") {
      const processed = resolveGetBalance(data);

      log("response", JSON.stringify(processed));
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

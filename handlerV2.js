const { log } = require("./utils");

module.exports = {
  run(event) {
    log("request", event.body);

    // do stuff

    log("response", event.body);
    return Promise.resolve({
      statusCode: 501,
      body: JSON.stringify({
        message: "not implemented"
      })
    });
  }
};

const { log } = require("./utils");
const resolveChangeDetailsConfirmed = require("./resolveChangeDetailsConfirmed");

const stateHandlers = {
  change_details: resolveChangeDetailsConfirmed,
  change_details_confirmed: resolveChangeDetailsConfirmed
};

module.exports = {
  run(event) {
    log("request", event.body);

    const conversationData = JSON.parse(event.body);
    const handler = stateHandlers[conversationData.state];
    if (handler) {
      const processed = handler(conversationData);
      log("response", JSON.stringify(processed));
      return Promise.resolve({
        statusCode: 200,
        body: JSON.stringify(processed)
      });
    }

    log("response", event.body);
    return Promise.resolve({
      statusCode: 501,
      body: JSON.stringify({
        message: "not implemented"
      })
    });
  }
};

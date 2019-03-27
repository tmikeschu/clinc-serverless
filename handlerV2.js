const { log } = require("./utils");
const changeDetails = require("./changeDetails");

const stateHandlers = {
  change_details: changeDetails.resolve,
  change_details_confirmed: changeDetails.resolveConfirmed
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

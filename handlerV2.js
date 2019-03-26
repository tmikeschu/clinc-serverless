module.exports = {
  run(event) {
    console.log(">>>>>>>>>> REQUEST DATA", event.body, "<<<<<<<<<<<<<<<");

    return Promise.resolve({
      statusCode: 501,
      body: JSON.stringify({
        message: "not implemented"
      })
    });
  }
};

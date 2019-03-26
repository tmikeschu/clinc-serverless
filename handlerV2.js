module.exports = {
  run(event) {
    console.log(">>>>>>>>>> REQUEST DATA", event.body);
    return Promise.resolve({
      statusCode: 200,
      body: event.body
    });
  }
};
